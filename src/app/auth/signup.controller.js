'use strict';

angular.module('runway')
  .controller('SignupController', [
    '$log',
    '$scope',
    '$modalInstance',
    '$rootScope',
    'trackingService',
    'registerService',
    'MessageCentreService',
    function($log, $scope, $modalInstance, $rootScope, trackingService, registerService, MessageCentreService) {

      $scope.credentials = {};

      $scope.close = function() {
        $modalInstance.close();
      };

      $scope.startRegistration = function() {
        if ($scope.registerForm.$valid) {
          registerService.register($scope.credentials).then(
            function success(data) {
              $modalInstance.close();
              var is_new = data.result.is_new;
              $rootScope.currentUser.setUser(data.result);

              if (is_new === true) {
                // show the newsletter popup
                registerService.newsletterSubscribeDialog();
              }

              MessageCentreService.sendRailsResponse({
                'title': 'Willkommen, du hast dich erfolgreich registriert.'
              });

              trackingService.track('user.signup', $rootScope.currentUser.getUser());

              // $rootScope.goNext();
            },
            function error(err) {
              MessageCentreService.sendRailsResponse(err.data);
            });
        }
      };
    }
  ]);
