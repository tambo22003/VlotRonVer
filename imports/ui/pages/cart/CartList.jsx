import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Carts } from '../../../api/Carts.js';

//  component - represents a single todo item
export default class CartList extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('carts.setChecked', this.props.cart._id, !this.props.cartList.checked);
  }

  deleteCartItem() {
    Meteor.call('carts.removeItem', this.props.cartId , this.props.cartList.product);
  }

  onclickhandler(){
    return (
      <a href ={`/cart/${this.props.cart._id}`}></a>
    )
  }

  render() {

    // Give  a different className when they are checked off,
    // so that we can style them nicely in CSS
    const cartClassName = classnames({
      checked: this.props.cartList.checked,
      private: this.props.cartList.private,
    });

    return (

      <li className={cartClassName}>

      <span className="text">
        <div>Name:<strong> {this.props.cartList.product.text} </strong>
        Avivable SKU : {this.props.cartList.product.sku}
        Amount : {this.props.cartList.amount}
        </div>
      </span>

      { this.props.showDeleteButton ? (
        <l>
          <button className="delete" onClick={this.deleteCartItem.bind(this)}>
            &times;
          </button>
        </l>
      ) : ''}

      </li>
    );
  }
}

CartList.propTypes = {
  // This component gets the  to display through a React prop.
  // We can use propTypes to indicate it is required
  cartList: PropTypes.object.isRequired,
  cartId: PropTypes.string.isRequired,

};
