'use strict';

angular.module('runway')
  .controller('ConfirmPasswordResetController', [
      '$location',
      '$scope',
      '$state',
      'registerService',
      'MessageCentreService',
  function ($location, $scope, $state, registerService, MessageCentreService) {

      $scope.data = {
        'reset_password_token': null,
        'password': null
      };

      var init = function () {
        $scope.data.reset_password_token = $location.search().reset_password_token;
        if ($scope.data.reset_password_token === undefined || $scope.data.reset_password_token.length === 0) {
            MessageCentreService.sendRailsResponse({'type': 'warning', 'title': 'No password reset token found. Please try again'});
            $state.go('home');
        }
      };


      $scope.sendPasswordConfirmReset = function () {
        registerService.confirm_password_reset($scope.data.reset_password_token, $scope.data.password).then(
          function success (data) {
            MessageCentreService.sendRailsResponse({'title': 'Successfully reset your password, please login using your new password.'});
            registerService.showLogin();
          },
          function error (err) {
            MessageCentreService.sendRailsResponse(err.data);
          });
      }
      init();
  }]);