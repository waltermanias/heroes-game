
const axios = require('axios');
const crypto = require('crypto');
const { Hero } = require('../entities/hero');

exports.getHeroById = async(id) => {

        let ts = '1';
        let hash = crypto.createHash('md5').update( ts + process.env.MARVEL_API_PRIVATE_KEY + process.env.MARVEL_API_PUBLIC_KEY ).digest('hex');
        let url = `https://gateway.marvel.com:443/v1/public/characters/${ id }?apikey=${ process.env.MARVEL_API_PUBLIC_KEY }&ts=${ ts }&hash=${ hash }`;

        let response = await axios.get(url);
        
        let dto_id = response.data.data.results[0].id;
        let dto_name = response.data.data.results[0].name;
        let dto_description = response.data.data.results[0].description;
        let dto_thumbnail;
        if(response.data.data.results[0].thumbnail)
                dto_thumbnail =`${response.data.data.results[0].thumbnail.path}.${response.data.data.results[0].thumbnail.extension}`;
        let hero = new Hero(dto_id, dto_name, dto_description, dto_thumbnail);
        return hero;
        
};

exports.getHeroes = async(name) => {

        let ts = '1';
        let hash = crypto.createHash('md5').update( ts + process.env.MARVEL_API_PRIVATE_KEY + process.env.MARVEL_API_PUBLIC_KEY ).digest('hex');
        let url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${ name }&orderBy=name&limit=10&offset=0&apikey=${ process.env.MARVEL_API_PUBLIC_KEY }&ts=${ ts }&hash=${ hash }`;
        console.log(url);
        let response = await axios.get(url);

        return response.data.data.results.map( h => {
                let hero = new Hero( h.id, h.name, h.description );
                if(h.thumbnail)
                        hero.thumbnail = `${h.thumbnail.path}.${h.thumbnail.extension}`
                return hero;
        })

}