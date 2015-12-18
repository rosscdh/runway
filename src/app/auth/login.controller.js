'use strict';

angular.module('runway')
  .controller('LoginController', [
    '$log',
    '$scope',
    '$rootScope',
    'AuthService',
    'toastr',
    function($log, $scope, $rootScope, AuthService, toastr) {

      $scope.credentials = {};

      $scope.startLogin = function() {
        if ($scope.loginForm.$valid) {

          AuthService.login($scope.credentials.email, $scope.credentials.password).then(
            function success(data) {

              $rootScope.currentUser.setAccessToken(data.result.toJSON().token);

              AuthService.me().then(
                function success (data) {
                  $rootScope.currentUser.setUser(data.result.toJSON());
                  toastr.info('You have logged in to HiveEmpire', 'Signed in successfully')
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
          );
        }
      };
    }
  ]);