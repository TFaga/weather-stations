module.exports = function(Role) {

  Role.disableRemoteMethod('create', true);
  Role.disableRemoteMethod('deleteById', true);
  Role.disableRemoteMethod('upsert', true);
  Role.disableRemoteMethod('prototype.updateAttributes', true);
  Role.disableRemoteMethod('updateAll', true);

  Role.disableRemoteMethod('__updateById__principals', false);

  Role.validatesLengthOf('name', {max: 20, message: {max: 'is too long'}});
  Role.validatesLengthOf('description', {max: 255, message: {max: 'is too long'}});
}
