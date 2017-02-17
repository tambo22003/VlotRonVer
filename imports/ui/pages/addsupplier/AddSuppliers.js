import React from 'react';
import { Link } from 'react-router';
import { Tab,Nav, NavItem, NavDropdown, MenuItem,Row, Col, Button } from 'react-bootstrap';
import SuppliersList from '../../containers/SuppliersList.js';
import EditSupplier from '../../containers/EditSupplier.js';
import SupplierEditor from '../../components/SupplierEditor.js';

const AddSuppliers = () => (
  <div className="AddSuppliers">
  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
    <Row className="clearfix">
      <Col sm={4}>
        <Nav bsStyle="pills" stacked>
          <NavItem eventKey="first">
          SuppliersList
          </NavItem>
          <NavItem eventKey="second">
          New Supplier
          </NavItem>
        </Nav>
      </Col>
      <Col sm={8}>
        <Tab.Content animation>
          <Tab.Pane eventKey="first">
            <SuppliersList />
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <SupplierEditor />
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
  </div>
);

export default AddSuppliers;
