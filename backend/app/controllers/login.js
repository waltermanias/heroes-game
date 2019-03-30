const jwt = require('jsonwebtoken');
const { CustomError }  = require('../entities/custom-error');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const logger = require('../helpers/logger');

exports.login = async( req, res ) => {

    if(!req.body.username || !req.body.password)
    {
        logger.warning(`An invalid attemp to login has been registered.`);
        return res.status(400).json( new CustomError( 400, 'The username and password are required.' ) );
    }
        
    let user = await User.findOne( { username : req.body.username } );

    if(!user || !bcrypt.compareSync( req.body.password, user.password ))
    {
        logger.warning(`An invalid attemp to login has been registered.`);
        return res.status(401).json( new CustomError(401, 'The username or password are not valid.') );
    }

    // set the payload data for token
    let payload = {
        id : user._id,
        username : user.name
    };

    // generate the token
    let token = jwt.sign( payload, process.env.JWT_SECRET , { expiresIn: '1h' } );

    logger.info('New user has been logged into the game.');

    return res.status(200).json({
        username : user.username,
        token
    });
    
};