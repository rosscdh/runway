(function() {
  'use strict';

  angular
    .module('runway')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $log) {

    // $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    //   //$log.debug('AUTHORISED VIEWS: isAuthorised:'+ $rootScope.currentUser.isAuthenticated())
    //   //$window.scrollTo(0, 0);

    //   var uriStateData = angular.extend({}, {
    //     authorised: false, // dont require login by default
    //     'container-class': 'container' // default
    //   }, toState.data);

    //   var requireLogin = uriStateData.authorised;

    //   if (requireLogin === true && $rootScope.currentUser.isAuthenticated() === false) {
    //     event.preventDefault();

    //     // show flash
    //     // get me a login modal!
    //     $state.go('log-in')
    //   }
    // });

    $log.debug('runBlock end');
  }

})();
