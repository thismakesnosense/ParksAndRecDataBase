const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    // {name:"John",email:"john234@gamil.com",password:"1234"} =====> req.body

    const { name, email, password } = req.body;

    // try {
    const userFound = await User.findOne({ email: email })
    // console.log("user found", userFound);
    if (userFound) {
        res.status(400);
        next(new Error("user name already exists"));
    } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = await User.create({ name, email, password:hash });
        //delets password off newUser return data
        delete newUser.password;
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        res.status(201).json({
            _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                favorites: newUser.favorites,
                token: token
        });
    }
    // } catch (err) {
    //     console.log(err)
    //     res.status(500).json(err);
    // };
};

const login = async (req, res, next) => {

    const { email, password } = req.body;

    const userFound = await User.findOne({ email: email })

    if (!userFound) {
        res.status(404);
        next(new Error("no user with this email found"));

    } else {


        //  checking password with boolean
        const match = await bcrypt.compare(password, userFound.password);
     
        if (!match) {
            res.status(401);

            next(new Error("wrong password"));

        } else{
            
            delete userFound.password;
            console.log(userFound);
            const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET);
            res.status(201).json({
                _id: userFound._id,
                name: userFound.name,
                email: userFound.email,
                isAdmin: userFound.isAdmin,
                favorites: userFound.favorites,
                token: token
                
            });
        };

        

    };



};

module.exports = { register, login };