const Generator = require('yeoman-generator')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const config = require('./config')

const shouldUseYarn = () => {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  prompting() {
    this.log(
      `Salutations from ${chalk.red('create-ecma-app')} generator by Tacnoman`
    );

    var prompts = []

    return this.prompt(prompts).then(props => {
      this.props = props
      this.props.author = `${this.user.git.name()} <${this.user.git.email()}>`
      this.props.description = 'My awesome ecma project'
      this.props.packageName = config.appName
      this.props.packageNamePascalCase = this.props.packageName.
        split('-').
        reduce( (PascalCase, word) => (
          PascalCase + word.replace(/^([a-z])/, g => g[0].toUpperCase())
        ), '')
      this.props.year = new Date().getFullYear()
      this.destinationRoot(path.join(process.cwd(), this.props.packageName))
    })
  }

  writing() {
    const walkSync = (dir, filelist = []) => {
      if (dir.match(/node_modules|dist/)) return filelist
      console.log(dir)

      fs.readdirSync(dir).forEach(file => {
        filelist = fs.statSync(path.join(dir, file)).isDirectory()
          ? walkSync(path.join(dir, file), filelist)
          : filelist.concat(path.join(dir, file).replace(`${this.sourceRoot()}/`, ''))
      })
      return filelist
    }

    const filelist = walkSync(this.sourceRoot())

    filelist.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.props
      )
    })
  }

  install() {
    this.log(chalk.blue.bold('❯  Calling yarn install...'))
    this.spawnCommandSync(
      shouldUseYarn() ? 'yarn' : 'npm',
      [
        'install',
      ],
      {
        cwd: `${process.cwd()}`,
        stdio: 'inherit',
        shell: true
      }
    )

    this.log(`
    ${chalk.blue('❯ Project done 😎')}

    Now you can run:

      ${chalk.yellow(`$ cd ${this.props.packageName} && yarn dev`)}
      
    and start to write code with Ecma
    `)
  }
};
