import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Suppliers from '../../api/addsupplier/suppliers.js';
import SuppliersList from '../components/SuppliersList.js';
import Loading from '../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('suppliers.list');
  if (subscription.ready()) {
    const suppliers = Suppliers.find().fetch();
    onData(null, { suppliers });
  }
};

export default composeWithTracker(composer, Loading)(SuppliersList);
