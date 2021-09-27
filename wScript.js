var API_Key = '03108667eeeb510fa839929427a69e48';
var city= '';
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&mode=json&appid=" + API_Key;
var today= $('.nowWeather');
var tomorrow= [0,'.one','.two','.three','.four','.five'];
let latData= [];
let lonData=[];
var stringLat = latData.toString();
var stringLon = lonData.toString();
var queryURL_2 = "http://api.openweathermap.org/data/2.5/onecall?lat=41.85" + stringLat + "&lon=-87.65" + stringLon + "&exclude=current,minutely,hourly&appid=" + API_Key;
fetch(queryURL).then(function(response){
     return response.json();
    
}).then(function(data){
    
    
     var cityName = document.createElement('h2');
     var date = moment().format('MMM Do YYYY');
     cityName.textContent = data.name + " (" + date + ")";
   
     var temp = document.createElement('p');
     temp.textContent = 'Temp: ' + data.main.temp;
    
     var windSpeed = document.createElement('p');
     windSpeed.textContent = 'Wind: ' + data.wind.speed;
   
     var humid = document.createElement('p');
     humid.textContent = 'Humidity: ' + data.main.humidity + '%';
     today.append(cityName, temp, windSpeed, humid);

     latData.push(data.coord.lat);
     lonData.push(data.coord.lon);
     
     
     
})

fetch(queryURL_2).then(function(response){
    return response.json();
}).then(function(data){
    
    for(var i=1; i < 6; i++){
     var cycleTomorrow = $(tomorrow[i]);
     var next = document.createElement('h3');
     var date = moment().add(i, 'days').format('MMM Do YYYY');
     next.textContent= date;

     var temp = document.createElement('p');
     temp.textContent = 'Temp: ' + data.daily[i].temp.day;
    
     var windSpeed = document.createElement('p');
     windSpeed.textContent = 'Wind: ' + data.daily[i].wind_speed;
   
     var humid = document.createElement('p');
     humid.textContent = 'Humidity: ' + data.daily[i].humidity + '%';
     cycleTomorrow.append(date, temp, windSpeed, humid);
    }
})

fetcher.addEventListener('click', function(){
    var check = $('.form-control');
    city = check.val();
    console.log(city);
})
console.log(city);
//  console.log(stringLat);
//  console.log(stringLon);
//  console.log(latData);
//  console.log(lonData);