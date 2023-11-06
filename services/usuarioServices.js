import Usuario from '#models/Usuario.js';
import paramsServices from '#services/paramsServices.js';

const createUsuario = async (usuario) => {
  const usuarioCreado = await Usuario.create(usuario);

  return usuarioCreado;
};

const findUsuarios = async (skip, limit) => {
  const usuarios = await Usuario.find()
    .select('-clave')
    .skip(skip)
    .limit(limit)
    .populate(
      'tipoDocumento genero tipoSangre rh estadoCivil eps rol municipio contacto',
    )
    .lean()
    .exec();

  return usuarios;
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

const findUsuarioPorEmail = async (email) => {
  const usuario = await Usuario.findOne({ email }).lean().exec();

  return usuario;
};

export default {
  createUsuario,
  findAdmin,
  findUsuarioDuplicado,
  findUsuarioPorEmail,
  findUsuarios,
};
