const Park = require("../models/parkmodel");


const getAllParks = async (req, res, next) => {
    // try {
        console.log("req.user", req.user);
    if (!req.user){
        res.status(403);
        next(new Error("you are not authorized"));
    }else {

        const parks = await Park.find({});
        res.status(200).json(parks);
        // }catch(err){
    
        // }
    }    
};

const addNewPark = async (req, res, next) => {

    if (!req.user){
        res.status(403);
        next(new Error("you are not authorized"));
    }else {
        if (req.user.isAdmin){
        const newPark = await Park.create(req.body);
        res.status(201).json(newPark);
        }else {
        next(new Error("only admins are authorized to add new park"));
        }
        // need to know is this user a admin? 
        // if so we can add a new park
        // if not create an error an use next to send on to error handler
    }
};

module.exports = { getAllParks, addNewPark }

