module.exports = function timestamps(Model) {

  Model.defineProperty('created', { type: 'date' });
  Model.defineProperty('modified', { type: 'date' });

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
    data.modified = new Date();
    if (creation) data.created = data.modified;
  };

  Model.removeCreatedProperty = function(ctx, model, next) {
    var body = ctx.req.body;
    if (body && body.created) {
      delete body.created;
    }
    next();
  };

  Model.beforeRemote('upsert', Model.removeCreatedProperty);
  Model.beforeRemote('updateAll', Model.removeCreatedProperty);
  Model.beforeRemote('prototype.updateAttributes', Model.removeCreatedProperty);
};
