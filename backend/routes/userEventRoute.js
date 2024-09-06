const express = require('express');
const { createUserEvent, getEventsByUserId, getUsersByEventName } = require('../controllers/userEventController');
const router = express.Router();


router.post('/create', createUserEvent);
router.get('/events/:userId',getEventsByUserId);
router.post('/users', getUsersByEventName);


module.exports = router;
