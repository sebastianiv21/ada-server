import { model, Schema } from 'mongoose';

const rolSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model('Rol', rolSchema);
