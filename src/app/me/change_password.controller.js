'use strict';

angular.module('runway')
  .controller('ChangePasswordController', [
    '$scope',
    '$modalInstance',
    'registerService',
    'MessageCentreService',
    function($scope, $modalInstance, registerService, MessageCentreService) {

      // password reset
      $scope.old_password = null;
      $scope.password = null;
      $scope.password_confirmation = null;

      $scope.close = function () {
        $modalInstance.close();
      };

      $scope.updatePassword = function() {
        var old_password = $scope.old_password;
        var password = $scope.password;
        var password_confirmation = $scope.password_confirmation;

        if ($scope.changePassword.$valid) {
          registerService.change_password(old_password, password, password_confirmation).then(
            function success(data) {
              //console.log($modalInstance);
              $modalInstance.close();
              MessageCentreService.sendRailsResponse({
                'title': 'Dein Passwort wurde geändert.'
              });
            },
            function error(err) {
              MessageCentreService.sendRailsResponse(err.data);
            });
        }
      };
    }
  ]);
