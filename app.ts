import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import cors from 'cors';

import { userRouter, operationsRouter, filesRouter } from './api/routes/index.js';

dotenv.config();

const App = express();

const sess = {
	name: process.env.SESSION_NAME,
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		sameSite: true,
		maxAge: parseInt(process.env.COOKIE_AGE),
	},
};

App.use(cors())
	.use(logger('dev'))
	.use(express.json())
	.use(express.urlencoded({ extended: false }))
	.use(cookieParser())
	.use(session(sess))
	.use('/api/users', userRouter)
	.use('/api/operations', operationsRouter)
	.use('/api/files', filesRouter);

export default App;
