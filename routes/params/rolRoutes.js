import { Router } from 'express';

const router = Router();
import { getRoles } from '../../controllers/params/rolController.js';
import verifyJWT from '../../middleware/verifyJWT.js';

// router.use(verifyJWT); // TODO: aplicar este mismo middleware a tests y citas

router.route('/').get(getRoles);

export default router;
