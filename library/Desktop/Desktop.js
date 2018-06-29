const mongoose = require("mongoose");

class Desktop {
    async getUserDesktop(user_id){
        const DesktopModel = mongoose.model('Desktop');
        return await DesktopModel.find({ userId: user_id});
    }

    async setIconDesktop(new_icon){
        console.log(new_icon);
        const DesktopModel = mongoose.model('Desktop');
        let newUserDesktop = new DesktopModel(new_icon);
        return await newUserDesktop.save();
    }

    async deleteIconDesktop(userId, iconId){
        const DesktopModel = mongoose.model('Desktop');
        return await DesktopModel.find({ _id:iconId }).remove()


    }

    async editIconDesktop(userId, iconId, name, link){
        const DesktopModel = mongoose.model('Desktop');
        return await DesktopModel.findOneAndUpdate({userId: userId, _id: iconId}, {name, link}, {new: true})
    }

    async uspdateIconNumber(userId, iconId, newNumber){
        const DesktopModel = mongoose.model('Desktop');
        return await DesktopModel.findOneAndUpdate({userId: userId, _id: iconId}, {number: newNumber}, {new: true})
    }
}




module.exports = Desktop;