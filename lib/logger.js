'use strict';

var fs = require('fs'),
	filename = 'server.log',
	fileOptions = {
		flag: 'a'
	},
	logFile = 'server.log',
	formatStringStart = '\u001b[',
	formatStringEnd = 'm',
	colors = {
		reset: [0, 0],

		bold: [1, 22],
		dim: [2, 22],
		italic: [3, 23],
		underline: [4, 24],
		inverse: [7, 27],
		hidden: [8, 28],
		strikethrough: [9, 29],

		black: [30, 39],
		red: [31, 39],
		green: [32, 39],
		yellow: [33, 39],
		blue: [34, 39],
		magenta: [35, 39],
		cyan: [36, 39],
		white: [37, 39],
		gray: [90, 39],
		grey: [90, 39],

		bgBlack: [40, 49],
		bgRed: [41, 49],
		bgGreen: [42, 49],
		bgYellow: [43, 49],
		bgBlue: [44, 49],
		bgMagenta: [45, 49],
		bgCyan: [46, 49],
		bgWhite: [47, 49]
	},
	logger = {},

	setFormat = function setFormat(color) {
		return formatStringStart + color[0] + formatStringEnd;
	},
	resetFormat = function resetFormat() {
		return formatStringStart + colors.reset[0] + formatStringEnd;
	},
	writeToFile = function writeToFile(data) {
		var output = data + '\n\r';
		fs.writeFile(filename, output, fileOptions, function(err) {
			if(err) {
				console.log('Error writing log data to file. ', err);
			}
		});
	},
	formatLog = function formatLog(formats, message) {
		var output = '';

		formats.forEach(function(format) {
			output += setFormat(colors[format]);
		});
		output += message;
		output += resetFormat();

		return output;
	},
	writeMessage = function writeMessage(formats, message) {
		if(process.env['X_PRODUCTION'] === 'true') {
			writeToFile(message)
		} else {
			console.log(formatLog(formats, message));
		}
	};

logger.write = function write(message) {
	writeMessage([], message);
};

logger.error = function error(message) {
	writeMessage(['red', 'bold'], message);
};

logger.success = function error(message) {
	writeMessage(['green'], message);
};

logger.info = function error(message) {
	writeMessage(['blue', 'bold'], message);
};

logger.warn = function error(message) {
	writeMessage(['yellow', 'bold'], message);
};

module.exports = logger;