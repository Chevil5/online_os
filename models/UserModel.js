const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: String,
    password: String,
    image: {type: String}
});

mongoose.model('User', userSchema);