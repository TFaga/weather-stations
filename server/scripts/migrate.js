#!/usr/bin/env node

var app = require('../server');

app.dataSources.db.autoupdate(null, function(err, result) {

	if (err) {
		console.log(err);
	}

	process.exit(0);
});

