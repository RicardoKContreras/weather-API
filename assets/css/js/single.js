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


  var getWeatherInfo = function(lat, lon) {
    var apiKey = "be12cc98c8a80e10300f59755d0a1bbc";
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  
    fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
       
        displayWeather(data);
        // console.log(data);
        // console.log(apiUrl);
      });
    });
  }