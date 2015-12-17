'use strict';

angular.module('runway')
  .factory('currentUserService', [
    '$log',
    '$rootScope',
    '$localStorage',
    'toastr',
    function($log, $rootScope, $localStorage, toastr) {
      var storage = $localStorage;

      var user_data = {};

      var transformUserData = function(user) {
        if (user !== undefined) {
        }
        return user;
      };

      return {
        setUser: function(new_user_data) {
          angular.extend(user_data, new_user_data);
          storage.user_data = user_data; // save the user data

          $rootScope.$emit('user.update', user_data);
        },
        getUser: function() {
          //$log.debug(angular.toJson(storage.user_data, true));
          return transformUserData(storage.user_data || undefined);
        },
        getAccessToken: function() {
          try {
            return storage.access_token;
          } catch (err) {
            return null;
          }
        },
        setAccessToken: function(token) {
          try {
            storage.access_token = token;
          } catch (err) {
          }
        },
        isAuthenticated: function() {
          return storage.user_data !== undefined && storage.user_data.email !== null;
        },
        logout: function(message) {
          delete storage.user_data;
          delete storage.access_token;

          $rootScope.$emit('user.logout', {});

          if (message) {
            toastr.info(message, 'Log out')
          }
        }
      }; // end of the return signleton
    }
  ]);
