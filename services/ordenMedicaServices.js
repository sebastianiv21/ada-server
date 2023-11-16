import OrdenMedica from '#models/OrdenMedica.js';

const createOrdenMedica = async (ordenMedica) => {
  const ordenMedicaCreada = await OrdenMedica.create(ordenMedica);

  return ordenMedicaCreada;
};

const findOrdenesMedicas = async (skip = 0, limit = 0, filter = {}) => {
  const ordenesMedicas = await OrdenMedica.find(filter)
    .skip(skip)
    .limit(limit)
    // trae la información de los documentos referenciados, excepto la clave de los usuarios
    .populate('medico paciente tipoPruebaLaboratorio', '-clave')
    .lean()
    .exec();

  return ordenesMedicas;
};

const countOrdenesMedicas = async () => {
  const totalOrdenesMedicas = await OrdenMedica.countDocuments();

  return totalOrdenesMedicas;
};

const findOrdenMedicaPorId = async (id) => {
  const ordenMedica = await OrdenMedica.findById(id)
    .populate('medico paciente tipoPruebaLaboratorio', '-clave')
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
  countOrdenesMedicas,
  findOrdenMedicaPorId,
  updateOrdenMedica,
  deleteOrdenMedica,
};
