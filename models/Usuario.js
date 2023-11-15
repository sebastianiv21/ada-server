import { model, Schema } from 'mongoose';

const usuarioSchema = new Schema(
  {
    // Informacion personal
    tipoDocumento: {
      type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Genero',
    },
    tipoSangre: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'TipoSangre',
    },
    rh: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Rh',
    },
    estadoCivil: {
      type: Schema.Types.ObjectId,
      ref: 'EstadoCivil',
    },
    eps: {
      type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
      ref: 'Municipio',
    },
    // Información de la sesión
    rol: {
      // Roles de usuario (paciente, médico, administrador o empleado)
      type: Schema.Types.ObjectId,
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
      nombres: String,
      apellidos: String,
      parentesco: String,
      telefono: Number,
    },
  },
  {
    timestamps: true,
  },
);

export default model('Usuario', usuarioSchema);
