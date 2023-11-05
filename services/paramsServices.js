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
 * @desc Obtiene la lista de opciones para un parametro
 * @param {Object} model Modelo del parametro
 * @param {Number} skip Numero de registros a saltar
 * @param {Number} limit Numero de registros a retornar
 * @returns {Object} Lista de opciones del parametro
 */
const getParam = async (modelo, skip = 0, limit = 0) => {
  const modeloEncontrado = parametrosDisponibles[modelo];
  const param = await modeloEncontrado.find().skip(skip).limit(limit);
  return param;
};

/**
 * @desc Obtiene el id de un parametro por su nombre
 * @param {Object} model Modelo del parametro
 * @param {String} nombre Nombre del parametro
 * @returns {Object} Id del parametro
 */
const getParamIdPorNombre = async (modelo, nombre) => {
  const modeloEncontrado = parametrosDisponibles[modelo];
  const idParam = await modeloEncontrado
    .findOne({ nombre })
    // consulta insensible a mayusculas y minusculas
    .collation({
      locale: 'es',
      strength: 2,
    })
    // retorna solo el id
    .select('_id')
    .lean()
    .exec();

  return idParam;
};

export default { getParam, getParamIdPorNombre };
