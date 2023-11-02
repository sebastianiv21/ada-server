const mongoose = require('mongoose');

const tipoSangreSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('TipoSangre', tipoSangreSchema);
