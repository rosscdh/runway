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
            return $resource(HiveEmpireConf.API_ENDPOINTS.default + '/v1/hives/:id', {}, {
                'get': {'cache': true},
                'query': {'cache': true, 'isArray': false}
            });
        }

        return {
          detail: function (id) {
            var deferred = $q.defer();
            var api = HiveAPI();
            api.get({'id': id},
                function success(response) {
                    deferred.resolve(response.toJSON());
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
