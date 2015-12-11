'use strict';

angular.module('runway')
  .controller('PasswordController', [
    '$log',
    '$state',
    '$scope',
    'ngDialog',
    '$rootScope',
    'registerService',
    'MessageCentreService',
    function($log, $state, $scope, ngDialog, $rootScope, registerService, MessageCentreService) {
      $scope.credentials = {};

      $scope.close = function() {
        $modalInstance.close();
      };

      $scope.showForgotPassword = function() {
        var showForgotPasswordDialog = ngDialog.open({
          templateUrl: 'app/auth/forgot_password.dialog.html'
        });
      };

      $scope.forgotPassword = function() {
        if ($scope.forgotPasswordForm.$valid) {
          registerService.forgot_password($scope.credentials.email).then(
            function success(data) {
              MessageCentreService.sendRailsResponse({
                'title': 'Bitte überprüfen Sie Ihre E-Mail für die Reset-Passwort per E-Mail'
              });
              ngDialog.closeAll();
            },
            function error(err) {
              MessageCentreService.sendRailsResponse(err.data);
            });
        }
      };
    }
  ]);
