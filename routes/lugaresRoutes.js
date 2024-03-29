import { Router } from 'express';
import controller from '#controllers/lugaresController.js';
import verifyJWT from '#middlewares/verifyJWT.js';

const router = Router();

router.use(verifyJWT);

router
  .route('/departamentos')
  // obtiene la lista de departamentos
  .get(controller.getDepartamentos);

router
  .route('/municipios/:departamentoId')
  // obtiene la lista de municipios de un departamento
  .get(controller.getMunicipiosPorDepartamentoId);

export default router;
