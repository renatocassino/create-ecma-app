const { Command } = require('commander');
const chalk = require('chalk');
const packageJSON = require('../package.json');

let config = {};

new Command(packageJSON.name)
  .version(packageJSON.version)
  .arguments('<project-name>')
  .usage(`${chalk.green('<project-name>')} [options]`)
  .option('-v, --verbose', 'print additional logs')
  .option('-d, --description [description]', 'description to project')
  .option('-a, --author [author]', 'author of the project')
  .option('--ask-me', 'the create-ecma-app will ask about props in generation')
  .action((name, options) => {
    config = {
      appName: name,
      ...options,
    };
  })
  .allowUnknownOption()
  .on('--help', () => {
    console.log(`\n  Only ${chalk.green('<project-directory>')} is required.\n`);
  })
  .parse(process.argv);

module.exports = config;
