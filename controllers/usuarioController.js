import { jsonResponse } from '#utils';

import services from '#services/usuarioServices.js';

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

  const { numeroDocumento, email } = req.body;

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

  return jsonResponse(res, { message: 'No existe un administrador' }, 404); // 404 Not Found
};

export default { createAdmin };
