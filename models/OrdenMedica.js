import mongoose, { model, Schema } from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const Autoincrement = mongooseSequence(mongoose);

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
    tipoPrueba: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'TipoPrueba',
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
