(function() {
  'use strict';

  angular
    .module('runway')
    .service('HivesService',
      ['$q',
       '$resource',
       'HiveEmpireConf',
      function ($q, $resource, HiveEmpireConf) {

        function HiveAPI() {
            return $resource(HiveEmpireConf.API_ENDPOINTS.default + '/v1/hives/:uuid/', {}, {
                'get': {'cache': true},
                'query': {'cache': true, 'isArray': false}
            });
        }

        return {
          list: function () {
            var deferred = $q.defer();
            var api = HiveAPI();
            api.get({},
                function success(response) {
                    deferred.resolve(response.toJSON());
                },
                function error(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
          },
          detail: function (uuid) {
            var deferred = $q.defer();
            var api = HiveAPI();
            api.get({'uuid': uuid},
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
      }]);
})();
