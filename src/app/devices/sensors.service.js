(function() {
  'use strict';

  angular
    .module('runway')
    .service('SensorsService', SensorsService);

  /** @ngInject */
  function SensorsService($q, $resource, HiveEmpireConf) {
        function SensorsAPI() {
            return $resource(HiveEmpireConf.API_ENDPOINTS.default + '/v1/sensors/:uuid/', {}, {
                'update': {'method': 'PATCH'},
                'query': {'isArray': false}
            });
        }
        function AvailableSensorsAPI() {
            return $resource(HiveEmpireConf.API_ENDPOINTS.default + '/v1/shop/sensors/:uuid/', {}, {
                'update': {'method': 'PATCH'},
                'query': {'isArray': false}
            });
        }

    return {
      query: function () {
        var deferred = $q.defer();
        var api = SensorsAPI();
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
