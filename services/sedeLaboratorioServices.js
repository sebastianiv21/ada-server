import SedeLaboratorio from '#models/SedeLaboratorio.js';

const createSedeLaboratorio = async (sedeLaboratorio) => {
  const sedeLaboratorioCreada = await SedeLaboratorio.create(sedeLaboratorio);

  return sedeLaboratorioCreada;
};

const findSedesLaboratorio = async (skip = 0, limit = 0, filter = {}) => {
  const sedesLaboratorio = await SedeLaboratorio.find(filter)
    .skip(skip)
    .limit(limit)
    // trae la información de los documentos referenciados, excepto la clave de los usuarios
    .populate([{ path: 'municipio', populate: [{ path: 'departamento' }] }])
    .lean()
    .exec();

  return sedesLaboratorio;
};

const countSedesLaboratorio = async () => {
  const totalSedesLaboratorio = await SedeLaboratorio.countDocuments();

  return totalSedesLaboratorio;
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
  findSedesLaboratorio,
  countSedesLaboratorio,
  updateSedeLaboratorio,
  deleteSedeLaboratorio,
};
