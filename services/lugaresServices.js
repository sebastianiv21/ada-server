import Departamento from '#models/Departamento.js';
import Municipio from '#models/Municipio.js';

const getDepartamentos = async (skip = 0, limit = 0) => {
  const departamentos = await Departamento.find().skip(skip).limit(limit);
  return departamentos;
};

const getMunicipiosPorDepartamentoId = async (
  departamentoId,
  skip = 0,
  limit = 0,
) => {
  const municipios = await Municipio.find().skip(skip).limit(limit);
  return municipios;
};

const createDepartamento = async (nombreDepartamento) => {
  const departamento = {
    nombre: nombreDepartamento,
  };

  const nuevoDepartamento = await Departamento.create(departamento);
  return nuevoDepartamento;
};

export default {
  getDepartamentos,
  getMunicipiosPorDepartamentoId,
  createDepartamento,
};
