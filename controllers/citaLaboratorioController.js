import { getPaginatedItems, jsonResponse } from '#utils';

import services from '#services/citaLaboratorioServices.js';

/**
 * @route GET /citas-laboratorio
 * @desc Trae todas las citas de laboratorio
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @query {Integer} skip - Número de registros a saltar
 * @query {Integer} limit - Número de registros a traer
 * @return {Object} - Response Object
 * @access Private
 */
const getCitasLaboratorio = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  // obtiene las citas de laboratorio paginadas
  const citasLaboratorioResponse = await getPaginatedItems({
    page: Number(page),
    pageSize: Number(pageSize),
    findItems: services.findCitassLaboratorio,
    countItems: services.countCitasLaboratorio,
  });

  return jsonResponse(res, citasLaboratorioResponse, 200);
};

/**
 * @route GET /citas-laboratorio/mis-citas
 * @desc Trae todas las citas de laboratorio de un paciente
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 * @access Private
 */
const getMisCitasLaboratorio = async (req, res) => {
  const { id } = req.id;
  const { page = 1, pageSize = 10 } = req.query;

  // obtiene las citas de laboratorio paginadas de un paciente autenticado
  const citasLaboratorioResponse = await getPaginatedItems({
    page: Number(page),
    pageSize: Number(pageSize),
    findItems: services.findCitassLaboratorio,
    countItems: services.countCitasLaboratorio,
    filter: { paciente: id.toString() },
  });

  return jsonResponse(res, citasLaboratorioResponse, 200);
};

/**
 * @route   POST /citas-laboratorio/crear
 * @desc Crea una cita de laboratorio
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 * @access Private
 */
const createCitaLaboratorio = async (req, res) => {
  await services.createCitaLaboratorio(req.body);

  return jsonResponse(
    res,
    { message: 'Cita de laboratorio creada exitosamente' },
    201,
  ); // 201 Created
};

/**
 * @route   PUT /citas-laboratorio/:id
 * @desc Actualiza una cita de laboratorio
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 * @access Private
 */
const updateCitaLaboratorio = async (req, res) => {
  const { id } = req.params;

  const citaLaboratorio = { ...req.body };

  await services.updateCitaLaboratorio(id.toString(), citaLaboratorio);

  return jsonResponse(
    res,
    { message: 'Cita de laboratorio actualizada exitosamente' },
    200,
  ); // 200 OK
};

/**
 * @route   DELETE /citas-laboratorio/:id
 * @desc Elimina una cita de laboratorio
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 * @access Private
 */
const deleteCitaLaboratorio = async (req, res) => {
  const { id } = req.params;

  await services.deleteCitaLaboratorio(id.toString());

  return jsonResponse(
    res,
    { message: 'Cita de laboratorio eliminada exitosamente' },
    200,
  ); // 200 OK
};

export default {
  getCitasLaboratorio,
  getMisCitasLaboratorio,
  createCitaLaboratorio,
  updateCitaLaboratorio,
  deleteCitaLaboratorio,
};
