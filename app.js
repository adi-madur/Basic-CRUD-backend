// We use below code to import and export it for code maintainability

require('dotenv').config(); // So that we can use env variables in our server.
const express = require('express'); //Importing express
const connectToDb = require('./config/db.js'); // Importing Database connection from db.js
const app = express(); // Creating instance of express. Just like creating a object for a class.
const cors = require('cors'); // Cross Origin Request to allow URL's of front-end, back-end or database to communicate with each other.

// Database connection {Should be done before routing of the server}
connectToDb();

// -------Express Middleware----- // Used to send data while requesting like POST request.
// Middleware's here are in the syntax of app.use()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// ---------------------------


// Importing routes to use controllers
const userRoutes = require('./routes/userRoutes.js');
// Routing all routes are in just one variable --"userRoutes"-- here. But they are routed accordingly in routes files.
app.use('/', userRoutes);
// We used --"app.use"-- because there are get and post routes in routing files. And common one to use for them is use syntax 

module.exports = app; //Exporting it to use in a main module.