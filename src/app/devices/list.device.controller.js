(function() {
  'use strict';

  angular
    .module('runway')
    .controller('DeviceListController', DeviceListController);

  /** @ngInject */
  function DeviceListController($state, $timeout, webDevTec, toastr) {
    var vm = this;

    var tmp_video = ['http://media.salon.com/2013/08/livebees-tiff-620x412.jpg', 'http://thumb7.shutterstock.com/display_pic_with_logo/2991562/323646689/stock-photo-plenty-of-bees-at-the-entrance-of-beehive-in-apiary-busy-bees-close-up-view-of-the-working-bees-323646689.jpg', 'https://i.ytimg.com/vi/wDB3_kfwyaE/maxresdefault.jpg', 'http://cdn1.arkive.org/media/5F/5FE0A0D5-1ACD-4F81-9CB5-C8A8AAC1820C/Presentation.Large/Honey-bee-bees-at-entrance-of-hive.jpg']
    function random_video_still() {
      return tmp_video[Math.floor(Math.random() * tmp_video.length)]
    }

    vm.default_set_of_sensors = [
      {
        'id': generateUUID(),
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
        'id': generateUUID(),
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
      {
        'id': generateUUID(),
        'type': 'In/Out Counter',
        'description': '',
        'hives': [{
          'name': '',
          'url': ''
        }],
        'status': 'Unassigned',
        'data': {
          'value': '100/1000',
        }
      },
      {
        'id': generateUUID(),
        'type': 'Video Stream',
        'description': '',
        'hives': [{
          'name': '',
          'url': ''
        }],
        'status': 'Unassigned',
        'data': {
          'value': random_video_still(),
        }
      },
    ];

    vm.unassigned_devices_list = tmp_clone_sensors().concat(tmp_clone_sensors());

    vm.hives_list = [
      {
        'id': generateUUID(),
        'name': 'Reynold\'s Hive',
        'location': '10b, Muggles rd, Perth, Western Australia',
        'description': 'Under the gumtree near the pond',
        'photo': {
          'url': 'http://media.treehugger.com/assets/images/2015/03/Colorado-Top-Bar-Open-Source-Beehive.jpg.662x0_q70_crop-scale.jpg',
          'alt': 'Open Source Hive'
        },
        'status': 'stable',
        'sensors': []
      },
      {
        'id': generateUUID(),
        'name': 'UWA Hive #237',
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

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        uuid = uuid.slice(0,7);
        return uuid;
    };

    function tmp_clone_sensors() {
      var log = [];
      var sensor_set = [];
      angular.copy(vm.default_set_of_sensors, sensor_set);
      angular.forEach(sensor_set, function(value, key) {
        value.id = generateUUID();
        if (value.type == 'Video Stream') {
          value.data.value = random_video_still();
        }
      }, log);
      //console.log(sensor_set)
      return sensor_set;
    }

    vm.goToHive = function (hive) {
      console.log(hive);
      $state.go('hive-dashboard', {hive: hive.id});
    }

  }
})();
