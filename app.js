const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes of application
const example_router = require('./api/routes/example_router');

//database connection
mongoose.connect('Put Connection string here', { useNewUrlParser: true })
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

//request handling urls
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