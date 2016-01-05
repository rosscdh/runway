(function() {
  'use strict';

  angular
    .module('runway')
    .controller('ViewHiveController',
                ['$state',
                 '$scope',
                 'moment',
                 'HivesService',
                 'SensorsService',
                 'WeatherService',
      function ($state, $scope, moment, HivesService, SensorsService, WeatherService) {

      var uuid = $state.params.hive;

      HivesService.detail(uuid).then(function (data) {
        $scope.object = $scope.hive = data;
        activate($scope.object);
      });

      $scope.timeRange = '2h';
      $scope.center = {};
      $scope.layers = {};

      $scope.graph = {
        data: []
      };

      $scope.xAxisTickFormat = function(){
          return function(d){
              return d3.time.format('%x')(new Date(d));
          }
      };

      $scope.toolTipContentFunction = function(){
          return function(key, x, y, e, graph) {
              console.log('tooltip content');
              return  'Super New Tooltip' +
                      '<h1>' + key + '</h1>' +
                      '<p>' +  y + ' at ' + x + '</p>'
          }
      };

      $scope.$watch("timeRange", function (newVal, oldVal) {
          // loop over each available Sensor We have
          if ($scope.object && $scope.object.sensors) {
            angular.forEach($scope.object.sensors, function(sensor) {
              updateGraphs(sensor, newVal);
            }); // end sensor loop
          }
      });

      function updateGraphs(sensor, time_range) {
          // Get the sensors data for the selected time range
          SensorsService.chart(sensor.uuid, time_range).then(function (resp_data) {
            $scope.graph.data = []; // clear
            var sensor_type = null;
            // loop over the series and populat ethe nv3d chart data
            angular.forEach(resp_data.series, function (row, key) {
              sensor_type = row.name;

              angular.forEach(row.values, function (values, key) {
                var x = moment(values[0]);
                var y = values[1];
                values[0] = parseInt(x.format('x'));
                values[1] = y;
              });
              var data = {"key": sensor_type, "values": row.values};
              //console.log(JSON.stringify(data));
              $scope.graph.data.push(data);
            });
            console.log($scope.graph.data);
          });
      }

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


        // loop over each available Sensor We have
        angular.forEach($scope.object.sensors, function(sensor) {
          updateGraphs(sensor, $scope.timeRange);
        }); // end sensor loop

      }

    }]);
})();
