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
                        'ui.calendar',              // UI Calendar
                        'ui.select',                // AngularJS ui-select
                        'ui.footable',              // FooTable
                        'ui.tree',                  // Angular ui Tree
                        'bm.bsTour',                // Angular bootstrap tour
                        'angular-flot',
                        'picardy.fontawesome',
                        'leaflet-directive',        // angular-leaflet-directive (maps)
                        'angular-jwt',              // angular-jwt
                        'ngStorage',                // https://github.com/gsklee/ngStorage
                        'satellizer',               // https://github.com/sahat/satellizer
                        'HiveEmpire.config',
                       ]);

})();
