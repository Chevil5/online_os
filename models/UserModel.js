const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: String,
    password: String,
    image: {type: String, default: '/images/desktop.jpg'}
});

mongoose.model('User', userSchema);