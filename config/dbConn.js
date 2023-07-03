/**
 * @fileoverview Configuracion de la conexion a la base de datos.
 * @version 1.0
 */

const mongoose = require('mongoose');

const USER = process.env.DATABASE_USER;
const PWD = process.env.DATABASE_PASSWORD;
const HOST = process.env.DATABASE_HOST;
const DATABASE = process.env.DATABASE_NAME;

const DATABASE_URI = `mongodb+srv://${USER}:${PWD}@${HOST}/${DATABASE}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
