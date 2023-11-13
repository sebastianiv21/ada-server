import { Router } from 'express';
import controller from '#controllers/sedeLaboratorioController.js';
import schemas from '#validations/sedeLaboratorioValidation.js';
import validateSchema from '#middlewares/validateSchema.js';
import verifyJWT from '#middlewares/verifyJWT.js';

const router = Router();

// Rutas para usuarios autenticados
router.use(verifyJWT);

router.route('/').get(controller.getSedesLaboratorio);

router.post(
  '/crear',
  validateSchema(schemas.sedeLaboratorioSchema),
  controller.createSedeLaboratorio,
);

router
  .route('/:id')
  .put(controller.updateSedeLaboratorio)
  .delete(controller.deleteSedeLaboratorio);

export default router;
