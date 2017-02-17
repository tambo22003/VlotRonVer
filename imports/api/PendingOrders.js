import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import {RetailerHistory} from '../../imports/api/OrderHistories.js'

export const PendingOrders = new Mongo.Collection('PendingOrders');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish Catalogs that are public or belong to the current user
  Meteor.publish('PendingOrders', function CatalogsPublication() {
    return PendingOrders.find({ owner: this.userId });
  });
}

Meteor.methods({
  'pendingOrders.insert' (userId , cart) {

    cart.items.map((tempitem) => {
      var orderContainer = PendingOrders.findOne({owner : tempitem.product.owner});
      var OrderHisContainer = RetailerHistory.findOne({owner : userId});

      if(!orderContainer){
        PendingOrders.insert({
          owner: tempitem.product.owner,
        });
      }

      if(!OrderHisContainer){
        RetailerHistory.insert({
          owner: userId,
        });
      }

      let tempDate = new Date();
      let expiredDate = new Date(new Date().setTime(new Date().getTime() + 1000 * 120))

      PendingOrders.update({owner : tempitem.product.owner},
        { $addToSet : {items : {product : tempitem.product,
          amount : tempitem.amount,
          CreatedAt : tempDate,
          expiredDate: expiredDate,
          fromRetailer: Meteor.userId()}}});

      RetailerHistory.update({owner : userId} ,
        { $addToSet : {items : {product : tempitem.product,
          amount : tempitem.amount,
          CreatedAt : tempDate,
          expiredDate: expiredDate,
          fromRetailer: Meteor.userId()}}});
        });
  },
  'pendingOrders.expire' () {

    PendingOrders.update(
      {},
      {$pull :{items : {expiredDate : {$lt : new Date()} }}},
      { multi: true }
    );

  },



})
