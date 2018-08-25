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
    this.state = { items: [], refining: [], crafting: [], filter: '' };
  }

  async componentDidMount() {
    const itemResponse = await fetch('../data/Data.json');
    const data = await itemResponse.json();
    this.setState({ items: data.Items, refining: data.Refining, crafting: data.Crafting });
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
        <AllItemsList itemArray={this.state.items} filter={this.state.filter} />
      </div>);
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
