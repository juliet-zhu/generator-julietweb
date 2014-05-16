'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var JulietwebGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
        console.log('done');
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Julietweb generator!'));

    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
        choices: [{
          name: 'Bootstrap',
          value: 'includeBootstrap',
          checked: true
        },{
          name: 'Jade',
          value: 'includeJade',
          checked: false
        },{
          name: 'Modernizr',
          value: 'includeModernizr',
          checked: false
        },{
          name: 'Stylus',
          value: 'includeStylus',
          checked: false
        }]
    }];

    this.prompt(prompts, function (answers) {
      var features = answers.features;

      function hasFeature(feat){
        return features.indexOf(feat) !== -1;
      }

      this.includeJade = hasFeature('includeJade');
      this.includeStylus = hasFeature('includeStylus');
      this.includeBootstrap = hasFeature('includeBootstrap');
      this.includeModernizr = hasFeature('includeModernizr');

      done();
    }.bind(this));
  },
  gruntfile : function(){
    this.template('Gruntfile.js');
  },
  packageJSON : function() {
    this.template('_package.json', 'package.json');
  },
  git : function() {
    this.copy('gitignore','.gitignore');
  },
  bower : function() {
    this.template('_bower.json', 'bower.json');
  },
  jshint : function(){
    this.copy('jshintrc', '.jshintrc');
  },
  app: function () {
    this.mkdir('app');
    this.mkdir('app/templates');
    this.mkdir('app/scripts/components');
    this.mkdir('app/scripts/libs');
    this.mkdir('app/styles/components');
    this.mkdir('app/styles/libs');
    this.mkdir('app/images');
    if(this.includeJade){
      this.copy('base.jade','app/templates/base.jade');
      this.copy('header.jade','app/templates/header.jade');
      this.copy('footer.jade','app/templates/footer.jade');
    }
    if(this.includeStylus){
      this.copy('main.styl','app/styles/main.styl');
      this.copy('mixins.styl','app/styles/inc/mixins.styl');
      this.copy('vars.styl','app/styles/inc/vars.styl');
    }
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = JulietwebGenerator;
