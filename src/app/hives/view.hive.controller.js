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

      $scope.timeRange = '6h';
      $scope.center = {};
      $scope.layers = {};

      $scope.graph = {};
      $scope.graph.options = {
          chart: {
              type: 'lineChart',
              height: 250,
              margin : {
                  top: 20,
                  right: 20,
                  bottom: 40,
                  left: 40
              },
              color: [
                    "#1f77b4",
                    "#ff7f0e",
                    "#2ca02c",
                    "#d62728",
                    "#9467bd",
                    "#8c564b",
                    "#e377c2",
                    "#7f7f7f",
                    "#bcbd22",
                    "#17becf"
                  ],
              x: function(d){return d[0];},
              y: function(d){return d[1];},
              useVoronoi: false,
              clipEdge: true,
              duration: 100,
              useInteractiveGuideline: true,
              xAxis: {
                  showMaxMin: false,
                  axisLabel: "Date range",
                  tickFormat: function(d) {
                      return d3.time.format('%x %H:%m')(new Date(d))
                  }
              },
              yAxis: {
                  axisLabel: ""
              },
              zoom: {
                  // enabled: true,
                  // scale: 1,
                  scaleExtent: [1, 100],
                  //useFixedDomain: true,
                  useNiceScale: true,
                  // horizontalOff: false,
                  verticalOff: false,
                  // unzoomEventType: 'dblclick.zoom'
              }
          }
      };
      $scope.graph.data = [];


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
            var sensor_type = null;
            // loop over the series and populat ethe nv3d chart data
            angular.forEach(resp_data.series, function (row, key) {
              sensor_type = row.name;
              $scope.graph[sensor_type] = {}; // potential but shoudl we have more than 1 temperature/sensor of same class here
              $scope.graph[sensor_type].data =[];

              var row_data = {key: row.name, values: []};

              angular.forEach(row.values, function (values, key) {
                var x = moment(values[0]);
                var y = values[1];

                row_data.values.push([x.format('x'), y])
              });

              // append this row to our main data
              $scope.graph[sensor_type].data.push(row_data);
            });

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
          updateGraphs(sensor, '5h');
        }); // end sensor loop

      }

    }]);
})();
