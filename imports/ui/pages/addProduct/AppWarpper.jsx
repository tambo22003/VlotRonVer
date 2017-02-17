import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

//imports from Mongo Data Base
import { Products } from '../../../../imports/api/Products.js';
import Suppliers from '../../../api/addsupplier/suppliers.js';

import Product from './Product.jsx';
import ShowSuppList from './ShowSuppList.jsx';
//import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class AppWarpper extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
      hideCompleted: false,
    };
  this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const sku = ReactDOM.findDOMNode(this.refs.numberInput).value.trim();
    const price = ReactDOM.findDOMNode(this.refs.priceInput).value.trim();

    Meteor.call('products.insert', text , sku , price);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  handleClick() {
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const sku = ReactDOM.findDOMNode(this.refs.numberInput).value.trim();
    const price = ReactDOM.findDOMNode(this.refs.priceInput).value.trim();

    Meteor.call('products.insert', text , sku , price);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    ReactDOM.findDOMNode(this.refs.numberInput).value = '';
    ReactDOM.findDOMNode(this.refs.priceInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderProducts() {
    let filteredProducts = this.props.products;
    if (this.state.hideCompleted) {
      filteredProducts = filteredProducts.filter(product => !product.checked);
    }
    return filteredProducts.map((product) => {
      //const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateAndDeleteButton = product.owner === Meteor.userId();
      if (showPrivateAndDeleteButton){

      };

      return (
        <Product
          key={product._id}
          product={product}
          showPrivateAndDeleteButton={showPrivateAndDeleteButton}
          showOtherButtons = {Meteor.userId()}
        />
      );
    });
  }

  renderSupplierOption(){
    let suppliers = this.props.suppliers;
    if (!suppliers) {
      return(
        <option>No Suppliers Avaliable! </option>
      )
    }

    /*
    suppliers.map((supp) => {
      //console.log(supp);
      return(
          <ShowSuppList
            key = {supp._id}
            supp = {supp}
          />
      );
    });*/

    return suppliers.map((supp) => {
      //const currentUserId = this.props.currentUser && this.props.currentUser._id;
      return (
        <option key={supp._id}>{supp.name}</option>
      );
    });

  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>New items({this.props.incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Product
          </label>

          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new name of product"
              />
              <input
                type="number"
                ref="numberInput"
                placeholder="Available units"
              />
              <input
                type="number"
                ref="priceInput"
                placeholder="Type to add new price"
              />

            </form> : ''
          }


          <select>
            {this.renderSupplierOption()}
          </select>

          <button className = "button" onClick={this.handleClick}>
            Submit!
          </button>

        </header>



        <ul>
          {this.renderProducts()}
        </ul>



      </div>
    );
  }
}

AppWarpper.propTypes = {
  products: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('Products');
  Meteor.subscribe('suppliers.view2')
  return {
    suppliers : Suppliers.find({}).fetch(),
    products: Products.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Products.find({ checked: { $ne: true } }).count(),
    currentUser: PropTypes.object,
  };
}, AppWarpper);
