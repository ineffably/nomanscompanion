import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemCard from './ItemCard';
import CraftedBy from './CraftedBy';
import { getItemFromField } from '../nmsutils';
import { withStyles } from '@material-ui/core/styles';
import ItemDetails from './ItemDetails';
import CraftedIn  from './CraftedIn';
import RefinedFrom from './RefinedFrom';

const styles = {};

class ItemView extends Component {
  render() {
    if (this.props.products.length === 0) { return (<div></div>); }

    const nameParam = this.props.match.params.name;
    const item = getItemFromField(nameParam, this.props.products);
    if(!item) {
      return(<h2>Item not found</h2>);
    }  

    return (
      <div>
        <ItemCard item={item} {...this.props} />
        <ItemDetails item={item} classes={this.props.classes} />
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