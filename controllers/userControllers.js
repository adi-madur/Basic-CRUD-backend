// Controllers are just logic. BUt it is suggested that they shouldn't be directly used in the main file.
// Instead they should be used in routes.

exports.home = (req, res) => {
    res.send("Hello World");
}

exports.about = (req, res) =>{
    res.send("This is about page");
}

// The below logic is of adding user data into the Database
// Importing the user model. And it's name should start with capital
const User = require('../models/userModel.js');

exports.createUser = async (req, res) => { // Since database is in another continent, it takes time to process. Hence async
    // First we need to extract info which is sent from front-end
    // The keys used should be matched accordinly in front-end to the names in back-end in object
    try {
        const {name, email} = req.body;

        // If name and email section are empty:
        if(!name || !email) {
            throw new Error("Name and Email are required");
        }

        // Checking if email already exists in the database
        const userExists = User.findOne({email});
        if(userExists){
            throw new Error("User already exists");
        }

        const user = await User.create({ // ---> the data of user as name and email is stored in a variable --"user"-- with small letter u
            name, // --> this is name: name(Aditya); // -ES6 feature is used to shorten this-
            email // --> this is email: email(am@gmail.com);
        })

        // since data is successfully transfered we need confirmation (ack)
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
        })
    } 
}