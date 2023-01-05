const Park = require("../models/parkmodel");


const getAllParks = async (req, res, next) => {
    // try {
       
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

const updatePark = async (req, res, next) => {
    
    if (!req.user){
        res.status(403);
        next(new Error("you are not authorized"));
    }else {
        if (req.user.isAdmin){
        const updatedPark = await Park.findByIdAndUpdate(req.params.id,req.body);
        res.status(201).json(updatedPark);
        }else {
        next(new Error("only admins are authorized to update park details"));
        }
        // need to know is this user a admin? 
        // if so we can add a new park
        // if not create an error an use next to send on to error handler
    }
};


const deletePark = async (req, res, next) => {
    
    if (!req.user){
        res.status(403);
        next(new Error("you are not authorized"));
    }else {
        if (req.user.isAdmin){
        const deletePark = await Park.findByIdAndRemove(req.params.id);
        res.status(201).json(deletePark);
        }else {
        next(new Error("only admins are authorized to update park details"));
        }
        
    }
};

const commentPark = async (req, res, next) => {
   
    if (!req.user){
        res.status(403);
        next(new Error("please log in"));
    }else {
        
       const updatedPark = await Park.findByIdAndUpdate(req.params.id, {
        $push:{
            comments:{username:req.user.name, text:req.body.text, userId: req.user._id}
        }
       });
       res.status(201).json(updatedPark);
    }
};

const updateComment = async (req, res, next) => {

    if (!req.user){
        res.status(403);
        next(new Error("please log in"));
    }else {
        const park = await Park.findById(req.params.id);
        let index;
        for (let i=0; i<park.comments.length; i++){
         const comment = park.comments[i]
         
         
         if (comment.commentID.toString() === req.params.commentID){
            index = i
            break
         }
        };
        console.log("commentindex", index);
       const updatedPark = await Park.findByIdAndUpdate(req.params.id, {
        $set:{
           [`comments.${index}.text`]: req.body.text
        }
       });
       // look at set logic 
       res.status(201).json(updatedPark);
    }
}

const deleteComment = async (req, res, next) => {
   
    if (!req.user){
        res.status(403);
        next(new Error("please log in"));
    }else {
        
       const deleteComment = await Park.findByIdAndUpdate(req.params.id, {
        $pull:{
            comments:{commentID: req.params.commentID}
        }
       });
       res.status(201).json(deleteComment);
    }
};



//update comment and delete a comment then admin delete park 
module.exports = { getAllParks, addNewPark, updatePark, commentPark, updateComment, deletePark, deleteComment }

