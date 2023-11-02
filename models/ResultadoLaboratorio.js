const mongoose = require('mongoose');
const Autoincrement = require('mongoose-sequence')(mongoose);

const resultadoLaboratorioSchema = new mongoose.Schema(
  {
    citaLaboratorioId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'CitaLaboratorio',
    },
    resultado: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

resultadoLaboratorioSchema.plugin(Autoincrement, {
  inc_field: 'codigoReferencia',
  id: 'resultadoLaboratorioNums',
  start_seq: 1000,
});

module.exports = mongoose.model(
  'ResultadoLaboratorio',
  resultadoLaboratorioSchema,
);
