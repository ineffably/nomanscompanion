import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCraftFromItem } from '../nmsutils';
import { Typography } from '@material-ui/core';

export default class CraftedBy extends Component {
  render(){
    const { item, products } = this.props;
    // const reqs = item.Requirements;

    const blueprint = getCraftFromItem(item, products);

    console.log(blueprint);
    
    return(<div>
      <Typography variant="headline" component="h2">Crafting:</Typography>

    </div>);

    // return(<div>
    //   <Typography variant="headline" component="h2">Crafting:</Typography>
    //   {blueprints.map((bp,i) => {return(<div key={i}><BluePrint {...this.props} blueprint={bp} /></div>);})}
    // </div>);
  }
}
CraftedBy.propTypes = {
  item: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired
};