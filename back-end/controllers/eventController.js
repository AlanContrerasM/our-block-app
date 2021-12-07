const Event = require('../models/Event');
const User = require('../models/User');

// Create and Save a new Tutorial
exports.create = async (req, res) => {

    try{
        const {title, description, coordinates, category} = req.body;
        // console.log(req.user);
        
        const newEvent = new Event({
            title,
            description,
            creator: {_id: req.user._id, username: req.user.username},
            coordinates,
            category
        });

        await newEvent.save();
        

        //if event was created succesfully update user to add event id to his ids.
        await User.findByIdAndUpdate(req.user._id,
            {$push: {"events": newEvent._id}},
            {safe: true, upsert: true, new : true});

        return res.status(201).json({
            message: "Event was created",
            success: true,
            newEvent
        });

    }catch(err){
        console.log(err);
        res.status(400).send({err, message: "wrong data sent to create new event"});

    }
    
};

// Retrieve all Tutorials from the database.
// "/"
exports.findAll = async (req, res) => {
    try{
        

        const events = await Event.find();
        
        return res.status(200).json({
            message: "Events were retrieved",
            success: true,
            events
        });

    }catch(err){
        console.log(err);
        res.status(400).send({err, message: "wrong data sent to create new event"});

    }
  
};

exports.findUserEvents = async (req, res) =>{
    try{
        const {id} = req.params;

        const events = await Event.find({"creator._id": id});

        return res.status(200).json({
            message: "Events from user were retrieved",
            success: true,
            events
        });

    }catch(err){
        console.log(err);
        res.status(400).send({err, message: "wrong data sent to create new event"});

    }
}

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {

    try{
        const {id} = req.params;

        //assuming everything passed was valid
        let event = await Event.findById(id);
        // console.log(event);
        
        if(!event.creator._id.equals(req.user._id)){
            throw new Error("user doesnt match creator of event");
        }
        
        const updatedEvent = await Event.findByIdAndUpdate(id,
            {...req.body},
            {runValidators: true, safe: true, new : true});

        return res.status(200).json({
            message: "Event was updated",
            success: true,
            updatedEvent
        });
        
        // const event = await Event.findByIdAndUpdate(id, {...req.body}, {new : true});
        

    }catch(err){
        console.log(err);
        res.status(400).send({err, message: "wrong data sent to update event"});

    }
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};
