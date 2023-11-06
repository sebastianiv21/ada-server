import { Router } from 'express';
import controller from '#controllers/ordenMedicaController.js';
import schemas from '#validations/ordenMedicaValidation.js';
import validateSchema from '#middlewares/validateSchema.js';
import verifyJWT from '#middlewares/verifyJWT.js';

const router = Router();

// Rutas para usuarios autenticados
router.use(verifyJWT);

router.route('/').get(controller.getOrdenesMedicas);

// trae las ordenes medicas de un paciente autenticado
router.route('/mis-ordenes').get(controller.getMisOrdenesMedicas);

router.post(
  '/crear',
  validateSchema(schemas.ordenMedicaSchema),
  controller.createOrdenMedica,
);

router
  .route('/:id')
  .put(controller.updateOrdenMedica)
  .delete(controller.deleteOrdenMedica);

export default router;
