(function() {
  'use strict';

  angular
    .module('runway')
    .config(config);

  /** @ngInject */
  function config(//$httpProvider,
                  $logProvider,
                  toastrConfig)
                  //$localStorageProvider,
                  //jwtInterceptorProvider,
                  //HiveEmpireConf)
  {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

      // JWT Token Interceptor for refresh if expired
    //   jwtInterceptorProvider.tokenGetter = ['jwtHelper', '$state', '$http', '$localStorage', 'HiveEmpireConf', function(jwtHelper, $state, $http, $localStorage, HiveEmpireConf) {
    //     var idToken = $localStorage.id_token;
    //     var refreshToken = $localStorage.refresh_token;

    //     if (idToken === undefined) {

    //     } else {

    //       if (jwtHelper.isTokenExpired(idToken)) {
    //         // This is a promise of a JWT id_token
    //         return $http({
    //           url: HiveEmpireConf.API_ENDPOINTS.auth + '/auth/token/refresh/',
    //           // This makes it so that this request doesn't send the JWT
    //           skipAuthorization: true,
    //           method: 'POST',
    //           data: {
    //               grant_type: 'refresh_token',
    //               refresh_token: refreshToken
    //           }
    //         }).then(function(response) {
    //           var id_token = response.data.id_token;
    //           $localStorage.id_token = id_token;
    //           return id_token;
    //         });
    //       } else {
    //         return idToken;
    //       } // end jwtHelper.isTokenExpired

    //     } // end if idToken === undefined
    //   }];
    //   $httpProvider.interceptors.push('jwtInterceptor');
  }

})();
