'use strict';

angular.module('runway')
  .factory('currentUserService', [
    '$log',
    '$rootScope',
    '$localStorage',
    function($log, $rootScope, $localStorage) {
      var storage = $localStorage;

      var user_data = {};
      var auth_data = {};

      var extractAuthData = function(user) {
        // extract teh access_token if its is present
        if (user && user.authorization && user.authorization.access_token) {
          auth_data.authorization.access_token = user.authorization.access_token;
          //delete user.authorization; // remove from the user
        }
      };

      var transformUserData = function(user) {
        if (user !== undefined) {
        }
        return user;
      };

      var currentUserService = {
        setUser: function(user_data) {
          angular.extend(user_data, user_data.user || user_data);
          extractAuthData(user_data); // extract the token if it exists
          storage.user_data = user_data; // save the user data
          if (storage.auth_data.authorization.access_token !== null) {
            storage.auth_data = auth_data; // save the auth data in storage
          }

          $rootScope.$emit('user.update', user_data);
        },
        getUser: function() {
          //$log.debug(angular.toJson(storage.user_data, true));
          return transformUserData(storage.user_data || undefined);
        },
        getAccessToken: function() {
          //X-Kumukan-Access-Token:<access_token> to header if present
          try {
            return storage.auth_data.authorization.access_token;
          } catch (err) {
            return null;
          }
        },
        getUserProductGroups: function () {
          if (this.isAuthenticated() === true) {
            return storage.user_data.detail.product_groups;
          }
          return [];
        },
        isAuthenticated: function() {
          return storage.user_data && storage.user_data.email !== null;
        },
        logout: function(message) {
          storage.remove('user_data');
          storage.remove('auth_data');

          $rootScope.$emit('user.logout', {});

          if (message) {
          }
        }
      };

      return currentUserService;
    }
  ]);
