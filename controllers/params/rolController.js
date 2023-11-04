import { jsonResponse } from '../../utils.js';
import { get } from '../../services/params/rolServices.js';

export async function getRoles(req, res) {
  const { skip, limit } = req.query;
  const roles = await get(skip, limit);
  jsonResponse(res, roles, 200);
}
