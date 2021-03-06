var API_Key = "03108667eeeb510fa839929427a69e48";
var city = "";
var queryURL = "";
var searchLog = $(".searcher");
var today = $(".nowWeather");
var tomorrow = [0, ".one", ".two", ".three", ".four", ".five"];
let latData = [];
let lonData = [];

var queryURL_2 = "";

fetcher.addEventListener("click", function () {
  var check = $(".form-control");
  city = check.val().trim();                  //input value from search bar acquired and utilized in forming API url
  queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    ",us&mode=json&units=imperial&appid=" +
    API_Key;
  localStorage.setItem("name", JSON.stringify(city));  //value stored for recall
  console.log(queryURL);

  setTimeout(() => {
    wForecast(queryURL);         //added to aid in async issue between forming url and fetch method
  }, 1000);
});
function wForecast(queryURL) {
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {           //collects necessary data from API object for current day and displays it to user
      console.log(data);
      var cityName = document.createElement("h2");
      var date = moment().format("MMM Do YYYY");
      var wIcon = data.weather[0].icon;
      var img = new Image();                            //code for weather icons 
      img.src = "http://openweathermap.org/img/wn/" + wIcon + "@2x.png";
      cityName.textContent = data.name + " (" + date + ")";
      var temp = document.createElement("p");
      temp.textContent = "Temp: " + data.main.temp + " F";

      var windSpeed = document.createElement("p");
      windSpeed.textContent = "Wind: " + data.wind.speed + " MPH";

      var humid = document.createElement("p");
      humid.textContent = "Humidity: " + data.main.humidity + "%";
      today.append(cityName, img, temp, windSpeed, humid);

      latData.push(data.coord.lat);          //latitude & longitude recorded & used in second API; necessary to get daily info
      lonData.push(data.coord.lon);
      var stringLat = latData.toString();
      var stringLon = lonData.toString();
      queryURL_2 =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        stringLat +
        "&lon=" +
        stringLon +
        "&exclude=current,minutely,hourly&units=imperial&appid=" +
        API_Key;

      setTimeout(() => {
        wForecastDaily(queryURL_2);
      }, 1000);
    });
}
function wForecastDaily(queryURL_2) {
  fetch(queryURL_2)
    .then(function (response) {           //collects uv index for current day then data from API object for daily & displays to user in 5 day forecast
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < 6; i++) {
        if (i == 0) {
          var uvi = document.createElement("p");

          uvi.textContent = "UV Index: " + data.daily[0].uvi;
          today.append(uvi);
          $(".nowWeather p:last").addClass("scale");
          uvScale(data.daily[0].uvi);
        } else {
          var cycleTomorrow = $(tomorrow[i]);
          var next = document.createElement("h3");
          var date = moment().add(i, "days").format("MMM Do YYYY");
          next.textContent = date;
          var wIcon = data.daily[i].weather[0].icon;
          var img = new Image();
          img.src = "http://openweathermap.org/img/wn/" + wIcon + "@2x.png";
          var temp = document.createElement("p");
          temp.textContent = "Temp: " + data.daily[i].temp.day + " F";

          var windSpeed = document.createElement("p");
          windSpeed.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";

          var humid = document.createElement("p");
          humid.textContent = "Humidity: " + data.daily[i].humidity + "%";
          cycleTomorrow.append(date, img, temp, windSpeed, humid);
        }
      }
    });
}
function uvScale(num) {                  //colors text for uv index based on severity scale
  if (num <= 2) {
    $(".scale").css("color", "green");
  } else if (num > 2 && num <= 6) {
    $(".scale").css("color", "orange");
  } else {
    $(".scale").css("color", "red");
  }
}

var saveLog = JSON.parse(localStorage.getItem("name"));
var entries = [];
entries.push(saveLog);

for (i = 0; i < entries.length; i++) {
  var searchHist = document.createElement("button");          //displays search history

  searchHist.textContent = entries[i];
  searchLog.append(searchHist);
}
$("button").click(function () {
  city = JSON.parse(localStorage.getItem("name"));
  queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    ",us&mode=json&units=imperial&appid=" +                  //when searched city clicked displays weather info
    API_Key;
  console.log(queryURL);
  setTimeout(() => {
    wForecast(queryURL);
  }, 1000);
});
