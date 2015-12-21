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
          list: function () {
            var deferred = $q.defer();
            var api = DevicesAPI();
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
            var api = DevicesAPI();
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
          },
          create: function (data) {
            var deferred = $q.defer();
            var api = DevicesAPI();
            api.save(data,
                function success(response) {
                    deferred.resolve(response.toJSON());
                },
                function error(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
          },
          update: function (data) {
            var deferred = $q.defer();
            var api = DevicesAPI();
            api.update({'uuid': data.uuid}, data,
                function success(response) {
                    deferred.resolve(response.toJSON());
                },
                function error(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
          },
          delete: function (uuid) {
            var deferred = $q.defer();
            var api = DevicesAPI();
            api.delete({'uuid': uuid}, {},
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
  }
})();
