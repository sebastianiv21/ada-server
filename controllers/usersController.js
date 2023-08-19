const bcrypt = require('bcrypt');
const User = require('../models/User');
const Test = require('../models/Test');
const ROLES_LIST = require('../config/rolesList');

// Campos requeridos para un usuario
const requiredFields = [
  'idType',
  'idNumber',
  'name',
  'lastname',
  'dateOfBirth',
  'gender',
  'bloodType',
  'rh',
  'eps',
  'email',
  'personalPhone',
  'password',
];

const jsonWithMessage = (res, message, code = 400) => res.status(code).json({ message });

/**
 * @route   GET /users
 * @desc    Trae todos los usuarios
 * @access  Private
 * Devuelve la información de los usuarios excepto la contraseña.
 * El método 'lean()' sirve para traer sólo el json y no incluir otra información
 * y métodos que contiene el llamado a users. Se usa sólo para consultas ya
 * que si se quiere guardar un registro, se debe evitar usarlo
 */
const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').lean(); // '-password' para no traer la contraseña

  if (!users?.length) jsonWithMessage(res, 'No se encontraron usuarios');

  return res.json(users);
};

/**
 * @route   POST /users
 * @desc    Crea un usuario nuevo
 * @access  Private
 * Con req.body se desestructura la información enviada del cliente para crear un usuario.
 * No se envían ni role ni active porque se asignan por defecto
 */
const createUser = async (req, res) => {
  // Confirma que existan los campos requeridos
  const { idNumber, email, password, name, lastname, roles } = req.body;

  // Si alguno de los campos requeridos no existe, retorna true
  const isMissingRequiredField = requiredFields.some(
    (field) => !req.body[field],
  );

  if (isMissingRequiredField || !Array.isArray(roles) || !roles.length) {
    return jsonWithMessage(res, 'Ingrese los campos requeridos');
  }

  // Confirma que el usuario no exista
  // Se usa el método 'exec()' porque estamos pasando un párametro al método 'findOne()'
  const duplicate = await User.findOne({ $or: [{ idNumber }, { email }] })
    .collation({
      // para que no sea sensible a mayúsculas y minúsculas
      locale: 'es',
      strength: 2,
    })
    .lean()
    .exec();

  if (duplicate) jsonWithMessage(res, 'El usuario ya existe', 409); // 409 Conflict

  // Cifra la contraseña
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  // Crea el usuario
  const userObject = {
    ...req.body,
    password: hashedPwd,
  };

  const user = await User.create(userObject);

  if (!user) jsonWithMessage(res, 'Datos de usuario inválidos');

  // Usuario creado
  return jsonWithMessage(
    res,
    `Nuevo usuario ${name} ${lastname} registrado`,
    201,
  );
};

/**
 * @route   PATCH /users/:id
 * @desc    Actualiza un usuario por ID
 * @access  Private
 */
