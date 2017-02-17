/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import supplierEditor from '../../modules/supplier-editor.js';

export default class SupplierEditor extends React.Component {
  componentDidMount() {
    supplierEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="name"]').focus(); }, 0);
  }

  render() {
    const { sup } = this.props;
    return (<form
      ref={ form => (this.supplierEditorForm = form) }
      onSubmit={ event => event.preventDefault() }
    >
      <FormGroup>
        <ControlLabel>Name</ControlLabel>
        <FormControl
          type="text"
          name="name"
          defaultValue={ sup && sup.name }
          placeholder="Supplier Name"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Email</ControlLabel>
        <FormControl
          type="email"
          name="email"
          defaultValue={ sup && sup.email }
          placeholder="Supplier Email"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Category</ControlLabel>
        <FormControl
          type="text"
          name="category"
          defaultValue={ sup && sup.category }
          placeholder="Supplier Category"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        { sup && sup._id ? 'Save Changes' : 'Add Supplier' }
      </Button>
    </form>);
  }
}

SupplierEditor.propTypes = {
  sup: React.PropTypes.object,
};
