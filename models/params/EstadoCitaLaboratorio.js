import { model, Schema } from 'mongoose';

const estadoCitaLaboratorioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model('EstadoCitaLaboratorio', estadoCitaLaboratorioSchema);
