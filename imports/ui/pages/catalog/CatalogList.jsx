import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Catalogs } from '../../../api/Catalogs.js';

//  component - represents a single todo item
export default class Catalog extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('catalogs.setChecked', this.props.catalog._id, !this.props.catalog.checked);
  }

  deleteThiscatalog() {
    Meteor.call('catalogs.remove', this.props.catalog._id);
  }

  togglePrivate() {
    Meteor.call('catalogs.setPrivate', this.props.catalog._id, ! this.props.catalog.private);
  }

  onclickhandler(){
    return (
      <a href ={`/Catalog/${this.props.catalog._id}`}></a>
    )
  }

  render() {

    // Give  a different className when they are checked off,
    // so that we can style them nicely in CSS
    const catalogClassName = classnames({
      checked: this.props.catalog.checked,
      private: this.props.catalog.private,
    });

    return (
      <li className={catalogClassName}>

      { this.props.showPrivateAndDeleteButton ? (
        <div>
          <button className="delete" onClick={this.deleteThiscatalog.bind(this)}>
            &times;
          </button>
        </div>
      ) : ''}


        <span className="text">

          <a href ={`/catalogs/${this.props.catalog._id}`} className="button" > Edit</a>
          <strong> {this.props.catalog.name} </strong>
          <a> Description </a>: {this.props.catalog.des}
        </span>
      </li>
    );
  }
}

Catalog.propTypes = {
  // This component gets the  to display through a React prop.
  // We can use propTypes to indicate it is required
  catalog: PropTypes.object.isRequired,
  showPrivateAndDeleteButton: React.PropTypes.bool.isRequired,
};