const updateUser = async (req, res) => {
  const { id } = req.params;

  // Confirma que el usuario a actualizar exista
  const userToUpdate = await User.findById(id).exec();
  if (!userToUpdate) jsonWithMessage(res, 'Usuario no encontrado');

  const {
    idType,
    idNumber,
    name,
    lastname,
    dateOfBirth,
    gender,
    bloodType,
    rh,
    maritalStatus,
    eps,
    personalPhone,
    personalPhone2,
    address,
    city,
    department,
    roles,
    active,
    email,
    password,
    contactName,
    contactLastname,
    contactRelationship,
    contactPhone,
  } = req.body;

  const isMissingRequiredField = requiredFields.some(
    (field) => !req.body[field],
  );

  if (
    isMissingRequiredField ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== 'boolean'
  ) {
    return jsonWithMessage(res, 'Ingrese los campos requeridos');
  }

  // Confirma que el usuario no esté duplicado
  const userFound = await User.findOne({ idNumber }).lean().exec();

  if (userFound && userFound?._id.toString() !== id) {
    return jsonWithMessage(res, 'Número de identificación duplicado', 409);
  }

  // Actualiza el usuario
  userToUpdate.idType = idType;
  userToUpdate.idNumber = idNumber;
  userToUpdate.name = name;
  userToUpdate.lastname = lastname;
  userToUpdate.dateOfBirth = dateOfBirth;
  userToUpdate.gender = gender;
  userToUpdate.bloodType = bloodType;
  userToUpdate.rh = rh;
  userToUpdate.maritalStatus = maritalStatus;
  userToUpdate.eps = eps;
  userToUpdate.personalPhone = personalPhone;
  userToUpdate.personalPhone2 = personalPhone2;
  userToUpdate.address = address;
  userToUpdate.city = city;
  userToUpdate.department = department;
  userToUpdate.roles = roles;
  userToUpdate.active = active;
  userToUpdate.email = email;
  userToUpdate.contactName = contactName;
  userToUpdate.contactLastname = contactLastname;
  userToUpdate.contactRelationship = contactRelationship;
  userToUpdate.contactPhone = contactPhone;

  if (password) {
    // hash password
    userToUpdate.password = await bcrypt.hash(password, 10); // salt rounds
  }

  // Guarda el usuario actualizado
  const updatedUser = await userToUpdate.save();

  return jsonWithMessage(
    res,
    `Perfil de ${updatedUser.name} ${updatedUser.lastname} actualizado`,
    200,
  );
};

/**
 * @route   DELETE /users/:id
 * @desc    Elimina un usuario por ID
 * @access  Private
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;

  // 400 bad request
  if (!id) jsonWithMessage(res, 'Ingrese el ID del usuario');

  // Confirma que el usuario exista
  const userToDelete = await User.findById(id).exec();
  if (!userToDelete) jsonWithMessage(res, 'Usuario no encontrado');

  // Confirma que el usuario no tenga pruebas asignadas
  const testFromUser = await Test.findOne({ user: id }).lean().exec();
  if (testFromUser) {
    return jsonWithMessage(
      res,
      'No se puede eliminar el usuario porque tiene pruebas asignadas',
      409,
    );
  }

  // Elimina el usuario
  const result = await userToDelete.deleteOne();

  const message = `Usuario ${result.name} ${result.lastname} con número de identificación ${result.idNumber} eliminado`;

  return res.json(message);
};

/**
 * @route   POST /users/create-admin
 * @desc    Crea un usuario administrador
 */
const createAdmin = async (req, res) => {
  // search for admin
  const admin = await User.findOne({
    roles: { $elemMatch: { $eq: ROLES_LIST.ADMIN } },
  })
    .lean()
    .exec();

  if (admin) jsonWithMessage(res, 'Ya existe un administrador', 409); // 409 Conflict

  const { idNumber, email, password, roles } = req.body;

  // Si alguno de los campos requeridos no existe, retorna true
  const isMissingRequiredField = requiredFields.some(
    (field) => !req.body[field],
  );

  if (isMissingRequiredField || !Array.isArray(roles) || !roles.length) {
    return jsonWithMessage(res, 'Ingrese los campos requeridos');
  }

  if (!roles.includes(ROLES_LIST.ADMIN)) {
    return jsonWithMessage(res, 'El usuario debe ser administrador');
  }

  // Confirma que el usuario no exista
  // Se usa el método 'exec()' porque estamos pasando un párametro al método 'findOne()'
  const duplicate = await User.findOne({ $or: [{ idNumber }, { email }] })
    .collation({
      locale: 'es',
      strength: 2,
    })
    .lean()
    .exec();

  if (duplicate) jsonWithMessage(res, 'El usuario ya existe', 409); // 409 Conflict

  // Cifra la contraseña
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  // Crea el usuario
  const userObject = {
    ...req.body,
    password: hashedPwd,
  };

  const user = await User.create(userObject);

  if (!user) jsonWithMessage(res, 'Datos de usuario inválidos');

  // Administrador creado
  return jsonWithMessage(
    res,
    `Nuevo administrador ${user.name} ${user.lastname} registrado`,
    201,
  );
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  createAdmin,
};
