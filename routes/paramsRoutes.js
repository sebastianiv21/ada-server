import { Router } from 'express';
import controller from '#controllers/paramsController.js';

const router = Router();

router.route('/').get(controller.getParams);

router.route('/:parametro').get(controller.getParamIdPorNombre);

export default router;
