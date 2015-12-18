(function() {
  'use strict';

  angular
    .module('runway')
    .controller('ViewHiveController',
                ['$state',
                 '$scope',
                 'HivesService',
                 'WeatherService',
      function ($state, $scope, HivesService, WeatherService) {

      var uuid = $state.params.hive;

      HivesService.detail(uuid).then(function (data) {
        $scope.object = $scope.hive = data;
        activate($scope.object);
      });

      $scope.center = {};
      $scope.layers = {};

      function activate(object) {
        //console.log(object)
        angular.extend($scope, {
          center: {
            lat: object.position.latitude,
            lng: object.position.longitude,
            zoom: 17
          },
          layers: {
            baselayers: {
              osm: {
                name: 'OpenStreetMap',
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                type: 'xyz'
              },
            }
          },
          markers: {
              m1: {
                  lat: object.position.latitude,
                  lng: object.position.longitude,
                  message: object.name,
                  icon: {
                    iconUrl: object.photo.url,
                    shadowUrl: null,
                    iconSize:     [45, 45],
                    shadowSize:   [0, 0],
                    iconAnchor:   [22, 29],
                    // shadowAnchor: [4, 62]
                  },
              },
          },
        });

        WeatherService.getWeather(object.position.latitude, object.position.longitude).then(function (data) {
            $scope.weather = data.list[0];
            $scope.weather.wind.direction = WeatherService.degreesToCompass($scope.weather.wind.deg);
            $scope.weather.temp = {
              'celcius': WeatherService.K2C($scope.weather.main.temp),
              'fahrenheit': WeatherService.K2F($scope.weather.main.temp)
            };
        });
      }

    }]);
})();
