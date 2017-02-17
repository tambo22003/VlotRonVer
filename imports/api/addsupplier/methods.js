import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Suppliers from './suppliers';
import rateLimit from '../../modules/rate-limit.js';

export const upsertSupplier = new ValidatedMethod({
  name: 'suppliers.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    name: { type: String, optional: true },
    email: { type: String, optional: true },
    category: { type: String, optional: true },
    subscribedBy: { type: String, optional: true },
  }).validator(),
  run(supplier) {
    return Suppliers.upsert({ _id: supplier._id }, { $set: supplier });
  },
});

export const removeSupplier = new ValidatedMethod({
  name: 'suppliers.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Suppliers.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertSupplier,
    removeSupplier,
  ],
  limit: 5,
  timeRange: 1000,
});
