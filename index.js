import dotenv from 'dotenv';
import db from './dal/models/index.js';
import App from './app.js';

dotenv.config();

const port = parseInt(process.env.PORT);

App.listen(port, function(){
	console.log(`Application running on ${port}`);
	console.log(Object.keys(db));
	db.sequelize.sync();
});
