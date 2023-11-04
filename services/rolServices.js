const Rol = require('../models/params/Rol');

exports.get = async (skip = 0, limit = 0) => {
  const roles = await Rol.find().skip(skip).limit(limit);
  return roles;
};
