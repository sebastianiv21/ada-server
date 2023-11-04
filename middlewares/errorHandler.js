import { logEvents } from './logger.js';

const errorHandler = (err, req, res) => {
  // middleware que maneja los errores
  const { name, message, stack } = err;
  const { method, url, headers } = req;
  const logFileName = 'errorLog.log';

  logEvents(
    // registra el evento
    `${name}: ${message}\t${method}\t${url}\t${headers.origin}`, // mensaje
    logFileName, // nombre del archivo
  );

  console.error(stack); // muestra el error en consola

  const statusCode = res.statusCode ? res.statusCode : 500; // server error

  res.status(statusCode);

  res.json({ message, isError: true }); // envía el error al cliente
};

export default errorHandler;
