import React from 'react';
import { Link } from 'react-router';
import { Tab,Nav, NavItem, NavDropdown, MenuItem,Row, Col, Button } from 'react-bootstrap';
import DocumentsList from '../../containers/DocumentsList.js';
import EditDocument from '../../containers/EditDocument.js';
import DocumentEditor from '../../components/DocumentEditor.js';

const Documents = () => (
  <div className="Documents">
  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
    <Row className="clearfix">
      <Col sm={4}>
        <Nav bsStyle="pills" stacked>
          <NavItem eventKey="first">
          DocumentsList
          </NavItem>
          <NavItem eventKey="second">
          New Document
          </NavItem>
        </Nav>
      </Col>
      <Col sm={8}>
        <Tab.Content animation>
          <Tab.Pane eventKey="first">
            <DocumentsList />
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <DocumentEditor />
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
  </div>
);

export default Documents;
