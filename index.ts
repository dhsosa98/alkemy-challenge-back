import dotenv from 'dotenv';
import App from './app';

dotenv.config();

const port = parseInt(process.env.PORT);

App.listen(port, function(){
	console.log(`Application running on ${port}`);
});
