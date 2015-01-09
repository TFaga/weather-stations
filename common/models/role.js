module.exports = function(Role) {

  Role.disableRemoteMethod('create', true);
  Role.disableRemoteMethod('deleteById', true);
  Role.disableRemoteMethod('upsert', true);
  Role.disableRemoteMethod('prototype.updateAttributes', true);
  Role.disableRemoteMethod('updateAll', true);

  Role.disableRemoteMethod('__updateById__principals', false);
}
