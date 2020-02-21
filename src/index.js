const Generator = require('yeoman-generator');
const path = require('path');
const chalk = require('chalk');
const config = require('./config');
const getListOfFiles = require('./getListOfFiles');
const shouldUseYarn = require('./shouldUseYarn');

module.exports = class extends Generator {
  prompting() {
    this.log(
      `Salutations from ${chalk.red('create-ecma-app')} generator by Tacnoman`,
    );

    const prompts = [];

    const defaultAuthor = `${this.user.git.name()} <${this.user.git.email()}>`;

    if (config.askMe) {
      if (!config.description) {
        prompts.push({
          type: 'input',
          name: 'description',
          message: 'Description of your app to package.json',
          default: 'My awesome project',
        });
      }

      if (!config.author) {
        prompts.push({
          type: 'input',
          name: 'author',
          message: 'Author of the project (format "Name <email@domain.com>"): ',
          default: defaultAuthor,
        });
      }
    }

    return this.prompt(prompts).then((props) => {
      this.props = props;
      this.props.author = props.author || config.author || defaultAuthor;
      this.props.description = props.description || config.description || 'My awesome ecma project';
      this.props.packageName = config.appName;
      this.props.commandToRun = shouldUseYarn() ? 'yarn' : 'npm run';
      this.props.packageNamePascalCase = this.props.packageName
        .split('-')
        .reduce((PascalCase, word) => (
          PascalCase + word.replace(/^([a-z])/, (g) => g[0].toUpperCase())
        ), '');

      this.props.year = new Date().getFullYear();
      this.destinationRoot(path.join(process.cwd(), this.props.packageName));
    });
  }

  writing() {
    const filelist = getListOfFiles(this.sourceRoot());

    filelist.forEach((file) => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file.replace('_gitignore', '.gitignore')),
        this.props,
      );
    });
  }

  install() {
    const packageLib = shouldUseYarn() ? 'yarn' : 'npm';
    this.log(chalk.blue.bold(`❯  Calling ${packageLib} install...`));
    this.spawnCommandSync(
      packageLib,
      [
        'install',
      ],
      {
        cwd: `${process.cwd()}`,
        stdio: 'inherit',
        shell: true,
      },
    );

    const command = packageLib === 'npm' ? 'npm run' : 'yarn';

    this.log(`
  ${chalk.blue('❯ Project done 😎')}

  Now you can run:

    ${chalk.yellow(`$ cd ${this.props.packageName} && ${command} dev`)}

  and start to write code with Ecma.

  Another commands:

    ${chalk.cyan(`${command} start`)}
      Start the project in production after build

    ${chalk.cyan(`${command} build`)}
      Build project to production

    ${chalk.cyan(`${command} build:web`)}
      Build project using Browserify to run in Browser

    ${chalk.cyan(`${command} dev`)}
      Run script with watcher

    ${chalk.cyan(`${command} test`)}
      Run tests with Jest package

    ${chalk.cyan(`${command} test:coverage`)}
      Run tests with Jest package and show coverage

    ${chalk.cyan(`${command} lint`)}
      Run Eslint with Airbnb package

    ${chalk.cyan(`${command} lint:fix`)}
      Run Eslint with Airbnb trying to fix simple problems

    ${chalk.cyan(`${command} validate`)}
      Run tests and Eslint to CI
    `);
  }
};
