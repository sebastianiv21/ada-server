const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  idDepartamento: Number,
  departamento: String,
  idMunicipio: Number,
  municipio: String,
});

module.exports = mongoose.model('Place', placeSchema);
