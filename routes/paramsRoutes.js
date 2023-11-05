import { Router } from 'express';
import controller from '#controllers/paramsController.js';
import verifyJWT from '#middlewares/verifyJWT.js';

const router = Router();

// router.use(verifyJWT);

router.route('/').get(controller.getParams);

router.route('/:parametro').get(controller.getParamIdPorNombre);

export default router;
