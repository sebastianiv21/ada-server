import { Router } from 'express';
import controller from '#controllers/ordenMedicaController.js';
import schemas from '#validations/pqrsValidation.js';
import validateSchema from '#middlewares/validateSchema.js';
import verifyJWT from '#middlewares/verifyJWT.js';

const router = Router();

router.post(
  '/crear',
  validateSchema(schemas.pqrsSchema),
  controller.createPQRS,
);

// Rutas para usuarios autenticados
router.use(verifyJWT);

router.route('/').get(controller.getAllPQRS);

router
  .route('/:id')
  .get(controller.getPQRSPorId)
  .put(controller.updatePQRS)
  .delete(controller.deletePQRS);

export default router;
