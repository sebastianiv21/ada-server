import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { existsSync, promises as fsPromises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss'); // formato de fecha 20210720 12:00:00
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`; // uuid es un identificador único
  const logsDirPath = path.join(__dirname, '..', 'logs');

  try {
    if (!existsSync(logsDirPath)) {
      // si no existe el directorio logs
      await fsPromises.mkdir(logsDirPath); // lo crea
    }
    await fsPromises.appendFile(
      // agrega el logItem al archivo logFileName
      path.join(__dirname, '..', 'logs', logFileName), // path del archivo
      logItem, // contenido del archivo
    );
  } catch (error) {
    console.error(error); // si hay un error lo muestra en consola
  }
};

export const logger = (req, res, next) => {
  // middleware que registra los eventos
  const { method, url, headers } = req;
  const logFileName = 'reqLog.log';

  logEvents(`${method}\t${url}\t${headers.origin}`, logFileName); // registra el evento

  console.log(`${method} ${req.path}`); // muestra el evento en consola

  next(); // pasa al siguiente middleware
};

// export default { logEvents, logger };
