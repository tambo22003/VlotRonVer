import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Catalogs = new Mongo.Collection('Catalogs');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish Catalogs that are public or belong to the current user
  Meteor.publish('Catalogs', function CatalogsPublication() {
    return Catalogs.find({
      $or: [
        { owner: this.userId },
      ],
    });
  });


Meteor.methods({
  'catalogs.insert' (text , des) {
    check(text, String);
    check(des, String);

    // Make sure the user is logged in before inserting a Catalogs
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Catalogs.insert({
      name: text,
      createdAt: new Date(),
      owner: this.userId,
      //username: Meteor.users.findOne(this.userId).username,
      des : des,
    });
  },
  'catalogs.remove'(catalogId) {
    check(catalogId, String);

    const catalog = Catalogs.findOne(catalogId);
    if (catalog.private && catalog.owner !== this.userId) {
      // If the catalog is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
    Catalogs.remove(catalogId);
  },
  'catalogs.removeProduct'(catalogId, product) {
    check(catalogId, String);
    check(product, Object);

    const catalog = Catalogs.findOne(catalogId);
    if (catalog.private && catalog.owner !== this.userId) {
      // If the catalog is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
    Catalogs.update({_id : catalogId} , {$pull :{productList : {$in : [product]}}});
  },
  'catalogs.removeAllProduct'( product) {
    check(product, Object);

    if (product.private && product.owner !== this.userId) {
      // If the catalog is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }


    Catalogs.update(
      {},
      {$pull :{productList : {$in : [product]}}},
      { multi: true }
    );

  },

});
}
