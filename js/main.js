$(document).ready(function() {
  //in case ipinfo.io fails, check NYC weather
  var lat = 40.730610;
  var lon = -73.935242;
  
  var celsius = 0;
  var fahrenheit = 0;
  
  $.ajax({
    type: "get",
    dataType: "json",
    url: "https://ipinfo.io",
    success: function(json) {
      var loc = json.loc.split(",");
      lat = loc[0];
      lon = loc[1];
      
      $(".location").text(json.city + ", " + json.region + ", " + json.country);
      
      getWeather();
    }
  });
  
  function getWeather() {
    $.ajax({
      type: "get",
      dataType: "json",
      url: "https://api.openweathermap.org/data/2.5/weather",
      data: {
        lat: lat,
        lon: lon,
        units: "metric",
        APPID: "3db6938036e8790ff3a311423210e3e4"
      },
      success: function(json) {
        $(".forecast-icon").addClass("wi-owm-" + json.weather[0].id);
        $(".forecast-name").text(json.weather[0].main);
        $(".forecast-description").text(json.weather[0].description);
        
        celsius = Math.round(json.main.temp);
        fahrenheit = fromCelsiusToFahrenheit(celsius);
        $(".temperature-celsius").text(celsius);
        $(".temperature-fahrenheit").text(fahrenheit);
      }
    });
  }
  
  function fromCelsiusToFahrenheit(celsius) {
    return celsius * 1.8 + 32;
  }
  
  $(".temperature-fahrenheit").hide();
  $(".temperature-unit-fahrenheit").hide();
  
  $(".toggle-unit").click(function() {
    $(".temperature-celsius").toggle(200);
    $(".temperature-unit-celsius").toggle(200);
    $(".temperature-fahrenheit").toggle(200);
    $(".temperature-unit-fahrenheit").toggle(200);
  });
  $(".refresh").click(function() {
    getWeather();
  });
});