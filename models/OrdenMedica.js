const mongoose = require('mongoose');

const ordenMedicaSchema = new mongoose.Schema(
  {
    medicoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },
    pacienteId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },
    tipoPruebaId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'TipoPrueba',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('OrdenMedica', ordenMedicaSchema);
