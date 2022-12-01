const {getAllParks, addNewPark} = require('../controllers/parkController');
const express = require("express");
const authorize = require('../middleware/auth');

const router = express.Router();

router.get('/', authorize, getAllParks);

router.post('/', authorize, addNewPark);

module.exports = router;