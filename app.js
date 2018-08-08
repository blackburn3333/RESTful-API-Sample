const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var path = require('path');

//routes of application
const example_router = require('./api/routes/example_router');
const index = require('./api/routes/index');

//database connection
mongoose.connect('mongodb://read_with_us_admin:rwsPassword123@ds213612.mlab.com:13612/read_with_us', { useNewUrlParser: true })
.then(
    console.log('DB Connection OK')
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
   res.header('Access-Control-Allow-Origin','*');
   res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');

   if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({});
   }
   next();
});

//view setup
//Setting up the views
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//request handling urls
app.use('/',index);
app.use('/example',example_router);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status(404);
    error(next);
});

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message: error.message
        }
    })
});

module.exports = app;