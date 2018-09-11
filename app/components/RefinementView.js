import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BluePrint from './BluePrint';
import { getRefinerRecipe } from '../nmsutils';

const styles = {};

class CraftingView extends Component{
  render() {
    const { products, refinerData } = this.props;
    const { RefinerRecipeTable1Input, RefinerRecipeTable2Input, RefinerRecipeTable3Input } = refinerData;
    if(!RefinerRecipeTable1Input){
      return(<div></div>);
    }
    
    const allRecipes = RefinerRecipeTable1Input.concat(RefinerRecipeTable2Input).concat(RefinerRecipeTable3Input);
    const list = allRecipes.map((item, i) => {
      const blueprint = getRefinerRecipe(item, products);
      if(!blueprint){return(<div></div>);}
      return(
        <BluePrint key={i} blueprint={blueprint} history={this.props.history}/>
      );
    });

    return(
      <div>
        <h2>Refinement View</h2>
        {list}
      </div>);
  }
}

CraftingView.propTypes = {
  refinerData: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(CraftingView);

