module.exports = function timestamps(Model) {

  Model.defineProperty('createdAt', { type: 'date' });
  Model.defineProperty('updatedAt', { type: 'date' });

  var originalBeforeSave = Model.beforeSave;
  Model.beforeSave = function(next, data) {
    Model.applyTimestamps(data, this.isNewRecord());
    if (originalBeforeSave) {
        originalBeforeSave.apply(this, arguments);
    } else {
        next();
    }
  };

  Model.applyTimestamps = function(data, creation) {
    data.updatedAt = new Date();
    if (creation) data.createdAt = data.updatedAt;
  };

  Model.removeCreatedProperty = function(ctx, model, next) {
    var body = ctx.req.body;
    if (body && body.createdAt) {
      delete body.createdAt;
    }
    next();
  }

  Model.beforeRemote('upsert', Model.removeCreatedProperty);
  Model.beforeRemote('updateAll', Model.removeCreatedProperty);
  Model.beforeRemote('prototype.updateAttributes', Model.removeCreatedProperty);
};
