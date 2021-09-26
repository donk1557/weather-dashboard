var API_Key = '03108667eeeb510fa839929427a69e48';
var city= 'Chicago';
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&mode=json&appid=" + API_Key;

fetch(queryURL).then(function(response){
     response.json();
    return console.log(response);
})