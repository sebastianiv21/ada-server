const mongoose = require('mongoose');

const citaLaboratorioSchema = new mongoose.Schema(
  {
    sedeLaboratorio: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'SedeLaboratorio',
    },
    estadoCitaLaboratorio: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'EstadoCitaLaboratorio',
    },
    ordenMedica: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'OrdenMedica',
    },
    fecha: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('CitaLaboratorio', citaLaboratorioSchema);
