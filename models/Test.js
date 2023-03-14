const mongoose = require('mongoose');
const Autoincrement = require('mongoose-sequence')(mongoose);

const testSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    result: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

testSchema.plugin(Autoincrement, {
  inc_field: 'testRef',
  id: 'testNums',
  start_seq: 1000,
});

module.exports = mongoose.model('Test', testSchema);
