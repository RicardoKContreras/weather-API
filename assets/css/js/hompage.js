var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var displayRepos = function(data, cityname) {
  console.log(data);
  console.log(cityname);
  repoContainerEl.textContent = "";
repoSearchTerm.textContent = cityname;
};


//*Note how we've added a parameter to the getUserRepos() function and inserted the parameter into the GitHub API URL. We then use the newly formatted URL in the subsequent fetch() request.
// var getCitycordinates = function(city) {
// var apiKey = "be12cc98c8a80e10300f59755d0a1bbc";
//  var geoLocation = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
 
  
//   fetch(geoLocation).then(function(response) {
//     response.json().then(function(data) {
//       displayRepos(data, city);
//     });
//   });
// }

var getCitycordinates = function(city) {
  // format the github api url
   var apiKey = "be12cc98c8a80e10300f59755d0a1bbc";
 var geoLocation = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;

  // make a request to the url
  fetch(geoLocation).then(function(response) {
    response.json().then(function(data) {
      var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=" + apiKey;
      console.log(city);
          fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
      });
    });
    }); 
  });
};


// var getCityRepos = function(lat, lon) {
//   var apiKey = "be12cc98c8a80e10300f59755d0a1bbc";
//       // format the github api url
    
//     // make a request to the url
//     fetch(apiUrl).then(function(response) {
//       response.json().then(function(data) {
//         console.log(data);
//       });
//     });
//     // console.log(apiUrl);
//     // fetch(apiUrl).then(function(response) {
//     //   response.json().then(function(data) {
//     //     getCitycordinates(data, data.dt);
//     //   });
//     // });
//   }

var formSubmitHandler = function(event) {
    event.preventDefault();
      // get value from input element
var cityname = cityInputEl.value.trim();

if (cityname) {
  getCitycordinates(cityname);
  
  cityInputEl.value = "";
} else {
  alert("Please enter a city!");
}
  }


//   };
  
//   getUserRepos("microsoft");
  cityFormEl.addEventListener("submit", formSubmitHandler);