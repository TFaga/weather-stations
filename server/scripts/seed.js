#!/usr/bin/env node

var app = require('../server'),
	loopback = require('loopback'),
	User = loopback.getModel('user'),
	Role = loopback.getModel('role');

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

		process.exit(0);
	}
);

