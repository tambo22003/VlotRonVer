import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Suppliers = new Mongo.Collection('Suppliers');
export default Suppliers;

Suppliers.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Suppliers.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Suppliers.schema = new SimpleSchema({
  name: {
    type: String,
    label: 'The name of the Supplier.',
  },
  email: {
    type: String,
    label: 'The email of the Supplier.',
  },
  category: {
    type: String,
    label: 'The type of the Supplier.',
  },
  subscribedBy:{
    type: String,
    label: 'The type of the subscribedBy.',
  }
});

Suppliers.attachSchema(Suppliers.schema);

Factory.define('supplier', Suppliers, {
  name: () => 'Factory Name',
  email: () => 'Factory Emal',
  category: () => 'Factory Category',
  subscribedBy: () => 'Factory subscribedBy',
});
