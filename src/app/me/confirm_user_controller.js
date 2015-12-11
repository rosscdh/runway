'use strict';

angular.module('runway')
  .controller('ConfirmUserController', [
    '$scope',
    '$state',
    '$stateParams',
    'registerService',
    'MessageCentreService',
    function($scope, $state, $stateParams, registerService, MessageCentreService) {

      $scope.confirm_user = function() {
        registerService.confirm_user($stateParams.confirm_token, $stateParams.newsletter_token).then(
          function success(data) {
            //console.log(data);
            MessageCentreService.sendRailsResponse({
              'title': 'E-Mail Adresse erfolgreich registriert!'
            });
            $state.go('home');
          },
          function error(err) {
            MessageCentreService.sendRailsResponse(err.data);
            $state.go('home');
          });
      }

    }
  ]);