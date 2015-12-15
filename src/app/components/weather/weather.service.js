(function() {
  'use strict';

  angular
    .module('runway')
    .service('WeatherService', ['$http',
                                '$q',
                                '$log',
                                'HiveEmpireConf',
                                function ($http, $q, $log, HiveEmpireConf) {

      var directions = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]

      return {
        degreesToCompass: function (num) {
            var val = parseInt(( num / 22.5 ) + .5);
            return directions[(val % 16)].toLowerCase();
        },
        K2C: function (kelvin) {
          return (kelvin - 273.15).toFixed(1);
        },
        K2F: function (kelvin) {
          return ((kelvin * 9/5) - 459.67).toFixed(1);
        },
        getWeather: function (lat, lon) {
          var weather = { temp: {}, clouds: null };
          var deferred = $q.defer();

          $http.get('http://api.openweathermap.org/data/2.5/forecast?APPID='+HiveEmpireConf.OPENWEATHERMAP_KEY+'&lat='+ lat +'&lon='+ lon)
               .success(function(data){
                 //$log.debug(data);
                 deferred.resolve(data);
               })
               .error(function(err){
                 $log.error('Error retrieving weather');
                 deferred.reject(err);
               });

          return deferred.promise;
        } // end getWeather
      } // end service singleton

    }]);

})();


// 'use strict';

// var runway = angular.module('runway', []);

// runway.factory('weatherService', function($http) {
//     return {
//       getWeather: function() {
//         var weather = { temp: {}, clouds: null };
//         $http.jsonp('http://api.openweathermap.org/data/2.5/weather?q=Perth,at&units=metric&callback=JSON_CALLBACK').success(function(data) {
//             if (data) {
//                 if (data.main) {
//                     weather.temp.current = data.main.temp;
//                     weather.temp.min = data.main.temp_min;
//                     weather.temp.max = data.main.temp_max;
//                 }
//                 weather.clouds = data.clouds ? data.clouds.all : undefined;
//             }
//         });

//         return weather;
//       }
//     };
// });

// runway.filter('temp', function($filter) {
//     return function(input, precision) {
//         if (!precision) {
//             precision = 1;
//         }
//         var numberFilter = $filter('number');
//         return numberFilter(input, precision) + '\u00B0C';
//     };
// });

// runway.controller('WeatherController', function ($scope, weatherService) {
//     $scope.weather = weatherService.getWeather();
// });

// runway.directive('weatherIcon', function() {
//     return {
//         restrict: 'E', replace: true,
//         scope: {
//             cloudiness: '@'
//         },
//         controller: function($scope) {
//             $scope.imgurl = function() {
//                 var baseUrl = 'https://ssl.gstatic.com/onebox/weather/128/';
//                 if ($scope.cloudiness < 20) {
//                     return baseUrl + 'sunny.png';
//                 } else if ($scope.cloudiness < 90) {
//                    return baseUrl + 'partly_cloudy.png';
//                 } else {
//                     return baseUrl + 'cloudy.png';
//                 }
//             };
//         },
//         template: '<div style="float:left"><img ng-src="{{ imgurl() }}"></div>'
//     };
// });
