require('dotenv').config(); 
module.exports = {
	'development': {
		'username': process.env.DB_USER_DEV,
		'password': process.env.DB_PASSWORD_DEV,
		'database': process.env.DB_DATABASE_DEV,
		'host': process.env.DB_HOST_DEV,
		'dialect': process.env.DB_DIALECT_DEV
	},
	'test': {
		'username': process.env.DB_USER,
		'password': process.env.DB_PASSWORD,
		'database': process.env.DB_DATABASE,
		'host': process.env.DB_HOST,
		'dialect': process.env.DB_DIALECT
	},
	'production': {
		'username': process.env.DB_USER,
		'password': process.env.DB_PASSWORD,
		'database': process.env.DB_DATABASE,
		'host': process.env.DB_HOST,
		'dialect': process.env.DB_DIALECT
	}
};
