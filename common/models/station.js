module.exports = function(Station) {

	Station.disableRemoteMethod('create', true);
	Station.disableRemoteMethod('deleteById', true);
	Station.disableRemoteMethod('upsert', true);
	Station.disableRemoteMethod('prototype.updateAttributes', true);
	Station.disableRemoteMethod('updateAll', true);

  	Station.disableRemoteMethod('__create__measurements', false);
  	Station.disableRemoteMethod('__delete__measurements', false);
  	Station.disableRemoteMethod('__destroyById__measurements', false);
  	Station.disableRemoteMethod('__updateById__measurements', false);
};
