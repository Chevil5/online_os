const Desktop = require('../library/Desktop/Desktop');

module.exports = app => {



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