import { date, number, object, string } from 'yup';

const adminSchema = object({
  tipoDocumento: string().required(),
  numeroDocumento: string().required(),
  nombres: string().required(),
  apellidos: string().required(),
  fechaNacimiento: date().required(),
  genero: string().required(),
  tipoSangre: string().required(),
  rh: string().required(),
  telefono: number().required(),
  clave: string().required(),
  email: string().email().required(),
});

export default { adminSchema };
