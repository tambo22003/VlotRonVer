import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

if (Meteor.isServer) {

    Meteor.methods({
      'sendVerificationLink'(userId) {
        check(userId, String);

          return Accounts.sendVerificationEmail( userId );
      }
    });
}
