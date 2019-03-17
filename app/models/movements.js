const mongoose = require('mongoose');

let Movement = new mongoose.Schema({
    battle:  {
        type : mongoose.Types.ObjectId,
        required : [true, 'The battle owner is required.'],
        ref : 'battles',
        index : true
    },
    player : {
        type : mongoose.Types.ObjectId,
        required : [true, 'The player is required.'],
        ref : 'players'
    },
    movement : {
        type : String,
        required : true
    }
}, { versionKey: false } );

module.exports = mongoose.model('movements', Movement);