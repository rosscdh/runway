(function() {
  'use strict';

  angular
    .module('runway')
    .controller('PageMetaController', PageMetaController);

  /** @ngInject */
  function PageMetaController(PageMetaService) {
    var vm = this;

    vm.PageMetaService = PageMetaService;
  }

})();
