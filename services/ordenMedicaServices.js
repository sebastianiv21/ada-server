import OrdenMedica from '#models/OrdenMedica.js';

const createOrdenMedica = async (ordenMedica) => {
  const ordenMedicaCreada = await OrdenMedica.create(ordenMedica);

  return ordenMedicaCreada;
};

const findOrdenesMedicas = async (skip = 0, limit = 0) => {
  const ordenesMedicas = await OrdenMedica.find()
    .skip(skip)
    .limit(limit)
    .populate('medico paciente tipoPrueba')
    .lean()
    .exec();

  return ordenesMedicas;
};

const findOrdenesMedicasPorIdPaciente = async (id, skip = 0, limit = 0) => {
  const ordenMedica = await OrdenMedica.find({ paciente: id })
    .populate('medico paciente tipoPrueba')
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();

  return ordenMedica;
};

const updateOrdenMedica = async (id, ordenMedica) => {
  const ordenMedicaActualizada = await OrdenMedica.findByIdAndUpdate(
    id,
    ordenMedica,
    { new: true },
  )
    .populate('medico paciente tipoPrueba')
    .lean()
    .exec();

  return ordenMedicaActualizada;
};

export default {
  createOrdenMedica,
  findOrdenesMedicas,
  findOrdenesMedicasPorIdPaciente,
  updateOrdenMedica,
};
