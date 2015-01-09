module.exports = function validateReference(Model, property, relModel, msg) {

  var loopback = require('loopback');

  Model.validateAsync(property, function(err, done) {
    loopback.getModel(relModel).findById(this[property], function(error, res) {
      if (error || !res) err();
      done();
    });
  }, {message: msg, code: 'exist'});
};
