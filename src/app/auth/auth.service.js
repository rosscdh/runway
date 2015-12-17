'use strict';

angular.module('runway')
  .factory('AuthService', [
    '$q',
    '$log',
    '$auth',
    '$resource',
    '$rootScope',
    'moment',
    'toastr',
    'HiveEmpireConf',
    function($q, $log, $auth, $resource, $rootScope, moment, toastr, HiveEmpireConf) {

      function registerAPI(user) {

        user = user || $rootScope.currentUser.getUser();

        return $resource(HiveEmpireConf.API_ENDPOINTS.auth + '/auth/', {}, {
          'register': {
            'url': HiveEmpireConf.API_ENDPOINTS.auth + '/auth/registration/',
            'method': 'POST',
            'headers': {
              'Content-Type': 'application/json'
            },
          },
          'login': {
            'url': HiveEmpireConf.API_ENDPOINTS.auth + '/auth/token/', // JWT token
            'method': 'POST',
            'headers': {
              'Content-Type': 'application/json'
            }
          },
          'me': {
            'url': HiveEmpireConf.API_ENDPOINTS.auth + '/auth/user/',
            'method': 'GET',
            'headers': {
              'Content-Type': 'application/json'
            },
          },
          'confirm': {
            'url': HiveEmpireConf.API_ENDPOINTS.auth + '/auth/registration/verify-email/',
            'method': 'POST',
            'headers': {
              'Content-Type': 'application/json'
            }
          },
          'forgot_password': {
            'url': HiveEmpireConf.API_ENDPOINTS.auth + '/auth/password/reset/',
            'method': 'POST',
            'headers': {
              'Content-Type': 'application/json'
            }
          },
          'confirm_password_reset': {
            'url': HiveEmpireConf.API_ENDPOINTS.auth + '/auth/password/reset/confirm/',
            'method': 'PUT',
            'headers': {
              'Content-Type': 'application/json'
            }
          },
          'update': {
            'url': HiveEmpireConf.API_ENDPOINTS.auth + '/auth/user/',
            'method': 'PATCH',
            'headers': {
              'Content-Type': 'application/json'
            },
          },
          'change_password': {
            'url': HiveEmpireConf.API_ENDPOINTS.auth + '/auth/password/change/',
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
        var user_namespace_data = data;

        // dont play vars in the URL
        if (['login', 'register'].indexOf(event_name) > -1) {
          data = {};
        }

        api[event_name](data, user_namespace_data,
          function success(response) {
            data.result = response;
            deferred.resolve(data);
          },
          function error(err) {
            data.result = null;
            toastr.error('Error', err.statusText);
            deferred.reject(err);
          }
        );

        return deferred.promise;
      };


      var register = {
        register: function(data) {
          var register_data = {
            'email': data.email,
            'password1': data.confirm_password,
            'password2': data.password,
          };

          return query('register', register_data);
        },
        login: function(email, password) {
          var login_data = {
            'username': email,
            'password': password
          };
          return query('login', login_data);
        },
        refresh_token: function () {
        },
        me: function() {
          return query('me', {});
        },
        confirm_user: function(confirmation_token, newsletter_token) {
          var data = {
            'confirmation_token': confirmation_token,
            'subscribe_newsletter_token': newsletter_token
          };
          return query('confirm', data);
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
              toastr.error(err.data, 'Error');
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
          //birthday = moment(birthday).format('YYYY-MM-DD');

          var update_data = {};
          return query('update', update_data);
        },
        change_password: function(old_password, password, password_confirmation) {
          var data = {
            'old_password': old_password,
            'password': password,
            'password_confirmation': password_confirmation
          };
          return query('change_password', data);
        }
      };

      return register;
    }
  ]);
