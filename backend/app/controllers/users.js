const User = require('../models/users');
const { CustomError } = require('../entities/custom-error');
const bcrypt = require('bcrypt');
const { HeaderManager } = require('../helpers/headers');
const logger = require('../helpers/logger');

exports.saveUser = async( req, res ) => {

    if(!req.body.username || !req.body.password)
        res.status(400).json({
            status : 400,
            message : 'The username and password are required.'
        });
    
    try
    {
        // set the user parameters.
        let newUser = new User();
        newUser.username = req.body.username;
        newUser.password = bcrypt.hashSync( req.body.password, 10 );

        // find if the user exists on database.
        let user = await User.findOne( { username : req.body.username } );
        if(user)
            return res.status(400).json( new CustomError( 400, 'The user exists in our databases.' ) );

        // create the new user.
        let dbUser = await User.create(newUser);

        logger.info(`A new user has been created`);

        // set header location
        HeaderManager.setLocationHeader( req, res, dbUser._id );

        // return status code.
        return res.status(201).json( dbUser );
    }
    catch(err)
    {
        logger.error(err);
        return res.status(500).json(new CustomError( 500, 'Sorry! Something went wrong.' ));
    }
    
};


