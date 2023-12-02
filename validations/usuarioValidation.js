import { date, number, object, ref, string } from 'yup';

const claveSchema = string()
  .required('La contraseña es requerida')
  .min(6, 'La contraseña debe tener al menos 6 caracteres')
  .max(20, 'La contraseña no puede tener más de 20 caracteres');

const cambiarClaveSchema = object({
  clave: claveSchema,
  confirmarClave: string()
    .required('La confirmación de la contraseña es requerida')
    .oneOf([ref('clave')], 'Las contraseñas no coinciden'),
});

const adminSchema = cambiarClaveSchema.shape({
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
  telefono: number()
    .required('El teléfono es requerido')
    .typeError('Ingrese un teléfono válido'),
  email: string()
    .email('Ingrese un correo electrónico válido')
    .required('El correo electrónico es requerido'),
});

const usuarioSchema = adminSchema.shape({
  rol: string().required('Seleccione el rol'),
  estadoCivil: string(),
  eps: string(),
  telefono2: number().typeError('Ingrese un teléfono válido'),
  direccion: string(),
  municipio: string(),
  contacto: object({
    nombres: string(),
    apellidos: string(),
    parentesco: string(),
    telefono: number().typeError('Ingrese un teléfono válido'),
  }),
});

const recuperarClaveSchema = object({
  email: string()
    .email('Ingrese un correo electrónico válido')
    .required('El correo electrónico es requerido'),
});

const loginSchema = recuperarClaveSchema.shape({
  clave: claveSchema,
});

export default {
  adminSchema,
  usuarioSchema,
  loginSchema,
  recuperarClaveSchema,
  cambiarClaveSchema,
};
