import { model, Schema } from 'mongoose';

const departamentoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model('Departamento', departamentoSchema);
