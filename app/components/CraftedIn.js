import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import BluePrint from './BluePrint';
import { getCraftFromItem, getItemFromField, getRecipesWith } from '../nmsutils';

const styles = {};

class CraftingView extends Component{
  render() {
    const { products, item, craftingTable } = this.props;
    const inRecipes = getRecipesWith(item, craftingTable);

    const list = inRecipes.map((leaf, i) => {
      const item = getItemFromField(leaf.Id, products, 'Id');
      const blueprint = getCraftFromItem(item, products);
      if(!blueprint){return(<div></div>);}
      return(
        <BluePrint key={i} blueprint={blueprint} history={this.props.history}/>
      );
    });
    return(
      <div>
        <Typography variant="headline" component="h2">Used in:</Typography>
        {list}
      </div>);
  }
}

CraftingView.propTypes = {
  products: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  craftingTable: PropTypes.array.isRequired
};

export default withStyles(styles)(CraftingView);

