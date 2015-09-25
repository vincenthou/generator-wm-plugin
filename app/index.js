'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

function generateDestFile(filePath) {
  this.fs.copyTpl(
    this.templatePath(filePath),
    this.destinationPath(filePath),
    {
      moduleName: this.props.moduleName
    }
  );
}

module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    //Your initialization methods (checking current project state, getting configs, etc)
    this.pkg = require('../package.json');
  },

  prompting: function () {
    //Where you prompt users for options (where you'd call this.prompt())
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Create your module basic structure with ' + chalk.red('OmniSocials module') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'What is your module name?',
      default: this.appname //Default to current folder name
    },{
      type: 'confirm',
      name: 'hasMobilePage',
      message: 'Do you need to create mobile pages?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      this.log("Your module name is " + props.moduleName)
      if (props.hasMobilePage) {
        this.log("You will develop your mobile pages in webapp folder")
      }
      done();
    }.bind(this));
  },

  configuring: function() {
    //Saving configurations and configure the project (creating .editorconfig files and other metadata files)
  },

  default: function() {
    //If the method name doesn't match a priority, it will be pushed to this group.
  },

  writing: {
    files: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      generateDestFile.call(this, 'package.json');
      generateDestFile.call(this, 'README.md');
    },

    backend: function () {
      var self = this;
      [
        'backend/config/main.php',
        'backend/controllers/SiteController.php',
        'backend/job/Demo.php',
        'backend/models/.gitignore',
        'backend/Install.php',
        'backend/Module.php',
      ].forEach(function(file){
        generateDestFile.call(self, file);
      });
    }
  },

  conflicts: function() {
    //Where conflicts are handled (used internally)
  },

  install: function () {
    //Where installation are run (npm, bower)
    this.installDependencies();
  },

  end: function() {
    //Called last, cleanup, say good bye, etc
  }
});
