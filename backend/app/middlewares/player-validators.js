const Battle = require('../models/battles');
const Player = require('../models/players');
const { CustomError } = require('../entities/custom-error');
const mongoose = require('mongoose');
const logger = require('../helpers/logger');
let battleAndPlayerValidator =  async( req, res, next ) => {

    let battleId = req.params.battleId;
    let playerId = req.params.playerId;

    // validate the format of ids
    if(!mongoose.Types.ObjectId.isValid( playerId ) || !mongoose.Types.ObjectId.isValid( battleId ))
        return res.status(400).json( new CustomError( 400, 'The battleId or playerId does not have a valid format.' ) );

    // get player and battle by their ids
    let battlePromise = Battle.findById( battleId );
    let playerPromise = Player.findById( playerId );

    await Promise.all( [ battlePromise, playerPromise ] )
    .then( async(results) => {

        let battle = results[0];
        let player = results[1];

        if(!battle || !player)
            return res.status(404).json( new CustomError(404, 'The battle or player does not exists.') );
        
        if( !battle._id.equals(player.battle._id) )
            return res.status(404).json( new CustomError(404, 'The player does not exist in the battle.') );

        await Battle.populate( battle, { path : 'players' } );

        // set to the request the information.
        req.battle = battle;
        req.player = player; 

        next();

    })
    .catch( err => {
        logger.error(err);
        return res.status(500).json( new CustomError( 500, 'Oops! Something went wrong.' ) );
    });

}; 

module.exports = {
    battleAndPlayerValidator
}
