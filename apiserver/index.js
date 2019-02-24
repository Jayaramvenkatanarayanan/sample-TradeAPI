/*
create a express js server using config port no
*/

const config = require('./server/enviroment/configuration');
const app = require('./server/server');
app.listen(config.port);
//To allow access to other headers
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// console.log('listening on http://localhost:' + config.port);