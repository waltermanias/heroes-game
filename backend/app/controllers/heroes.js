const marvel = require('../providers/marvel');
const logger = require('../helpers/logger');
const { CustomError } = require('../entities/custom-error');
exports.getRandomHero = async( req, res ) => {

    // define an array with 10 hero's id
    let heroes = [
        1009610, //Spider-Man
        1009368, //Iron Man
        1009268, //Deadpool
        1009220, //Captain America
        1009664, //Thor
        1009262, //Daredevil
        1009718, //Wolverine
        1010801, //Ant-Man (Scott Lang)
        1009663, //Venom (Flash Thompson)
        1009515  //Punisher
    ];

    // get random index to get the id in array
    let index = Math.floor((Math.random() * 10));
    try {
        // get hero from Marvel API
        let heroe = await marvel.getHeroById(heroes[index]);    

        // return hero to the client
        return res.status(200).json(heroe);

    } catch (err) 
    {
        logger.error(err);
        return res.status(500).json(new CustomError(500, 'Oops! Something went wrong.'));
    }
    
};