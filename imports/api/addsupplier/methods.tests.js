/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import Suppliers from './suppliers.js';
import { upsertSupplier, removeSupplier } from './methods.js';

describe('Suppliers methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a supplier into the Suppliers collection', function () {
    upsertSupplier.call({
      name: 'BrandConnect HK',
      email: 'tom%40brandconnect.asia',
      category: 'spirit',
    });

    const getSupplier = Suppliers.findOne({ name: 'BrandConnect HK' });
    assert.equal(getDocument.email, 'tom%40brandconnect.asia');
  });

  it('updates a supplier in the Suppliers collection', function () {
    const { _id } = Factory.create('supplier');

    upsertDocument.call({
      _id,
      name: 'BrandConnect HK',
      email: 'tom%40brandconnect.asia',
    });

    const getSupplier = Suppliers.findOne(_id);
    assert.equal(getSupplier.title, 'BrandConnect HK');
  });

  it('removes a document from the Suppliers collection', function () {
    const { _id } = Factory.create('supplier');
    removeSupplier.call({ _id });
    const getSupplier = Suppliers.findOne(_id);
    assert.equal(getSupplier, undefined);
  });
});
