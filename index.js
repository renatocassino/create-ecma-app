#!/usr/bin/env node

const chalk = require('chalk');
const semver = require('semver');
const path = require('path');
const config = require('./src/config');
const { name } = require('./package.json');

if (!semver.satisfies(process.version, '>=8.0')) {
  console.log(
    chalk.red(
      `You are using Node ${process.version}, which is not supported by Create Ecma App.\n\n`
      + 'Please update to Node 8.0 or higher.\n',
    ),
  );
  process.exit(1);
}

const main = async () => {
  const { appName } = config;

  if (typeof appName === 'undefined' || appName === '') {
    console.error(`
  Please specify the name of the project:
    ${chalk.cyan(name)} ${chalk.green('<project-name>')}

  For example:
    ${chalk.cyan(name)} ${chalk.green('my-node-app')}

  Run ${chalk.cyan(`${name} --help`)} to see all options.
    `);

    process.exit(1);
  }

  const args = [process.argv[0], process.argv[1]];
  args.push(path.join(__dirname, 'src'));
  process.argv.slice(2).forEach((v) => args.push(v));
  process.argv = args;

  // Run Yeoman
  require('yo/lib/cli');
};

main();
