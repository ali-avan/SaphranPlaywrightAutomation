module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['step-definitions/**/*.ts', 'support/hooks.ts'],
    format: ['json:results/results.json'],
    publishQuiet: true,
    timeout: 30000
  }
};
