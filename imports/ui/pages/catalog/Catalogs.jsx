import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Catalogs } from '../../../api/Catalogs.js';

import Catalog from './CatalogList.jsx';

// App component - represents the whole app
class CatalogWarper extends Component {
  constructor(props) {
  super(props);

  this.state = {
      hideCompleted: false,
    };
  this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  handleClick() {
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const des = ReactDOM.findDOMNode(this.refs.Description).value.trim();

    Meteor.call('catalogs.insert', text , des);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    ReactDOM.findDOMNode(this.refs.Description).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderCatalogs() {
    let filteredCatalogs = this.props.catalogs;
    return filteredCatalogs.map((catalog) => {
      const showPrivateAndDeleteButton = catalog.owner === Meteor.userId();
      return (
        <Catalog
          key={catalog._id}
          catalog={catalog}
          showPrivateAndDeleteButton={showPrivateAndDeleteButton}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Catalog</h1>

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
                placeholder="Type to add new name of Catalog"
              />
              <input
                type="text"
                ref="Description"
                placeholder="Description"
              />
            </form> : ''
          }

          <ul>------------------------------------------------------</ul>
          <button className="button" onClick={this.handleClick}>
            Submit!
          </button>


        </header>

          <ul>
            {this.renderCatalogs()}
          </ul>
      </div>
    );
  }
}

CatalogWarper.propTypes = {
  catalogs: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('Catalogs');
  return {
    catalogs: Catalogs.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Catalogs.find({ checked: { $ne: true } }).count(),
    currentUser: PropTypes.object,
  };
}, CatalogWarper);
