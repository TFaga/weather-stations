var winston = require('winston'),
    azureLogger = require('winston-azuretable').AzureLogger;

var logger = module.exports = winston.loggers.get('weather');

logger.remove(winston.transports.Console)
      .add(winston.transports.Console, { level: 'silly', colorize: true, handleExceptions: true });

if (process.env.NODE_ENV === 'production') {
  logger.add(azureLogger, {
    level: 'silly',
    tableName: process.env.AZURE_STORAGE_TABLE_NAME
  });
}

logger.exitOnError = false;

logger.extend(console);

var log = console.log;
console.log = function winstonLog(level) {
  if (arguments.length > 1 && level in this) {
    log.apply(this, arguments);
  } else {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('info');
    log.apply(this, args);
  }
};

console.info('Logger initiated');
