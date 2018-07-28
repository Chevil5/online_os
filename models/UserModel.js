const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: String,
    password: String
});

mongoose.model('User', userSchema);