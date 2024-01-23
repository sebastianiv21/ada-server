import { model, Schema } from 'mongoose';

const tipoPruebaLaboratorioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  observaciones: String,
  valorReferencia: String,
  unidad: String,
});

export default model('TipoPruebaLaboratorio', tipoPruebaLaboratorioSchema);
