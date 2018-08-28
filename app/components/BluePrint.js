
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Item from './Item';
import utils from '../nmsutils';

const styles = {
  paper: {
    display: 'flex'
  }
};

class BluePrint extends Component {
  render() {
    const { blueprint, classes, data, history } = this.props;
    return (
      <Paper className={classes.paper}>
        <div><Item item={utils.getItemFromName(blueprint.Output, data)} history={history}/></div>
        <div><Item item={utils.getItemFromName(blueprint.Input1, data)} count={blueprint.Count1} history={history}/></div>
        <div><Item item={utils.getItemFromName(blueprint.Input2, data)} count={blueprint.Count2} history={history} /></div>
        <div><Item item={utils.getItemFromName(blueprint.Input3, data)} count={blueprint.Count3} history={history} /></div>
      </Paper>);
  }
}

BluePrint.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  blueprint: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(BluePrint);