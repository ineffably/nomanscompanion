import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemCard from './ItemCard';
import CraftedBy from './CraftedBy';
import utils from '../nmsutils';

export default class ItemView extends Component {
  render() {
    const item = utils.getItemFromName(this.props.match.params.name, this.props.data);
    return (
      <div>
        <ItemCard item={item} {...this.props} />
        <CraftedBy item={item} {...this.props} />
      </div>);
  }
}

ItemView.propTypes = {
  match: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};