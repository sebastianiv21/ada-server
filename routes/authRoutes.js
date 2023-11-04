import { Router } from 'express';
import { login, logout, refresh } from '#controllers/authController.js';
import loginLimiter from '#middlewares/loginLimiter.js';

const router = Router();

router.route('/').post(loginLimiter, login);

router.route('/refresh').get(refresh);

router.route('/logout').post(logout);

export default router;
