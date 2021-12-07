const router = require('express').Router();
//Bring in the events actions from controller
const events = require("../controllers/eventController");
const {userAuth} = require('../utils/Auth');

// Create a new Event
router.post("/", userAuth, events.create);

// Retrieve all events
router.get("/", events.findAll);

// Retrieve a single Event with id
router.get("/:id", events.findOne);
// Retrieve a single Event with id

router.get("/user/:id", events.findUserEvents);

// Update an Event with id
router.put("/:id", userAuth, events.update);

// Delete an Event with id
router.delete("/:id", events.delete);

// Delete all Events
router.delete("/", events.deleteAll);



module.exports = router;