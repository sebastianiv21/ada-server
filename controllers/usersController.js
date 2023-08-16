const bcrypt = require('bcrypt');
const User = require('../models/User');
const Test = require('../models/Test');
const ROLES_LIST = require('../config/rolesList');

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

const isMissingRequiredField = (reqBody) => requiredFields.some((field) => !reqBody[field]);

const getUserById = async (id) => User.findById(id).exec();

const createUserObject = async (reqBody) => {
  const hashedPwd = await bcrypt.hash(reqBody.password, 10);
  return {
    ...reqBody,
    password: hashedPwd,
  };
};

const createUserIfNotExists = async (userObject) => {
  const duplicateUser = await User.findOne({
    $or: [{ idNumber: userObject.idNumber }, { email: userObject.email }],
  })
    .collation({
      locale: 'es',
      strength: 2,
    })
    .lean()
    .exec();

  if (duplicateUser) {
    throw new Error('El usuario ya existe');
  }

  return User.create(userObject);
};

const deleteUserIfPossible = async (id) => {
  const userToDelete = await getUserById(id);

  if (!userToDelete) {
    throw new Error('Usuario no encontrado');
  }

  const testFromUser = await Test.findOne({ user: id }).lean().exec();
  if (testFromUser) {
    throw new Error('El usuario tiene pruebas asignadas');
  }

  await userToDelete.deleteOne();
  return userToDelete;
};

const handleErrorResponse = (res, message, status = 400) => res.status(status).json({ message });

const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').lean();

  if (!users?.length) {
    return handleErrorResponse(res, 'No se encontraron usuarios');
  }

  return res.json(users);
};

const createUser = async (req, res) => {
  if (
    isMissingRequiredField(req.body) ||
    !Array.isArray(req.body.roles) ||
    !req.body.roles.length
  ) {
    return handleErrorResponse(res, 'Ingrese los campos requeridos');
  }

  const userObject = await createUserObject(req.body);
  await createUserIfNotExists(userObject);

  return res.status(201).json({
    message: `Nuevo usuario ${userObject.name} ${userObject.lastname} registrado`,
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const userToUpdate = await getUserById(id);

  if (!userToUpdate) {
    return handleErrorResponse(res, 'Usuario no encontrado');
  }

  if (
    isMissingRequiredField(req.body) ||
    !Array.isArray(req.body.roles) ||
    !req.body.roles.length ||
    typeof req.body.active !== 'boolean'
  ) {
    return handleErrorResponse(res, 'Ingrese los campos requeridos');
  }

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

  const userFound = await User.findOne({ idNumber }).lean().exec();

  if (userFound && userFound._id.toString() !== id) {
    return handleErrorResponse(res, 'Número de identificación duplicado', 409);
  }

  userToUpdate.set({
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
    password: password ?
      await bcrypt.hash(password, 10) :
      userToUpdate.password,
    contactName,
    contactLastname,
    contactRelationship,
    contactPhone,
  });

  await userToUpdate.save();

  return res.json({
    message: `Perfil de ${userToUpdate.name} ${userToUpdate.lastname} actualizado`,
  });
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await deleteUserIfPossible(req.params.id);
    return res.json({
      message: `Usuario ${deletedUser.name} ${deletedUser.lastname} con número de identificación ${deletedUser.idNumber} eliminado`,
    });
  } catch (error) {
    return handleErrorResponse(res, error.message);
  }
};

const createAdmin = async (req, res) => {
  const adminExists = await User.exists({ roles: ROLES_LIST.ADMIN });

  if (adminExists) {
    return handleErrorResponse(res, 'Ya existe un administrador', 409);
  }

  const { roles } = req.body;

  if (
    isMissingRequiredField(req.body) ||
    !Array.isArray(roles) ||
    !roles.includes(ROLES_LIST.ADMIN)
  ) {
    return handleErrorResponse(
      res,
      'Ingrese los campos requeridos y asegúrese de que el rol sea administrador',
    );
  }

  const userObject = await createUserObject(req.body);
  await createUserIfNotExists(userObject);

  return res.status(201).json({ message: 'Nuevo administrador registrado' });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  createAdmin,
};
