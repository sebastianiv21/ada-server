import { jsonResponse } from '#utils';
import getParam from '#services/paramsServices.js';

// parametros disponibles
import Rol from '#models/params/Rol.js';
import EstadoCitaLaboratorio from '#models/params/EstadoCitaLaboratorio.js';
import Genero from '#models/params/Genero.js';
import EstadoCivil from '#models/params/EstadoCivil.js';
import TipoSangre from '#models/params/TipoSangre.js';
import TipoDocumento from '#models/params/TipoDocumento.js';
import Rh from '#models/params/Rh.js';
import Eps from '#models/params/Eps.js';
import TipoPruebaLaboratorio from '#models/params/TipoPruebaLaboratorio.js';

const parametrosDisponibles = {
  Rol,
  EstadoCitaLaboratorio,
  Genero,
  EstadoCivil,
  TipoSangre,
  TipoDocumento,
  Rh,
  Eps,
  TipoPruebaLaboratorio,
};

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
    const modeloEncontrado = parametrosDisponibles[parametro];
    listaParametros[parametro] = await getParam(modeloEncontrado, skip, limit);
  });

  await Promise.all(promesas);

  return jsonResponse(res, listaParametros, 200);
};

export default getParams;
