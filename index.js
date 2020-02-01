#!/usr/bin/env node

const chalk = require('chalk')
const { Command } = require('commander')
const package = require('./package.json')
const semver = require('semver')
const fs = require('fs')
const path = require('path')

if (!semver.satisfies(process.version, '>=8.0')) {
  console.log(
    chalk.red(
      `You are using Node ${process.version}, which is not supported by Create Ecma App.\n\n` +
      `Please update to Node 8.0 or higher.\n`
    )
  )
  process.exit(1)
}

let projectName
const program = new Command(package.name)
  .version(package.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(name => (projectName = name))
  .option('--verbose', 'print additional logs')
  .allowUnknownOption()
  .on('--help', () => {
    console.log(`    Only ${chalk.green('<project-directory>')} is required.\n`)
  })
  .parse(process.argv)

const shouldUseYarn = () => {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}

const createDir = (appPath) => {
  try {
    fs.mkdirSync(appPath)
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.error(
        chalk.red(`
          Directory ${appPath} already exists, refusing to overwrite.
        `)
      )
      process.exit(1)
    } else {
      throw err
    }
  }
}

const run = async () => {
  const appName = projectName
  const programName = program.name()

  if (typeof appName === 'undefined') {
    console.error(`Please specify the project directory:
      ${chalk.cyan(programName)} ${chalk.green('<project-directory>')}
      For example:
      ${chalk.cyan(programName)} ${chalk.green('my-node-app')}
      Run ${chalk.cyan(`${programName} --help`)} to see all options.`)
    process.exit(1)
  }

  // const useYarn = shouldUseYarn()
  createDir(path.join(process.cwd(), appName))

  const args = [process.argv[0], process.argv[1]]
  args.push(path.join(__dirname, 'src', 'generator'))
  process.argv.slice(2).forEach(v => args.push(v))
  process.argv = args

  require('yo/lib/cli')
}

run()