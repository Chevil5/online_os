const Desktop = require('../library/Desktop/Desktop');

module.exports = app => {


    app.get('/desktop/update_icon_number', async (req,res) => {
        const user_id = req.query.user_id;
        const icon_id = req.query.icon_id;
        const number = req.query.new_number;

        let desktop = new Desktop();

        desktop.uspdateIconNumber(user_id, icon_id, number);
        const users_desktop = await desktop.getUserDesktop(user_id);

        res.send(users_desktop)
    });

    app.get('/desktop', async (req, res) => {
        let desktop = new Desktop();
        const users_desktop = await desktop.getUserDesktop(req.query.userId);
        if(users_desktop == false){
            let saved = await desktop.setUserDesktop(req.query.userId,"google.com", "", "Google", 1);
            res.send(saved);
        } else {
            res.send(users_desktop);
        }
    });
};