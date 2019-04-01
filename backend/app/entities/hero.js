class Hero{
    constructor(id, name, description=null, thumbnail=null){
        this.id = id;
        this.name = name;
        this.description = description;
        this.thumbnail = thumbnail;
    }
}

module.exports.Hero = Hero;