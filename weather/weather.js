const request = require('request');

var getweather = (lat, long, callback) => {
    request ({
        url : `https://api.darksky.net/forecast/5d9a719e0e89d17099ab47c459b7b709/${lat},${long}`,
        json : true
        },(error, response, body) => {
            
            if(error){
                callback('Unable to connect forecast.io server');
            }
            else if(response.statusCode === 400){
                callback("Unable to Fetch Weather data");
            }
            else if(response.statusCode === 200){
                // season
                callback(undefined, {
                    status : body.currently.icon,
                    tme : new Date(body.currently.time * 1000).toString(),
                    temperature : Math.floor((body.currently.temperature - 32) * 5/9)
                });




            // callback(body.currently.icon);
            // callback(new Date(body.currently.time * 1000).toString());
            // // callback(new Date(body.hourly[0].time * 1000).toString());
            
            // // temperature
            // var tem = body.currently.temperature;
            // var temp =Math.floor((tem - 32) * 5/9);
            // callback('Temperature: '+temp+' Degree celsius');
            } 
    });
}


module.exports.getweather = getweather;
