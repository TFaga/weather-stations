module.exports = function(Station) {

	require('../../server/mixins/maxlimit')(Station, 100);
  require('../../server/mixins/disableInclude')(Station);

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

      if (typeof ctx.args.filter == 'string') { // jshint ignore:line
        try {
          ctx.args.filter = JSON.parse(ctx.args.filter);
        } catch(e) {}
      }

      ctx.args.filter = ctx.args.filter || {};

      ctx.args.filter.limit = 1;
      ctx.args.filter.order = 'TIMES DESC'
    }

    next();
  });
};
