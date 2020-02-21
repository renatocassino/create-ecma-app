#!/usr/bin/env node

const chalk = require('chalk');
const semver = require('semver');
const path = require('path');
const config = require('./src/config');

if (!semver.satisfies(process.version, '>=8.0')) {
  console.log(
    chalk.red(
      `You are using Node ${process.version}, which is not supported by Create Ecma App.\n\n`
      + 'Please update to Node 8.0 or higher.\n',
    ),
  );
  process.exit(1);
}

const run = async () => {
  const { appName, programName } = config;

  if (typeof appName === 'undefined') {
    console.error(`Please specify the project directory:
      ${chalk.cyan(programName)} ${chalk.green('<project-directory>')}

      For example:
      ${chalk.cyan(programName)} ${chalk.green('my-node-app')}

      Run ${chalk.cyan(`${programName} --help`)} to see all options.`);
    process.exit(1);
  }

  const args = [process.argv[0], process.argv[1]];
  args.push(path.join(__dirname, 'src'));
  process.argv.slice(2).forEach((v) => args.push(v));
  process.argv = args;

  // Run Yeoman
  require('yo/lib/cli');
};

run();
