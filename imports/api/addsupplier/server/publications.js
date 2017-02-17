import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Suppliers from '../suppliers';

Meteor.publish('suppliers.list', () => Suppliers.find());

Meteor.publish('suppliers.view', (_id) => {
  check(_id, String);
  console.log(Suppliers.find(_id));
  return Suppliers.find(_id);
});

Meteor.publish('suppliers.view2', function SuppliersVeiw() {
  return Suppliers.find({subscribedBy: this.userId});
});
