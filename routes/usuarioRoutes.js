import { Router } from 'express';
import controller from '#controllers/usuarioController.js';
import schemas from '#validations/usuarioValidation.js';
import validateSchema from '#middlewares/validateSchema.js';
import verifyJWT from '#middlewares/verifyJWT.js';

const router = Router();

router.post(
  '/crear-admin',
  validateSchema(schemas.adminSchema),
  controller.createAdmin,
);

// Rutas para usuarios autenticados
router.use(verifyJWT);

router.route('/').get(controller.getUsuarios);

router.post(
  '/crear',
  validateSchema(schemas.usuarioSchema),
  controller.createUsuario,
);

router
  .route('/:id')
  .put(controller.updateUsuario)
  .delete(controller.deleteUsuario);

export default router;
