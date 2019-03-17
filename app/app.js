const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./helpers/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const routes = require('./routes/routes');

//config application
require('dotenv').config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// connection to database
require('./db/connection');

//enable cors.
app.use(cors());

// set swagger
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument));

// import the routes definition
app.use( routes );

// Start to listen on specific port.
app.listen( process.env.APP_PORT, () => {
    logger.info(`Server listening on port ${ process.env.APP_PORT }`);
});

module.exports = app;
