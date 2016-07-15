angular.module('appMaps', ['uiGmapgoogle-maps'])
  .controller('mainCtrl', function($scope) {
    $scope.fetchAll = "false";
    $scope.finalWeatherObj = [];
    $scope.map = {
      center: {
        latitude: 15.4542,
        longitude: 18.7322
      },
      zoom: 2,
      markers: [{
        id: 'SYD',
        latitude: -33.86,
        longitude: 151.21
      }, {
        id: 'MEL',
        latitude: -37.83,
        longitude: 144.98
      }, {
        id: 'ADL',
        latitude: -34.92,
        longitude: 138.62
      }, {
        id: 'PVG',
        latitude: 31.2304,
        longitude: 121.4737
      }, {
        id: 'MAA',
        latitude: 13.0827,
        longitude: 80.2707
      }, {
        id: 'LOS',
        latitude: 6.5244,
        longitude: 3.3792
      }, { 
        id: 'NDJ',
        latitude: 15.4542,
        longitude: 18.7322
      }, { 
        id: 'MOW',
        latitude:  55.7558,
        longitude:  37.6173
      }, { 
        id: 'MEX',
        latitude:  23.6345,
        longitude:  -102.5528
      }
        ],
      markersEvents: {
        click: function(marker, eventName, model) {
          $scope.id = model.id;
          $scope.map.window.model = model;
          $scope.map.window.show = true;
          loadWeather(model.latitude+','+model.longitude);
        }
      },
      window: {
        marker: {},
        show: false,
        closeClick: function() {
          this.show = false;
        },
        options: {} 
      }
    };
    function loadWeather(location,woeid) {
       $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
      console.log(event.target.id);
      $scope.weatherObj = {};
      $scope.weatherObj['temp'] = weather.alt.temp;
      $scope.weatherObj['city'] = weather.city;
      $scope.weatherObj['region'] = weather.region;
      $scope.weatherObj['cWeather'] = weather.currently;
      $scope.weatherObj['pressure'] = weather.pressure;
      $scope.weatherObj['pressureUnit'] = weather.units.pressure;
      $scope.weatherObj['humidity'] = weather.humidity;
      if($scope.fetchAll == "false") {
        html = '<h2>'+$scope.weatherObj.temp+'&deg;C'+'</h2>';
        html += '<ul><li>'+$scope.weatherObj.city+', '+$scope.weatherObj.region+'</li>';
        html += '<li class="currently">'+$scope.weatherObj.cWeather+'</li>';
        html += '<li>'+$scope.weatherObj.pressure+'  '+$scope.weatherObj.pressureUnit+'</li>'; 
        html += '<li>'+$scope.weatherObj.humidity+'%</li></ul>'; 
        $("#weather").html("");
        $("#weather").html(html);
      }
      if($scope.fetchAll == "true"){
        $scope.finalWeatherObj.push($scope.weatherObj);
      }
    },
    error: function(error) {
      $("#weather").html("");
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}
  $scope.getAll = function(){
    $("#weatherUpdate").html("");
    $("#weatherInfo").html("");
    $("#weatherUpdate").html("Loading Details");
    for(var i=0;i<$scope.map.markers.length;i++){
      var tempLat = $scope.map.markers[i].latitude;
      var tempLon = $scope.map.markers[i].longitude;
      var id = $scope.map.markers[i].id;
      $scope.fetchAll = "true"
      loadWeather(tempLat+','+tempLon);
      setTimeout(function(){
      for(var j=0;j<$scope.finalWeatherObj.length;j++){
        weatherData = '<span>'+$scope.map.markers[j].id+'|'+$scope.map.markers[j].latitude+','+$scope.map.markers[j].longitude+'|'+Date()+'|'+$scope.finalWeatherObj[j].cWeather+'|'+$scope.finalWeatherObj[j].temp+'&deg;C'+'|'+$scope.weatherObj.pressure+''+$scope.weatherObj.pressureUnit+'|'+$scope.weatherObj.humidity+'</span></br>';
        $("#weatherUpdate").html("");
        $("#weatherInfo").append(weatherData);
        if(j == $scope.finalWeatherObj.length-1){
          $scope.finalWeatherObj = [];
        }
      }
      },5000);
    }
  }
  });