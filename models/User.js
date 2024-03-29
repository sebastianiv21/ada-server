import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    // Informacion personal
    idType: {
      type: String,
      required: true,
    },
    idNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    // Informacion general
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    bloodType: {
      type: String,
      required: true,
    },
    rh: {
      type: String,
      required: true,
    },
    maritalStatus: String,
    eps: {
      type: String,
      required: true,
    },
    // Datos de localizacion
    personalPhone: {
      type: Number,
      required: true,
    },
    personalPhone2: Number,
    address: String,
    city: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    // Información de la sesión
    roles:
      // Roles de usuario (paciente, médico, administrador o personal clínico)
      {
        type: [Number],
        required: true,
      },

    active: {
      type: Boolean,
      default: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Información de contacto
    contactName: String,
    contactLastname: String,
    contactRelationship: String,
    contactPhone: Number,
  },
  {
    timestamps: true,
  },
);

export default model('User', userSchema);
