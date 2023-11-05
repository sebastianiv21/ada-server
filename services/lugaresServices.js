import { Schema } from 'mongoose';
import Departamento from '#models/Departamento.js';
import Municipio from '#models/Municipio.js';

/**
 * @route   GET /lugares/departamentos
 * @description Trae todos los departamentos
 * @param {number} skip
 * @param {number} limit
 * @returns {Promise<Departamento[]>}
 */
const getDepartamentos = async (skip = 0, limit = 0) => {
  const departamentos = await Departamento.find()
    .skip(skip)
    .limit(limit)
    .lean();

  return departamentos;
};

/**
 * @route   GET /lugares/municipios/:departamentoId
 * @description Trae los municipios de un departamento por su id
 * @param {string} departamentoId
 * @param {number} skip
 * @param {number} limit
 * @returns {Promise<Departamento[]>}
 */
const getMunicipiosPorDepartamentoId = async (
  departamentoId,
  skip = 0,
  limit = 0,
) => {
  const municipios = await Municipio.find({
    departamento: departamentoId,
  })
    // excluye el campo departamento en la salida
    .select('-departamento')
    // ordena de forma ascendente por el campo nombre
    .sort({ nombre: 1 })
    // para paginar los resultados
    .skip(skip)
    .limit(limit)
    // para traer solo el json y no incluir otra información
    .lean()
    // se debe usar exec() cuando se pasan argumentos al metodo find()
    .exec();

  return municipios;
};

const createDepartamento = async (nombreDepartamento) => {
  const departamento = {
    nombre: nombreDepartamento,
  };

  const nuevoDepartamento = await Departamento.create(departamento);

  return nuevoDepartamento;
};

const createMunicipio = async (nombreMunicipio, departamentoId) => {
  const municipio = {
    nombre: nombreMunicipio,
    departamento: Schema.Types.ObjectId(departamentoId),
  };

  const nuevoDepartamento = await Departamento.create(municipio);

  return nuevoDepartamento;
};

export default {
  getDepartamentos,
  getMunicipiosPorDepartamentoId,
  createDepartamento,
  createMunicipio,
};
