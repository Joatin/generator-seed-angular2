'use strict';

var path = require('path');

var s = require('underscore.string');

var options = require('./options.json');

module.exports = function (AngularGenerator) {

  /**
   * Declares options in the generator (only used for the help messages)
   */
  AngularGenerator.prototype.defineOptions = function defineOptions() {
    options.forEach(function (option) {
      this.option(option.name, {
        type: global[option.type],
        required: option.required,
        desc: option.desc,
        defaults: option.defaults
      });
    }, this);
  };

  /**
   * Determine the appName either from the current directory or the parameter of the generator
   */
  AngularGenerator.prototype.determineAppName = function determineAppName() {
    this.appName = this.appName || path.basename(process.cwd());
    this.appName = s.camelize(s.slugify(s.humanize(this.appName)));
  };

};