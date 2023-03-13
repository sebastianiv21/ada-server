const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  const logsDirPath = path.join(__dirname, '..', 'logs');

  try {
    if (!fs.existsSync(logsDirPath)) {
      await fsPromises.mkdir(logsDirPath);
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logFileName),
      logItem,
    );
  } catch (error) {
    console.error(error);
  }
};

const logger = (req, res, next) => {
  const { method, url, headers } = req;
  const logFileName = 'reqLog.log';

  logEvents(`${method}\t${url}\t${headers.origin}`, logFileName);

  console.log(`${method} ${req.path}`);

  next();
};

module.exports = { logEvents, logger };
