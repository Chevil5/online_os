const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongoURI);
require('./models/DesktopModel');

require('./routes/desktopRoutes')(app);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req,res)=>{
        res.sendfile(path.resolve(__dirname,'client', 'build', 'index.html'))
    });
}

app.listen(5000);