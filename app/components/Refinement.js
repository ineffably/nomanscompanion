import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Item from './Item';
import {getItemFromName} from '../nmsutils';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = {
  paper: {
    display: 'flex'
  },
  arrowIndicator: {
    margin: '10px', 
    marginTop: '23px'
  }
};

class BluePrint extends Component {
  render() {
    const { recipe, classes, data, history } = this.props;
    return (
      <Paper className={classes.paper}>
        <Item item={getItemFromName(recipe.Output, data)} count={recipe.Count} history={history}/>
        <div key='spacer' style={styles.arrowIndicator} ><ArrowBackIcon /></div>
        <Item item={getItemFromName(recipe.Input1, data)} count={recipe.Count1} history={history}/>
        <Item item={getItemFromName(recipe.Input2, data)} count={recipe.Count2} history={history} />
        <Item item={getItemFromName(recipe.Input3, data)} count={recipe.Count3} history={history} />
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