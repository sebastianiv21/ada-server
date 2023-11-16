import CitaLaboratorio from '#models/CitaLaboratorio.js';

const createCitaLaboratorio = async (citaLaboratorio) => {
  const citaLaboratorioCreada = await CitaLaboratorio.create(citaLaboratorio);

  return citaLaboratorioCreada;
};

const findCitasLaboratorio = async (skip = 0, limit = 0, filter = {}) => {
  const citasLaboratorio = await CitaLaboratorio.find(filter)
    .skip(skip)
    .limit(limit)
    // trae la información de los documentos referenciados
    .populate('sedeLaboratorio estadoCitaLaboratorio ordenMedica')
    .lean()
    .exec();

  return citasLaboratorio;
};

const countCitasLaboratorio = async () => {
  const totalCitasLaboratorio = await CitaLaboratorio.countDocuments();

  return totalCitasLaboratorio;
};

const updateCitaLaboratorio = async (id, citaLaboratorio) => {
  const citaLaboratorioActualizada = await CitaLaboratorio.findByIdAndUpdate(
    id,
    citaLaboratorio,
    { new: true },
  )
    .lean()
    .exec();

  return citaLaboratorioActualizada;
};

const deleteCitaLaboratorio = async (id) => {
  await CitaLaboratorio.findByIdAndDelete(id);
};

export default {
  createCitaLaboratorio,
  findCitasLaboratorio,
  countCitasLaboratorio,
  updateCitaLaboratorio,
  deleteCitaLaboratorio,
};
