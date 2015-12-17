(function() {
  'use strict';

  angular
    .module('runway')
    .config(config);

  /** @ngInject */
  function config($httpProvider,
                  $logProvider,
                  $resourceProvider,
                  toastrConfig,
                  jwtInterceptorProvider,
                  HiveEmpireConf)
  {
    // Enable log
    $logProvider.debugEnabled(HiveEmpireConf.DEBUG);

    // allow trailing slashes
    $resourceProvider.defaults.stripTrailingSlashes = false;

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    // JWT Token Interceptor
    jwtInterceptorProvider.tokenGetter = ['currentUserService', function(currentUserService) {
      return currentUserService.getAccessToken();
    }];

    $httpProvider.interceptors.push('jwtInterceptor');
  }

})();
