(function() {
  'use strict';

  angular
    .module('runway')
    .service('DevicesService', DevicesService);

  /** @ngInject */
  function DevicesService($q, $resource, HiveEmpireConf) {
        function DevicesAPI() {
            return $resource(HiveEmpireConf.API_ENDPOINTS.default + '/v1/boxes/:uuid/', {}, {
                'update': {'method': 'PATCH'},
                'query': {'isArray': false}
            });
        }
    return {
      query: function () {
        var deferred = $q.defer();
        var api = DevicesAPI();
        api.query({},
            function success(response) {
                deferred.resolve(response.toJSON());
            },
            function error(err) {
                deferred.reject(err);
            }
        );
        return deferred.promise;
      },
    }
  }
})();
