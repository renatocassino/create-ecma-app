const { Command } = require('commander');
const chalk = require('chalk');
const packageJSON = require('../package.json');

let projectName = '';

const program = new Command(packageJSON.name)
  .version(packageJSON.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action((name) => projectName = name)
  .option('--verbose', 'print additional logs')
  .allowUnknownOption()
  .on('--help', () => {
    console.log(`    Only ${chalk.green('<project-directory>')} is required.\n`);
  })
  .parse(process.argv);

const config = {
  appName: projectName,
  programName: program.name(),
};

module.exports = config;
