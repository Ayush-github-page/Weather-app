const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    console.log(req.body.CityName);

    const query = req.body.CityName;
    const apiKey = "8ec9b455bd824b02bf66c16eb830cb13";
    const unit = "metric";
    const baseURL = "https://api.openweathermap.org/data/2.5/weather"
    const url = baseURL + "?q=" + query +"&units=" + unit +"&appid=" + apiKey;
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const weatherIconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            const lat_long = weatherData.coord.lat + " " + weatherData.coord.lon
            
            res.write("<h1>The temperature in " + query + " is " + temp + " degree celsius.</h1>");
            res.write("<p1>The weather currently is " + description + "</p1>");
            res.write("<br><img src=" + weatherIconURL + "><br>")
            res.write(lat_long);
            res.send();
        })
    });

})


app.listen(3000, function(){
    console.log("Server is running on port 3000");
})