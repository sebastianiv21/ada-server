const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Test = require('../models/Test');

// @route   GET /users
// @desc    Get all users
// @access  Private
/*
  Devuelve la información de los usuarios excepto la contraseña.
  El método 'lean()' sirve para traer sólo el json y no incluir otra información
  y métodos que contiene el llamado a users. Se usa sólo para consultas ya
  que si se quiere guardar un registro, se debe evitar usarlo
*/
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean();

  if (!users?.length) {
    return res.status(400).json({ message: 'No se encontraron usuarios' });
  }

  return res.json(users);
});

// @route   POST /users
// @desc    Create a new user
// @access  Private
/*
  Con req.body se desestructura la información enviada del cliente para crear un usuario.
  No se envían ni role ni active porque se asignan por defecto
*/
const createUser = asyncHandler(async (req, res) => {
  // const {
  //   idType,
  //   idNumber,
  //   name,
  //   lastname,
  //   dateOfBirth,
  //   gender,
  //   bloodType,
  //   rh,
  //   maritalStatus,
  //   eps,
  //   personalPhone,
  //   personalPhone2,
  //   address,
  //   city,
  //   department,
  //   email,
  //   password,
  //   contactName,
  //   contactLastname,
  //   contactRelationship,
  //   contactPhone,
  // } = req.body;

  // Confirma que existan los campos requeridos
  const {
    idNumber, password, name, lastname,
  } = req.body;

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

  const hasAllRequiredFields = requiredFields.every((field) => Boolean(req.body[field]));

  if (!hasAllRequiredFields) {
    return res.status(400).json({ message: 'Ingrese los campos requeridos' });
  }

  // Confirma que el usuario no exista
  // Se usa el método 'exec()' porque estamos pasando un párametro al método 'findOne()'
  const duplicate = await User.findOne({ idNumber }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: 'El usuario ya existe' });
  }

  // Cifra la contraseña
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  // Crea el usuario
  const userObject = {
    ...req.body,
    password: hashedPwd,
  };

  const user = await User.create(userObject);

  if (!user) {
    return res.status(400).json({ message: 'Datos de usuario inválidos' });
  }

  // Usuario creado
  return res
    .status(201)
    .json({ message: `Nuevo usuario ${name} ${lastname} creado` });
});

// @route   PATCH /users/:id
// @desc    Update a user
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Confirma que el usuario a actualizar exista
  const userToUpdate = await User.findById(id).exec();
  if (!userToUpdate) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
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
    role,
    active,
    email,
    password,
    contactName,
    contactLastname,
    contactRelationship,
    contactPhone,
  } = req.body;

  const allowedRoles = ['Paciente', 'Personal Médico', 'Administrador'];

  const isInvalidRole = !allowedRoles.includes(role);

  if (
    !idType
    || !idNumber
    || !name
    || !lastname
    || !dateOfBirth
    || !gender
    || !bloodType
    || !rh
    || !eps
    || !personalPhone
    || !email
    || isInvalidRole
    || typeof active !== 'boolean'
  ) {
    return res.status(400).json({ message: 'Ingrese los campos requeridos' });
  }

  // Confirma que el usuario no esté duplicado
  const userFound = await User.findOne({ idNumber }).lean().exec();

  if (userFound && userFound?._id.toString() !== id) {
    return res
      .status(409)
      .json({ message: 'Número de identificación duplicado' });
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
  userToUpdate.role = role;
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

  const updatedUser = await userToUpdate.save();

  return res.json({
    message: `Perfil de ${updatedUser.name} ${updatedUser.lastname} actualizado`,
  });
});

// @route   DELETE /users
// @desc    Delete a user
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    // bad request
    return res.status(400).json({ message: 'Se require ID del usuario' });
  }

  // Confirma que el usuario no tenga pruebas asignadas
  const testFromUser = await Test.findOne({ user: id }).lean().exec();
  if (testFromUser) {
    return res
      .status(400)
      .json({ message: 'El usuario tiene pruebas asignadas' });
  }

  // Confirma que el usuario exista
  const userToDelete = await User.findById(id).exec();

  if (!userToDelete) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }

  // Elimina el usuario
  const result = await userToDelete.deleteOne();

  const reply = `Usuario ${result.name} ${result.lastname} con número de identificación ${result.idNumber} eliminado`;

  return res.json(reply);
});

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
