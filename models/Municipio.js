import { model, Schema } from 'mongoose';

const municipioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  departamentoId: {
    type: Schema.Types.ObjectId,
    ref: 'Departamento',
    required: true,
  },
});

export default model('Municipio', municipioSchema);
