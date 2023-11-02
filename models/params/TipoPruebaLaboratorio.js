const mongoose = require('mongoose');

const tipoPruebaLaboratorioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  recomendaciones: String,
  valorMinimo: Number,
  valorMaximo: Number,
  unidad: String,
});

module.exports = mongoose.model(
  'TipoPruebaLaboratorio',
  tipoPruebaLaboratorioSchema,
);
