import Place from '../models/Place.js';

/**
 * @route   GET /places
 * @desc    Trae todos los departamentos
 * @access  Private
 * Devuelve la lista de departamentos de Colombia
 */
const getAllDepartamentos = async (req, res) => {
  // Se usa aggregate para hacer un group by y traer sólo un departamento por id
  const departamentos = await Place.aggregate([
    {
      $group: {
        _id: '$idDepartamento',
        departamento: { $first: '$departamento' },
      },
    },
  ]);
  res.json(departamentos);
};

/**
 * @route   GET /places/:departamento
 * @desc    Trae todos los municipios de un departamento
 * @access  Private
 * Devuelve la lista de municipios de un departamento de Colombia
 */
const getMunicipiosByDepartamento = async (req, res) => {
  const municipios = await Place.find(
    { departamento: req.params.departamento },
    'idMunicipio municipio',
  ).exec();
  res.json(municipios);
};

export { getAllDepartamentos, getMunicipiosByDepartamento };
