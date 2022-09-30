const express = require('express');
const { updateUser } = require('../controller/userController');
const VerifyToken = require('../middleware/VerifyToken');
const router = express.Router();

router.put('/update/:id',VerifyToken,updateUser);


module.exports = router ;