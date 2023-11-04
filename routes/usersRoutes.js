import { Router } from 'express';
import usersController from '../controllers/usersController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = Router();

// router.use(verifyJWT); // TODO: aplicar este mismo middleware a tests y citas

router
  .route('/')
  .get(verifyJWT, usersController.getAllUsers)
  .post(verifyJWT, usersController.createUser);
router
  .route('/:id')
  .patch(verifyJWT, usersController.updateUser)
  .delete(verifyJWT, usersController.deleteUser);
router.post('/create-admin', usersController.createAdmin);

export default router;
