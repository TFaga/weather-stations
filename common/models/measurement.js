module.exports = function(Measurement) {

	require('../../server/mixins/maxlimit')(Measurement, 100);
  require('../../server/mixins/disableInclude')(Measurement);

	Measurement.disableRemoteMethod('create', true);
	Measurement.disableRemoteMethod('deleteById', true);
	Measurement.disableRemoteMethod('upsert', true);
	Measurement.disableRemoteMethod('prototype.updateAttributes', true);
	Measurement.disableRemoteMethod('updateAll', true);
};
