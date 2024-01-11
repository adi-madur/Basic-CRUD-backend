const mongoose = require('mongoose');

// Structure of the user Schema :
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Name is Required*'],  // --------> This is required section
        trim: true, // -----------> Trims the empty spaces at last
        maxLength: [25, 'Name must be less than 25 characters']
    },
    email : {
        type: String,
        required: [true, 'E-mail is required'],
        unique: true
    }
})

module.exports = mongoose.model("User", userSchema);
// Unlike normal exporting, schemas are exported like mentioned above.
// The --"User"-- indicates that the schema is used for USER and the used schema is named --"userSchema"--