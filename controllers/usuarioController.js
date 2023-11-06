import bcrypt from 'bcrypt';
import { parseISO } from 'date-fns';
import { jsonResponse } from '#utils';

import services from '#services/usuarioServices.js';
import paramsServices from '#services/paramsServices.js';

/**
 * @route GET /users
 * @desc Trae todos los usuarios
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @query {Integer} skip - Número de registros a saltar
 * @query {Integer} limit - Número de registros a traer
 * @return {Object} - Response Object
 */
const getUsuarios = async (req, res) => {
  const { skip, limit } = req.query;

  const usuarios = await services.findUsuarios(Number(skip), Number(limit));

  if (!usuarios?.length) {
    return jsonResponse(res, { message: 'No se encontraron usuarios' }, 204);
  }

  return jsonResponse(res, { usuarios }, 200); // 204 No Content
};

/**
 * @route   POST /users/crear
 * @desc Crea un usuario
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @return {Object} - Response Object
 */
const createUsuario = async (req, res) => {
  const { numeroDocumento, email, clave, fechaNacimiento, rol } = req.body;

  // Valida que el rol sea válido
  const roles = await paramsServices.getParam('Rol');

  const idRoles = roles.map((rolItem) => rolItem._id.toString());

  const rolValido = idRoles.includes(rol);

  if (!rolValido) {
    return jsonResponse(
      res,
      {
        message: 'El rol seleccionado no es válido',
      },
      400,
    ); // 400 Bad Request
  }

  const duplicado = await services.findUsuarioDuplicado(
    numeroDocumento.toString(),
    email.toString(),
  );

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

  // Convierte la fecha de nacimiento a formato ISO
  const fechaNacimientoISO = parseISO(fechaNacimiento);

  // Crea el usuario
  const usuario = {
    ...req.body,
    fechaNacimiento: fechaNacimientoISO,
    clave: claveCifrada,
  };

  await services.createUsuario(usuario);

  return jsonResponse(res, { message: 'Usuario creado exitosamente' }, 201); // 201 Created
};

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

  const { numeroDocumento, email, clave, fechaNacimiento } = req.body;

  const duplicado = await services.findUsuarioDuplicado(
    numeroDocumento.toString(),
    email.toString(),
  );

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

  // Convierte la fecha de nacimiento a formato ISO
  const fechaNacimientoISO = parseISO(fechaNacimiento);

  // Obtiene el id del rol Administrador
  const idRolAdmin = await paramsServices.getParamIdPorNombre(
    'Rol',
    'administrador',
  );

  // Crea el usuario
  const usuario = {
    ...req.body,
    rol: idRolAdmin,
    fechaNacimiento: fechaNacimientoISO,
    clave: claveCifrada,
  };

  await services.createUsuario(usuario);

  return jsonResponse(
    res,
    { message: 'Administrador creado exitosamente' },
    201,
  ); // 201 Created
};

export default { createAdmin, getUsuarios, createUsuario };
