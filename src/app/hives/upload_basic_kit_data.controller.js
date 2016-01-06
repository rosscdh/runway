(function() {
  'use strict';

  angular
    .module('runway')
    .controller('UploadBasicKitDataController', UploadBasicKitDataController);

  /** @ngInject */
  function UploadBasicKitDataController($scope, $state, HivesService, HiveEmpireConf, toastr) {
      var vm = this;
      var uuid = $state.params.hive;

      $scope.$watch('file', function () {
          if ($scope.file != null) {
              $scope.files = [$scope.file]; 
          }
      });
      $scope.log = '';

      $scope.upload = function (files) {
          if (files && files.length) {
              for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                  Upload.upload({
                      url: HiveEmpireConf.API_ENDPOINTS.default + '/v1/hives/basik-kit/data/upload',
                      data: {
                        file: file
                      }
                  }).progress(function (evt) {
                      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                      $scope.log = 'progress: ' + progressPercentage + '% ' +
                                  evt.config.data.file.name + '\n' + $scope.log;
                  }).success(function (data, status, headers, config) {
                      $timeout(function() {
                          $scope.log = 'file: ' + config.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                      });
                  });
                }
              }
          }
      };

      HivesService.detail(uuid).then(function success(data) {
        vm.hive = data;
      });

  }
})();
