#!/usr/bin/env node

var app = require('../server');

app.dataSources.db.autoupdate(['accessToken', 'acl', 'roleMapping', 'role', 'user'], function(err, result) {

	if (err) {
		console.log(err);
	}

	process.exit(0);
});

