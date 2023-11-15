import CitaLaboratorio from '#models/CitaLaboratorio.js';

const createCitaLaboratorio = async (citaLaboratorio) => {
  const citaLaboratorioCreada = await CitaLaboratorio.create(citaLaboratorio);

  return citaLaboratorioCreada;
};

const findCitasLaboratorio = async (skip = 0, limit = 0) => {
  const citasLaboratorio = await CitaLaboratorio.find()
    .skip(skip)
    .limit(limit)
    // trae la información de los documentos referenciados
    .populate('sedeLaboratorio estadoCitaLaboratorio ordenMedica')
    .lean()
    .exec();

  return citasLaboratorio;
};

const findCitasLaboratorioPorIdPaciente = async (id, skip = 0, limit = 0) => {
  const citasLaboratorio = await CitaLaboratorio.find({ paciente: id })
    // trae la información de los documentos referenciados
    .populate('sedeLaboratorio estadoCitaLaboratorio ordenMedica')
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();

  return citasLaboratorio;
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
  findCitasLaboratorioPorIdPaciente,
  updateCitaLaboratorio,
  deleteCitaLaboratorio,
};
