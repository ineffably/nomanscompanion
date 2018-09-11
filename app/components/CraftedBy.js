import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCraftFromItem } from '../nmsutils';
import { Typography } from '@material-ui/core';
import BluePrint from './BluePrint';

export default class CraftedBy extends Component {
  render(){
    const { item, products } = this.props;
    if(item.IsCraftable !== 'True'){
      return(<div></div>);
    }

    const blueprint = getCraftFromItem(item, products);
    return(<div>
      <Typography variant="headline" component="h2">Crafting:</Typography>
      {blueprint && <BluePrint blueprint={blueprint} history={this.props.history}/>}
    </div>);
  }
}
CraftedBy.propTypes = {
  item: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  history: PropTypes.object  
};