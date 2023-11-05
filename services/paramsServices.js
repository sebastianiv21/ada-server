/**
 * @desc Obtiene la lista de opciones para un parametro
 * @param {Object} model Modelo del parametro
 * @param {Number} skip Numero de registros a saltar
 * @param {Number} limit Numero de registros a retornar
 * @returns {Object} Lista de opciones del parametro
 */
const getParam = async (model, skip = 0, limit = 0) => {
  const param = await model.find().skip(skip).limit(limit);
  return param;
};

/**
 * @desc Obtiene el id de un parametro por su nombre
 * @param {Object} model Modelo del parametro
 * @param {String} nombre Nombre del parametro
 * @returns {Object} Id del parametro
 */
const getParamIdPorNombre = async (model, nombre) => {
  const idParam = await model
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
