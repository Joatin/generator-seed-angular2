'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var pkg = require('../../package.json');

var AngularGenerator= yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.Base.apply(this, arguments);

        // Define arguments
        this.argument('appName', {
            type: 'String',
            required: false
        });
        
        this.version = pkg.version;

        this.props = {};
    },
    init: function () {

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('seed-angular2') + ' generator!'
    ));
  }
});

require('./src/options')(AngularGenerator);
require('./src/prompts')(AngularGenerator);
require('./src/paths')(AngularGenerator);
require('./src/files')(AngularGenerator);

require('./src/write')(AngularGenerator);

module.exports = AngularGenerator;
