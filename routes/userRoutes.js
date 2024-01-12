const express = require('express'); // Routes have special syntax, hence we need express
// Controllers shouldn't be used directly in main file. They should be used in routes
const { home, about, createUser, getUsers, deleteUser, editUser } = require('../controllers/userControllers.js') // Importing all the controllers here


// Just like we create instance of express for app using --"const app = express()"--
// We create router by: 
const router = express.Router();
// Note: R of router is always capital

// Just like we do routing by app.get('/', ()=>{})
// We route using router
router.get('/', home);
router.get('/about', about);
router.post('/createUser', createUser);
router.get('/getUsers', getUsers );
router.delete('/deleteUser/:id', deleteUser);
router.put('/editUser/:id', editUser);

module.exports = router;
// Now this routes should be used in main file, instead of directly using logic/controllers