
class HeaderManager{

    static setLocationHeader( req, res, resourceID ){

        // return to client the result with the location of the new resource.
        let resourceLocation = req.protocol + '://' + req.get('host') + req.originalUrl + '/' + resourceID;
        res.location(resourceLocation);

    }

}

module.exports = {
    HeaderManager 
};
