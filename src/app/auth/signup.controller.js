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

              AuthService.login($scope.credentials.email, $scope.credentials.password).then(
                function success(data) {

                  $rootScope.currentUser.setAccessToken(data.result.toJSON().token);

                  AuthService.me().then(
                    function success (data) {
                      $rootScope.currentUser.setUser(data.result.toJSON());
                      toastr.info('You have registered with HiveEmpire', 'Registered')
                      $rootScope.setUpHiveSenseDevice().then(function () {
                          $rootScope.goNext('/');
                      });
                    },
                    function error (err) {
                      toastr.warning(err, 'Authentication Failed')
                    }
                  );

                },
                function error(err) {
                  toastr.error(err.data, 'Error')
                }
              );// End AuthService

            },
            function error(err) {
              toastr.error(err, 'Authentication Failed')
            });
        }

      };
    }
  ]);
