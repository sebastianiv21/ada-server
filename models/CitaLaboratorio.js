const mongoose = require('mongoose');

const citaLaboratorioSchema = new mongoose.Schema(
  {
    sedeLaboratorioId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'SedeLaboratorio',
    },
    estadoCitaLaboratorioId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'EstadoCitaLaboratorio',
    },
    ordenMedicaId: {
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
