module.exports = function(Station) {

	require('../../server/mixins/maxlimit')(Station, 100);

	Station.disableRemoteMethod('create', true);
	Station.disableRemoteMethod('deleteById', true);
	Station.disableRemoteMethod('upsert', true);
	Station.disableRemoteMethod('prototype.updateAttributes', true);
	Station.disableRemoteMethod('updateAll', true);

	Station.disableRemoteMethod('__create__measurements', false);
	Station.disableRemoteMethod('__delete__measurements', false);
	Station.disableRemoteMethod('__destroyById__measurements', false);
	Station.disableRemoteMethod('__updateById__measurements', false);

  Station.beforeRemote('prototype.__get__measurements', function(ctx, station, next) {

    if (!ctx.req.accessToken) {

      ctx.args.filter = ctx.args.filter || {};

      ctx.args.filter.limit = 1;
      ctx.args.filter.order = 'TIMES DESC'
    }

    next();
  });
};
