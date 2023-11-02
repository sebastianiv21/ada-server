const mongoose = require('mongoose');

const estadoCivilSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('EstadoCivil', estadoCivilSchema);
