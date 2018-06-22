const mongoose = require("mongoose");

class Desktop {
    async getUserDesktop(user_id){
        const DesktopModel = mongoose.model('Desktop');
        return await DesktopModel.find({ userId: user_id});
    }

    async setUserDesktop(userId, link, image, name, number){
        const DesktopModel = mongoose.model('Desktop');
        let newUserDesktop = new DesktopModel({
            userId,
            link,
            image,
            name,
            number
        });
        return await newUserDesktop.save();
    }

    async uspdateIconNumber(userId, iconId, newNumber){
        const DesktopModel = mongoose.model('Desktop');
        return await DesktopModel.findOneAndUpdate({userId: userId, _id: iconId}, {number: newNumber}, {new: true})
    }
}




module.exports = Desktop;