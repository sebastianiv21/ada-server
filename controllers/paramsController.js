import { jsonResponse } from '#utils';
import services from '#services/paramsServices.js';

/**
 * Obtiene los parametros disponibles
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Object} Response
 */
const getParams = async (req, res) => {
  const { skip, limit, parametrosQuery } = req.query;

  const arrayParametros = parametrosQuery.split(',');

  // valida que los parametros sean validos
  if (!parametrosQuery || !Array.isArray(arrayParametros)) {
    return jsonResponse(res, { message: 'Parámetros no válidos' }, 400);
  }

  // construye el objeto con los parametros
  const listaParametros = {};

  const promesas = arrayParametros.map(async (parametro) => {
    listaParametros[parametro] = await services.getParam(
      parametro,
      skip,
      limit,
    );
  });

  await Promise.all(promesas);

  return jsonResponse(res, listaParametros, 200);
};

/**
 * Obtiene el id de un parametro por su nombre
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Object} Response
 */
const getParamIdPorNombre = async (req, res) => {
  const { parametro } = req.params;
  const { nombre } = req.query;

  // valida que los parametros sean validos
  if (!parametro || !nombre) {
    return jsonResponse(res, { message: 'Parámetros no válidos' }, 400);
  }

  const idParam = await services.getParamIdPorNombre(parametro, nombre);

  return jsonResponse(res, idParam, 200);
};

export default { getParams, getParamIdPorNombre };
