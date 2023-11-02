const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
  {
    // Informacion personal
    tipoDocumentoId: {
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
    generoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Genero',
    },
    tipoSangreId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'TipoSangre',
    },
    rhId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Rh',
    },
    estadoCivilId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EstadoCivil',
    },
    epsId: {
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
    municipioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Municipio',
    },
    // Información de la sesión
    rolId: {
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
    contactoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ContactoUsuario',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Usuario', usuarioSchema);