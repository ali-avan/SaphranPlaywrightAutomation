const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const resultsDir = path.join(__dirname, 'results');
const resultsFile = path.join(resultsDir, 'results.json');
const resultsFileArg = path.join('results', 'results.json');

fs.mkdirSync(resultsDir, { recursive: true });
if (fs.existsSync(resultsFile)) {
  fs.rmSync(resultsFile, { force: true });
}

const cucumberArgs = [
  '--require-module',
  'ts-node/register',
  '--require',
  'tsconfig-paths/register',
  '--require',
  'step-definitions/**/*.ts',
  ...process.argv.slice(2),
  '--format',
  `json:${resultsFileArg}`,
];

const cucumber = spawn('npx', ['cucumber-js', ...cucumberArgs], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true,
});

cucumber.on('exit', (code) => {
  const report = spawn('node', ['report.js'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true,
  });

  report.on('exit', () => {
    process.exit(code ?? 1);
  });
});
