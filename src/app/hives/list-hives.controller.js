(function() {
  'use strict';

  angular
    .module('runway')
    .controller('ListHivesController', ListHivesController);

  /** @ngInject */
  function ListHivesController() {
    var vm = this;

    vm.object_list = [
      {
        'name': 'Bob\'s Hive',
        'location': '10b, Muggles rd, Perth',
        'description': 'Under the gumtree near the pond',
        'photo': {
          'url': 'http://media.treehugger.com/assets/images/2015/03/Colorado-Top-Bar-Open-Source-Beehive.jpg.662x0_q70_crop-scale.jpg',
          'alt': 'Open Source Hive'
        },
        'status': 'stable',
        'data': {
          'temp': '22',
          'humidity': '64',
          'weight': '23',
        }
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
        'data': {
          'temp': '15',
          'humidity': '74',
          'weight': '12',
        }
      },
    ];

    activate();

    function activate() {
    }
  }
})();
