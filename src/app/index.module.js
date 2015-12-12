(function() {
  'use strict';

  angular
    .module('runway', [ 'ngAnimate',
                        'ngCookies',
                        'ngTouch',
                        'ngSanitize',
                        'ngMessages',
                        'ngAria',
                        'ngResource',
                        'ui.router',
                        'ui.bootstrap',
                        'toastr',
                        'ui.map',                   // Ui Map for Google maps
                        'ui.calendar',              // UI Calendar
                        'ui.select',                // AngularJS ui-select
                        'ui.footable',              // FooTable
                        'ui.tree',                  // Angular ui Tree
                        'bm.bsTour',                // Angular bootstrap tour
                        'chart.js',                  // Chart.js
                        'HiveEmpire.config',
                       ]);

})();
