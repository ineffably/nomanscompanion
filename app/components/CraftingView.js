import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BluePrint from './BluePrint';
import { getCraftFromItem } from '../nmsutils';

const styles = {};

class CraftingView extends Component {
  render() {
    const { products } = this.props;
    const list = products.filter(item => item.IsCraftable).map((item, i) => {
      const blueprint = getCraftFromItem(item, products);
      if (!blueprint) { return (<div key={item.Id} ></div>); }
      return (
        <BluePrint key={item.Id} index={i} blueprint={blueprint} history={this.props.history} />
      );
    });
    return (
      <div>{list}</div>);
  }
}

CraftingView.propTypes = {
  products: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(CraftingView);

