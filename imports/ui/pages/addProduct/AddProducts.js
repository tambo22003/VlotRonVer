import React from 'react';
import { Link } from 'react-router';
import { Tab,Nav, NavItem, NavDropdown, MenuItem,Row, Col, Button } from 'react-bootstrap';
import AppWarpper from './AppWarpper.jsx';

const AddProducts = () => (
  <div className="AddSuppliers">
  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
    <Row className="clearfix">
      <Col sm={4}>
        <Nav bsStyle="pills" stacked>
          <NavItem eventKey="first">
            Requerst new Product!
          </NavItem>
        </Nav>
      </Col>
      <Col sm={8}>
        <Tab.Content animation>
          <Tab.Pane eventKey="first">
            <AppWarpper />
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
  </div>
);

export default AddProducts;
