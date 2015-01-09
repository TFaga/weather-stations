module.exports = function(User) {

	require('../../server/mixins/maxlimit')(User, 100);
	require('../../server/mixins/timestamps')(User);

  User.disableRemoteMethod('resetPassword', true);
  User.disableRemoteMethod('confirm', true);

  User.disableRemoteMethod('__create__accessTokens', false);
  User.disableRemoteMethod('__updateById__accessTokens', false);
  User.disableRemoteMethod('__updateById__roles', false);
};
