const mongoose = require('mongoose');

const contactoUsuarioSchema = new mongoose.Schema(
  {
    nombres: {
      type: String,
      required: true,
    },
    apellidos: {
      type: String,
      required: true,
    },
    parentesco: String,
    telefono: Number,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('ContactoUsuario', contactoUsuarioSchema);
