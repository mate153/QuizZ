const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({    
    Email: String,
    UserName: String,
    Password: String,
});

module.exports = model('Userdata', userSchema);