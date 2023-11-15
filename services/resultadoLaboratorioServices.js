import ResultadoLaboratorio from '#models/ResultadoLaboratorio.js';

const createResultadoLaboratorio = async (resultadoLaboratorio) => {
  const resultadoLaboratorioCreado = await ResultadoLaboratorio.create(
    resultadoLaboratorio,
  );

  return resultadoLaboratorioCreado;
};

const findResultadosLaboratorio = async (skip = 0, limit = 0) => {
  const resultadosLaboratorio = await ResultadoLaboratorio.find()
    .skip(skip)
    .limit(limit)
    // trae la información de los documentos referenciados
    .populate('citaLaboratorio')
    .lean()
    .exec();

  return resultadosLaboratorio;
};

const findResultadosLaboratorioPorIdPaciente = async (
  id,
  skip = 0,
  limit = 0,
) => {
  const resultadosLaboratorio = await ResultadoLaboratorio.find({
    paciente: id,
  })
    // trae la información de los documentos referenciados
    .populate('citaLaboratorio')
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();

  return resultadosLaboratorio;
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
  findResultadosLaboratorioPorIdPaciente,
  updateResultadoLaboratorio,
  deleteResultadoLaboratorio,
};
