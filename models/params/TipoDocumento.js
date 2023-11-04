import { model, Schema } from 'mongoose';

const tipoDocumentoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model('TipoDocumento', tipoDocumentoSchema);
