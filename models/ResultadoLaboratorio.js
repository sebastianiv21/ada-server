const mongoose = require('mongoose');

const resultadoLaboratorioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    municipioId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Municipio',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  'ResultadoLaboratorio',
  resultadoLaboratorioSchema,
);
