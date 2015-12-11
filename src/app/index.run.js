(function() {
  'use strict';

  angular
    .module('runway')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
