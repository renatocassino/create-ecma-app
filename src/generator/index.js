const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  method1() {
    console.log('THIS MAKE SENSE TO ME!')
  }
};
