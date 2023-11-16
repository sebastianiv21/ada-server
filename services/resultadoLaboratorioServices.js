import ResultadoLaboratorio from '#models/ResultadoLaboratorio.js';

const createResultadoLaboratorio = async (resultadoLaboratorio) => {
  const resultadoLaboratorioCreado = await ResultadoLaboratorio.create(
    resultadoLaboratorio,
  );

  return resultadoLaboratorioCreado;
};

const findResultadosLaboratorio = async (skip = 0, limit = 0, filter = {}) => {
  const resultadosLaboratorio = await ResultadoLaboratorio.find(filter)
    .skip(skip)
    .limit(limit)
    // trae la información de los documentos referenciados
    .populate('citaLaboratorio')
    .lean()
    .exec();

  return resultadosLaboratorio;
};

const countResultadosLaboratorio = async () => {
  const totalResultadosLaboratorio =
    await ResultadoLaboratorio.countDocuments();

  return totalResultadosLaboratorio;
};

const findResultadoLaboratorioPorId = async (id) => {
  const resultadoLaboratorio = await ResultadoLaboratorio.findById(id)
    // trae la información de los documentos referenciados
    .populate('citaLaboratorio')
    .lean()
    .exec();

  return resultadoLaboratorio;
};

const updateResultadoLaboratorio = async (id, resultadoLaboratorio) => {
  const resultadoLaboratorioActualizado =
    await ResultadoLaboratorio.findByIdAndUpdate(id, resultadoLaboratorio, {
      new: true,
    })
      .lean()
      .exec();

  return resultadoLaboratorioActualizado;
};

const deleteResultadoLaboratorio = async (id) => {
  await ResultadoLaboratorio.findByIdAndDelete(id);
};

export default {
  createResultadoLaboratorio,
  findResultadosLaboratorio,
  countResultadosLaboratorio,
  findResultadoLaboratorioPorId,
  updateResultadoLaboratorio,
  deleteResultadoLaboratorio,
};
