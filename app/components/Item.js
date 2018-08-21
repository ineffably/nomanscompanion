import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Item extends Component {
  render(){
    const item = this.props.item;
    return(
      <div>
        <div>Name: {item.name}</div>
      </div>);
  }
}

Item.propTypes = {
  item: PropTypes.object.isRequired
};