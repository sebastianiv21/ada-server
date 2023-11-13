import { object, string } from 'yup';

const sedeLaboratorioSchema = object({
  nombre: string().required('Ingrese el nombre de la sede'),
  direccion: string().required('Ingrese la dirección de la sede'),
  municipio: string().required(
    'Seleccione el municipio al que pertenece la sede de laboratorio',
  ),
});

export default { sedeLaboratorioSchema };
