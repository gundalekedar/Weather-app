const express=require("express");
const https = require("https");
const bodyparser= require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/" ,function(req,res){
  //  console.log(req.body.Cityname);

     const query = req.body.Cityname;
     const apikey ="a3b65c42690d330d67ff3779455f3d4e&units ";
     const unit ="metric";
     const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" +apikey+ "&units=" +unit;
  
     https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
              
             const weatherData = JSON.parse(data)
             const temp = weatherData.main.temp
             const weatherDescription =weatherData.weather[0].description
             const icon = weatherData.weather[0].icon
             const imageURL ="http://openweathermap.org/img/wn/"+icon+"@2x.png"
              console.log(temp);
              res.write("<p>the weather is currently" + weatherDescription + "</p>");
              res.write("<h1>The temperature in " + query + " is: " + temp + " degrees Celcius.</h1>");
              res.write("<img  src=" + imageURL +">")
              res.send()


    })
  })
});


app.listen(3000,function(){
    console.log("sever is running on port 3000");
});
