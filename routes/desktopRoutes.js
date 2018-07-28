const Desktop = require('../library/Desktop/Desktop');
const axios = require("axios");
const cheerio = require("cheerio");

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

    app.get('/desktop', async (req, res) => {
        if(typeof req.user !== 'undefined'){
            let desktop = new Desktop();
            const users_desktop = await desktop.getUserDesktop(req.user._id, req.query.dir_id);
            res.send(users_desktop);
        } else {
            res.send({data: '404'});
        }
    });

};