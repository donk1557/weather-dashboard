var API_Key = '03108667eeeb510fa839929427a69e48';
var city= 'Chicago';
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&mode=json&appid=" + API_Key;
var today= $('.nowWeather');
fetch(queryURL).then(function(response){
     return response.json();
    
}).then(function(data){
    
    console.log(data.name);
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
     
})
 