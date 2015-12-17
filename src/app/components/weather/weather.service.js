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
          var deferred = $q.defer();

          $http({
            url: 'http://api.openweathermap.org/data/2.5/forecast?&APPID='+HiveEmpireConf.OPENWEATHERMAP_KEY+'&lat='+lat+'&lon='+lon,
            // This makes it so that this request doesn't send the JWT
            skipAuthorization: true,
            method: 'GET'
          })
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
