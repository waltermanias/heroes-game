
const { CustomError } = require('../entities/custom-error');
const marvel = require('../providers/marvel');
const Battle = require('../models/battles');
const { HeaderManager } = require('../helpers/headers');
const Player = require('../models/players');
const Movement = require('../models/movements');
const logger = require('../helpers/logger');

exports.saveBattle = async(req, res ) => {

    if(!req.body.playerA || !req.body.playerB)
        return res.status(400).json( new CustomError( 400, 'You must provide Player A and Player B.' ) );

    let playerA = marvel.getHeroById( req.body.playerA );

    let playerB = marvel.getHeroById( req.body.playerB );

    Promise.all([ playerA, playerB ])
    .then( async(results) => {

        // create new battle
        let battle = new Battle();
        battle.owner = req.user.id;
        
        // save the battle
        Battle.create( battle )
        .then( newBattle => {

            // set player A properties
            let playerA = new Player();
            playerA.battle = newBattle.id;
            playerA.hero.id = req.body.playerA;
            playerA.hero.name = results[0].name;

            // set player B properties
            let playerB = new Player();
            playerB.battle = newBattle.id;
            playerB.hero.id = req.body.playerB;
            playerB.hero.name = results[1].name;

            let promisePlayerA = Player.create( playerA );
            let promisePlayerB = Player.create( playerB );
    
            // try to save two players
            Promise.all( [ promisePlayerA, promisePlayerB ] )
            .then(async()=> {
    
                // populate with players and movements
                await Battle.populate( newBattle, { path : 'players' } );
                await Battle.populate( newBattle, { path : 'movements' } );

                 // set header location
                HeaderManager.setLocationHeader( req, res, newBattle._id );

                logger.info(`A new battle between ${ playerA.hero.name } and ${ playerB.hero.name } has been created .`);
            
                return res.status(201).json( newBattle );

            })
            .catch( err => {
                logger.error(err);
                return res.status(500).json( new CustomError(500, 'Oops! Something went wrong!') );
            });
    
        })
        .catch(err => {
            logger.error(err);
            return res.status(500).json( new CustomError(500, 'Oops! Something went wrong!') );
        });

    })
    .catch(err => {
        logger.error(err);
        return res.status(400).json( new CustomError( 400, 'There was a problem trying to get the players.' ) );
    });

};

exports.saveMovement = async( req, res ) => {

    // check if the game is over
    if(req.battle.isOver)
        return res.status(400).json( new CustomError(400, 'The game is over'));

    // check the movement
    let validMovements = ['punch', 'kick', 'shield'];
    if(!req.body.movement || !validMovements.includes( req.body.movement ))
        return res.status(400).json( new CustomError(400, 'The specified movement is not allowed.'));

    // get the opponent
    let opponent = req.battle.players.find( p => {
         return p.id !== req.player.id;
    });
    
    try {
    
        // create the new movement
        let movement = new Movement();
        movement.battle = req.battle.id;
        movement.player = req.player.id;
        movement.movement = req.body.movement;

        // save the movement
        await Movement.create( movement );

        let healthStatus = opponent.healthStatus;

        // update the opponent life status
        switch(req.body.movement)
        {
            case 'punch':
                healthStatus -= 15;
                break;
            case 'kick':
                healthStatus -= 20;
                break;
            case 'shield':
                healthStatus += 10;
                break;
            default:
                break;
        }

        if(healthStatus<=0)
            healthStatus = 0;
        else if( healthStatus >= 100)
            healthStatus = 100;

        // update the opponent health status
        await Player.updateOne( { _id : opponent.id }, { healthStatus : healthStatus } );

        logger.info(`A ${ req.body.movement } has been sended by ${ req.player.hero.name }`);

        // validate if the battle is over
        if(healthStatus===0)
        {
            await Battle.updateOne( { _id : req.battle.id }, { isOver : true } );

            logger.info(`The battle is over. ${ req.player.hero.name } wons!`);

            return res.status(200).json( {
                message : `Congrats! You have defeated to ${ opponent.hero.name }.`
            });
        }

        return res.status(200).json();
        
    } catch (err) 
    {
        logger.error(err);
        return res.status(500).json( new CustomError(500, 'Oops! Something went wrong.') );    
    }

};

exports.getLifeStatus = ( req, res ) => {

    logger.info(`The health of ${ req.player.hero.name } has been requested.`);
    return res.status(200).json({
        healthStatus : req.player.healthStatus
    });

};