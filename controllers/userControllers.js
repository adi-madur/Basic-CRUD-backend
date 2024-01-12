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
        // if(userExists){
        //     throw new Error("User already exists");
        // }

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

// To find all the users from the database:
exports.getUsers = async (req, res)=>{
    try {
        // Fetching data of all users
        const users = await User.find({});

        // Checking if user Data exists i.e at least one user is present
        if(!users){
            throw new Error("There are no record of users");
        }


        res.status(200).json({
            success: true,
            users
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        // We can get data from body using --"req.body"-- as well as through URL.
        // We can get through URL in the following syntax
        const userId = req.params.id; //--> parameters - id
        const user = await User.findByIdAndDelete(userId);
        req.status(200).json({
            success:true,
            message: "User deleted successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}