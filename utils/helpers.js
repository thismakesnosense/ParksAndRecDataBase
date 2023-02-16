// write a funtion that takes an array of comments, a comment id, and a user id as inputs and returns a boolean.
// should find the comment with given comment id and return true given user id matches the user id of found comment
// if they do not match return false

const userMatch = (providedCommentID, providedUserId, commentsArray) => {
    
     for (i=0; i<commentsArray.length; i++){
        const comment = commentsArray[i];
        if (providedCommentID === comment.commentID.toString() && comment.userId.toString() === providedUserId.toString()){
            return true;
        }

        
     }
     return false;
};



module.exports={userMatch};