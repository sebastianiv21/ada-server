const mongoose = require('mongoose');

const generoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Genero', generoSchema);
