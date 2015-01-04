module.exports = function(Measurement) {

	Measurement.disableRemoteMethod('create', true);
	Measurement.disableRemoteMethod('deleteById', true);
	Measurement.disableRemoteMethod('upsert', true);
	Measurement.disableRemoteMethod('prototype.updateAttributes', true);
	Measurement.disableRemoteMethod('updateAll', true);
};
