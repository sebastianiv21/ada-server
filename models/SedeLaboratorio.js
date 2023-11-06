import { model, Schema } from 'mongoose';

const sedeLaboratorioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    municipio: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Municipio',
    },
  },
  {
    timestamps: true,
  },
);

export default model('SedeLaboratorio', sedeLaboratorioSchema);
