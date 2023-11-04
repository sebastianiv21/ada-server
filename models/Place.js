import { model, Schema } from 'mongoose';

const placeSchema = new Schema({
  idDepartamento: Number,
  departamento: String,
  idMunicipio: Number,
  municipio: String,
});

export default model('Place', placeSchema);
