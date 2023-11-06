import mongoose, { model, Schema } from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const Autoincrement = mongooseSequence(mongoose);

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

resultadoLaboratorioSchema.plugin(Autoincrement, {
  inc_field: 'codigoReferencia',
  id: 'resultadoLaboratorioNums',
  start_seq: 1000,
});

export default model('ResultadoLaboratorio', resultadoLaboratorioSchema);
