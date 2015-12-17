(function() {
  'use strict';

  angular
    .module('runway')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($rootScope, $scope, $state, moment, currentUserService) {
      var vm = this;

      function setIsAuthenticated () {
        $scope.is_authenticated = $rootScope.currentUser.isAuthenticated()
      }

      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();

      $rootScope.$on('HTTP_ERROR', function() {
        setIsAuthenticated();
      });
      $rootScope.$on('user.update', function() {
        setIsAuthenticated();
      });
      $rootScope.$on('user.logout', function() {
        setIsAuthenticated();
      });

      $scope.log_out = function () {
        currentUserService.logout('Thanks for using HiveEmpire, see you soon.')
      }

      $scope.is_active_nav_option = function(state_name) {
        if (typeof state_name === 'string' && state_name === $state.current.name) {
          return true;
        }
        if (Object.prototype.toString.call( state_name ) === '[object Array]' && state_name.indexOf($state.current.name) >= 0) {
          return true;
        }
        return false;
      }
      // initialize
      setIsAuthenticated();
    }
  }

})();
