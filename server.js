const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3500;
const app = express();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json()); // Lets us use JSON

app.use(cookieParser()); // Lets us use cookies

app.use('/', require('./routes/root'));

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

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
