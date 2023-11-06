import OrdenMedica from '#models/OrdenMedica.js';

const createOrdenMedica = async (ordenMedica) => {
  const ordenMedicaCreada = await OrdenMedica.create(ordenMedica);

  return ordenMedicaCreada;
};

const findOrdenesMedicas = async (skip, limit) => {
  const ordenesMedicas = await OrdenMedica.find()
    .skip(skip)
    .limit(limit)
    .populate('medico paciente tipoPrueba')
    .lean()
    .exec();

  return ordenesMedicas;
};

const findOrdenesMedicasPorIdPaciente = async (id) => {
  const ordenMedica = await OrdenMedica.find({ paciente: id })
    .populate('medico paciente tipoPrueba')
    .lean()
    .exec();

  return ordenMedica;
};

export default {
  createOrdenMedica,
  findOrdenesMedicas,
  findOrdenesMedicasPorIdPaciente,
};
