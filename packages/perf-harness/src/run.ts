/**
 * Drives a running instance of the app through the perf scenarios and writes
 * the numbers to JSON.
 *
 * Chromium only. What comes back is a count of the canvas calls our own code
 * makes, which is the same number on every engine, so a second browser would
 * cost minutes and tell us nothing new. It is also why these numbers survive a
 * shared CI runner where wall clock timings would not.
 *
 * @example
 * node src/run.ts --url http://localhost:3000 --out head.json
 */
import { writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';

import { type Page, chromium } from 'playwright';

import {
  MEASURE_MS,
  SCENE_SEED,
  SETTLE_MS,
  type Scenario,
  scenarios,
} from './scenarios.ts';
import type {
  PerfReport,
  PerfTools,
  RunResult,
  ScenarioResult,
} from './types.ts';

declare global {
  interface Window {
    __graphPerf?: PerfTools;
  }
}

/** big enough that a 50 node graph is not scrolled off screen */
const VIEWPORT = { width: 1440, height: 900 };

const TOOLS_TIMEOUT_MS = 30_000;

const waitForPerfTools = async (page: Page, url: string) => {
  try {
    await page.waitForFunction(() => window.__graphPerf !== undefined, null, {
      timeout: TOOLS_TIMEOUT_MS,
    });
  } catch {
    throw new Error(
      `no __graphPerf on ${url} after ${TOOLS_TIMEOUT_MS / 1000}s.\n` +
        'the perf tools only start on a dev build, so check the server is ' +
        '`nuxt dev` and not a generated one. if this is the base half of a ' +
        'comparison, the base commit may simply predate the perf tooling, in ' +
        'which case there is nothing there to measure yet.',
    );
  }
};

/*
  a cursor parked in one spot tells us nothing about hit testing, and a single
  jump tells us about one frame. this keeps it moving across the canvas for the
  whole measuring window, which is what a user dragging their mouse around
  actually costs
*/
const sweepCursor = async (page: Page, durationMs: number) => {
  const steps = 60;
  const stepDelay = durationMs / steps;

  for (let step = 0; step < steps; step++) {
    const progress = step / steps;
    await page.mouse.move(
      VIEWPORT.width * (0.15 + 0.7 * progress),
      VIEWPORT.height * (0.3 + 0.4 * Math.sin(progress * Math.PI * 2)),
    );
    await page.waitForTimeout(stepDelay);
  }
};

const measureScenario = async (
  page: Page,
  baseUrl: string,
  scenario: Scenario,
): Promise<ScenarioResult> => {
  const url = new URL(scenario.route, baseUrl).toString();

  await page.goto(url, { waitUntil: 'load' });
  await waitForPerfTools(page, url);

  await page.evaluate(
    ([nodes, seed]) => window.__graphPerf?.scene({ nodes, seed }),
    [scenario.nodes, SCENE_SEED],
  );

  // a graph still animating its nodes in draws differently from a settled one
  await page.waitForTimeout(SETTLE_MS);

  await page.evaluate(() => {
    window.__graphPerf?.countCalls();
    window.__graphPerf?.reset();
  });

  if (scenario.sweepCursor) await sweepCursor(page, MEASURE_MS);
  else await page.waitForTimeout(MEASURE_MS);

  const report = await page.evaluate(
    () => window.__graphPerf?.report() as PerfReport,
  );

  /*
    zero frames means requestAnimationFrame never ran, which happens when the
    page is treated as hidden. the per frame numbers would all be zero and look
    like a spectacular improvement, so this fails instead
  */
  const frames = report.calls?.frames ?? 0;
  if (frames === 0) {
    throw new Error(
      `${scenario.name} recorded no frames. the page never repainted, so ` +
        'these numbers would be fiction rather than an improvement.',
    );
  }

  return {
    scenario: scenario.name,
    nodes: scenario.nodes,
    frames,
    perFrame: report.calls?.perFrame ?? {},
    timing: report.timing,
  };
};

const main = async () => {
  const { values } = parseArgs({
    options: {
      url: { type: 'string', default: 'http://localhost:3000' },
      out: { type: 'string' },
      commit: { type: 'string', default: 'unknown' },
    },
  });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: VIEWPORT });

  const results: ScenarioResult[] = [];

  try {
    for (const scenario of scenarios) {
      process.stderr.write(`measuring ${scenario.name}\n`);
      results.push(await measureScenario(page, values.url, scenario));
    }
  } finally {
    await browser.close();
  }

  const runResult: RunResult = {
    commit: values.commit,
    measuredAt: new Date().toISOString(),
    scenarios: results,
  };

  const serialized = JSON.stringify(runResult, null, 2);

  if (values.out) await writeFile(values.out, serialized);
  else process.stdout.write(serialized);
};

await main();
