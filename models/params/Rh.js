import { model, Schema } from 'mongoose';

const rhSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model('Rh', rhSchema);
