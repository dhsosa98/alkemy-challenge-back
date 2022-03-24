require('dotenv').config(); 
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session'); 
const cors = require('cors'); 

const { userRouter, operationsRouter, filesRouter } =require('./api/routes');

const App = express();

const sess = {
	name: process.env.SESSION_NAME, 
	secret: process.env.SECRET_KEY,
	resave: false, 
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		sameSite:true,
		maxAge: parseInt(process.env.COOKIE_AGE),
	}
};

App.use(cors())
.use(logger('dev'))
.use(express.json())
.use(express.urlencoded({ extended: false }))
.use(cookieParser())
.use(session(sess))
.use('/api/users', userRouter)
.use('/api/operations', operationsRouter)
.use('/api/files', filesRouter)

module.exports = App;
