module.exports = function(User) {

	require('../../server/mixins/maxlimit')(User, 100);
	require('../../server/mixins/timestamps')(User);

  User.disableRemoteMethod('resetPassword', true);
  User.disableRemoteMethod('confirm', true);

  User.disableRemoteMethod('__create__accessTokens', false);
  User.disableRemoteMethod('__updateById__accessTokens', false);
  User.disableRemoteMethod('__updateById__roles', false);

  User.validatesLengthOf('password', {min: 6, message: {min: 'is too short'}});
  User.validatesLengthOf('username', {min: 3, max: 20, message: {min: 'is too short', max: 'is too long'}});
  User.validatesLengthOf('firstname', {min: 3, max: 50, message: {min: 'is too short', max: 'is too long'}});
  User.validatesLengthOf('lastname', {min: 3, max: 50, message: {min: 'is too short', max: 'is too long'}});
};
