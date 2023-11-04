import { model, Schema } from 'mongoose';

const epsSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model('Eps', epsSchema);
