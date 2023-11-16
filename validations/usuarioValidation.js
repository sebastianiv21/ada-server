import { date, number, object, ref, string } from 'yup';

const claveSchema = string()
  .required('La clave es requerida')
  .min(6, 'La clave debe tener al menos 6 caracteres')
  .max(20, 'La clave no puede tener más de 20 caracteres');

const adminSchema = object({
  tipoDocumento: string().required('Seleccione el tipo de documento'),
  numeroDocumento: string().required('Ingrese su número de documento'),
  nombres: string().required('Ingrese su nombre'),
  apellidos: string().required('Ingrese sus apellidos'),
  fechaNacimiento: date()
    .max(
      new Date(),
      'La fecha de nacimiento no puede ser mayor a la fecha actual',
    )
    .required('Ingrese su fecha de nacimiento'),
  genero: string().required('Seleccione el género'),
  tipoSangre: string().required('Seleccione el tipo de sangre'),
  rh: string().required('Seleccione el RH'),
  telefono: number().required('El teléfono es requerido'),
  clave: claveSchema,
  email: string()
    .email('Ingrese un email válido')
    .required('El email es requerido'),
});

const usuarioSchema = adminSchema.shape({
  rol: string().required('Seleccione el rol'),
  estadoCivil: string(),
  eps: string(),
  telefono2: number(),
  direccion: string(),
  municipio: string(),
  contacto: object({
    nombres: string(),
    apellidos: string(),
    parentesco: string(),
    telefono: number(),
  }),
});

const recuperarClaveSchema = object({
  email: string()
    .email('Ingrese un email válido')
    .required('El email es requerido'),
});

const loginSchema = recuperarClaveSchema.shape({
  clave: claveSchema,
});

const cambiarClaveSchema = object({
  clave: claveSchema,
  confirmarClave: string()
    .required('La confirmación de la clave es requerida')
    .oneOf([ref('clave')], 'Las contraseñas no coinciden'),
});

export default {
  adminSchema,
  usuarioSchema,
  loginSchema,
  recuperarClaveSchema,
  cambiarClaveSchema,
};
