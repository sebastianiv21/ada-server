import { Router } from 'express';
import {
  getAllDepartamentos,
  getMunicipiosByDepartamento,
} from '#controllers/placesController.js';

const router = Router();

router.route('/').get(getAllDepartamentos);
router.route('/:departamento').get(getMunicipiosByDepartamento);

export default router;
