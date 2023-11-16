import { getPaginatedItems, jsonResponse } from '#utils';

import services from '#services/sedeLaboratorioServices.js';

/**
 * @route GET /sedes-laboratorios
 * @desc Trae todas las sedes de laboratorio
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @query {Integer} skip - Número de registros a saltar
 * @query {Integer} limit - Número de registros a traer
 * @return {Object} - Response Object
 * @access Private
 */
const getSedesLaboratorio = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  // obtiene las sedes de laboratorio paginadas
  const sedesLaboratorioResponse = await getPaginatedItems({
    page: Number(page),
    pageSize: Number(pageSize),
    findItems: services.findSedesLaboratorio,
    countItems: services.countSedesLaboratorio,
  });

  return jsonResponse(res, sedesLaboratorioResponse, 200);
};

/**
 * @route   POST /sedes-laboratorios/crear
 * @desc Crea una orden medica
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 * @access Private
 */
const createSedeLaboratorio = async (req, res) => {
  await services.createSedeLaboratorio(req.body);

  return jsonResponse(
    res,
    { message: 'Sede de laboratorio creada exitosamente' },
    201,
  ); // 201 Created
};

/**
 * @route   PUT /sedes-laboratorios/:id
 * @desc Actualiza una sede de laboratorio
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 * @access Private
 */
const updateSedeLaboratorio = async (req, res) => {
  const { id } = req.params;

  const sedeLaboratorio = { ...req.body };

  await services.updateSedeLaboratorio(id.toString(), sedeLaboratorio);

  return jsonResponse(
    res,
    { message: 'Sede de laboratorio actualizada exitosamente' },
    200,
  ); // 200 OK
};

/**
 * @route   DELETE /sedes-laboratorios/:id
 * @desc Elimina una sede de laboratorio
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 * @access Private
 */
const deleteSedeLaboratorio = async (req, res) => {
  const { id } = req.params;

  await services.deleteSedeLaboratorio(id.toString());

  return jsonResponse(
    res,
    { message: 'Sede de laboratorio eliminada exitosamente' },
    200,
  ); // 200 OK
};

export default {
  getSedesLaboratorio,
  createSedeLaboratorio,
  updateSedeLaboratorio,
  deleteSedeLaboratorio,
};
