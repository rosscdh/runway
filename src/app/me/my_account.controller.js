'use strict';

angular.module('runway')
  .controller('MyAccountController', [
    '$rootScope',
    '$scope',
    '$log',
    '$location',
    '$modal',
    'registerService',
    'currentUserService',
    'MessageCentreService',
    function($rootScope, $scope, $log, $location, $modal, registerService, currentUserService, MessageCentreService) {

      $scope.user = currentUserService.getUser();

      $scope.birthdayRange = function() {
        return '1940:' + String(moment().year() - 18); // minimum of 18+ according to AGB
      }

      $scope.updateUser = function() {
        var first_name = $scope.user.first_name;
        var last_name = $scope.user.last_name;
        var email = $scope.user.email;
        var gender = $scope.user.gender;
        var birthday = $scope.user.birthday;

        if ($scope.userForm.$valid) {
          registerService.update(first_name, last_name, email, gender, birthday).then(
            function success(data) {
              $rootScope.currentUser.setUser(data.result);
              MessageCentreService.sendRailsResponse({
                'title': 'Deine Profildaten wurden gespeichert.'
              });
            },
            function error(err) {
              MessageCentreService.sendRailsResponse(err.data);
            });
        }
      };

      $scope.showChangePasswordDialog = function() {
        $modal.open({
          animate: true,
          templateUrl: 'app/me/change_pass.dialog.html',
          windowTemplateUrl: 'app/me/change_pass.dialog.template.html',
          controller: 'ChangePasswordController'
        });
      };
    }
  ]);
