import { model, Schema } from 'mongoose';

const contactoUsuarioSchema = new Schema(
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

export default model('ContactoUsuario', contactoUsuarioSchema);
