import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../modules/rate-limit.js';

export const Products = new Mongo.Collection('Products');
import {Catalogs} from './Catalogs.js'

//----------------------------------------------------
//simple SChem block
//----------------------------------------------------
Products.schema = new SimpleSchema({
  productName: {
    type: String,
    label: 'The name of the Product.',
  },
  owner: {
    type: String,
    label: 'The Owners id',
  },
  sku: {
    type: Number,
    label: 'Amount needed.',
  },
  price: {
    type: Number,
    label: 'How much.',
  },
});

Products.attachSchema(Products.schema);

Factory.define('product', Products, {
  productName: () => 'Factory productName',
  owner: () => 'Factory owner',
  sku: () => 'Factory sku',
  price: () => 'Factory price',
});

export const upsertProduct = new ValidatedMethod({
  name: 'product.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    productName: { type: String, optional: false },
    owner: { type: String, optional: true },
    sku: { type: Number, optional: true },
    price: { type: Number, optional: true },
  }).validator(),
  run(product) {
    return Products.upsert({ _id: product._id }, { $set: product });
  },
});

rateLimit({
  methods: [
    upsertProduct,
  ],
  limit: 5,
  timeRange: 1000,
});


//----------------------------------------------------
//Server Codes below
//----------------------------------------------------

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish Products that are public or belong to the current user
  Meteor.publish('Products', function ProductsPublication() {
    return Products.find({
      $or: [
        { owner: this.userId },
      ],
    });
  });
}

Products.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Meteor.methods({
  'products.insert'(productName , sku, price) {
    sku = parseInt(sku);
    price = parseInt(price);

    const product = {
      productName: productName,
      owner: this.userId,
      sku: sku,
      price: price,
    };

    upsertProduct.call(product, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Add product success!');
      }
    });
    /*
    check(text, String);
    Products.insert({
      productName : text,
      owner: this.userId,
      sku : sku,
      price : price,
    });
    */
  },
  'products.remove'(productId) {
    check(productId, String);

    const product = Products.findOne(productId);
    if (product.private && product.owner !== this.userId) {
      // If the product is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
    Products.remove(productId);
  },
  'products.setChecked'(productId, setChecked) {
    check(productId, String);
    check(setChecked, Boolean);

    const product = Products.findOne(productId);
    if (product.private && product.owner !== Meteor.userId) {
      // If the product is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }
    Products.update(productId, { $set: { checked: setChecked } });
  },
  'products.setPrivate'(productId, setToPrivate) {
   check(productId, String);
   check(setToPrivate, Boolean);

   const product = Products.findOne(productId);

   // Make sure only the product owner can make a product private
   if (product.owner !== this.userId) {
     throw new Meteor.Error('not-authorized');
   }
   Products.update(product, { $set: { private: setToPrivate } });
 },
   'products.addtoCatalogItem'(product , catalogId) {
    check(product, Object);
    check(catalogId, String);
    const catalog = Catalogs.findOne(catalogId);

    // Make sure only the product owner can make a product private
    if (!catalog){
      throw new Meteor.Error('catalog not found');
    }
    if (catalog.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Catalogs.update({_id : catalogId}, { $addToSet: { productList : product } });
  },

});
