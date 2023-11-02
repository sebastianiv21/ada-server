const mongoose = require('mongoose');

const sedeLaboratorioSchema = new mongoose.Schema(
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

module.exports = mongoose.model('SedeLaboratorio', sedeLaboratorioSchema);
