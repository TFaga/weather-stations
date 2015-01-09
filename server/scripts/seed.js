#!/usr/bin/env node

var app = require('../server'),
	loopback = require('loopback'),
	User = loopback.getModel('user'),
	Role = loopback.getModel('role'),
  RoleMapping = loopback.getModel('roleMapping');

User.findOrCreate(
	{where: {email: 'tilen.faganel@me.com' }},
	{
		username: 'faga',
		firstname: 'Tilen',
		lastname: 'Faganel',
		email: 'tilen.faganel@me.com',
		password: '123456'
	},
	function(err, user) {
		if(err) throw err;

		console.log('Created user: ', user.username);

    Role.findOrCreate(
      {where: {name: 'admin'}},
      {
        name: 'admin',
        description: 'Administrator'
      }, function(err, role) {
        if (err) throw err;

        console.log('Created role: ', role.name);

        role.principals(
          {
            where: {
              principalType: RoleMapping.USER,
              principalId: user.id
            }
          },
          function(err, principals) {
            if(err) throw err;

            if (principals.length === 0) {
              role.principals.create(
                {
                  principalType: RoleMapping.USER,
                  principalId: user.id
                }, function(err, principal) {
                  if(err) throw err;

                  process.exit(0);
                }
              );
            } else {
              process.exit(0);
            }
          }
        );
      }
    );
  }
);

