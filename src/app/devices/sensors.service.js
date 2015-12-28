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
                'query': {'isArray': false},
                'chart': {'url': HiveEmpireConf.API_ENDPOINTS.default + '/v1/sensors/:uuid/chart/', 'isArray': false}
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
      chart: function (uuid, time_limit) {
        time_limit = (time_limit === undefined) ? '1h' : time_limit ;
        var deferred = $q.defer();
        var api = SensorsAPI();
        api.chart({'uuid': uuid, 'time_limit': time_limit},
            function success(response) {
                var data = response.toJSON();
                deferred.resolve(data);
            },
            function error(err) {
                deferred.reject(err);
            }
        );
        return deferred.promise;
      }
    }
  }
})();
