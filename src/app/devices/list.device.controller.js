(function() {
  'use strict';

  angular
    .module('runway')
    .controller('DeviceListController', DeviceListController);

  /** @ngInject */
  function DeviceListController($timeout, webDevTec, toastr) {
    var vm = this;


    vm.object_list = [
      {
        'name': 'Device #1',
        'model': 'HiveEmpire-Sense&trade;',
        'location': '10b, Muggles rd, Perth',
        'description': 'Under the gumtree near the pond',
        'hives': [{
          'name': '',
          'url': ''
        }],
        'status': 'receiving',
        'data': {}
      },
      {
        'name': 'Device #2',
        'model': 'HiveEmpire-Sense&trade;',
        'location': '10b, Muggles rd, Perth',
        'description': 'Under the gumtree near the pond',
        'hives': [{
          'name': '',
          'url': ''
        }],
        'status': 'receiving',
        'data': {}
      },
    ];
    activate();

    function activate() {
    }

  }
})();
