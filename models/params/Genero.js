import { model, Schema } from 'mongoose';

const generoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model('Genero', generoSchema);
