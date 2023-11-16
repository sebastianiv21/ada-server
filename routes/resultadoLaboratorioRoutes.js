import { Router } from 'express';
import controller from '#controllers/resultadoLaboratorioController.js';
import schemas from '#validations/resultadoLaboratorioValidation.js';
import validateSchema from '#middlewares/validateSchema.js';
import verifyJWT from '#middlewares/verifyJWT.js';

const router = Router();

// Rutas para usuarios autenticados
router.use(verifyJWT);

router.route('/').get(controller.getResultadosLaboratorio);

// trae los resultados de laboratorio de un paciente autenticado
router.route('/mis-resultados').get(controller.getMisResultadosLaboratorio);

router.post(
  '/crear',
  validateSchema(schemas.resultadoLaboratorioSchema),
  controller.createResultadoLaboratorio,
);

router
  .route('/:id')
  .get(controller.getResultadoLaboratorioPorId)
  .put(controller.updateResultadoLaboratorio)
  .delete(controller.deleteResultadoLaboratorio);

export default router;
