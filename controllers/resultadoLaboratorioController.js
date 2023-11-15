import { jsonResponse } from '#utils';

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
  const { skip, limit } = req.query;

  const resultadosLaboratorio = await services.findResultadosLaboratorio(
    Number(skip),
    Number(limit),
  );

  if (!resultadosLaboratorio?.length) {
    return jsonResponse(
      res,
      {
        message: 'No se encontraron resultados de laboratorio',
        resultadosLaboratorio,
      },
      200,
    );
  }

  return jsonResponse(res, { resultadosLaboratorio }, 200);
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
  const { skip, limit } = req.query;

  const resultadosLaboratorio =
    await services.findResultadosLaboratorioPorIdPaciente(
      id.toString(),
      Number(skip),
      Number(limit),
    );

  if (!resultadosLaboratorio?.length) {
    return jsonResponse(
      res,
      {
        message: 'No se encontraron resultados de laboratorio',
        resultadosLaboratorio,
      },
      200,
    );
  }

  return jsonResponse(res, { resultadosLaboratorio }, 200);
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
  createResultadoLaboratorio,
  updateResultadoLaboratorio,
  deleteResultadoLaboratorio,
};
