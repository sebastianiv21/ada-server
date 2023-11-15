import { Router } from 'express';
import controller from '#controllers/citaLaboratorioController.js';
import schemas from '#validations/citaLaboratorioValidation.js';
import validateSchema from '#middlewares/validateSchema.js';
import verifyJWT from '#middlewares/verifyJWT.js';

const router = Router();

// Rutas para usuarios autenticados
router.use(verifyJWT);

router.route('/').get(controller.getCitasLaboratorio);

// trae las citas de laboratorio de un paciente autenticado
router.route('/mis-citas').get(controller.getMisCitasLaboratorio);

router.post(
  '/crear',
  validateSchema(schemas.citaLaboratorioSchema),
  controller.createCitaLaboratorio,
);

router
  .route('/:id')
  .put(controller.updateCitaLaboratorio)
  .delete(controller.deleteCitaLaboratorio);

export default router;
