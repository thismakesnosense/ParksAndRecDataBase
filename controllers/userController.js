const User = require("../models/usermodel");

const register = async (req, res) => {
    // {name:"John",email:"john234@gamil.com",password:"1234"} =====> req.body

    const { name, email, password } = req.body;

    try {
        const userFound = await User.findOne({ email: email })
        console.log("user found", userFound);
        if (userFound) {
            throw new Error("user name already exists")
        } else {
            const newUser = await User.create({ name, email, password });
            res.status(201).json(newUser);
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    };
};