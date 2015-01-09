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

  Model.setter.created = function(created) {
    if (this.isNewRecord())
      this.$created = created;
  };

  Model.applyTimestamps = function(data, creation) {
    data.modified = new Date();
    if (creation) data.created = data.modified;
  };
};
