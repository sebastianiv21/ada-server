import Usuario from '#models/Usuario.js';
import paramsServices from '#services/paramsServices.js';

const createUsuario = async (usuario) => {
  const usuarioCreado = await Usuario.create(usuario);

  return usuarioCreado;
};

const findAdmin = async () => {
  const adminRol = await paramsServices.getParamIdPorNombre(
    'Rol',
    'administrador',
  );

  const admin = await Usuario.findOne({ rol: adminRol }).lean().exec();

  return admin;
};

const findUsuarioDuplicado = async (numeroDocumento, email) => {
  // Confirma que el usuario no exista
  // Se usa el método 'exec()' porque estamos pasando un párametro al método 'findOne()'
  const duplicado = await Usuario.findOne({
    $or: [{ numeroDocumento }, { email }],
  })
    // para que no sea sensible a mayúsculas y minúsculas
    .collation({
      locale: 'es',
      strength: 2,
    })
    .lean()
    .exec();

  return duplicado;
};

export default {
  createUsuario,
  findAdmin,
  findUsuarioDuplicado,
};
