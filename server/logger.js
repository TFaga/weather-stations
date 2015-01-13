var winston = require('winston');

var logger = module.exports = winston.loggers.get('weather');

logger.remove(winston.transports.Console)
      .add(winston.transports.Console, { level: 'silly', colorize: true });

logger.extend(console);

var log = console.log;
console.log = function hijacked_log(level) {
  if (arguments.length > 1 && level in this) {
    log.apply(this, arguments);
  } else {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('info');
    log.apply(this, args);
  }
}

console.info('Logger initiated');
