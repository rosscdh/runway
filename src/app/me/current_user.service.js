'use strict';

angular.module('runway')
  .factory('currentUserService', [
    '$log',
    '$rootScope',
    '$intercom',
    'localStorageService',
    'trackingService',
    'MessageCentreService',
    function($log, $rootScope, $intercom, localStorageService, trackingService, MessageCentreService) {
      var storage = localStorageService;

      var userData = {
        email: null,
        authorization: {
          access_token: null
        },
      };
      var authData = {
        authorization: {
          access_token: null
        }
      };

      /**
        * Currently we get the user data in the form of
        {
          "id": 1,
          "email": "jan.pieper@kumukan.com",
          "login_type": "password",
          "login_provider": null,
          "created_at": "2014-12-04T10:36:18.000Z",
          "updated_at": "2014-12-04T10:50:49.000Z",
          "detail": {
            "first_name": null,
            "last_name": null,
            "gender": null,
            "birthday": null,
            "created_at": null,
            "updated_at": null
          }
        }
        But really it should be
        {
          "id": 1,
          "email": "jan.pieper@kumukan.com",
          "login_type": "password",
          "login_provider": null,
          "created_at": "2014-12-04T10:36:18.000Z",
          "updated_at": "2014-12-04T10:50:49.000Z",
          "first_name": null,
          "last_name": null,
          "gender": null,
          "birthday": null,
          "created_at": null,
          "updated_at": null
        }
        */
      var extractAuthData = function(user) {
        // extract teh access_token if its is present
        if (user && user.authorization && user.authorization.access_token) {
          authData.authorization.access_token = user.authorization.access_token;
          //delete user.authorization; // remove from the user
        }
      };

      var transformUserData = function(user) {
        if (user !== undefined) {
          var detail = (user.detail === undefined) ? undefined : user.detail;
          if (detail !== undefined) {

            try {
              detail.birthday = new Date(detail.birthday);
            } catch (err) {
              detail.birthday = new Date();
            }

            try {
              user.name = detail.first_name +' '+ detail.last_name;
            } catch (err) {
              user.name = 'User has not provided name';
            }

            try {
              delete user.detail; // remove the details block
              return angular.extend(detail, user);
            } catch (err) {
            }

          }
        }
        return user;
      };

      var currentUserService = {
        setUser: function(user_data) {
          angular.extend(userData, user_data.user || user_data);
          extractAuthData(userData); // extract the token if it exists
          storage.set('userData', userData); // save the user data
          if (authData.authorization.access_token !== null) {
            storage.set('authData', authData); // save the auth data in storage
          }

          // sync with intercom
          //$log.debug(userData);
          //$intercom.update(userData);

          trackingService.register_user(userData);

          $rootScope.$emit('user.update', userData);
        },
        getUser: function() {
          //$log.debug(angular.toJson(storage.userData, true));
          return transformUserData(storage.get('userData') || undefined);
        },
        getAccessToken: function() {
          //X-Kumukan-Access-Token:<access_token> to header if present
          try {
            return storage.get('authData').authorization.access_token;
          } catch (err) {
            return null;
          }
        },
        getUserProductGroups: function () {
          if (this.isAuthenticated() === true) {
            return storage.get('userData').detail.product_groups;
          }
          return [];
        },
        isAuthenticated: function() {
          return storage.get('userData') && storage.get('userData').email !== null;
        },
        logout: function(message) {
          trackingService.track('user.logout', {});

          storage.remove('userData');
          storage.remove('authData');
          storage.remove('userProducts');

          $rootScope.$emit('user.logout', {});

          if (message) {
            MessageCentreService.sendRailsResponse({
              'type': 'warning',
              'title': message
            });
          }
        }
      };

      return currentUserService;
    }
  ]);
