/* eslint-disable max-len */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

//layouts
import App from '../../ui/layouts/App.js';

//Documents pages
import Documents from '../../ui/pages/documents/Documents.js';
import NewDocument from '../../ui/pages/documents/NewDocument.js';

//auth pages
import Index from '../../ui/pages/Index.js';
import Login from '../../ui/pages/auth/Login.js';
import NotFound from '../../ui/pages/NotFound.js';
import RecoverPassword from '../../ui/pages/auth/RecoverPassword.js';
import ResetPassword from '../../ui/pages/auth/ResetPassword.js';
import Signup from '../../ui/pages/auth/Signup.js';
import VerifyEmail from '../../modules/verifyemail.js';

//Carts & Catalogs Pages
import CartsWrapper from '../../ui/pages/cart/Carts.jsx';
import CatalogWarper from '../../ui/pages/catalog/Catalogs.jsx';
import CatalogSingle from '../../ui/pages/catalog/CatalogSingle.jsx';
import PendingOrdersWrapper from '../../ui/pages/PendingOrders.jsx';

//containers
import EditDocument from '../../ui/containers/EditDocument.js';
import ViewDocument from '../../ui/containers/ViewDocument.js';

//AddSupplier
import AddSuppliers from '../../ui/pages/addsupplier/AddSuppliers.js';
import NewSupplier from '../../ui/pages/addsupplier/NewSupplier.js';
import EditSupplier from '../../ui/containers/EditSupplier.js';
import ViewSupplier from '../../ui/containers/ViewSupplier.js';

//addProducts (Resteruant)
import AddProducts from '../../ui/pages/addProduct/AddProducts.js';

const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route name="login" path="/login" component={ Login } />
      <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
      <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
      <Route name="signup" path="/signup" component={ Signup } />
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ Index } />
        <Route name="documents" path="/documents" component={ Documents } onEnter={ authenticate } />
        <Route name="newDocument" path="/documents/new" component={ NewDocument } onEnter={ authenticate } />
        <Route name="editDocument" path="/documents/:_id/edit" component={ EditDocument } onEnter={ authenticate } />
        <Route name="viewDocument" path="/documents/:_id" component={ ViewDocument } onEnter={ authenticate } />
        <Route name="addsuppliers" path="/addsuppliers" component={ AddSuppliers } onEnter={ authenticate } />
        <Route name="newSupplier" path="/addsuppliers/new" component={ NewSupplier } onEnter={ authenticate } />
        <Route name="editSupplier" path="/addsuppliers/:_id/edit" component={ EditSupplier } onEnter={ authenticate } />
        <Route name="viewSupplier" path="/addsuppliers/:_id" component={ ViewSupplier } onEnter={ authenticate } />
        <Route name="Catalogs" path="/addProducts" component={ AddProducts } onEnter={ authenticate } />
        <Route name="Catalogs" path="/catalogs" component={ CatalogWarper } onEnter={ authenticate } />
        <Route name="CatalogsSingle" path="/catalogs/:_id" component={ CatalogSingle } onEnter={ authenticate } />
        <Route name="Carts" path="/carts" component={ CartsWrapper } onEnter={ authenticate } />
        <Route name="PendingOrders" path="/pendingorders" component={ PendingOrdersWrapper } onEnter={ authenticate } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
