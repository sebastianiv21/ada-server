import SedeLaboratorio from '#models/SedeLaboratorio.js';

const createSedeLaboratorio = async (sedeLaboratorio) => {
  const sedeLaboratorioCreada = await SedeLaboratorio.create(sedeLaboratorio);

  return sedeLaboratorioCreada;
};

const findSedeLaboratorio = async (skip = 0, limit = 0) => {
  const sedesLaboratorio = await SedeLaboratorio.find()
    .skip(skip)
    .limit(limit)
    // trae la información de los documentos referenciados, excepto la clave de los usuarios
    .populate('municipio')
    .lean()
    .exec();

  return sedesLaboratorio;
};

const updateSedeLaboratorio = async (id, sedeLaboratorio) => {
  const sedeLaboratorioActualizada = await SedeLaboratorio.findByIdAndUpdate(
    id,
    sedeLaboratorio,
    { new: true },
  )
    .lean()
    .exec();

  return sedeLaboratorioActualizada;
};

const deleteSedeLaboratorio = async (id) => {
  await SedeLaboratorio.findByIdAndDelete(id);
};

export default {
  createSedeLaboratorio,
  findSedeLaboratorio,
  updateSedeLaboratorio,
  deleteSedeLaboratorio,
};
