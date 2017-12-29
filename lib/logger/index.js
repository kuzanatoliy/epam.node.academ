const winston = require('winston');
const colors = require('colors');

const logger = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'somefile.log' })
  ]
});

logger.infoSend = str => logger.info(colors.yellow(str));
logger.infoConnect = str => logger.info(colors.blue(str));
logger.infoDisconnect = str => logger.info(colors.red(str));

module.exports = logger;
