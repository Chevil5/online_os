const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://chevil1:RyZsv96N{kH[*K{d@ds161620.mlab.com:61620/online_os_dev');
require('./models/DesktopModel');



require('./routes/desktopRoutes')(app);


app.listen(5000);