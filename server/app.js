const express = require('express');
const app = express();
const bodyParser =require('body-parser');
const mongoose = require('mongoose');
const router = require('./src/router/api');
//const path = require('path')

//require Security middleware
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require('hpp');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');

//Implement of Security middleware
app.use(cors({origin:'http://localhost:3000'}));
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(xssClean());

//Increase limit of server
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// Body Parser Implement
app.use(bodyParser.json())

// Request Rate Limit
const limiter= rateLimit({windowMs:50*60*1000,max:3000})
app.use(limiter)

app.use(express.json())

//Connecting with Client-side
// app.use(express.static(path.join(__dirname, 'client-side/build')));

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


//connecting with API
app.use('/api/v1', router);


//Undefine Route
app.use('*', (req, res) => {
    res.status(404).send('404 Not found')
})
//Connection with mongodb
mongoose.connect('mongodb://localhost:27017/task-Manager')//Database Name(my-student')
    .then(() => { console.log('Database connected successfully!') })
    .catch(() => { console.log('connect Fail!') })

module.exports = app;