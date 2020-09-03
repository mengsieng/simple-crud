const express = require('express')
const api = require('./api/index')
const helmet = require('helmet')
const morgan = require('morgan')
const mung = require('express-mung')
// const passport = require('passport-http-bearer')
require('dotenv').config()

const middlewares = require('./middleware')
const connection = require('./db')

const app = express()

app.use(morgan('tiny'))
app.use(express.json())
//This is helmet library is use for seacurity 
app.use(helmet())

app.get('/', (req, res) => {
    res.json({
        message: project.message,
    });
});



//This is route from other end point
app.use(mung.json(
    function transform(body, req, res) {
        //adds mungMessage to every API response
        body.status = 1;
    }
));
app.use('/api/v1', api)

//This is error catch middleware
app.use(middlewares.notFound)
app.use(middlewares.errorHandler)
app.use(connection)


// passport.use(new BearerStrategy((token, done) => { }))

module.exports = app
