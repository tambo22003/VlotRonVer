import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const RetailerHistory = new Mongo.Collection('RetailerHistory');
export const SupplierHistory = new Mongo.Collection('SupplierHistory');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish Catalogs that are public or belong to the current user
  Meteor.publish('RetailerHistory', function CatalogsPublication() {
    return RetailerHistory.find({
      $or: [
        { owner: this.userId },
      ],
    });
  });
  Meteor.publish('SupplierHistory', function CatalogsPublication() {
    return SupplierHistory.find({
      $or: [
        { owner: this.userId },
      ],
    });
  });
}
