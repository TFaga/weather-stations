module.exports = function maxlimit(Model, limit) {

  Model.beforeRemote('prototype.*', function(ctx, model, next) {

    if (ctx.methodString.indexOf('__get__') > -1) {

      Model.maxLimit(ctx);
    }

    next();
  });

  Model.beforeRemote('find', function(ctx, model, next) {

    Model.maxLimit(ctx);

    next();
  });

  Model.maxLimit = function(ctx) {

    if (typeof ctx.args.filter == 'string') {
      try {
        ctx.args.filter = JSON.parse(ctx.args.filter);
      } catch(e) {}
    }

    if (ctx.args.filter) {

      if ((!ctx.args.filter.limit || ctx.args.filter.limit > limit) && typeof ctx.args.filter != 'string') {
        ctx.args.filter.limit = limit;
      }

    } else {
      ctx.args.filter = { limit: limit };
    }
  }
};
