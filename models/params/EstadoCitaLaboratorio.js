const mongoose = require('mongoose');

const estadoCitaLaboratorioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model(
  'EstadoCitaLaboratorio',
  estadoCitaLaboratorioSchema,
);
