import { object, string } from 'yup';

const pqrsSchema = object({
  tipoDocumento: string().required('Seleccione el tipo de documento'),
  numeroDocumento: string().required('Ingrese el número de documento'),
  nombresApellidos: string().required('Ingrese su nombre completo'),
  email: string()
    .email('Ingrese un correo válido')
    .required('Ingrese su correo electrónico'),
  telefono: string().required('Ingrese su número de teléfono'),
  tipoSolicitud: string().required('Seleccione el tipo de solicitud'),
  descripcion: string().required('Ingrese la descripción de su solicitud'),
});

export default { pqrsSchema };
