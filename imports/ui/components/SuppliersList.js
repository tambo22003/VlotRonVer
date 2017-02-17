import React from 'react';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';

const handleNav = (_id) => {
  browserHistory.push(`/addsuppliers/${_id}`);
}

const SuppliersList = ({ suppliers }) => (
  suppliers.length > 0 ? <ListGroup className="SuppliersList">
    {suppliers.map(({ _id, name }) => (
      <ListGroupItem key={ _id } onClick={ () => handleNav(_id) }>
        { name }
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No suppliers yet.</Alert>
);　

export default SuppliersList;
