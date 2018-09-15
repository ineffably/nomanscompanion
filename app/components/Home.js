import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AllItemsList from './AllItemsList';
import { TextField, CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  textField: {
    root: {
      borderBottom: 0
    },
    borderBottom: '0px',
    maxWidth: 345,
    display: 'flex'
  }
};

class Home extends Component {
  constructor() {
    super();
    this.state = { filter: '' };
  }

  applyFilter(value){
    this.setState({filter: value});
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CssBaseline />
        <TextField
          id="itemFilter"
          label="Item Search"
          placeholder="Enter Item Name"
          className={classes.textField}
          margin="normal"
          onChange={(ev) => {this.applyFilter(ev.target.value);}}
        />
        <AllItemsList itemArray={this.props.products} filter={this.state.filter} history={this.props.history} />
      </div>);
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  products: PropTypes.array
};

export default withStyles(styles)(Home);
