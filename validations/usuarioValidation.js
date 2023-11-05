import { date, number, object, string } from 'yup';

const adminSchema = object({
  tipoDocumento: string().required('Seleccione el tipo de documento'),
  numeroDocumento: string().required('Ingrese su número de documento'),
  nombres: string().required('Ingrese su nombre'),
  apellidos: string().required('Ingrese sus apellidos'),
  fechaNacimiento: date().required('Ingrese su fecha de nacimiento'),
  genero: string().required('Seleccione el género'),
  tipoSangre: string().required('Seleccione el tipo de sangre'),
  rh: string().required('Seleccione el RH'),
  telefono: number().required('El teléfono es requerido'),
  clave: string()
    .required('La clave es requerida')
    .min(6, 'La clave debe tener al menos 6 caracteres')
    .max(20, 'La clave no puede tener más de 20 caracteres')
    .trim(),
  email: string()
    .email('Ingrese un email válido')
    .required('El email es requerido'),
});

const loginSchema = object({
  email: string()
    .email('Ingrese un email válido')
    .required('El email es requerido'),
  clave: string()
    .required('La clave es requerida')
    .min(6, 'La clave debe tener al menos 6 caracteres')
    .max(20, 'La clave no puede tener más de 20 caracteres')
    .trim(),
});

export default { adminSchema, loginSchema };
