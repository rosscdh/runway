'use strict';

angular.module('runway')
  .controller('ConfirmNewsletterSubscriptionController', [
    '$rootScope',
    '$scope',
    '$log',
    '$state',
    '$location',
    'ngDialog',
    'newsletterService',
    'MessageCentreService',
    function($rootScope, $scope, $log, $state, $location, ngDialog, newsletterService, MessageCentreService) {

      var newsletter_token = undefined;

      var init = function() {
        newsletter_token = $state.params.newsletter_token;

        if (newsletter_token === undefined || newsletter_token.length === 0) {
          MessageCentreService.sendRailsResponse({
            'type': 'warning',
            'title': 'No newsletter token found. Please try again'
          });
        } else {
          confirmNewsletterSubscription(newsletter_token);
        }
        $state.go('home');
      };

      var confirmNewsletterSubscription = function(token) {

        newsletterService.confirm_newsletter_subscription(token).then(
          function success(data) {
            $rootScope.currentUser.setUser(data.result);
            MessageCentreService.sendRailsResponse({
              'title': 'Erfolgreich beim manualONE newsletter angemeldet!'
            });
          },
          function error(err) {
            MessageCentreService.sendRailsResponse(err.data);
          });
          $state.go('home');
      }

      init();
    }
  ]);
