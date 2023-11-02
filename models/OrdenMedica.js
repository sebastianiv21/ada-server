const mongoose = require('mongoose');
const Autoincrement = require('mongoose-sequence')(mongoose);

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

ordenMedicaSchema.plugin(Autoincrement, {
  inc_field: 'numeroOrdenMedica',
  id: 'ordenMedicaNums',
  start_seq: 1000,
});

module.exports = mongoose.model('OrdenMedica', ordenMedicaSchema);
