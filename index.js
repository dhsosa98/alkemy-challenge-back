require('dotenv').config();

const App = require('./app');
const port = parseInt(process.env.PORT);

App.listen(port, function(){
	console.log(`Application running on ${port}`);
});
