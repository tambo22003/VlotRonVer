import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import { Catalogs } from '../../../api/Catalogs.js';
import { Products } from '../../../../imports/api/Products.js';

import Product from '../addProduct/Product.jsx';
import Catalog from './CatalogList.jsx';

export class CatalogSingle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
      subscription :{
      }
    }
  }

  getCatalog(){
    return Catalogs.findOne(this.props.id) ;
  }

  renderProducts() {

    let filteredProducts = this.props.products;
    if (this.state.hideCompleted) {
      filteredProducts = filteredProducts.filter(product => !product.checked);
    }
    return this.actualRendertask(filteredProducts ,1 ,1 ,0 );
  }

  renderProductsInCatalog() {

    let filteredProducts2 = this.getCatalog();
    const showDividbutton = filteredProducts2.owner === Meteor.userId();
    filteredProducts2 = filteredProducts2.productList;


    if(!filteredProducts2)
      return null;

    if (this.state.hideCompleted) {
      filteredProducts2 = filteredProducts2.filter(product => !product.checked);
    }

    return (this.actualRendertask(filteredProducts2, 0 ,1 , showDividbutton));
  }

  actualRendertask(renderObject , showAddbutton , isinCatalog , showDividbutton){
    return renderObject.map((product) => {
      //const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateAndDeleteButton = product.owner === Meteor.userId();

      return (
        <Product
          key={product._id}
          catalogId = {this.props.id}
          product={product}
          showPrivateAndDeleteButton={showPrivateAndDeleteButton}
          showDividbutton = {showDividbutton}
          showAddbutton = {showAddbutton}
          isinCatalog = {isinCatalog}

        />
      );
    });
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  render(){
    let title = this.getCatalog();
    if(!title)
      return (<div>Loading...</div>);

    return(
      <div className="container">

        <header>
          <h2><strong>Catalog {title.name}</strong></h2>
        </header>

        <ul >
          {this.renderProductsInCatalog()}
        </ul>

        <ul className="listToLeft">
          {this.renderProducts()}
        </ul>
      </div>
    );
  }
}

CatalogSingle.propTypes = {
  products: React.PropTypes.array,
  catalogs: React.PropTypes.array,
};

export default CatalogSingle  = createContainer(() => {
  Meteor.subscribe('Products');
  Meteor.subscribe("Catalogs");
  return {
    products: Products.find({}, { sort: { createdAt: -1 } }).fetch(),
    catalogs : Catalogs.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: PropTypes.object,
  };
}, CatalogSingle);
