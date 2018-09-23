import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BluePrint from './BluePrint';
import { getRefinerRecipe } from '../nmsutils';
import { Typography } from '@material-ui/core';

const styles = {};

class CraftingView extends Component{
  render() {
    const { products, refinerData } = this.props;
    
    const list = refinerData.map((recipe, i) => {
      const blueprint = getRefinerRecipe(recipe, products);
      if(!blueprint){return(<div></div>);}
      return(
        <BluePrint key={i} blueprint={blueprint} history={this.props.history}/>
      );
    });

    return(
      <div>
        <Typography variant='headline'>Refiner Recipes:</Typography>
        {list}
      </div>);
  }
}

CraftingView.propTypes = {
  refinerData: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(CraftingView);

