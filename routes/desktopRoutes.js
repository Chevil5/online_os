const Desktop = require('../library/Desktop/Desktop');
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = app => {


    app.get('/desktop/update_icon_number', async (req,res) => {
        const user_id = req.query.user_id;
        const icon_id = req.query.icon_id;
        const number = req.query.new_number;

        let desktop = new Desktop();

        let updated = await desktop.uspdateIconNumber(user_id, icon_id, number);
        const users_desktop = await desktop.getUserDesktop(user_id);

        res.send(users_desktop)
    });

    app.post('/desktop/icon/edit', async (req,res) => {
        const user_id = req.query.user_id;
        const _id = req.query.id;
        const name = req.query.name;
        const link = req.query.link;

        let desktop = new Desktop();

        let updated = await desktop.editIconDesktop(user_id, _id, name, link);
        const users_desktop = await desktop.getUserDesktop(user_id);

        res.send(users_desktop)
    });

    app.post('/desktop/icon/add', async (req,res) => {
        let desktop = new Desktop();

        let site_link = req.query.icon;
        // const site_link = "https://www.google.com";

        if (site_link.toString().indexOf("https") !== 0 && site_link.toString().indexOf("http") !== 0) {
            site_link = "https://"+site_link;
        }

        const site_html = await axios.get(site_link);
        let $ = cheerio.load(site_html.data);

        const site_title = $('head title').text();
        const site_icon = site_link+"/favicon.ico";

        let saved = await desktop.setIconDesktop(req.query.user_id, site_link, site_icon, site_title, req.query.number);
        const users_desktop = await desktop.getUserDesktop(req.query.user_id);
        res.send(users_desktop);

    });

    app.post('/desktop/icon/delete', async (req,res) => {
        let desktop = new Desktop();

        let deleted = await desktop.deleteIconDesktop(req.query.user_id, req.query.icon_id);

        const users_desktop = await desktop.getUserDesktop(req.query.user_id);
        res.send(users_desktop);
    });

    app.get('/desktop', async (req, res) => {
        let desktop = new Desktop();
        const users_desktop = await desktop.getUserDesktop(req.query.userId);
        if(users_desktop == false){
            let saved = await desktop.setIconDesktop(req.query.userId,"google.com", "https://www.google.com.ua/images/branding/product/ico/googleg_lodp.ico", "Google", 1);
            res.send(saved);
        } else {
            res.send(users_desktop);
        }
    });
};