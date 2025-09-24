import type { CAC } from 'cac';

import { execaCommand } from '@react-admin/node-utils';

interface LintCommandOptions {
  /**
   * Format lint problem.
   */
  format?: boolean;
}

async function runLint({ format }: LintCommandOptions) {
  if (format) {
    await execaCommand(`stylelint "**/*.{css,less,scss}" --cache --fix`, {
      stdio: 'inherit',
    });
    await execaCommand(`eslint . --ext "**/*.?([cm])[jt]s?(x)}" --fix`, {
      stdio: 'inherit',
    });
    await execaCommand(
      `prettier --write  --cache --log-level warn "**/*.?([cm])[jt]s?(x)"`,
      {
        stdio: 'inherit',
      },
    );
    return;
  }
  await Promise.all([
    execaCommand(`eslint . --cache`, {
      stdio: 'inherit',
    }),
    execaCommand(`prettier . --ignore-unknown --check --cache`, {
      stdio: 'inherit',
    }),
    execaCommand(`stylelint "**/*.{css,less,scss}" --cache`, {
      stdio: 'inherit',
    }),
  ]);
}

function defineLintCommand(cac: CAC) {
  cac
    .command('lint')
    .usage('Batch execute project lint check.')
    .option('--format', 'Format lint problem.')
    .action(runLint);
}

export { defineLintCommand };
