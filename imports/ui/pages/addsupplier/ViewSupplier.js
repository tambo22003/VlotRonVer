import React from 'react';
import { Row,Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeSupplier } from '../../../api/addsupplier/methods.js';

const handleEdit = (_id) => {
  browserHistory.push(`/addsuppliers/${_id}/edit`);
}

const handleRemove = (_id) => {
  if (confirm('Are you sure? This is permanent!')) {
    removeSupplier.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Supplier deleted!', 'success');
        browserHistory.push('/addsuppliers');
      }
    });
  }
};

const ViewSupplier = ({ sup }) => (
  <div className="ViewSupplier">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ sup && sup.name }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={ () => handleEdit(sup._id) }>Edit</Button>
          <Button onClick={ () => handleRemove(sup._id) } className="text-danger">Delete</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    <Row>
    <Col>
    <div><p>Email: {sup && sup.email }</p></div>
    <div><p>Category:{ sup && sup.category }</p></div>
    </Col>
    </Row>
  </div>
);

ViewSupplier.propTypes = {
  sup: React.PropTypes.object,
};

export default ViewSupplier;
