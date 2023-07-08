const mongoose = require('mongoose');

// Esquema de una sede de laboratorio
const labSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: Number,
  department: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Lab', labSchema);
