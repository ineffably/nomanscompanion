import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Item from './Item';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = {
  paper: {
    display: 'flex'
  },
  content: {
    display: 'flex',
    flexFlow: 'row',
    paddingBottom: '16 !important'
  },
  arrowIndicator: {
    margin: '10px', 
    marginTop: '23px'
  }
};

class BluePrint extends Component {
  render() {
    const { blueprint, classes, history, index } = this.props;
    return (
      <Paper className={classes.paper} key={index}>
        <Item item={blueprint.Output} count={blueprint.Count} history={history}/>
        <div key='spacer' style={styles.arrowIndicator} ><ArrowBackIcon /></div>
        <Item item={blueprint.In1} count={blueprint.In1Count} history={history}/>
        <Item item={blueprint.In2} count={blueprint.In2Count} history={history}/>
        <Item item={blueprint.In3} count={blueprint.In3Count} history={history}/>
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