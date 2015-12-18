(function() {
  'use strict';

  angular
    .module('runway')
    .controller('ModalInstanceController', ModalInstanceController);

    /** @ngInject */
    function ModalInstanceController($scope, $modalInstance, items) {

      $scope.items = items;

      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

    };

})();
