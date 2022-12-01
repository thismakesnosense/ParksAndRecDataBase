const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");


const authorize = async (req, res, next) => {
console.log('req.headers',req.headers.authorization);
const token = req.headers.authorization.slice(7);
try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const userFound = await User.findById(decoded.id);
    if (userFound){
      req.user = userFound  
    }
    
    next()
}catch(err){
    console.log("err", err);
    next()

}

};

module.exports = authorize;