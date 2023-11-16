import { getPaginatedItems, jsonResponse } from '#utils';

import services from '#services/ordenMedicaServices.js';

/**
 * @route GET /ordenes-medicas
 * @desc Trae todas las ordenes medicas
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @query {Integer} skip - Número de registros a saltar
 * @query {Integer} limit - Número de registros a traer
 * @return {Object} - Response Object
 * @access Private
 */
const getOrdenesMedicas = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  // obtiene las ordenes medicas paginadas
  const ordenesMedicasResponse = await getPaginatedItems({
    page: Number(page),
    pageSize: Number(pageSize),
    findItems: services.findOrdenesMedicas,
    countItems: services.countOrdenesMedicas,
  });

  return jsonResponse(res, ordenesMedicasResponse, 200);
};

/**
 * @route GET /ordenes-medicas/:id
 * @desc Trae una orden medica por id
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {String} req.params.id - Id de la orden medica
 * @return {Object} - Response Object
 * @access Private
 */
const getOrdenMedicaPorId = async (req, res) => {
  const { id } = req.params;

  const ordenMedica = await services.findOrdenMedicaPorId(id.toString());

  if (!ordenMedica) {
    return jsonResponse(
      res,
      { message: 'No se encontró la orden médica' },
      404,
    );
  }

  return jsonResponse(res, { ordenMedica }, 200);
};

/**
 * @route GET /ordenes-medicas/mis-ordenes
 * @desc Trae todas las ordenes medicas de un paciente
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 * @access Private
 */
const getMisOrdenesMedicas = async (req, res) => {
  const { id } = req.id;
  const { page = 1, pageSize = 10 } = req.query;

  // obtiene las ordenes medicas paginadas de un paciente autenticado
  const misOrdenesMedicasResponse = await getPaginatedItems({
    page: Number(page),
    pageSize: Number(pageSize),
    findItems: services.findOrdenesMedicas,
    countItems: services.countOrdenesMedicas,
    filter: { paciente: id.toString() },
  });

  return jsonResponse(res, misOrdenesMedicasResponse, 200);
};

/**
 * @route   POST /ordenes-medicas/crear
 * @desc Crea una orden medica
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 * @access Private
 */
const createOrdenMedica = async (req, res) => {
  await services.createOrdenMedica(req.body);

  return jsonResponse(
    res,
    { message: 'Orden médica creada exitosamente' },
    201,
  ); // 201 Created
};

/**
 * @route   PUT /ordenes-medicas/:id
 * @desc Actualiza una orden medica
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 * @access Private
 */
const updateOrdenMedica = async (req, res) => {
  const { id } = req.params;

  const ordenMedica = { ...req.body };

  await services.updateOrdenMedica(id.toString(), ordenMedica);

  return jsonResponse(
    res,
    { message: 'Orden médica actualizada exitosamente' },
    200,
  ); // 200 OK
};

/**
 * @route   DELETE /ordenes-medicas/:id
 * @desc Elimina una orden medica
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 * @access Private
 */
const deleteOrdenMedica = async (req, res) => {
  const { id } = req.params;

  await services.deleteOrdenMedica(id.toString());

  return jsonResponse(
    res,
    { message: 'Orden médica eliminada exitosamente' },
    200,
  ); // 200 OK
};

export default {
  getOrdenesMedicas,
  getOrdenMedicaPorId,
  getMisOrdenesMedicas,
  createOrdenMedica,
  updateOrdenMedica,
  deleteOrdenMedica,
};
