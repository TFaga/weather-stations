#!/usr/bin/env node

var app = require('../server');

app.dataSources.db.automigrate(function(err, result) {

	if (err) {
		console.log(err);
	}

	process.exit(0);
});

