module.exports = function(RoleMapping) {

   RoleMapping.validatesUniquenessOf('roleId', {
     message: 'User already has the requested role',
     scopedTo: ['principalType', 'principalId']
   });
}
