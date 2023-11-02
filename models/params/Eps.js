const mongoose = require('mongoose');

const epsSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Eps', epsSchema);
