const {register, login, getUserDetails, addFavorite} = require('../controllers/userController');
const express = require("express");
const authorize = require('../middleware/auth');

const router = express.Router();

router.post('/', register);

router.post('/login', login);

router.get('/details', authorize, getUserDetails);

router.put('/details', authorize, addFavorite);


module.exports = router;

