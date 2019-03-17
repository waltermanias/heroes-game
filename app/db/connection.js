const mongoose = require('mongoose');
const logger = require('../helpers/logger');
let options = {
    useNewUrlParser: true, 
    useCreateIndex: true
};

mongoose.connect( process.env.MONGODB_CONNECTION, options, ()=> {
    logger.info('Database connection was successfully');
});

// remove common mongoose characteristics
mongoose.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    }
};
