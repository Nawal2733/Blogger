const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const request = require('request');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');
const port = process.env.PORT || 12345;

const app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.render('home.hbs' ,{
        pageTitle : 'WEATHER APP',
    });
});

var locationAdd;

app.post('/address', (req, res, next) => {
    var add = req.body.address;
    console.log(add);
    
    geocode.geocodeAddress(add, (errorMessage, result) => {
        if(errorMessage){
            console.log(errorMessage);
        }
        else{
            // fetch result from geocode...
            console.log(result.Adddress);
        
            //  weather information....
            weather.getweather(result.Lattitude, result.Longitude, (errorMessage, weatherresult) => {
                if(errorMessage){
                    console.log(errorMessage);
                    res.render('home.hbs', {
                        pageTitle : 'WEATHER APP',
                        address : errorMessage
                    });
                }
                else{
                    console.log(weatherresult.status);
                   console.log(weatherresult.temperature);
                    res.render('home.hbs',{
                        pageTitle : 'WEATHER APP',
                        address: result.Adddress,
                        tem : weatherresult.tme,
                        temp : `${weatherresult.temperature} degree`,
                        status: weatherresult.status
                    });
                    
                }
            });
    
        }
    });


    
    
});


app.listen(port , () => {
    console.log(`server start at port ${port}`);
});