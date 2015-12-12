(function() {
  'use strict';

  angular
    .module('runway')
    .controller('DeviceListController', DeviceListController);

  /** @ngInject */
  function DeviceListController($timeout, webDevTec, toastr) {
    var vm = this;

    var tmp_video = ['http://media.salon.com/2013/08/livebees-tiff-620x412.jpg', 'http://thumb7.shutterstock.com/display_pic_with_logo/2991562/323646689/stock-photo-plenty-of-bees-at-the-entrance-of-beehive-in-apiary-busy-bees-close-up-view-of-the-working-bees-323646689.jpg', 'https://i.ytimg.com/vi/wDB3_kfwyaE/maxresdefault.jpg', 'http://cdn1.arkive.org/media/5F/5FE0A0D5-1ACD-4F81-9CB5-C8A8AAC1820C/Presentation.Large/Honey-bee-bees-at-entrance-of-hive.jpg']
    function random_video_still() {
      return tmp_video[Math.floor(Math.random() * tmp_video.length)]
    }

    vm.unassigned_devices_list = [
      {
        'id': '400cea2e-3209-447d-97ed-deab784036e5',
        'type': 'Temperature & Humidity',
        'description': '',
        'hives': [{
          'name': '',
          'url': ''
        }],
        'status': 'available',
        'data': {
          'value': '25/10',
        }
      },
      {
        'id': '7487838f-67c7-427f-84ce-02fb88f5d42f',
        'type': 'Hive Weight',
        'description': '',
        'hives': [{
          'name': '',
          'url': ''
        }],
        'status': 'available',
        'data': {
          'value': '12',
        }
      },
      {
        'id': '16735b68-c8cc-4081-9e29-75cd083d4262',
        'type': 'In/Out Counter',
        'description': '',
        'hives': [{
          'name': '',
          'url': ''
        }],
        'status': 'available',
        'data': {
          'value': '100/1000',
        }
      },
      {
        'id': '95228195-81a2-4d2e-8334-5cf12f34e30c',
        'type': 'Video Stream',
        'description': '',
        'hives': [{
          'name': '',
          'url': ''
        }],
        'status': 'available',
        'data': {
          'value': random_video_still(),
        }
      },
    ];

    vm.hives_list = [
      {
        'name': 'Bob\'s Hive',
        'location': '10b, Muggles rd, Perth',
        'description': 'Under the gumtree near the pond',
        'photo': {
          'url': 'http://media.treehugger.com/assets/images/2015/03/Colorado-Top-Bar-Open-Source-Beehive.jpg.662x0_q70_crop-scale.jpg',
          'alt': 'Open Source Hive'
        },
        'status': 'stable',
        'sensors': tmp_clone_sensors()
      },
      {
        'name': 'UWA Hive #232',
        'location': '720, Hillbrow ave, London',
        'description': 'Next to the wall by the playground',
        'photo': {
          'url': 'https://upload.wikimedia.org/wikipedia/commons/a/af/Beehive_2.JPG',
          'alt': 'Stressed hive'
        },
        'status': 'stressed',
        'sensors': tmp_clone_sensors()
      },
    ];

    activate();

    function activate() {
    }

    function tmp_clone_sensors() {
      function generateUUID() {
          var d = new Date().getTime();
          var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = (d + Math.random()*16)%16 | 0;
              d = Math.floor(d/16);
              return (c=='x' ? r : (r&0x3|0x8)).toString(16);
          });
          return uuid;
      };
      var log = [];
      var sensor_set = [];
      angular.copy(vm.unassigned_devices_list, sensor_set);
      angular.forEach(sensor_set, function(value, key) {
        value.id = generateUUID();
        if (value.type == 'Video Stream') {
          value.data.value = random_video_still();
        }
      }, log);
      //console.log(sensor_set)
      return sensor_set;
    }

  }
})();
