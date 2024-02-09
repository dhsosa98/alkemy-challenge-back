import dotenv from 'dotenv';

dotenv.config();

const development = {
	username: process.env.DB_USER_DEV,
	password: process.env.DB_PASSWORD_DEV,
	database: process.env.DB_DATABASE_DEV,
	host: process.env.DB_HOST_DEV,
	dialect: process.env.DB_DIALECT_DEV
};

const test = {
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT
};

const production = {
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT
};

const databaseConfig = {
	development,
	test,
	production
};

export default databaseConfig;
