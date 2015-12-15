(function() {
  'use strict';

  angular
    .module('runway')
    .controller('WeatherController', ['WeatherService', function(WeatherService) {
      var vm = this;
      var location = 'Düsseldorf,Germany';
      vm.weather = null;

      activate();

      function activate() {
        vm.weather = WeatherService.getWeather(location);
      }

    }]);

})();
