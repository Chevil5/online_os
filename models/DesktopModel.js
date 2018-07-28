const mongoose = require('mongoose');

const desktopItemSchema = mongoose.Schema({
    num: Number,
    link: String
});


const desktopSchema = mongoose.Schema({
    userId: String,
    link: String,
    image: String,
    name: String,
    number: Number,
    type: { type: Number, default: 0},
    dir_id: { type: String, default: 0}
});

mongoose.model('Desktop', desktopSchema);