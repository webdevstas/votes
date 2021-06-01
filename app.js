require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

let dbConnUrl = null
let dbConnOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

if (process.env.NODE_ENV === 'production') {
  dbConnUrl = process.env.PROD_DB_STRING
  const prodOpts = {
    user: process.env.PROD_DB_USER,
    pass: process.env.PROD_DB_PWD
  }
  Object.assign(dbConnOpts, prodOpts)
} else {
  dbConnUrl = process.env.DEV_DB_STRING
  const devOpts = {
    user: process.env.DEV_DB_USER,
    pass: process.env.DEV_DB_PWD
  }
  Object.assign(dbConnOpts, devOpts)
}

mongoose.connect(dbConnUrl, dbConnOpts).then(() => {
    console.log('DB connection succeed')
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'CONNECTION ERROR'))

const indexRouter = require('./routes/index')
const votesRouter = require('./routes/vote')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.set('etag', false)
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/votes', votesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
