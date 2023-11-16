import { Router } from 'express';
import {
  cambiarClave,
  login,
  logout,
  recuperarClave,
  refresh,
} from '#controllers/authController.js';
import loginLimiter from '#middlewares/loginLimiter.js';
import validateSchema from '#middlewares/validateSchema.js';
import schemas from '#validations/usuarioValidation.js';

const router = Router();

router
  .route('/')
  .post(validateSchema(schemas.loginSchema), loginLimiter, login);

router.route('/refresh').get(refresh);

router.route('/logout').post(logout);

router
  .route('/recuperar-clave')
  .post(validateSchema(schemas.recuperarClaveSchema), recuperarClave);

router
  .route('/cambiar-clave/:token')
  .post(validateSchema(schemas.cambiarClaveSchema), cambiarClave);

export default router;
