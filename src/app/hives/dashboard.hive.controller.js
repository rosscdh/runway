(function() {
  'use strict';

  angular
    .module('runway')
    .controller('DashboardHiveController',
                ['$state',
                 '$scope',
                 'HivesService',
                 'WeatherService',
      function ($state, $scope, HivesService, WeatherService) {

      var pk = $state.params.hive;

      //$scope.object = $scope.hive = HivesService.detail(pk);
      $scope.object = $scope.hive = {
        'id': pk,
        'name': 'UWA Hive #237',
        'location': {
          'address': '720, Hillbrow ave, London',
          'lat': -31.9815384,
          'lon': 115.8184183
        },
        'description': 'Next to the wall by the playground',
        'photo': {
          'url': 'https://upload.wikimedia.org/wikipedia/commons/a/af/Beehive_2.JPG',
          'alt': 'Stressed hive'
        },
        'status': 'stressed',
        'sensors': [
          {
            'id': '',
            'type': 'Temperature & Humidity',
            'description': '',
            'hives': [{
              'name': '',
              'url': ''
            }],
            'status': 'Unassigned',
            'data': {
              'value': '25/10',
            }
          },
          {
            'id': '',
            'type': 'Hive Weight',
            'description': '',
            'hives': [{
              'name': '',
              'url': ''
            }],
            'status': 'Unassigned',
            'data': {
              'value': '12Kg',
            }
          },
        ]
      };

      angular.extend($scope, {
        center: {
          lat: -31.9815384,
          lng: 115.8184183,
          zoom: 15
        },
        layers: {
          baselayers: {
            osm: {
              name: 'OpenStreetMap',
              url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              type: 'xyz'
            },
          }
        }
      });

      WeatherService.getWeather(-31.9815384, 115.8184183).then(function (data) {
          $scope.weather = data.list[0];
          $scope.weather.wind.direction = WeatherService.degreesToCompass($scope.weather.wind.deg);
          $scope.weather.temp = {
            'celcius': WeatherService.K2C($scope.weather.main.temp),
            'fahrenheit': WeatherService.K2F($scope.weather.main.temp)
          };
      });

    }]);
})();
