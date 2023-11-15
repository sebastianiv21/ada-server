import { number, object, string } from 'yup';

const resultadoLaboratorioSchema = object({
  citaLaboratorio: string().required('Seleccione la cita de laboratorio'),
  resultado: number().required('Ingrese el resultado del laboratorio'),
});

export default { resultadoLaboratorioSchema };
