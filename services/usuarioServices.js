import Usuario from '#models/Usuario.js';
import Rol from '#models/params/Rol.js';
import paramsServices from '#services/paramsServices.js';

const createUsuario = async (usuario) => {
  const usuarioCreado = await Usuario.create(usuario);

  return usuarioCreado;
};

const findAdmin = async () => {
  const adminRol = await paramsServices.getParamIdPorNombre(
    Rol,
    'administrador',
  );
  console.log(adminRol);
  const admin = await Usuario.findOne({ rol: adminRol }).lean().exec();

  return admin;
};

export default {
  createUsuario,
  findAdmin,
};
