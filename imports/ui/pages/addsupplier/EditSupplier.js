import React from 'react';
import SupplierEditor from '../../components/SupplierEditor.js';

const EditSupplier = ({ sup }) => (
  <div className="EditSupplier">
    <h4 className="page-header">Editing "{ sup.name }"</h4>
    <SupplierEditor sup={ sup } />
  </div>
);

EditSupplier.propTypes = {
  sup: React.PropTypes.object,
};

export default EditSupplier;
