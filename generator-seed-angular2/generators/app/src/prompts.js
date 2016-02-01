'use strict';

var _ = require('lodash');
var chalk = require('chalk');

var prompts = require('./prompts.json');

module.exports = function (AngularGenerator) {
    
   /**
   * Check if there is a .yo-rc.json and ask for using it
   */
  AngularGenerator.prototype.checkYoRc = function checkYoRc() {
    var done = this.async();

    if (this.config.get('props') && !this.options.default) {
      this.prompt([{
        type: 'confirm',
        name: 'skipConfig',
        message: 'Existing ' + chalk.green('.yo-rc') + ' configuration found, would you like to use it?',
        default: true
      }], function (answers) {
        this.skipConfig = answers.skipConfig;

        if (answers.skipConfig) {
          this.props = _.merge(this.props, this.config.get('props'));
        }

        done();
      }.bind(this));
    } else {
      this.skipConfig = false;
      done();
    }
  };
  
  /**
   * Ask all questions from prompts.json
   * Add conditional tests on those depending on first responses
   * Complete responses with null answers for questions not asked
   */
  AngularGenerator.prototype.askQuestions = function askQuestions() {
    if (this.skipConfig || this.options.default) {
      return;
    }

    var done = this.async();

    _.findWhere(prompts, {name: 'bootstrapComponents'}).when = function (props) {
      return props.ui.key === 'bootstrap';
    };

    this.prompt(prompts, function (props) {
      if (props.ui.key !== 'bootstrap') {
        props.bootstrapComponents = {
          name: null,
          version: null,
          key: null,
          module: null
        };
      }

      if (props.ui.key !== 'foundation') {
        props.foundationComponents = {
          name: null,
          version: null,
          key: null,
          module: null
        };
      }

      this.props = _.merge(this.props, props);

      done();
    }.bind(this));
  };
}