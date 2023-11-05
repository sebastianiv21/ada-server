import 'express-async-errors'; // nos permite usar async/await en los middlewares sin necesidad de usar try/catch
import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import corsOptions from '#config/corsOptions.js';
import { logEvents, logger } from '#middlewares/logger.js';
import errorHandler from '#middlewares/errorHandler.js';
import connectDB from '#config/dbConn.js';

// ROUTERS
import rootRouter from '#routes/root.js';
import paramsRouter from '#routes/paramsRoutes.js';
import lugaresRouter from '#routes/lugaresRoutes.js';
import usuariosRouter from '#routes/usuarioRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const PORT = process.env.PORT || 3500;
const app = express();

console.log('NODE_ENV:', process.env.NODE_ENV);

connectDB();

app.disable('x-powered-by');

app.use(logger); // middleware que registra los eventos
app.use(cors(corsOptions)); // nos permite usar CORS con las opciones configuradas
app.use(json()); // nos permite usar JSON
app.use(cookieParser()); // nos permite usar cookies

// ROUTES
app.use('/', rootRouter);
app.use('/parametros', paramsRouter);
app.use('/lugares', lugaresRouter);
app.use('/usuarios', usuariosRouter);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('json')) {
    res.json({ message: '404 No encontrado' });
  } else if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else {
    res.type('txt').send('404 No encontrado');
  }
});

app.use(errorHandler); // middleware que maneja los errores

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  const { no, code, syscall, hostname } = err;

  const errorLogFileName = 'mongoErrLog.log';
  console.log('Error connecting to MongoDB', err);
  logEvents(`${no}: ${code}\t${syscall}\t${hostname}`, errorLogFileName);
});
