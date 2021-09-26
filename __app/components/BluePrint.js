import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Item from './Item';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const styles = {
  paper: {
    display: 'flex',
    marginTop: 4
  },
  list: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center'
  },
  arrowIndicator: {
    margin: '10px',
    marginTop: '23px'
  },
  listRoot: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    topMargin: '0px',
    paddingTop: 0,
    paddingBottom: 0
  }
};

class BluePrint extends Component {
  render() {
    const { blueprint, classes, history, index } = this.props;
    const numberOfIngredients = blueprint.In2 ? (blueprint.In3 ? 3 : 2) : 1;
    const unit = 79;
    const heightUnit = numberOfIngredients * unit;
    const height = `${heightUnit}px`;
    const marginValue = (heightUnit - unit) / 2;

    const topMargin = numberOfIngredients > 1 ? marginValue : '0';
    return (
      <Paper className={classes.paper} key={index} style={{height: height}}>
        <List style={{ height: '100%' }} classes={{root: classes.listRoot}} >
          <Item item={blueprint.In1} count={blueprint.In1Count} history={history} />
          <Item item={blueprint.In2} count={blueprint.In2Count} history={history} />
          <Item item={blueprint.In3} count={blueprint.In3Count} history={history} />
        </List>
        <List style={{ height: '100%'}} >
          <ArrowForwardIcon style={{height: '100%'}} />
        </List>
        <List style={{ height: '100%', paddingBottom: `${topMargin}px`, paddingTop: `${topMargin}px`}} classes={{root: classes.listRoot}}>
          <Item item={blueprint.Output} count={blueprint.Count} history={history} style={{height: '80px'}}/>
        </List>
      </Paper>);
  }
}

BluePrint.propTypes = {
  classes: PropTypes.object.isRequired,
  blueprint: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default withStyles(styles)(BluePrint);