import { Router } from 'express';
import controller from '#controllers/usuarioController.js';
import schemas from '#validations/usuarioValidation.js';
import middleware from '#middlewares/usuarioMiddleware.js';
import verifyJWT from '#middlewares/verifyJWT.js';

const router = Router();

router.post(
  '/crear-admin',
  middleware.validAdmin(schemas.adminSchema),
  controller.createAdmin,
);

router.use(verifyJWT);

// router.route('/').get(controller.getUsuarios).post(controller.createUsuario);
//
// router
//   .route('/:id')
//   .put(controller.updateUsuario)
//   .delete(controller.deleteUsuario);

export default router;
