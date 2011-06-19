JSHINT.module('utils', function () {
  var Report = function () {
    this.success  = true;
    this.warnings = [];
    this.errors   = [];
    this.fatals   = [];
    this.globals  = [];
    this.implieds = [];
  };

  Report.prototype = {
    warn: function (message, line) {
      this.warnings.push({
        message: message,
        line:    line
      });
    },

    error: function (message, line) {
      this.success = false;
      this.errors.push({
        message: message,
        line:    line
      });
    },

    panic: function (message, line) {
      this.success = false;
      this.fatals.push({
        message: message,
        line:    line
      });
    },

    addGlobal: function (name, line) {
      this.globals.push({
        name: name,
        line: line
      });
    },

    addImplied: function (name, line) {
      this.implieds.push({
        name: name,
        line: line
      });
    }
  };

  return {
    Report: Report
  };
});