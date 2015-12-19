(function() {
  'use strict';

  angular
    .module('runway')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $state, $log, $q, $location, currentUserService, DevicesService, PageMetaService, toastr) {
    $rootScope.currentUser = currentUserService;

    /**
    * Manage the change of state
    */
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      var uriStateData = angular.extend({}, {
        authorised: false, // dont require login by default
        'container-class': 'container' // default
      }, toState.data);

      var requireLogin = uriStateData.authorised;
      // -------------------
      // Setup the meta data
      // -------------------
      PageMetaService.setMeta('title', uriStateData.title);

      if (requireLogin === true && $rootScope.currentUser.isAuthenticated() === false) {
        event.preventDefault();
        // show flash
        // get me a login modal!
        toastr.warning('You need to be logged in to access that page', 'Authentication Failed')
        $state.go('sign-in');
      }
    });

    /**
    * Manager for if they have setup a device yet or not
    */
    $rootScope.setUpHiveSenseDevice = function() {
      var deferred = $q.defer();

      DevicesService.query().then(
        function success(response) {
            if (response.count == 0) {
              // no devices found redirect to device setup page
              $state.go('create-device');
            } else {
              deferred.resolve(response);
            }
        },
        function error(err) {
            toastr.warning(err, 'An Error Occurred')
            deferred.reject(err);
        });

      return deferred.promise;
    };

    /**
    * Generic GoNext handler for login with next param in url
    */
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
