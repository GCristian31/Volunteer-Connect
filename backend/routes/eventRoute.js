const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController'); 

router.post('/create', eventController.create);
router.get('/getById/:id', eventController.getEventById);
router.delete('/delete/:id', eventController.deleteEventById);
router.put('/update/:id', eventController.updateEventById);
router.get("/all",eventController.getAllEvents);
router.get("/next-event",eventController.getNextEvent);


module.exports = router;