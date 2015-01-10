module.exports = function(RoleMapping) {

  RoleMapping.validateReference = require('../../server/mixins/validateReference');

  RoleMapping.validateReference(RoleMapping, {
    property: 'roleId',
    relModel: 'role',
    message: 'doesn\'t exist'
  });
  RoleMapping.validateReference(RoleMapping, {
    property: 'principalId',
    relModel: 'user',
    message: 'doesn\'t exist'
  });
  RoleMapping.validatesUniquenessOf('roleId', {
    message: 'User already has the requested role',
    scopedTo: ['principalType', 'principalId']
  });
  RoleMapping.validatesInclusionOf('principalType', {
    in: [RoleMapping.USER], message: 'is not allowed'
  });
}
