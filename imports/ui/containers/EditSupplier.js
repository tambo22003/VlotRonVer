import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Suppliers from '../../api/addsupplier/suppliers.js';
import EditSupplier from '../pages/addsupplier/EditSupplier.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('suppliers.view', params._id);

  if (subscription.ready()) {
    const doc = Suppliers.findOne();
    onData(null, { sup });
  }
};

export default composeWithTracker(composer, Loading)(EditSupplier);
