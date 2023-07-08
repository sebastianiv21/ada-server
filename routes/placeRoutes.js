const express = require('express');
const placesController = require('../controllers/placesController');

const router = express.Router();

router.route('/').get(placesController.getAllDepartamentos);
router
  .route('/:departamento')
  .get(placesController.getMunicipiosByDepartamento);

module.exports = router;
