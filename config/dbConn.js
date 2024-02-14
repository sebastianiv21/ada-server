/**
 * @fileoverview Configuracion de la conexion a la base de datos.
 * @version 1.0
 */

import mongoose from 'mongoose';

const USER = process.env.DATABASE_USER;
const PWD = process.env.DATABASE_PASSWORD;
const HOST = process.env.DATABASE_HOST;
const DATABASE = process.env.DATABASE_NAME;
const LOCAL_DATABASE = process.env.DATABASE_LOCAL_URI;

const isLocal = [USER, PWD, HOST].some((value) => !value);

const DATABASE_URI = isLocal
  ? `${LOCAL_DATABASE}/${DATABASE}`
  : `mongodb+srv://${USER}:${PWD}@${HOST}/${DATABASE}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    if (!DATABASE) throw new Error('No se ha definido la base de datos');
    await mongoose.connect(DATABASE_URI);
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
