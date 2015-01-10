module.exports = function validateReference(Model, options) {

  var loopback = require('loopback');

  Model.validateAsync(options.property, function(err, done) {
    loopback.getModel(options.relModel).findById(this[options.property], function(error, res) {
      if (error || !res) err();
      done();
    });
  }, {message: options.message, code: 'exist'});
};
