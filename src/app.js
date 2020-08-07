const express = require('express')
const api = require('./api/index')
const helmet = require('helmet')
const morgan = require('morgan')

const middlewares = require('./middleware')

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
app.use('/api/v1', api)

//This is error catch middleware
app.use(middlewares.errorHandler)
app.use(middlewares.notFound)

module.exports = app
