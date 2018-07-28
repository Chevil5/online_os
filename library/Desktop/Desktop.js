const mongoose = require("mongoose");

class Desktop {
    async getUserDesktop(userId, dir_id){
        const DesktopModel = mongoose.model('Desktop');
        let result = {};
        result.data = await DesktopModel.find({$and: [{userId}, {dir_id}]});
        result.dir_id = dir_id;
        if(dir_id !== "0"){
            result.dir_info = await DesktopModel.find({$and: [{userId}, {_id: dir_id}]});
        }
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

        const item_target_info =  await DesktopModel.find({$and: [{userId}, {dir_id}, {number: newNumber}]});

        if(item_target_info.length !== 0){
            if(item_target_info[0].type === 0){
                let newUserDesktop = new DesktopModel({userId, dir_id, type: '1', number: newNumber, link:"", image:"", name: 'New dir'});
                await newUserDesktop.save();

                await DesktopModel.findOneAndUpdate({userId: userId, _id: iconId}, {number: 0, dir_id: newUserDesktop._id}, {new: true});
                return await DesktopModel.findOneAndUpdate({userId: userId, _id: item_target_info[0]._id}, {number: 1, dir_id: newUserDesktop._id}, {new: true})
            } else {
                const dir_data =  await DesktopModel.find({$and: [{userId}, {dir_id:item_target_info[0]._id}]}).sort('number');
                if(dir_data.length === 0){

                    return await DesktopModel.findOneAndUpdate({userId: userId, _id: iconId}, {number: 0, dir_id: item_target_info[0]._id}, {new: true})
                } else {
                    for (let i=0; i<=dir_data.length;i++){
                        if(typeof dir_data[i] === 'undefined' || Number(i) !== Number(dir_data[i].number)){
                            return await DesktopModel.findOneAndUpdate({userId: userId, _id: iconId}, {number: i, dir_id: item_target_info[0]._id}, {new: true})
                        }
                    }
                }
            }
        } else {
            return await DesktopModel.findOneAndUpdate({userId: userId, _id: iconId}, {number: newNumber, dir_id}, {new: true})
        }
    }
}




module.exports = Desktop;