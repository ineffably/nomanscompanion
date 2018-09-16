import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import BluePrint from './BluePrint';
import { getRefinerRecipe } from '../nmsutils';

export default class RefinedFrom extends Component {
  render() {
    const { item, products, refinerData, isAnIngredient  } = this.props;
    const isMadeWith = (targetId, recipe) => {
      const ingredients = recipe.Ingredients;
      if(!ingredients){
        return false;
      }
      if(Array.isArray(ingredients)){
        return ingredients.filter(o => o.Id === targetId).length > 0;
      }
      else {
        return ingredients.Id === targetId;
      }
    };

    const getRefinerBlueprintsFor = (item, data) => {
      return data.filter(o => o.Result.Id === item.Id)
        .map(recipe => getRefinerRecipe(recipe, products));
    };
    const getRefinerBlueprintsWith = (item, data) => {
      return data.filter(recipe => isMadeWith(item.Id, recipe))
        .map(recipe => getRefinerRecipe(recipe, products));
    };

    const blueprints = isAnIngredient ? getRefinerBlueprintsWith(item, refinerData) : getRefinerBlueprintsFor(item, refinerData);
    if (blueprints.length === 0) {
      return (<div></div>);
    }
    return (
      <div>
        <Typography variant="headline" component="h2">{isAnIngredient ? 'Refines into:' : 'Refined with'}</Typography>
        {blueprints.map((blueprint, i) => { return (<BluePrint key={i} index={i} blueprint={blueprint} history={this.props.history} />); })}
      </div>);
  }
}
RefinedFrom.propTypes = {
  isAnIngredient: PropTypes.bool,
  products: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  refinerData: PropTypes.array.isRequired
};
