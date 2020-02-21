const { Command } = require('commander');
const chalk = require('chalk');
const packageJSON = require('../package.json');

let config = {};

new Command(packageJSON.name)
  .version(packageJSON.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .option('-v, --verbose', 'print additional logs')
  .option('-d, --description [description]', 'Add description to project')
  .action((name, options) => {
    config = {
      appName: name,
      ...options,
    };
  })
  .allowUnknownOption()
  .on('--help', () => {
    console.log(`    Only ${chalk.green('<project-directory>')} is required.\n`);
  })
  .parse(process.argv);

module.exports = config;
