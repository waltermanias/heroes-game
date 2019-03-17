const mongoose = require('mongoose');

let Battle = new mongoose.Schema({
    owner:  {
        type : mongoose.Types.ObjectId,
        required : [true, 'The battle owner is required.'],
        ref : 'users',
        index : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    isOver : {
        type : Boolean,
        default : false
    }
}, { versionKey: false } );

Battle.virtual('players', {
    ref: 'players',
    localField: '_id',
    foreignField: 'battle'
  });

Battle.virtual('movements', {
    ref: 'movements',
    localField: '_id',
    foreignField: 'battle'
  });

Battle.set('toObject', { virtuals: true });
Battle.set('toJSON', { virtuals: true });

module.exports = mongoose.model('battles', Battle);