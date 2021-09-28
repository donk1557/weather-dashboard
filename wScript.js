var API_Key = '03108667eeeb510fa839929427a69e48';
var city= 'New York';
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&mode=json&units=imperial&appid=" + API_Key;
var today= $('.nowWeather');
var saveLog = $('.searcher');
var tomorrow= [0,'.one','.two','.three','.four','.five'];
let latData= [];
let lonData=[];
var stringLat = latData.toString();
var stringLon = lonData.toString();
var queryURL_2 = "http://api.openweathermap.org/data/2.5/onecall?lat=33.44" + stringLat + "&lon=-94.04" + stringLon + "&exclude=current,minutely,hourly&units=imperial&appid=" + API_Key;

fetcher.addEventListener('click', function(){
    var check = $('.form-control');
    city = check.val().trim();
    localStorage.setItem('name', JSON.stringify(city));
    console.log(city);
    localStorage.setItem('url', JSON.stringify(queryURL));
    holyHeck();
})
function holyHeck() {
fetch(queryURL).then(function(response){
     return response.json();
    
}).then(function(data){
    
    
     var cityName = document.createElement('h2');
     var date = moment().format('MMM Do YYYY');
     cityName.textContent = data.name + " (" + date + ")";
   
     var temp = document.createElement('p');
     temp.textContent = 'Temp: ' + data.main.temp + ' F';
    
     var windSpeed = document.createElement('p');
     windSpeed.textContent = 'Wind: ' + data.wind.speed + ' MPH';
   
     var humid = document.createElement('p');
     humid.textContent = 'Humidity: ' + data.main.humidity + '%';
     today.append(cityName, temp, windSpeed, humid);

     latData.push(data.coord.lat);
     lonData.push(data.coord.lon);
     
     
     
}).then(fetch(queryURL_2).then(function(response){
    return response.json();


}).then(function(data){
    console.log(data);
    for(var i=0; i < 6; i++){
        if(i==0) {
            var uvi = document.createElement('p');
            
     uvi.textContent = 'UV Index: ' + data.daily[0].uvi;
     today.append(uvi);
     $(".nowWeather p:last").addClass("scale");
        uvScale(data.daily[0].uvi);
        }else {
     var cycleTomorrow = $(tomorrow[i]);
     var next = document.createElement('h3');
     var date = moment().add(i, 'days').format('MMM Do YYYY');
     next.textContent= date + data.daily[i].weather[0].icon;

     var temp = document.createElement('p');
     temp.textContent = 'Temp: ' + data.daily[i].temp.day + ' F';
    
     var windSpeed = document.createElement('p');
     windSpeed.textContent = 'Wind: ' + data.daily[i].wind_speed + ' MPH';
   
     var humid = document.createElement('p');
     humid.textContent = 'Humidity: ' + data.daily[i].humidity + '%';
     cycleTomorrow.append(date, temp, windSpeed, humid);
    }}
}))}
function uvScale (num) {
    if(num <= 2) {
        $('.scale').css("color", "green");
    } else if(num > 2 && num <= 6){
        $('.scale').css("color", "orange");
    } else {$('.scale').css("color", "red");}
}



//  console.log(stringLat);
//  console.log(stringLon);
//  console.log(latData);
//  console.log(lonData);