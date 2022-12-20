require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const staffAuthMiddleware = require('./src/middleware/auth_middleware');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use('/user', require('./src/routes/user_route')); 

app.use('/staff', staffAuthMiddleware, require('./src/routes/staff_route'));
app.use('/org', require('./src/routes/organization_route'));

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});

const DB_URI = process.env.DB_URI;
mongoose.Promise = global.Promise;

mongoose.connect(DB_URI).then(()=> console.log(`DB connected`)).catch(err=> {
    console.error(err);
    process.exit(1); 
});

