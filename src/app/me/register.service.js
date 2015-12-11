'use strict';

angular.module('runway')
  .factory('registerService', [
    '$q',
    '$log',
    '$auth',
    '$resource',
    '$rootScope',
    '$modal',
    'moment',
    'MessageCentreService',
    'HiveEmpireConf',
    function($q, $log, $auth, $resource, $rootScope, $modal, moment, MessageCentreService, HiveEmpireConf) {

      function registerAPI(user) {

        user = user || $rootScope.currentUser.getUser();

        return $resource(HiveEmpireConf.API_ENDPOINTS.authentication + '/v1/users', {}, {
          'register': {
            'url': HiveEmpireConf.API_ENDPOINTS.authentication + '/v1/users/register',
            'method': 'POST',
            'headers': {
              'Content-Type': 'application/json'
            },
          },
          'login': {
            'url': HiveEmpireConf.API_ENDPOINTS.authentication + '/v1/users/verify_credentials',
            'method': 'POST',
            'headers': {
              'Content-Type': 'application/json'
            }
          },
          'confirm': {
            'url': HiveEmpireConf.API_ENDPOINTS.authentication + '/v1/users/confirm/:confirmation_token/:subscribe_newsletter_token',
            'method': 'POST',
            'headers': {
              'Content-Type': 'application/json'
            }
          },
          // 'verify_token': {
          //     'url': HiveEmpireConf.API_ENDPOINTS.authentication + '/v1/users/verify_token',
          //     'method': 'POST',
          //     'headers': { 'Content-Type': 'application/json' }
          // },
          'forgot_password': {
            'url': HiveEmpireConf.API_ENDPOINTS.authentication + '/v1/users/password',
            'method': 'POST',
            'headers': {
              'Content-Type': 'application/json'
            }
          },
          'confirm_password_reset': {
            'url': HiveEmpireConf.API_ENDPOINTS.authentication + '/v1/users/confirm_password',
            'method': 'PUT',
            'headers': {
              'Content-Type': 'application/json'
            }
          },
          'update': {
            'url': HiveEmpireConf.API_ENDPOINTS.authentication + '/v1/users',
            'method': 'PUT',
            'headers': {
              'Content-Type': 'application/json'
            },
          },
          'change_password': {
            'url': HiveEmpireConf.API_ENDPOINTS.authentication + '/v1/users/change_password',
            'method': 'POST',
            'headers': {
              'Content-Type': 'application/json'
            },
          },
        });
      }

      // main query object that performs the primary events
      var query = function(event_name, data) {
        var deferred = $q.defer();
        var api = registerAPI();

        //
        // Encase all outgoing requests in a {"user": {}} object
        //
        var user_namespace_data = {
          'user': data
        };

        // call the specific resource in the api
        // $log.debug('Calling: register api \''+ event_name+'\' with data:');
        // $log.debug(user_namespace_data);
        // $log.debug(angular.toJson(user_namespace_data));

        // dörty quickfix, to prevent showing credentials in browser console
        if (event_name === 'login') {
          data = {};
        }

        api[event_name](data, user_namespace_data,
          function success(response) {
            data.result = response;
            deferred.resolve(data);
          },
          function error(err) {
            data.result = null;
            MessageCentreService.sendRailsResponse(err.data);
            deferred.reject(err);
          }
        );

        return deferred.promise;
      };


      var register = {
        register: function(data) {
          var register_data = {
            'login_type': 'password',
            'email': data.email,
            'password': data.confirm_password
          };

          return query('register', register_data);
        },
        newsletterSubscribeDialog: function() {
          $modal.open({
            animate: true,
            templateUrl: 'app/components/newsletter/subscribe.dialog.html',
            windowTemplateUrl: 'app/auth/login.dialog.template.html',
            controller: 'NewsletterDialogController'
          });
        },
        confirm_user: function(confirmation_token, newsletter_token) {
          var data = {
            'confirmation_token': confirmation_token,
            'subscribe_newsletter_token': newsletter_token
          };
          return query('confirm', data);
        },
        login: function(email, password) {
          var login_data = {
            'email': email,
            'password': password
          };
          return query('login', login_data);
        },
        authenticate_thirdparty: function(provider) {
          var deferred = $q.defer();

          $auth.authenticate(provider).then(function(response) {
              //$log.debug(response);
              var user_data = {
                'user': response.data
              };
              //$log.debug(user_data);
              deferred.resolve(user_data);
            },
            function error(err) {
              MessageCentreService.sendRailsResponse(err.data);
              deferred.reject(err);
            });

          return deferred.promise;
        },
        forgot_password: function(email) {
          var forgot_password_data = {
            'email': email,
          };

          return query('forgot_password', forgot_password_data);
        },
        confirm_password_reset: function(token, password) {
          var confirm_password_reset_data = {
            'reset_password_token': token,
            'password': password
          };

          return query('confirm_password_reset', confirm_password_reset_data);
        },
        update: function(first_name, last_name, email, gender, birthday) {
          birthday = moment(birthday).format('YYYY-MM-DD');

          var update_data = {
            'email': email,
            'detail_attributes': {
              'first_name': first_name,
              'last_name': last_name,
              'gender': gender,
              'birthday': birthday
            }
          };
          return query('update', update_data);
        },
        update_analytics: function(analytics_enabled) {
          var update_data = {
            'detail_attributes': {
              'analytics_enabled': analytics_enabled,
            }
          };
          return query('update', update_data);
        },
        update_newsletter_subscribed: function(newsletter_subscribed) {
          var update_data = {
            'detail_attributes': {
              'newsletter_subscribed': newsletter_subscribed,
            }
          };
          return query('update', update_data);
        },
        change_password: function(old_password, password, password_confirmation) {
          var data = {
            'old_password': old_password,
            'password': password,
            'password_confirmation': password_confirmation
          };
          return query('change_password', data);
        },
        // both methods, showLoging and showSignup, should be deprecated
        showLogin: function() {
          $modal.open({
            animate: true,
            templateUrl: 'app/auth/login.html',
            windowTemplateUrl: 'app/auth/login.dialog.template.html',
            controller: 'LoginController'
          });
        },
        showSignup: function() {
          $modal.open({
            animate: true,
            templateUrl: 'app/auth/signup.html',
            windowTemplateUrl: 'app/auth/signup.dialog.template.html',
            controller: 'SignupController'
          });
        }
      };

      return register;
    }
  ]);
