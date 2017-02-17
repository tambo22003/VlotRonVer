import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { PendingOrders } from '../../api/PendingOrders.js';
import { RetailerHistory } from '../../api/OrderHistories.js';
import CartList from './cart/CartList.jsx';

// App component - represents the whole app
class PendingOrdersWrapper extends React.Component {
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
    let tempCartItems = this.props.orders;
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
          <h1>Pending Orders</h1>

          {this.checkOutEnable ? (
            <div>
            </div>
          ) :
            <ul>
              NULL
            </ul>
          }

        </header>
        <div>null</div>
        {this.renderCarts()}

      </div>
    )
  }
}

PendingOrdersWrapper.propTypes = {
  orders: PropTypes.array.isRequired,
  history: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('PendingOrders');
  Meteor.subscribe('RetailerHistory');
  return {
    orders: PendingOrders.find({owner : Meteor.userId()}).fetch(),
    history: RetailerHistory.find({}).fetch(),
    currentUser: PropTypes.object,
  };
}, PendingOrdersWrapper);
