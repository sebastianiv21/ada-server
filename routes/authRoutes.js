import { Router } from 'express';
import { login, logout, refresh } from '#controllers/authController.js';
import loginLimiter from '#middlewares/loginLimiter.js';
import middleware from '#middlewares/usuarioMiddleware.js';
import schemas from '#validations/usuarioValidation.js';

const router = Router();

router
  .route('/')
  .post(middleware.validateSchema(schemas.loginSchema), loginLimiter, login);

router.route('/refresh').get(refresh);

router.route('/logout').post(logout);

export default router;
