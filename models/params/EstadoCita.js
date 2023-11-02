const mongoose = require('mongoose');

const estadoCitaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('EstadoCita', estadoCitaSchema);
