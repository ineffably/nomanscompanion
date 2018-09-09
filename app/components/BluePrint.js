import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Item from './Item';
import { getItemFromName } from '../nmsutils';

const styles = {
  paper: {
    display: 'flex'
  }
};

class BluePrint extends Component {
  render() {
    const { blueprint, classes, products, history } = this.props;
    return (
      <Paper className={classes.paper}>
        <div><Item item={getItemFromName(blueprint.Output, products)} history={history}/></div>
        <div><Item item={getItemFromName(blueprint.Input1, products)} count={blueprint.Count1} history={history}/></div>
        <div><Item item={getItemFromName(blueprint.Input2, products)} count={blueprint.Count2} history={history} /></div>
        <div><Item item={getItemFromName(blueprint.Input3, products)} count={blueprint.Count3} history={history} /></div>
      </Paper>);
  }
}

BluePrint.propTypes = {
  products: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  blueprint: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(BluePrint);