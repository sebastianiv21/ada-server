import mongoose, { model, Schema } from 'mongoose';
import Inc from 'mongoose-sequence';

const Autoincrement = Inc(mongoose);

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
      ref: 'tipoPruebaLaboratorio',
    },
  },
  {
    timestamps: true,
  },
);

ordenMedicaSchema.plugin(Autoincrement, {
  inc_field: 'codigoReferencia',
  id: 'ordenMedicaNums',
  start_seq: 1000,
});

export default model('OrdenMedica', ordenMedicaSchema);
