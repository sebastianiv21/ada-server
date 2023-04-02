require('dotenv').config(); // Load .env file (if exists)
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

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json()); // Lets us use JSON

app.use(cookieParser()); // Lets us use cookies

app.use('/', require('./routes/root'));
app.use('/users', require('./routes/usersRoutes'));

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

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  const {
    no, code, syscall, hostname,
  } = err;

  const errorLogFileName = 'mongoErrLog.log';
  console.log('Error connecting to MongoDB', err);
  logEvents(`${no}: ${code}\t${syscall}\t${hostname}`, errorLogFileName);
});
