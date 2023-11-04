const { jsonResponse } = require('../utils');
const rol = require('../services/rolServices');

exports.getRoles = async (req, res) => {
  const { skip, limit } = req.query;
  const roles = await rol.get(skip, limit);
  jsonResponse(res, roles, 200);
};
