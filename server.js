import dontenv from 'dotenv';
import 'express-async-errors'; // nos permite usar async/await en los middlewares sin necesidad de usar try/catch
import express, { json } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import corsOptions from './config/corsOptions.js';
import { logEvents, logger } from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import connectDB from './config/dbConn.js';

// ROUTERS
import rootRouter from './routes/root.js';
// import authRouter from './routes/authRoutes.js';
// import usersRouter from './routes/usersRoutes.js';
// import placeRouter from './routes/placeRoutes.js';
import rolRouter from './routes/params/rolRoutes.js';

// Load environment variables
dontenv.config();
const PORT = process.env.PORT || 3500;
const app = express();

console.log('NODE_ENV:', process.env.NODE_ENV);

connectDB();

app.disable('x-powered-by');

app.use(logger); // middleware que registra los eventos
app.use(cors(corsOptions)); // nos permite usar CORS con las opciones configuradas
app.use(json()); // nos permite usar JSON
app.use(cookieParser()); // nos permite usar cookies

app.use('/', rootRouter);
// app.use('/auth', authRouter);
// app.use('/users', usersRouter);
// app.use('/places', placeRouter);
app.use('/roles', rolRouter);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 No encontrado' });
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
