const {getAllParks, addNewPark, updatePark, commentPark, updateComment, deletePark, deleteComment} = require('../controllers/parkController');
const express = require("express");
const authorize = require('../middleware/auth');

const router = express.Router();

router.get('/', authorize, getAllParks);

router.post('/', authorize, addNewPark);

router.put('/:id', authorize, updatePark);

router.put('/:id/comments', authorize, commentPark);

router.put('/:id/comments/:commentID', authorize, updateComment);

router.delete('/:id', authorize, deletePark);

router.delete('/:id/comments/:commentID', authorize, deleteComment);

module.exports = router;