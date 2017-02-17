/* eslint-disable no-undef */
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertSupplier } from '../api/addsupplier/methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { sup } = component.props;
  const confirmation = sup && sup._id ? 'Supplier updated!' : 'Supplier added!';
  const upsert = {
    name: document.querySelector('[name="name"]').value.trim(),
    email: document.querySelector('[name="email"]').value.trim(),
    category: document.querySelector('[name="category"]').value.trim(),
    subscribedBy: Meteor.userId(),
  };

  if (sup && sup._id) upsert._id = sup._id;

  upsertSupplier.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.supplierEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push(`/addsuppliers/${response.insertedId || sup._id}`);
    }
  });
};

const validate = () => {
  $(component.supplierEditorForm).validate({
    rules: {
      name: {
        required: true,
      },
      email: {
        required: true,
      },
      category: {
        required: true,
      },
    },
    messages: {
      name: {
        required: 'Need a name in here.',
      },
      email: {
        required: 'This needs a email',
      },
      category: {
        required: 'This needs a category',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function supplierEditor(options) {
  component = options.component;
  validate();
}
