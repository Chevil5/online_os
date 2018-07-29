const mongoose = require("mongoose");

class User {
    async change_background(user_id, image){
        const UserModel = mongoose.model('User');
        return await UserModel .findOneAndUpdate({_id: user_id}, {image}, {new: true})
    }
}

module.exports = User;