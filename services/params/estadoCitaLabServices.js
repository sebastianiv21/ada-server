import EstadoCitaLaboratorio from '#models/params/EstadoCitaLaboratorio.js';

const get = async (skip = 0, limit = 0) => {
  const estados = await EstadoCitaLaboratorio.find().skip(skip).limit(limit);
  return estados;
};

export default get;
