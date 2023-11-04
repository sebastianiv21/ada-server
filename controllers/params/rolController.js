import { jsonResponse } from '#utils';
import get from '#services/params/rolServices.js';

const getRoles = async (req, res) => {
  const { skip, limit } = req.query;
  const roles = await get(skip, limit);
  jsonResponse(res, roles, 200);
};

export default getRoles;
