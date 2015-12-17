(function() {
  'use strict';

  angular
    .module('runway')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $state, $log, $location, currentUserService, toastr) {
    $rootScope.currentUser = currentUserService;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      //$log.debug('AUTHORISED VIEWS: isAuthorised:'+ $rootScope.currentUser.isAuthenticated())
      //$window.scrollTo(0, 0);

      var uriStateData = angular.extend({}, {
        authorised: false, // dont require login by default
        'container-class': 'container' // default
      }, toState.data);

      var requireLogin = uriStateData.authorised;

      if (requireLogin === true && $rootScope.currentUser.isAuthenticated() === false) {
        event.preventDefault();
        // show flash
        // get me a login modal!
        toastr.warning('You need to be logged in to access that page', 'Authentication Failed')
        $state.go('sign-in');
      }
    });

    $rootScope.goNext = function(path) {
      if ($rootScope.next || path) {

        $location.path($rootScope.next || path);

      } else {

        $state.go($state.$current, null, {
          reload: true
        });

      }
    };

    $log.debug('runBlock end');
  }

})();
