'use strict';

angular.module('runway')
  .controller('SignupController', [
    '$log',
    '$scope',
    '$rootScope',
    'AuthService',
    'toastr',
    function($log, $scope, $rootScope, AuthService, toastr) {

      $scope.credentials = {};

      $scope.startRegistration = function() {
        if ($scope.signUpForm.$valid) {

          AuthService.register($scope.credentials).then(
            function success(data) {

              $rootScope.currentUser.setUser(data.result.toJSON());
              toastr.info('You have registered with HiveEmpire', 'Registered')
              $rootScope.goNext('/');

            },
            function error(err) {
              toastr.error(err, 'Authentication Failed')
            });
        }

      };
    }
  ]);
