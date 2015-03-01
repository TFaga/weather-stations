module.exports = function(AccessToken) {

  AccessToken.validatesLengthOf('ttl', {max: 2419200, message: {max: 'is too big'}});
  AccessToken.validatesNumericalityOf('ttl', {int: true});
};
