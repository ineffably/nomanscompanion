import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemCard from './ItemCard';
import CraftedBy from './CraftedBy';
import utils from '../nmsutils';
import RefinedFrom from './RefinedFrom';

export default class ItemView extends Component {
  render() {
    if(!this.props.data.Items){
      return(<div></div>);
    }

    const item = utils.getItemFromName(this.props.match.params.name, this.props.data);
    return (
      <div>
        <ItemCard item={item} {...this.props} />
        <CraftedBy item={item} {...this.props} />
        <RefinedFrom item={item} {...this.props} />
      </div>);
  }
}

ItemView.propTypes = {
  match: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};