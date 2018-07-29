const Desktop = require('../library/Desktop/Desktop');
const User = require('../library/User');
const axios = require("axios");
const cheerio = require("cheerio");
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');


module.exports = app => {


    app.get('/desktop/update_icon_number', async (req,res) => {
        const user_id = req.user._id;
        const icon_id = req.query.icon_id;
        const number = req.query.new_number;
        const dir_id = req.query.dir_id;

        let desktop = new Desktop();

        let updated = await desktop.uspdateIconNumber(user_id, icon_id, number, dir_id);
        const users_desktop = await desktop.getUserDesktop(user_id, dir_id);

        res.send(users_desktop)
    });

    app.post('/desktop/icon/edit', async (req,res) => {
        const user_id = req.user._id;
        const _id = req.query.id;
        const name = req.query.name;
        const link = req.query.link;

        let desktop = new Desktop();

        let updated = await desktop.editIconDesktop(user_id, _id, name, link);
        const users_desktop = await desktop.getUserDesktop(user_id, req.query.dir_id);

        res.send(users_desktop)
    });

    app.post('/desktop/icon/add', async (req,res) => {
        let new_icon = {
            userId: req.user._id,
            dir_id: req.query.dir_id,
            type: req.query.type,
            number: req.query.number
        };

        if(Number(req.query.type) === 1) {
            new_icon.link = "";
            new_icon.image = "";
            new_icon.name = req.query.name;
        } else {
            let site_link = req.query.link;
            if (site_link.toString().indexOf("https") !== 0 && site_link.toString().indexOf("http") !== 0) {
                site_link = "https://"+site_link;
            }
            new_icon.link = site_link;
            if (match = site_link.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
                result = match[0]
            }
            new_icon.image = result+"/favicon.ico";

            const site_html = await axios.get(site_link);
            let $ = cheerio.load(site_html.data);
            new_icon.name = $('head title').text();
        }


        let desktop = new Desktop();
        await desktop.setIconDesktop(new_icon);
        const users_desktop = await desktop.getUserDesktop(req.user._id, req.query.dir_id);
        res.send(users_desktop);

    });

    app.post('/desktop/icon/delete', async (req,res) => {
        let desktop = new Desktop();

        let deleted = await desktop.deleteIconDesktop(req.user._id, req.query.icon_id);

        const users_desktop = await desktop.getUserDesktop(req.user._id, req.query.dir_id);
        res.send(users_desktop);
    });

    app.post('/desktop/check_background', async (req, res) => {
        let form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            let old_path = files.myFile.path,
                file_size = files.myFile.size,
                file_ext = files.myFile.name.split('.').pop(),
                index = old_path.lastIndexOf('/') + 1,
                file_name = old_path.substr(index);
            let new_path = "";
            if (process.env.NODE_ENV === 'production') {
                new_path = path.join('/app/client/build/images/', file_name + '.' + file_ext);
            } else {
                new_path = path.join(process.env.PWD, '/client/public/images/', file_name + '.' + file_ext);
            }

            fs.readFile(old_path, function (err, data) {
                fs.writeFile(new_path, data, function (err) {
                    fs.unlink(old_path, async function (err) {
                        if (err) {
                            res.status(500);
                            res.send("");
                        } else {
                            res.status(200);
                            res.send(file_name + '.' + file_ext);
                        }
                    });
                });
            });
        });
    });

    app.post('/desktop/change_background', async (req, res) => {
        let user_obj = new User;
        const user = await user_obj.change_background(req.user._id, req.query.image);
        res.send(user);
    });

    app.get('/desktop', async (req, res) => {
        if(typeof req.user !== 'undefined'){
            let desktop = new Desktop();
            const dir_id = req.query.dir_id||"0";
            const users_desktop = await desktop.getUserDesktop(req.user._id, dir_id);
            res.send(users_desktop);
        } else {
            res.send({data: '404'});
        }
    });

};