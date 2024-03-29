'use strict';

var defaultEnvVariables = require('../config/env_vars.js'),
	validArguments = require('../config/args.js');

module.exports = {
	setDefaultValues: function setDefaultValues() {
		defaultEnvVariables.forEach(function(envVariable) {
			process.env[envVariable.name] = envVariable.defaultValue;
		});
		this.processArguments();
	},
	processArguments: function processArguments() {
		var _this = this,
			skipNext = false,
			previousArgument;

		process.argv.forEach(function(argument, index) {
			var definedArgument;
			if(index < 2) {
				return null;
			}

			if(!skipNext) {
				definedArgument = validArguments.filter(function(_argument) {
					return _argument.name === argument;
				});

				if(definedArgument.length === 0) {
					throw new Error('Invalid argument');
					return null;
				}

				if(definedArgument[0].skipNext) {
					skipNext = true;
					previousArgument = definedArgument[0];
				} else {
					_this.setValue(definedArgument[0].envVariable, definedArgument[0].defaultValue)
				}
			} else {
				skipNext = false;
				_this.setValue(previousArgument.envVariable, argument);
			}
		});
	},
	setValue: function setValue(variable, value) {
		process.env[variable] = value;
	},
	getValue: function getValue(variable) {
		var output = process.env[variable];
		if(!!output) {
			return output;
		}

		return !!output;
	}
};