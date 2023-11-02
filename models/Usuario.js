const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
  {
    // Informacion personal
    tipoDocumento: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'TipoDocumento',
    },
    numeroDocumento: {
      type: String,
      required: true,
      unique: true,
    },
    nombres: {
      type: String,
      required: true,
    },
    apellidos: {
      type: String,
      required: true,
    },
    // Informacion general
    fechaNacimiento: {
      type: Date,
      required: true,
    },
    genero: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Genero',
    },
    tipoSangre: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'TipoSangre',
    },
    rh: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Rh',
    },
    estadoCivil: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EstadoCivil',
    },
    eps: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Eps',
    },
    // Datos de localizacion
    telefono: {
      type: Number,
      required: true,
    },
    telefono2: Number,
    direccion: String,
    municipio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Municipio',
    },
    // Información de la sesión
    rol: {
      // Roles de usuario (paciente, médico, administrador o empleado)
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Rol',
    },
    activo: {
      type: Boolean,
      default: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    clave: {
      type: String,
      required: true,
    },
    // Información de contacto
    contacto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ContactoUsuario',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Usuario', usuarioSchema);
