import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Products } from '../../../../imports/api/Products.js';

//  component - represents a single todo item
export default class ShowSuppList extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({amount: event.target.value});
  }
  textshow(){
    console.log(this.props.supp.name);
  }

  render() {

    return (
      <li>
        {this.textshow()}
        {this.props.supp.name}
      </li>
    );
  }
}

ShowSuppList.propTypes = {
  // This component gets the  to display through a React prop.
  // We can use propTypes to indicate it is required
  supp: PropTypes.object.isRequired,
};
