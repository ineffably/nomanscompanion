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
    const { recipe, classes, data, history } = this.props;
    return (
      <Paper className={classes.paper}>
        <div><Item item={utils.getItemFromName(recipe.Output, data)} count={recipe.Count} history={history}/></div>
        <div><Item item={utils.getItemFromName(recipe.Input1, data)} count={recipe.Count1} history={history}/></div>
        <div><Item item={utils.getItemFromName(recipe.Input2, data)} count={recipe.Count2} history={history} /></div>
        <div><Item item={utils.getItemFromName(recipe.Input3, data)} count={recipe.Count3} history={history} /></div>
      </Paper>);
  }
}

BluePrint.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(BluePrint);