import { model, Schema } from 'mongoose';

const tipoSangreSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model('TipoSangre', tipoSangreSchema);
