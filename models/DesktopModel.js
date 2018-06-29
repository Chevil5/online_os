const mongoose = require('mongoose');

const desktopItemSchema = mongoose.Schema({
    num: Number,
    link: String
});


const desktopSchema = mongoose.Schema({
    userId: Number,
    link: String,
    image: String,
    name: String,
    number: Number,
    type: Number,
    dir_id: String
});

mongoose.model('Desktop', desktopSchema);