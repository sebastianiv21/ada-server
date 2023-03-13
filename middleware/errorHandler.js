const { logEvents } = require('./logger');

const errorHandler = (err, req, res) => {
  const { name, message, stack } = err;
  const { method, url, headers } = req;
  const logFileName = 'errorLog.log';

  logEvents(
    `${name}: ${message}\t${method}\t${url}\t${headers.origin}`,
    logFileName,
  );

  console.error(stack);

  const statusCode = res.statusCode ? res.statusCode : 500; // server error
  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
