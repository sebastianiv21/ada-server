const mongoose = require('mongoose');
const Autoincrement = require('mongoose-sequence')(mongoose);

const testSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      // i.e: 'Adenosina en sangre'
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'Solicitado', // 'Solicitado', 'Muestra recolectada', 'Procesado'
    },
    recommendations: String, // i.e: 'No comer 12 horas antes'
    referenceValues: String, // i.e: '0.5 - 1.5 mg/dL'
  },
  {
    timestamps: true, // Crea campos createdAt y updatedAt
  },
);

testSchema.plugin(Autoincrement, {
  inc_field: 'testRef',
  id: 'testNums',
  start_seq: 1000,
});

module.exports = mongoose.model('Test', testSchema);
