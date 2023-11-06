import { object, string } from 'yup';

const ordenMedicaSchema = object({
  medico: string().required('Seleccione el médico que ordena'),
  paciente: string().required('Seleccione el paciente'),
  tipoPrueba: string().required('Seleccione el tipo de prueba'),
});

export default { ordenMedicaSchema };
