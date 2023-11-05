import bcrypt from 'bcrypt';
import { jsonResponse } from '#utils';

import services from '#services/usuarioServices.js';
import paramsServices from '#services/paramsServices.js';

/**
 * @route   POST /users/crear-admin
 * @desc Crea un usuario administrador si no existe ninguno
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 */
const createAdmin = async (req, res) => {
  // valida que no exista un administrador
  const admin = await services.findAdmin();

  if (admin) {
    return jsonResponse(res, { message: 'Ya existe un administrador' }, 409); // 409 Conflict
  }

  const { numeroDocumento, email, clave } = req.body;

  const duplicado = await services.findUsuarioDuplicado(numeroDocumento, email);

  if (duplicado) {
    return jsonResponse(
      res,
      {
        message: 'Ya existe un usuario con ese número de documento o email',
      },
      409,
    ); // 409 Conflict
  }

  // Cifra la contraseña
  const claveCifrada = await bcrypt.hash(clave, 10); // salt rounds

  // Obtiene el id del rol Administrador
  const idRolAdmin = await paramsServices.getParamIdPorNombre(
    'Rol',
    'administrador',
  );

  // Crea el usuario
  const usuario = {
    ...req.body,
    rol: idRolAdmin,
    clave: claveCifrada,
  };

  await services.createUsuario(usuario);

  return jsonResponse(
    res,
    { message: 'Administrador creado exitosamente' },
    201,
  ); // 201 Created
};

export default { createAdmin };
