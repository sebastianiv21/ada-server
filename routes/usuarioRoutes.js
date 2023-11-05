import { Router } from 'express';
import controller from '#controllers/usuarioController.js';
import verifyJWT from '#middlewares/verifyJWT.js';

const router = Router();

router.post('/crear-admin', controller.createAdmin);

router.use(verifyJWT);

// router.route('/').get(controller.getUsuarios).post(controller.createUsuario);
//
// router
//   .route('/:id')
//   .put(controller.updateUsuario)
//   .delete(controller.deleteUsuario);

export default router;
