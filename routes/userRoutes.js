const {register, login} = require('../controllers/userController');
const express = require("express");

const router = express.Router();

router.post('/', register);

router.post('/login', login)


module.exports = router;

