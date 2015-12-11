'use strict';

angular.module('runway')
  .controller('LoginController', [
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

      $scope.startLogin = function() {
        if ($scope.loginForm.$valid) {
          return registerService.login($scope.credentials.email, $scope.credentials.password).then(
            function success(data) {
              $modalInstance.close();
              $rootScope.currentUser.setUser(data.result);

              MessageCentreService.sendRailsResponse({
                'title': 'Willkommen, du bist jetzt angemeldet.'
              });

              trackingService.track('user.login', $rootScope.currentUser.getUser());
              $rootScope.goNext();
            },
            function error(err) {
              MessageCentreService.sendRailsResponse(err.data);
            }
          );
        }
      };
    }
  ]);