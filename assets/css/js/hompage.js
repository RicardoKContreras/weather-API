var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var historyEl = document.querySelector("#city-history");

//executed upon a form submission browser event.
var formSubmitHandler = function(event) {
  event.preventDefault();
  // get value from input element
var cityname = nameInputEl.value.trim();

if (cityname) {
  getGeoLocation(cityname);
  nameInputEl.value = "";
} else {
  alert("Please enter a city");
}
//to see if put fires
  // console.log(event);
};
var historyHandler = function(event) {
  event.preventDefault();
  // get value from input element
  return displayWeather();
//to see if put fires
  // console.log(event);
};


var displayCity = function(searchCity) {
  // clear old content
repoContainerEl.textContent = "";
repoSearchTerm.textContent = searchCity;
  
  
};
//display the weather
var displayWeather = function(weather) {
  // loop over list array
for (var i = 35; i < weather.list.length; i++) {
  // format weather name
  var temperature = weather.list[i].main.temp + " degrees";
  var humidity = "humidity: " + weather.list[i].main.humidity;
  var wind = "wind: " + weather.list[i].wind.speed + " MPH";
  var conditions = weather.list[i].weather[0].description;
  var date = weather.list[i].dt_txt;
  // var weatherIcon = document.createElement("img");
  //  var iconUrl =  "http://openweathermap.org/img/wn/" + weather.list[i].weather[0].icon + "@2x.png"
  //  var image = weatherIcon.setAttribute("src", iconUrl);
  var allWeather = {temperature, humidity, wind, conditions, date};
  console.log(date);
  // var weatherName = weather.list[i].owner.login + "/" + repos[i].name;

  //create a container for each repo
  var repoEl = document.createElement("div");
  repoEl.classList = "list-item flex-row justify-space-between align-center";
  
  // var iconUrl =  "http://openweathermap.org/img/wn/" + dailyWeatherArray[i].weather[0].icon + "@2x.png"
  
  // create a span element to hold repository name
  var titleEl = document.createElement("span");
  titleEl.textContent = allWeather.temperature + " "+ allWeather.humidity + " " + allWeather.conditions + " " + allWeather.wind + " " +  allWeather.date;

  // append to container
  repoEl.appendChild(titleEl);

  // append container to the dom
  repoContainerEl.appendChild(repoEl);
}

  console.log(weather);
  
};

//API used to get lon and lat
var getGeoLocation = function(city) {
  // format the github api url
     var apiKey = "be12cc98c8a80e10300f59755d0a1bbc";
  var geoLocation = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;

  // make a request to the url
  fetch(geoLocation).then(function(response) {
    response.json().then(function(data) {
      // console.log(data);
      var cityLat = data[0].lat;
      var cityLon = data[0].lon;
      // console.log(cityLat);
      // console.log(cityLon);
      getWeatherInfo(cityLat, cityLon);
      
      displayCity(city);
    });
  });
};

//API for getting weather info based off what city is searched
var getWeatherInfo = function(lat, lon) {
  var apiKey = "be12cc98c8a80e10300f59755d0a1bbc";
  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      // localStorage.setItem(response, data);
      displayWeather(data);
      // console.log(data);
      // console.log(apiUrl);
      for (var i = 0; i < data.length; i++) {
        var cityEl = document.createElement("span");

        localStorage.getItem(response,data);
        repoSearchTerm.appendChild(cityEl);
        cityEl.classList = "list-item flex-row justify-space-between align-center";
      }
    });
  });
}


historyEl.addEventListener("submit", formSubmitHandler);

userFormEl.addEventListener("submit", formSubmitHandler);