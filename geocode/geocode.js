var request = require('request');

var geocodeAddress = (address, callback) => {

    var encodeAddress = encodeURIComponent(JSON.stringify(address));

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
        json: true
        }, (error, response, body) => {

        if(error){
            callback("Unable to Fetch Google API");
        }
        else if(body.status === 'ZERO_RESULTS'){
            callback('INVAILID ADDRESS...');
        }
        else if(body.status === 'OK'){
            callback(undefined, {
                // console.log(JSON.stringify(body, undefined, 2));
                // body: response.body,
                Adddress: response.body.results[0].formatted_address,
                Lattitude: response.body.results[0].geometry.location.lat,
                Longitude: response.body.results[0].geometry.location.lng
            });
        }
    });
};            

module.exports.geocodeAddress = geocodeAddress;