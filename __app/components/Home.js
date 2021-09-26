import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AllItemsList from './AllItemsList';
import { TextField, CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  textField: {
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
    if(this.state.filter !== value){
      this.setState({filter: value});
    }
  }

  render() {
    const { classes } = this.props;
    const onTextChange = (ev) => {
      const val = ev.target.value;
      global.setTimeout(() => { 
        if(val && val.length > 1){
          this.applyFilter(val);
        }
        else{
          this.applyFilter('');
        }
      }, 100);
    };

    return (
      <div>
        <CssBaseline />
        <TextField
          id="itemFilter"
          label="Item Search"
          placeholder="Enter Item Name"
          className={classes.textField}
          margin="normal"
          onChange={onTextChange}
        />
        <AllItemsList filter={this.state.filter} {...this.props} classes={classes} />
      </div>);
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  products: PropTypes.array
};

export default withStyles(styles)(Home);
