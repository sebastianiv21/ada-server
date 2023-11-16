import { getPaginatedItems, jsonResponse } from '#utils';

import services from '#services/resultadoLaboratorioServices.js';

/**
 * @route GET /resultados-laboratorio
 * @desc Trae todos los resultados de laboratorio
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @query {Integer} skip - Número de registros a saltar
 * @query {Integer} limit - Número de registros a traer
 * @return {Object} - Response Object
 * @access Private
 */
const getResultadosLaboratorio = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  // obtiene los resultados de laboratorio paginados
  const resultadosLaboratorioResponse = await getPaginatedItems({
    page: Number(page),
    pageSize: Number(pageSize),
    findItems: services.findResultadosLaboratorio,
    countItems: services.countResultadosLaboratorio,
  });

  return jsonResponse(res, resultadosLaboratorioResponse, 200);
};

/**
 * @route GET /resultados-laboratorio/:id
 * @desc Trae un resultado de laboratorio por id
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {String} req.params.id - Id del resultado de laboratorio
 * @return {Object} - Response Object
 * @access Private
 */
const getResultadoLaboratorioPorId = async (req, res) => {
  const { id } = req.params;

  const resultadoLaboratorio = await services.findResultadoLaboratorioPorId(
    id.toString(),
  );

  if (!resultadoLaboratorio) {
    return jsonResponse(
      res,
      { message: 'No se encontró el resultado de laboratorio' },
      404,
    );
  }

  return jsonResponse(res, { resultadoLaboratorio }, 200);
};

/**
 * @route GET /resultados-laboratorio/mis-resultados
 * @desc Trae todos los resultados de laboratorio de un paciente
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 * @access Private
 */
const getMisResultadosLaboratorio = async (req, res) => {
  const { id } = req.id;
  const { page = 1, pageSize = 10 } = req.query;

  // obtiene los resultados de laboratorio paginados de un paciente autenticado
  const misResultadosLaboratorioResponse = await getPaginatedItems({
    page: Number(page),
    pageSize: Number(pageSize),
    findItems: services.findResultadosLaboratorio,
    countItems: services.countResultadosLaboratorio,
    filter: { paciente: id.toString() },
  });

  return jsonResponse(res, misResultadosLaboratorioResponse, 200);
};

/**
 * @route   POST /resultados-laboratorio/crear
 * @desc Crea un resultado de laboratorio
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 * @access Private
 */
const createResultadoLaboratorio = async (req, res) => {
  await services.createResultadoLaboratorio(req.body);

  return jsonResponse(
    res,
    { message: 'Resultado de laboratorio registrado exitosamente' },
    201,
  ); // 201 Created
};

/**
 * @route   PUT /resultados-laboratorio/:id
 * @desc Actualiza un resultado de laboratorio
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 * @access Private
 */
const updateResultadoLaboratorio = async (req, res) => {
  const { id } = req.params;

  const resultadoLaboratorio = { ...req.body };

  await services.updateResultadoLaboratorio(
    id.toString(),
    resultadoLaboratorio,
  );

  return jsonResponse(
    res,
    { message: 'Resultado de laboratorio actualizado exitosamente' },
    200,
  ); // 200 OK
};

/**
 * @route   DELETE /resultados-laboratorio/:id
 * @desc Elimina un resultado de laboratorio
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 * @access Private
 */
const deleteResultadoLaboratorio = async (req, res) => {
  const { id } = req.params;

  await services.deleteResultadoLaboratorio(id.toString());

  return jsonResponse(
    res,
    { message: 'Resultado de laboratorio eliminado exitosamente' },
    200,
  ); // 200 OK
};

export default {
  getResultadosLaboratorio,
  getMisResultadosLaboratorio,
  getResultadoLaboratorioPorId,
  createResultadoLaboratorio,
  updateResultadoLaboratorio,
  deleteResultadoLaboratorio,
};
