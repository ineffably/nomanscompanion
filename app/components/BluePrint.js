import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Item from './Item';

const styles = {
  paper: {
    display: 'flex'
  }
};

class BluePrint extends Component {
  render() {
    const { blueprint, classes, history, key } = this.props;
    
    return (
      <Paper className={classes.paper} key={key || ''}>
        <div><Item item={blueprint.Output} count={blueprint.Count} history={history}/></div>
        <div><Item item={blueprint.In1} count={blueprint.In1Count} history={history}/></div>
        <div><Item item={blueprint.In2} count={blueprint.In2Count} history={history}/></div>
        <div><Item item={blueprint.In3} count={blueprint.In3Count} history={history}/></div>
      </Paper>);
  }
}

BluePrint.propTypes = {
  classes: PropTypes.object.isRequired,
  blueprint: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  key: PropTypes.any
};

export default withStyles(styles)(BluePrint);