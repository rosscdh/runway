(function() {
  'use strict';

  angular
    .module('runway')
    .controller('EditHiveController', CreateHiveController);

  /** @ngInject */
  function CreateHiveController($scope, $state, HivesService, GeoLocationService, toastr) {
      var vm = this;
      var uuid = $state.params.hive;

      vm.center = {};
      vm.layers = {};

      vm.button_label = 'Update Hive';

      HivesService.detail(uuid).then(function success(data) {
        vm.hive = data;
        console.log(vm.hive)
        vm.hive.latitude = data.position.latitude;
        vm.hive.longitude = data.position.longitude;

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


        angular.extend(vm, {
          center: {
            lat: vm.hive.latitude,
            lng: vm.hive.longitude,
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
                  lat: vm.hive.latitude,
                  lng: vm.hive.longitude,
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

      HivesService.update(vm.hive).then(
        function success(data) {
          toastr.success('Successfully updated this Hive', 'Success')
          $state.go('hive-dashboard', {hive: data.uuid});
        },
        function error(err) {
          toastr.warning(err.data, 'Error on Submit')
        });
    }

  }
})();
