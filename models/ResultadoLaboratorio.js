import { model, Schema } from 'mongoose';

const resultadoLaboratorioSchema = new Schema(
  {
    citaLaboratorio: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'CitaLaboratorio',
    },
    resultado: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model('ResultadoLaboratorio', resultadoLaboratorioSchema);
