const cors = require('cors');
const express = require('express');
const cookieParser = require("cookie-parser");
const {success, error} = require('consola');
const {connect} = require('mongoose');
//2. passport stuff
const passport = require('passport');

//bring in app constant
const {DB, PORT} = require('./config');

//intialize app
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
//2. passport stuff
app.use(passport.initialize());

require('./middlewares/passport')(passport);


//1. add router middleware
app.use('/api/v1/users', require('./routes/users'));

app.use('/api/v1/events', require('./routes/events'));

const startApp = async () => {

    try{
        //connection with db
        await connect(DB);

        success({
            message: `successfully connected to DB \n ${DB}`, 
            badge: true
        })
        
        //now listen for the server on PORT
        app.listen(PORT, ()=>{
            success({message: `server started on PORT ${PORT}`, badge: true})
        })

    } catch (err){
        startApp();
        error({
            message: `unable to connect to DB \n ${err}`, 
            badge: true
        })
    }
    
};

startApp();
