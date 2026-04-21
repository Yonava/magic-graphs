import fs from 'node:fs';

import type { Plugin } from 'vite';

/**
 * detects when the same npm package resolves to multiple physical locations
 * during the vite build. this catches pnpm peer-dependency duplication that
 * causes runtime bugs with packages relying on singleton state (vue, vue-router,
 * primevue, etc.)
 */
export function detectDuplicatePackages(): Plugin {
  return {
    name: 'detect-duplicate-packages',
    apply: 'build',

    generateBundle() {
      const pkgRoots = new Map<string, Set<string>>();

      for (let id of this.getModuleIds()) {
        if (id.startsWith('\0')) continue;
        id = id.split('?')[0];
        if (!id.includes('node_modules')) continue;

        let realId: string;
        try {
          realId = fs.realpathSync(id);
        } catch {
          continue;
        }
        const nmIdx = realId.lastIndexOf('node_modules/');
        if (nmIdx === -1) continue;

        const afterNm = realId.slice(nmIdx + 'node_modules/'.length);
        const parts = afterNm.split('/');
        const pkg = parts[0].startsWith('@')
          ? `${parts[0]}/${parts[1]}`
          : parts[0];
        const pkgRoot = realId.slice(0, nmIdx + 'node_modules/'.length) + pkg;

        if (!pkgRoots.has(pkg)) pkgRoots.set(pkg, new Set());
        pkgRoots.get(pkg)!.add(pkgRoot);
      }

      const duplicates: string[] = [];
      for (const [pkg, roots] of pkgRoots) {
        if (roots.size > 1) {
          duplicates.push(
            `  ${pkg} resolved to ${roots.size} copies:\n` +
              [...roots].map((p) => `    - ${p}`).join('\n'),
          );
        }
      }

      if (duplicates.length > 0) {
        this.error(
          `Duplicate packages detected in build! This causes runtime bugs ` +
            `when packages rely on singleton state (Symbol, provide/inject).\n\n` +
            `${duplicates.join('\n\n')}\n\n` +
            `Fix: add an alias in resolve.alias to force a single copy, ` +
            `and use "catalog:" in pnpm-workspace.yaml to unify versions.`,
        );
      }
    },
  };
}
