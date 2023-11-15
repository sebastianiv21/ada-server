import OrdenMedica from '#models/OrdenMedica.js';

const createOrdenMedica = async (ordenMedica) => {
  const ordenMedicaCreada = await OrdenMedica.create(ordenMedica);

  return ordenMedicaCreada;
};

const findOrdenesMedicas = async (skip = 0, limit = 0) => {
  const ordenesMedicas = await OrdenMedica.find()
    .skip(skip)
    .limit(limit)
    // trae la información de los documentos referenciados, excepto la clave de los usuarios
    .populate('medico paciente tipoPruebaLaboratorio', '-clave')
    .lean()
    .exec();

  return ordenesMedicas;
};

const findOrdenesMedicasPorIdPaciente = async (id, skip = 0, limit = 0) => {
  const ordenesMedicas = await OrdenMedica.find({ paciente: id })
    // trae la información de los documentos referenciados, excepto la clave de los usuarios
    .populate('medico paciente tipoPruebaLaboratorio', '-clave')
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();

  return ordenesMedicas;
};

const updateOrdenMedica = async (id, ordenMedica) => {
  const ordenMedicaActualizada = await OrdenMedica.findByIdAndUpdate(
    id,
    ordenMedica,
    { new: true },
  )
    .lean()
    .exec();

  return ordenMedicaActualizada;
};

const deleteOrdenMedica = async (id) => {
  await OrdenMedica.findByIdAndDelete(id);
};

export default {
  createOrdenMedica,
  findOrdenesMedicas,
  findOrdenesMedicasPorIdPaciente,
  updateOrdenMedica,
  deleteOrdenMedica,
};
