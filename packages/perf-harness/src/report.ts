/**
 * Renders two runs into the markdown the bot posts.
 *
 * The counts lead and the timings are tucked away, which is the opposite of
 * how a perf report usually reads. It is deliberate: these runs happen on a
 * shared runner against an unminified dev build, so the timings are good for
 * catching something ten times slower and nothing finer, while the counts are
 * exact and mean the same thing on any machine.
 *
 * @example
 * node src/report.ts --head head.json --base base.json
 */
import { readFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';

import type { PerfCounts, RunResult, ScenarioResult } from './types.ts';

/** lets the workflow find its own comment again instead of posting a new one */
export const COMMENT_MARKER = '<!-- magic-graphs-perf-bot -->';

/*
  the counters worth a table row. the rest are still in the json, but a wall of
  forty rows is a wall nobody reads, and these are the ones that answer "is a
  frame doing more work than it was"
*/
const HEADLINE_COUNTERS = [
  'canvasElementsCreated',
  'drawImage',
  'measureText',
  'fillRect',
  'fill',
  'stroke',
  'save',
] as const;

/** below this a difference is rounding or a stray frame, not a change */
const NOTABLE_DELTA = 0.1;

const totalCalls = (counts: PerfCounts) =>
  Object.values(counts).reduce((sum, count) => sum + count, 0);

const round = (value: number) => Math.round(value * 10) / 10;

const formatDelta = (base: number | undefined, head: number) => {
  if (base === undefined) return '';
  if (base === 0 && head === 0) return '=';

  const absolute = head - base;
  if (base === 0) return `+${round(absolute)} (new)`;

  const ratio = absolute / base;
  if (Math.abs(ratio) < NOTABLE_DELTA) return '=';

  const arrow = absolute < 0 ? '⬇' : '⬆';
  const percent = Math.round(ratio * 100);

  return `${arrow} ${percent > 0 ? '+' : ''}${percent}%`;
};

const scenarioTable = (head: ScenarioResult, base?: ScenarioResult) => {
  const counters = [...HEADLINE_COUNTERS].filter(
    (counter) =>
      head.perFrame[counter] !== undefined ||
      base?.perFrame[counter] !== undefined,
  );

  const header = base
    ? '| per frame | base | head | |\n| --- | ---: | ---: | --- |'
    : '| per frame | head |\n| --- | ---: |';

  const row = (label: string, headValue: number, baseValue?: number) =>
    base
      ? `| ${label} | ${round(baseValue ?? 0)} | ${round(headValue)} | ${formatDelta(baseValue ?? 0, headValue)} |`
      : `| ${label} | ${round(headValue)} |`;

  const rows = counters.map((counter) =>
    row(counter, head.perFrame[counter] ?? 0, base?.perFrame[counter]),
  );

  rows.push(
    row(
      '**all calls**',
      totalCalls(head.perFrame),
      base && totalCalls(base.perFrame),
    ),
  );

  return [
    `#### \`${head.scenario}\` (${head.nodes} nodes, ${head.frames} frames)`,
    '',
    header,
    ...rows,
    // a table that runs straight into the next heading stops being a table
    '',
  ].join('\n');
};

const timingSection = (head: RunResult, base?: RunResult) => {
  const rows = head.scenarios.map((scenario) => {
    const baseScenario = base?.scenarios.find(
      (candidate) => candidate.scenario === scenario.scenario,
    );

    const draw = (result?: ScenarioResult) =>
      result ? `${round(result.timing.draw.p50)}ms` : 'n/a';

    return base
      ? `| ${scenario.scenario} | ${draw(baseScenario)} | ${draw(scenario)} | ${scenario.timing.dropped} |`
      : `| ${scenario.scenario} | ${draw(scenario)} | ${scenario.timing.dropped} |`;
  });

  const header = base
    ? '| scenario | base draw p50 | head draw p50 | dropped |\n| --- | ---: | ---: | ---: |'
    : '| scenario | draw p50 | dropped |\n| --- | ---: | ---: |';

  return [
    '<details>',
    '<summary>frame timings (indicative only)</summary>',
    '',
    'Measured on a shared runner against an unminified dev build. Good for',
    'spotting something an order of magnitude slower, not for anything finer.',
    '',
    header,
    ...rows,
    '</details>',
  ].join('\n');
};

const render = (head: RunResult, base?: RunResult) => {
  const tables = head.scenarios.map((scenario) =>
    scenarioTable(
      scenario,
      base?.scenarios.find(
        (candidate) => candidate.scenario === scenario.scenario,
      ),
    ),
  );

  const heading = base
    ? `head \`${head.commit.slice(0, 7)}\` vs base \`${base.commit.slice(0, 7)}\``
    : `head \`${head.commit.slice(0, 7)}\``;

  return [
    COMMENT_MARKER,
    '### canvas perf',
    '',
    heading,
    '',
    'Counts are per repaint and exact: the same scene issues the same calls on',
    'any machine, so a change here is a real change in what a frame does.',
    '',
    ...tables,
    '',
    timingSection(head, base),
    '',
  ].join('\n');
};

const readRun = async (path: string): Promise<RunResult> =>
  JSON.parse(await readFile(path, 'utf8'));

const main = async () => {
  const { values } = parseArgs({
    options: {
      head: { type: 'string' },
      base: { type: 'string' },
    },
  });

  if (!values.head) throw new Error('--head is required');

  const head = await readRun(values.head);
  const base = values.base ? await readRun(values.base) : undefined;

  process.stdout.write(render(head, base));
};

await main();
