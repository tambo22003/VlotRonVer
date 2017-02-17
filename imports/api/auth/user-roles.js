import {Email} from 'meteor/email';
import {check} from 'meteor/check';
import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import { Mongo } from 'meteor/mongo';


Meteor.methods({
        /**
         * update a user's permissions
         *
         * @param {Object} targetUserId Id of user to update
         * @param {Array} roles User's new permissions
         * @param {String} group Company to update permissions for
         */
        'updateRoles'(targetUserId, roles, group) {
          let loggedInUser = Meteor.user()

          if (!loggedInUser ||
              !Roles.userIsInRole(loggedInUser,
                                  ['fnb', 'supplier','salesperson'], group)) {
            throw new Meteor.Error(403, "Access denied")
          };

          Roles.setUserRoles(targetUserId, roles, group)
        },
         /**
         * delete a user from a specific group
         *
         * @method deleteUser
         * @param {String} targetUserId _id of user to delete
         * @param {String} group Company to update permissions for
         */
        'deleteUser'(targetUserId, group) {
          var loggedInUser = Meteor.user()

          if (!loggedInUser ||
              !Roles.userIsInRole(loggedInUser,
                                  ['manage-users', 'support-staff'], group)) {
            throw new Meteor.Error(403, "Access denied")
          };

          // remove permissions for target group
          Roles.setUserRoles(targetUserId, [], group)

          // do other actions required when a user is removed...
        },

        'addRoles'(_id, roles) {
          check(_id, String);
          check(roles, [String]);


          var loggedInUser = Meteor.user()

          if (!loggedInUser ){
            throw new Meteor.Error(403, "Access denied")
          };

          Roles.addUsersToRoles(targetUserId, roles)
        },

      })
