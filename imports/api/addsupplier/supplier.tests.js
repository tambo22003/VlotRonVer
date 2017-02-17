/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'meteor/practicalmeteor:chai';
import Suppliers from './suppliers.js';

describe('Suppliers collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof Suppliers, 'object');
  });
});
