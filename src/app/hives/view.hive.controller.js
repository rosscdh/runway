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
      // $scope.object = $scope.hive = {
      //   'id': pk,
      //   'name': 'UWA Hive #237',
      //   'location': {
      //     'address': '720, Hillbrow ave, London',
      //     'lat': -31.9815384,
      //     'lon': 115.8184183
      //   },
      //   'description': 'Next to the wall by the playground',
      //   'photo': {
      //     'url': 'https://upload.wikimedia.org/wikipedia/commons/a/af/Beehive_2.JPG',
      //     'alt': 'Stressed hive'
      //   },
      //   'status': 'stressed',
      //   'sensors': [
      //     {
      //       'id': '',
      //       'type': 'Temperature & Humidity',
      //       'description': '',
      //       'icon': 'pe-7s-sun',
      //       'status': 'Unassigned',
      //       'data': {
      //         'value': '25/10',
      //       }
      //     },
      //     {
      //       'id': '',
      //       'type': 'Hive Weight',
      //       'description': '',
      //       'icon': 'pe-7s-drop',
      //       'status': 'Unassigned',
      //       'data': {
      //         'value': '12Kg',
      //       }
      //     },
      //   ]
      // };
      $scope.center = {};
      $scope.layers = {};

      function activate(object) {
        //console.log(object)
        angular.extend($scope, {
          center: {
            lat: object.location.lat,
            lng: object.location.lon,
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
                  lat: object.location.lat,
                  lng: object.location.lon,
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

        WeatherService.getWeather(object.location.lat, object.location.lon).then(function (data) {
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
