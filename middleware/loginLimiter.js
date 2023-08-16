const rateLimit = require('express-rate-limit');
const { logEvents } = require('./logger');

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // ventana de 1 minuto
  max: 5, // empieza a bloquear despues de 5 intentos
  message: {
    message: 'Demasiados intentos, por favor intente de nuevo en un minuto',
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Demasiados intentos: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      'errLog.log',
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true, // retorna la informacion de rateLimit en los `RateLimit-*` headers
  legacyHeaders: false, // deshabilita los `X-RateLimit-*` headers descontinuados
});

module.exports = loginLimiter;
