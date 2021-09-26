import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BluePrint from './BluePrint';
import { TextField, Typography } from '@material-ui/core';
import { getCraftFromItem } from '../nmsutils';

const styles = {
  textField: {
    maxWidth: 345,
    display: 'flex'
  }
};

const exState = { lastTimeout: 0 };

class CraftingView extends Component {
  constructor() {
    super();
    this.state = { filter: '' };
  }
  
  applyFilter(value){
    const minLen = 1;
    const { filter } = this.state;
    global.clearTimeout(exState.lastTimeout);
    if(filter !== value && value.length > minLen){
      const id = global.setTimeout(() => {
        this.setState({filter: value});
      }, 100);
      exState.lastTimeout = id;
    }
    if(value.length <= minLen){
      this.setState({filter: ''});
    }
  }

  getUserFilterResults(products){
    const { nameMap } = this.props;
    const { filter } = this.state;
    if(filter === '' || filter.length === 0){
      return products;
    }
    const itemNameHasValue = (req) => {
      if(!req){return false;}
      const name = nameMap[req.ID];
      if(!name){return false;}
      return name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    };
    return products.filter(item => {
      const req = item.Requirements;
      const result = Array.isArray(req) ?
        req.filter(itemNameHasValue) :
        [req].filter(itemNameHasValue);
      const output = item.Name.indexOf(filter.toUpperCase());
      return(result.length > 0 || output >= 0);
    });
  }

  render() {
    const { products, classes } = this.props;
    const craftable = products.filter(item => item.IsCraftable);
    const filtered = this.getUserFilterResults(craftable);
    const list = filtered.map((item, i) => {
      const blueprint = getCraftFromItem(item, products);
      if (!blueprint) { return (<div key={item.Id} ></div>); }
      return (
        <BluePrint key={item.Id} index={i} blueprint={blueprint} history={this.props.history} />
      );
    });
    const onTextChange = (ev) => {
      const val = ev.target.value;
      global.setTimeout(() => {
        this.applyFilter((val && val.length > 1) ? val : '');
      }, 100);
    };
    return (
      <div>
        <Typography variant='headline'>Crafting Blueprints:</Typography>
        <TextField
          id="itemFilter"
          label="Item Search"
          placeholder="Enter Item Name"
          className={classes.textField}
          margin="normal"
          onChange={onTextChange}
        />        
        {list}
      </div>);
  }
}

CraftingView.propTypes = {
  products: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  nameMap: PropTypes.object.isRequired
};

export default withStyles(styles)(CraftingView);

