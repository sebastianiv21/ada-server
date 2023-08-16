require('dotenv').config(); // Load .env file (if exists)
require('express-async-errors'); // nos permite usar async/await en los middlewares sin necesidad de usar try/catch
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const corsOptions = require('./config/corsOptions');
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3500;
const app = express();

console.log('NODE_ENV:', process.env.NODE_ENV);

connectDB();

app.disable('x-powered-by');

app.use(logger); // middleware que registra los eventos
app.use(cors(corsOptions)); // nos permite usar CORS con las opciones configuradas
app.use(express.json()); // nos permite usar JSON
app.use(cookieParser()); // nos permite usar cookies

app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/users', require('./routes/usersRoutes'));
app.use('/places', require('./routes/placeRoutes'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
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
