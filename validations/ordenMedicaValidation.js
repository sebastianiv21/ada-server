import { object, string } from 'yup';

const ordenMedicaSchema = object({
  medico: string().required('Seleccione el médico que ordena'),
  paciente: string().required('Seleccione el paciente'),
  tipoPruebaLaboratorio: string().required('Seleccione el tipo de prueba de laboratorio'),
});

export default { ordenMedicaSchema };
