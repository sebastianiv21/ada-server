import { jsonResponse } from '#utils';
import get from '#services/params/estadoCitaLabServices.js';

const getEstadosCitaLab = async (req, res) => {
  const { skip, limit } = req.query;
  const estadosCitaLab = await get(skip, limit);
  jsonResponse(res, estadosCitaLab, 200);
};

export default getEstadosCitaLab;
