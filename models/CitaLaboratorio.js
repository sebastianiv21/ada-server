import { model, Schema } from 'mongoose';

const citaLaboratorioSchema = new Schema(
  {
    sedeLaboratorio: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'SedeLaboratorio',
    },
    estadoCitaLaboratorio: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'EstadoCitaLaboratorio',
    },
    ordenMedica: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'OrdenMedica',
    },
    fecha: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model('CitaLaboratorio', citaLaboratorioSchema);
