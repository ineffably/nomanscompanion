import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemCard from './ItemCard';
import CraftedBy from './CraftedBy';
import { getItemFromField } from '../nmsutils';
import { withStyles } from '@material-ui/core/styles';
import ItemDetails from './ItemDetails';
import CraftedIn  from './CraftedIn';
import RefinedFrom from './RefinedFrom';

const styles = {
  card: {
    height: 300,
    width: 300,
  }
};

class ItemView extends Component {
  render() {
    const { classes, products, match } = this.props;
    if (products.length === 0) { return (<div></div>); }

    const nameParam = match.params.name;
    const item = getItemFromField(nameParam, products);
    if(!item) {
      return(<h2>Item not found</h2>);
    }  
    
    console.log(item);

    return (
      <div>
        <ItemCard item={item} {...this.props} classes={classes} />
        <ItemDetails item={item} classes={classes} />
        <CraftedBy item={item} {...this.props} />
        <RefinedFrom item={item} {...this.props} />
        <CraftedIn item={item} {...this.props} />
        <RefinedFrom item={item} {...this.props} isAnIngredient />
      </div>);
  }
}

ItemView.propTypes = {
  match: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  refinerData: PropTypes.array.isRequired
};

export default withStyles(styles)(ItemView);

// Id
// Name
// NameLower
// Subtitle
// Description
// DebrisFile
// BaseValue
// Level
// Icon
// HeroIcon
// Colour
// SubstanceCategory
// Type
// ProceduralType
// Rarity
// Legality
// Consumable
// ChargeValue
// StackMultiplier
// DefaultCraftAmount
// CraftAmountStepSize
// CraftAmountMultiplier
// Requirements
// Cost
// SpecificChargeOnly
// NormalisedValueOnWorld
// NormalisedValueOffWorld
// TradeCategory
// WikiEnabled
// IsCraftable
// EconomyInfluenceMultiplier
// ColorRGB
// PinObjeective
// PinObjeectiveTip
// ID
// Symbol
// WorldColour
// Category
// tradeCategory
// PinObjective
// PinObjectiveTip
// WorldColorRGB
// DeploysInto
// GroupID
// AltRequirements


