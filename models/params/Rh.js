const mongoose = require('mongoose');

const rhSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Rh', rhSchema);
