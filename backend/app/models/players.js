const mongoose = require('mongoose');

let Player = new mongoose.Schema({
    battle:  {
        type : mongoose.Types.ObjectId,
        required : [true, 'The battle id is required.'],
        index : true,
        ref : 'battles'
    },
    hero : {
        id : {
            type : Number,
            required : [true, 'The id of hero is required.']
        },
        name : {
            type : String,
            required : [true, 'The name of hero is required.']
        }   
    },
    healthStatus : {
        type : Number,
        default : 100
    }
}, { versionKey: false } );

module.exports = mongoose.model('players', Player);