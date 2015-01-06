module.exports = function(User) {

	require('../../server/mixins/maxlimit')(User, 100);
	require('../../server/mixins/timestamps')(User);
};
