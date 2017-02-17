import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Carts } from '../../../api/Carts.js';

import CartList from './CartList.jsx';

// App component - represents the whole app
class CartsWrapper extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
      hideCompleted: false,
      hideCheckout: false,
    };
  this.handleClick = this.handleClick.bind(this);
  this.checkOutEnable = Boolean ;
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleClick() {
    this.checkouthandle();
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  checkouthandle(){
    Meteor.call('carts.checkout', Meteor.userId());
  }

  renderCarts() {
    let tempCartItems = this.props.itemsInCart;
    return tempCartItems.map((cartItem) => {
      const cartId = cartItem._id;
      const cartOwner = cartItem.owner;
      return cartItem.items.map((item) => {
        const showDeleteButton = cartOwner === Meteor.userId();
        return (
          <CartList
            key={item._id}
            cartList={item}
            showDeleteButton = {showDeleteButton}
            cartId = {cartId}
            amount = {item.amount}
          />
        );
      });
    });
  }

  countItemSize(){
    let tempCartItems = this.props.itemsInCart;
    let cartSize = 0 ;
    tempCartItems.map((index) =>{
      index.items.map ((item) =>{
        cartSize ++;
      });
    });
    if(cartSize>0){
      this.checkOutEnable = true;
    }else{
      this.checkOutEnable = false;
    }
    return (cartSize) ;
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Cart ({this.countItemSize()})</h1>

        </header>

        {this.checkOutEnable ? (
          <div>
            <ul>
              {this.renderCarts()}
            </ul>

            <button className = "button" onClick={this.handleClick}>
              Checkout!
            </button>
          </div>
        ) :
          <ul>
            It appears you don't have any item in your cart
          </ul>
        }

      </div>
    )
  }
}

CartsWrapper.propTypes = {
  itemsInCart: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('Carts');
  Meteor.subscribe('PendingOrders');
  return {
    itemsInCart: Carts.find({owner : Meteor.userId()}).fetch(),
    currentUser: PropTypes.object,

  };
}, CartsWrapper);
