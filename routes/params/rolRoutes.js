import { Router } from 'express';
import getRoles from '#controllers/params/rolController.js';
import verifyJWT from '#middlewares/verifyJWT.js';

const router = Router();

// router.use(verifyJWT);

router.route('/').get(getRoles);

export default router;
