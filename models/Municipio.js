const mongoose = require('mongoose');

const municipioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  departamentoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Departamento',
    required: true,
  },
});

module.exports = mongoose.model('Municipio', municipioSchema);
