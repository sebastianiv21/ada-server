const express = require('express');

const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyJWT = require('../middleware/verifyJWT');

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

module.exports = router;
