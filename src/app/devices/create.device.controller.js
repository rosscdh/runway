(function() {
  'use strict';

  angular
    .module('runway')
    .controller('CreateDeviceController', CreateDeviceController);

  /** @ngInject */
  function CreateDeviceController($scope, $state, DevicesService, toastr) {
      var vm = this;

      vm.go = function (event) {}

      vm.center = {};
      vm.layers = {};

      vm.button_label = 'Register your HiveEmpire-Sense';

      vm.device = {};
      vm.deviceForm = {};
      vm.options = {};
      vm.deviceFields = [
        {
          key: 'uuid',
          type: 'input',
          templateOptions: {
            label: 'Device Identifier',
            placeholder: 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxx-xxxxxx',
            description: 'The ID is found on the side of your HiveEmpire-Sense device'
          }
        },
        // {
        //   key: 'name',
        //   type: 'input',
        //   templateOptions: {
        //     label: 'Notes',
        //     description: 'Short descriptive note or name of the device'
        //   }
        // },
        // {
        //   key: 'latitude',
        //   type: 'input',
        //   templateOptions: {
        //     label: 'Latitude',
        //     placeholder: 'Latitude of the device.'
        //   }
        // },
        // {
        //   key: 'longitude',
        //   type: 'input',
        //   templateOptions: {
        //     label: 'Longitude',
        //     placeholder: 'Longitude of the device.'
        //   }
        // }
      ];

      // GeoLocationService.getLocation().then(function (data) {
      //   var object = data.coords;

      //   vm.device.latitude = object.latitude;
      //   vm.device.longitude = object.longitude;

      //   angular.extend(vm, {
      //     center: {
      //       lat: object.latitude,
      //       lng: object.longitude,
      //       zoom: 17
      //     },
      //     layers: {
      //       baselayers: {
      //         osm: {
      //           name: 'OpenStreetMap',
      //           url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      //           type: 'xyz'
      //         },
      //       }
      //     },
      //     markers: {
      //         m1: {
      //             lat: object.latitude,
      //             lng: object.longitude,
      //             message: vm.device.name || 'New HiveEmpire-Sense Device',
      //             icon: {},
      //             focus: true,
      //             draggable: true
      //         },
      //     },
      //     events: {
      //         map: {
      //             enable: ['dragend'],
      //             logic: 'emit'
      //         }
      //     }
      //   });
      // });

    // $scope.$on('leafletDirectiveMarker.dragend', function(event){
    //     var marker = event.targetScope.markers.m1;
    //     //console.log(vm.device.longitude)
    //     vm.device.latitude = marker.lat;
    //     vm.device.longitude = marker.lng;
    //     //console.log(vm.device.longitude)
    //     console.log(event)
    // });

    vm.onSubmit = function() {
      //console.log(JSON.stringify(vm.device), null, 2);

      DevicesService.create(vm.device).then(
        function success(data) {
          toastr.success('Successfully registered your HiveEmpire-Device', 'Success')
          $state.go('device-list');
        },
        function error(err) {
          toastr.warning(err.data, 'Error on Submit')
        });
    }
  }
})();
