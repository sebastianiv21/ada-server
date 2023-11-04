import { model, Schema } from 'mongoose';

const estadoCivilSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model('EstadoCivil', estadoCivilSchema);
