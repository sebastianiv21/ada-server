import { Router } from 'express';
import getParams from '#controllers/paramsController.js';
import verifyJWT from '#middlewares/verifyJWT.js';

const router = Router();

// router.use(verifyJWT);

router.route('/').get(getParams);

export default router;
