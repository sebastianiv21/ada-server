import { Router } from 'express';
import getEstados from '#controllers/params/estadoCitaLabController.js';
import verifyJWT from '#middlewares/verifyJWT.js';

const router = Router();

// router.use(verifyJWT);

router.route('/').get(getEstados);

export default router;
