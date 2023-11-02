const mongoose = require('mongoose');
const Autoincrement = require('mongoose-sequence')(mongoose);

const ordenMedicaSchema = new mongoose.Schema(
  {
    medico: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },
    tipoPrueba: {
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
  inc_field: 'codigoReferencia',
  id: 'ordenMedicaNums',
  start_seq: 1000,
});

module.exports = mongoose.model('OrdenMedica', ordenMedicaSchema);
