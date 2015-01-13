var loopback = require('loopback'),
    boot = require('loopback-boot'),
    expressWinston = require('express-winston'),
    logger = require('./logger');

console.info('Starting the application');

// Load the application
var app = module.exports = loopback();

app.use(expressWinston.logger({
  meta: app.get('env') === 'production' ? true : false,
  winstonInstance: logger,
  msg: 'HTTP {{req.method}} {{req.originalUrl}} {{res.statusCode}} {{res.responseTime}}ms',
  colorStatus: true
}));

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);

app.start = function() {
  // start the web server
  return app.listen(process.env.PORT || 3000, function() {
    app.emit('started');
    console.info('Application started');
    console.info('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module || process.env.NODE_ENV === 'production') {
  app.start();
}
