(function() {
  'use strict';

  angular
    .module('runway')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      // ------------------------------------------
      // Authentication
      // ------------------------------------------
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'app/auth/sign-up.html',
        controller: 'SignupController',
        data: {
          authorised: false
        }
      })
        .state('sign-in', {
          url: '/sign-in',
          templateUrl: 'app/auth/sign-in.html',
          controller: 'LoginController',
          data: {
            authorised: false
          }
        })
        .state('logout', {
          url: '/logout',
          templateUrl: 'app/auth/logout.html',
          controller: 'LogoutController',
          data: {
            authorised: true
          }
        })
      // ------------------------------------------
      // User Account
      // ------------------------------------------
      .state('my-account', {
        url: '/me/account',
        templateUrl: 'app/me/my_account.html',
        controller: 'MyAccountController',
        data: {
          authorised: true
        },
        ncyBreadcrumb: {
          label: 'My Account',
          parent: 'home'
        }
      })
      .state('confirm-password-reset', {
        url: '/passwords/reset',
        templateUrl: 'app/me/confirm_password_reset.html',
        controller: 'ConfirmPasswordResetController',
        data: {
          authorised: false
        }
      })
      // ------------------------------------------
      // Overview - Dashboard
      // a view of all of my hives
      // ------------------------------------------
      .state('overview-dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        data: {
          authorised: true
        }
      })
      // ------------------------------------------
      // Hive - Dashboard
      // a view for a specific hives
      // ------------------------------------------
      // View used to both view and in-place edit the hive data
      .state('hive-dashboard', {
        url: '/hives/:hive/dashboard',
        templateUrl: 'app/hives/view-hive.html',
        controller: 'ViewHiveController',
        data: {
          authorised: true
        }
      })
      .state('create-hive', {
        url: '/hives/create',
        templateUrl: 'app/hives/create-hive.html',
        controller: 'CreateHiveController',
        data: {
          authorised: true
        }
      })
      .state('edit-hive', {
        url: '/hives/:hive/edit',
        templateUrl: 'app/hives/edit-hive.html',
        controller: 'EditHiveController',
        data: {
          authorised: true
        }
      })
      // ------------------------------------------
      // Sense - Devices
      // CRUD for the HiveEmpire-Sense devices
      // Also shows the available sensors
      // ------------------------------------------
      .state('device-list', {
        url: '/devices',
        templateUrl: 'app/devices/list-devices.html',
        controller: 'DeviceListController',
        data: {
          authorised: true
        }
      })
      .state('create-device', {
        url: '/devices/create',
        templateUrl: 'app/devices/edit-device.html',
        controller: 'CreateDeviceController',
        data: {
          authorised: true
        }
      })
      .state('edit-device', {
        url: '/devices/:device',
        templateUrl: 'app/devices/edit-device.html',
        controller: 'EditDeviceController',
        data: {
          authorised: true
        }
      })
      ;

    $urlRouterProvider.otherwise('/');
  }


})();
