module.exports = function(Station) {

	Station.disableRemoteMethod('create', true);
	Station.disableRemoteMethod('deleteById', true);
	Station.disableRemoteMethod('upsert', true);
	Station.disableRemoteMethod('prototype.updateAttributes', true);
	Station.disableRemoteMethod('updateAll', true);
};
