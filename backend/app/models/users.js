const mongoose = require('mongoose');

let User = new mongoose.Schema({
    username:  {
        type : String,
        required : [true, 'The username is required.'],
        unique : true,
        index : true
    },
    password:  {
        type : String,
        required : [true, 'The password is required.' ]
    }
}, { versionKey: false } );

// remove common mongoose characteristics and password
User.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        return ret;
    }
};

module.exports = mongoose.model('users', User);
