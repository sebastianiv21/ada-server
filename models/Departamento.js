const mongoose = require('mongoose');

const departamentoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Departamento', departamentoSchema);
