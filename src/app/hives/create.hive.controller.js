(function() {
  'use strict';

  angular
    .module('runway')
    .controller('CreateHiveController', CreateHiveController);

  /** @ngInject */
  function CreateHiveController($scope, $state, HivesService, GeoLocationService, toastr) {
    var vm = this;

      vm.center = {};
      vm.layers = {};

      vm.button_label = 'Create Hive';

      vm.hive = {};
      vm.hiveForm = {};
      vm.options = {};
      vm.hiveFields = [
        {
          key: 'photo',
          type: 'input',
          templateOptions: {
            type: 'file',
            label: 'Photo',
          }
        },
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Name',
            placeholder: 'Name of the hive'
          }
        },
        {
          key: 'description',
          type: 'input',
          templateOptions: {
            label: 'Description',
            placeholder: 'A short description of the hive and anything of note.'
          }
        },
        {
          key: 'address',
          type: 'textarea',
          templateOptions: {
            label: 'Address',
            rows: 5,
            placeholder: 'The street address where this hive would be found'
          }
        },
        {
          key: 'latitude',
          type: 'input',
          templateOptions: {
            label: 'Latitude',
            placeholder: 'Latitude of the hive.'
          }
        },
        {
          key: 'longitude',
          type: 'input',
          templateOptions: {
            label: 'Longitude',
            placeholder: 'Longitude of the Hive.'
          }
        }
      ];

      GeoLocationService.getLocation().then(function (data) {
        var object = data.coords;

        vm.hive.latitude = object.latitude;
        vm.hive.longitude = object.longitude;

        angular.extend(vm, {
          center: {
            lat: object.latitude,
            lng: object.longitude,
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
                  lat: object.latitude,
                  lng: object.longitude,
                  message: vm.hive.name || 'New Hive',
                  icon: {},
                  focus: true,
                  draggable: true
              },
          },
          events: {
              map: {
                  enable: ['dragend'],
                  logic: 'emit'
              }
          }
        });
      });

    $scope.$on('leafletDirectiveMarker.dragend', function(event){
        var marker = event.targetScope.markers.m1;
        //console.log(vm.hive.longitude)
        vm.hive.latitude = marker.lat;
        vm.hive.longitude = marker.lng;
        //console.log(vm.hive.longitude)
        console.log(event)
    });

    vm.onSubmit = function() {
      //console.log(JSON.stringify(vm.hive), null, 2);

      HivesService.create(vm.hive).then(
        function success(data) {
          toastr.success('Successfully created a new Hive', 'Success')
          $state.go('hive-dashboard', {hive: data.uuid});
        },
        function error(err) {
          toastr.warning(err.data, 'Error on Submit')
        });
    }

    activate();

    function activate() {
    }
  }
})();
