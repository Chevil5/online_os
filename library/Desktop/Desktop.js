const mongoose = require("mongoose");

class Desktop {
    async getUserDesktop(userId, dir_id){
        const DesktopModel = mongoose.model('Desktop');
        let result = {};
        result.data = await DesktopModel.find({$and: [{userId}, {dir_id}]});
        result.dir_id = dir_id;
        return result;
    }

    async setIconDesktop(new_icon){
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

    async uspdateIconNumber(userId, iconId, newNumber, dir_id){
        const DesktopModel = mongoose.model('Desktop');
        return await DesktopModel.findOneAndUpdate({userId: userId, _id: iconId}, {number: newNumber, dir_id}, {new: true})
    }
}




module.exports = Desktop;