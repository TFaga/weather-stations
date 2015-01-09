module.exports = function(RoleMapping) {

  RoleMapping.validateReference = require('../../server/mixins/validateReference');

  RoleMapping.validateReference(RoleMapping, 'roleId', 'role', 'doesn\'t exist');
  RoleMapping.validateReference(RoleMapping, 'principalId', 'user', 'doesn\'t exist');
  RoleMapping.validatesUniquenessOf('roleId', {
    message: 'User already has the requested role',
    scopedTo: ['principalType', 'principalId']
  });
  RoleMapping.validatesInclusionOf('principalType', {
    in: [RoleMapping.USER], message: 'is not allowed'
  });
}
