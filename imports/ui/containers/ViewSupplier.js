import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Suppliers from '../../api/addsupplier/suppliers.js';
import ViewSupplier from '../pages/addsupplier/ViewSupplier.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('suppliers.view', params._id);

  if (subscription.ready()) {
    const sup = Suppliers.findOne();
    onData(null, { sup });
  }
};

export default composeWithTracker(composer, Loading)(ViewSupplier);
