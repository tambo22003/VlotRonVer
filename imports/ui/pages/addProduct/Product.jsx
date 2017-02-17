import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Products } from '../../../../imports/api/Products.js';

//  component - represents a single todo item
export default class Product extends Component {
  constructor(props){
    super(props);
    this.state ={
      amount: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({amount: event.target.value});
  }

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('products.setChecked', this.props.product._id, !this.props.product.checked);
  }

  deleteThisProduct() {
    Meteor.call('catalogs.removeAllProduct', this.props.product);
    Meteor.call('products.remove', this.props.product._id);
  }

  togglePrivate() {
    Meteor.call('products.setPrivate', this.props.product._id, ! this.props.product.private);
  }

  addtoCatalogItem() {
    Meteor.call('products.addtoCatalogItem', this.props.product, this.props.catalogId );
  }


  addtoCart() {
    console.log(this.state.amount);
    Meteor.call('carts.addItem', this.props.product, Meteor.userId() , this.state.amount);
  }

  deleteCatalogItem() {
    Meteor.call('catalogs.removeProduct', this.props.catalogId ,  this.props.product );
  }

  render() {

    // Give  a different className when they are checked off,
    // so that we can style them nicely in CSS
    const productClassName = classnames({
      checked: this.props.product.checked,
      private: this.props.product.private,
    });

    return (
      <li className={productClassName}>


        { !this.props.isinCatalog ?(
          <input
          type="checkbox"
          readOnly
          checked={this.props.product.checked}
          onClick={this.toggleChecked.bind(this)}
          />
        ):''}

        { this.props.showPrivateAndDeleteButton ? this.props.showAddbutton? !this.props.isinCatalog?(
          ''
        ) :
          <l>
            <button className="button" onClick={this.togglePrivate.bind(this)}>
              { this.props.product.private ? 'Private' : 'Public' }
            </button>
          </l>
         : '' : ''}

         { this.props.showAddbutton? !this.props.isinCatalog?(
           ''
         ) :
           <l>
             <button className="button" onClick={this.addtoCatalogItem.bind(this)}>
               addtoCatalog
             </button>
             <button className="delete" onClick={this.deleteThisProduct.bind(this)}>
               &times;
             </button>
           </l>
          : '' }

        <l>
          <span className="text">
            <strong>Pruduct Name</strong>: {this.props.product.productName}
            <strong>SKU</strong>: {this.props.product.sku}
            <strong>Price</strong>: {this.props.product.price}
          </span>
        </l>

        { this.props.showPrivateAndDeleteButton ? !this.props.isinCatalog?(
          <div>
            <button className="button disabled">
              addtoCatalog
            </button>
            <button className="delete" onClick={this.deleteThisProduct.bind(this)}>
              &times;
            </button>
            <button className="button addToCart" onClick={this.addtoCart.bind(this)}>
              AddtoCart
            </button>
            <input className="inputBox-addToCart"
              type="number"
              ref="addAmount"
              placeholder="EnterAmount"
              onChange={this.handleChange}
            />
          </div>
        ):'':''
        }


        { !this.props.showPrivateAndDeleteButton ? this.props.showOtherButtons ? !this.props.isinCatalog?(
          <div>
            <button className="button disabled">
              addtoCatalog
            </button>
            <button className="button addToCart" onClick={this.addtoCart.bind(this)}>
              AddtoCart
            </button>
            <input className="inputBox-addToCart"
              type="number"
              ref="addAmount"
              placeholder="EnterAmount"
              onChange={this.handleChange}
            />
          </div>
        )
        :''
        :''
        :''
        }

        {this.props.showDividbutton?(
          <button className="delete" onClick={this.deleteCatalogItem.bind(this)}>
           &divide;
          </button>
        ):''
      }

      </li>
    );
  }
}

Product.propTypes = {
  // This component gets the  to display through a React prop.
  // We can use propTypes to indicate it is required
  product: PropTypes.object.isRequired,
  showPrivateAndDeleteButton: React.PropTypes.bool.isRequired,
};
