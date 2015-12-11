'use strict';

angular.module('runway')
  .controller('LogoutController', function($rootScope, $state, $scope) {
    $scope.cancel = function() {
      $state.go('home');
    }

    $scope.logout = function() {
      console.log($state);
      $rootScope.currentUser.logout();
      $state.go('home');
    }

    $scope.logout(); // automatically log them out
  });
