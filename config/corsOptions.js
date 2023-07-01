/**
 * Configuración de CORS
 * Permite peticiones de la lista de allowedOrigins
 * o de  sin origin (!origin) (peticiones desde Postman)
 */

const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // para que funcione con cookies (token)
  optionsSuccessStatus: 200, // algunos navegadores (Chrome) requieren status 200
};

module.exports = corsOptions;
