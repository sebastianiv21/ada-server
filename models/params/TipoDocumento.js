const mongoose = require('mongoose');

const tipoDocumentoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('TipoDocumento', tipoDocumentoSchema);
