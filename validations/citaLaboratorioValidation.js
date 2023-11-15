import { date, object, string } from 'yup';

const citaLaboratorioSchema = object({
  sedeLaboratorio: string().required('Seleccione la sede del laboratorio'),
  estadoCitaLaboratorio: string().required('Seleccione el estado de la cita'),
  ordenMedica: string().required('Seleccione la orden médica'),
  fecha: date()
    .min(new Date(), 'La fecha de la cita no puede ser menor a la fecha actual')
    .required('Seleccione el tipo de prueba de laboratorio'),
});

export default { citaLaboratorioSchema };
