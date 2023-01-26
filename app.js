var express= require("express");
var app=express();
var bodyParser=require("body-parser");
var https=require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
});
app.post("/" ,function(req,res){
    var cityName=req.body.city_Name;
    var url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=0f0ce9197a5c324b0695756692007e45&units=metric"
    https.get(url,function (response) {
        response.on("data",function(data){
            var wheatherData=JSON.parse(data)
            var temp=wheatherData.main.temp
            var sky=wheatherData.weather[0].main
            var skyDetails=wheatherData.weather[0].description
            var img=wheatherData.weather[0].icon
            var imgsrc="http://openweathermap.org/img/wn/"+img+"@2x.png"
            res.write("<h1>the temperature of your city is "+temp+" celcius.</h1>");
            res.write("<h3>the sky is : "+sky +" , Details : "+ skyDetails+"</h3>");
            res.write("<img src="+imgsrc+">");
        })
    })
    
})

app.listen(3601,function(){
    console.log("server is available at 3601");
});