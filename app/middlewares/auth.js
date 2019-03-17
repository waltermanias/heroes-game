
const { CustomError } = require('../entities/custom-error');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const logger = require('../helpers/logger');

let auth = ( req, res, next ) => {

    // get Authorization from header
    let authorizationHeader = req.get('Authorization');
    if(!authorizationHeader)
        return res.status(403).json( new CustomError(403, 'Must provide the token in the headers.') );
    
    // extract from the header the token
    let cleanToken = authorizationHeader.replace( /(Bearer\s*)*/i, '' );

    // verify token with private key
    jwt.verify( cleanToken, process.env.JWT_SECRET, (err, decoded) => {

        // if we have some problem return 403 status code
        if(err || !decoded){
            if(err)
                logger.error(err);
            return res.status(403).json();
        }
            
        // try to find the user associated with the token
        req.user = User.findById( decoded.id )
        .then( dbUser => {

            // if the user not exist in the database we need to return 403 status code
            if( !dbUser )
                return res.status(403).json();

            // associate in request the user
            req.user = dbUser;

            // continue with next function
            next();

        })
        .catch(err => {
            logger.error(err);
            return res.status(500).json();
        });

    });
    
};

module.exports = {
    auth
}