var parseJS = require('./parse-js.js');
require('./utils.js');

var JSHINT = (function (undefined) {
  "use strict";

  function extractTokens(source) {
    var token  = JSHINT.tokenizer(source);
    var tokens = [];

    do {
      tokens.push(token());
    } while (token.type != 'eof');
  }

  function lint(source, options, globals) {
    var report = new Report();
    var tokens;

    try {
      tokens = extractTokens();
    } catch (parseError) {
      report.panic(parseError.message, parseError.line);
    }

    return report;
  }

  function module(namespace, module) {
    if (JSHINT[namespace] === undefined)
      JSHINT[namespace] = {};

    for (var key in module) {
      if (module.hasOwnProperty(key))
        JSHINT[namespace][key] = JSHINT[namespace][key]();
    }
  }

  return {
    module: module,
    line:   lint
  };
}());

JSHINT.tokenizer = parseJS.tokenizer;
exports.JSHINT = JSHINT;