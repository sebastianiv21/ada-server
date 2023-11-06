import { model, Schema } from 'mongoose';

const ordenMedicaSchema = new Schema(
  {
    medico: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },
    paciente: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },
    tipoPruebaLaboratorio: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'TipoPruebaLaboratorio',
    },
  },
  {
    timestamps: true,
  },
);

export default model('OrdenMedica', ordenMedicaSchema);
