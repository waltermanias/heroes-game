const express = require('express');
const app = express();
const battlesRoute = require('../controllers/battles');
const usersRoute = require('../controllers/users');
const loginRoute = require('../controllers/login');
const heroesRoute = require('../controllers/heroes');
const { auth } = require('../middlewares/auth');
const { battleAndPlayerValidator } = require('../middlewares/player-validators');
 
// import the routes in app.
app.post('/battles', auth, battlesRoute.saveBattle);
app.post('/battles/:battleId/players/:playerId/movements', auth, battleAndPlayerValidator, battlesRoute.saveMovement);
app.get('/battles/:battleId/players/:playerId/life-status', auth, battleAndPlayerValidator, battlesRoute.getLifeStatus);
app.get('/heroes', heroesRoute.getRandomHero);
app.post('/users', usersRoute.saveUser );
app.use( '/login', loginRoute.login );

module.exports = app;