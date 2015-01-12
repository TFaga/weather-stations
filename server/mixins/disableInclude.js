module.exports = function disableInclude(Model) {

  Model.beforeRemote('**', function(ctx, station, next) {

    if (typeof ctx.args.filter == 'string') {
      try {
        ctx.args.filter = JSON.parse(ctx.args.filter);
      } catch(e) {}
    }

    if (ctx.args.filter && ctx.args.filter.include) {

      ctx.args.filter.include = undefined;
    }

    next();
  });
};
