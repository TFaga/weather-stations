module.exports = function maxlimit(Model, limit) {

  Model.beforeRemote('prototype.*', function(ctx, model, next) {

    if (ctx.methodString.indexOf('__get__') > -1) {

      if (ctx.args.filter) {

        if (!ctx.args.filter.limit || ctx.args.filter.limit > limit) {
          ctx.args.filter.limit = limit;
        }

      } else {
        ctx.args.filter = { limit: limit };
      }
    }

    next();
  });

  Model.beforeRemote('find', function(ctx, model, next) {

    if (ctx.args.filter) {

      if (!ctx.args.filter.limit || ctx.args.filter.limit > limit) {
        ctx.args.filter.limit = limit;
      }

    } else {
      ctx.args.filter = { limit: limit };
    }

    next();
  });
};
