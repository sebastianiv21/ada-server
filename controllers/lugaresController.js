import { jsonResponse } from '#utils';
import services from '#services/lugaresServices.js';

const getDepartamentos = async (req, res) => {
  const { skip, limit } = req.query;
  const departamentos = await services.getDepartamentos(skip, limit);
  return jsonResponse(res, departamentos, 200);
};

const getMunicipiosPorDepartamentoId = async (req, res) => {
  const { skip, limit } = req.query;
  const { departamentoId } = req.params;

  const municipios = await services.getMunicipiosPorDepartamentoId(
    departamentoId.toString(),
    skip,
    limit,
  );

  return jsonResponse(res, municipios, 200);
};

const postDepartamentos = async (req, res) => {
  const { arrayDepartamentos } = req.body;

  const promesas = arrayDepartamentos.map(async (departamento) => {
    const nombreDepartamento = departamento._id;

    await services.createDepartamento(nombreDepartamento);
  });

  await Promise.all(promesas);

  return jsonResponse(
    res,
    { message: 'Departamentos cargados exitosamente' },
    201,
  );
};

export default {
  getDepartamentos,
  getMunicipiosPorDepartamentoId,
  postDepartamentos,
};
