const express = require('express');

const router = express.Router();
const roles = require('../controllers/rolController');
const verifyJWT = require('../middleware/verifyJWT');

// router.use(verifyJWT); // TODO: aplicar este mismo middleware a tests y citas

router.route('/').get(roles.getRoles);

module.exports = router;
