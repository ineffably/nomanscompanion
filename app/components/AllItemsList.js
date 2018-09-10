import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  listItem: {
    maxWidth: 350
  }
};

class AllItemsList extends Component {

  handleToggle(item) {
    return () => {
      this.props.history.push(`/items/${item.Name}`);
    };
  }

  renderItem(item, key) {
    const { classes } = this.props;
    return (<ListItem
      key={key}
      role={undefined}
      dense
      button
      onClick={this.handleToggle(item)}
      className={classes.listItem}
    >
      <div style={{backgroundColor: item.ColorRGB}}>
        <img src={`icons/${item.Icon.Filename}`} style={{width: '100px'}} />
      </div>
      <ListItemText primary={`${item.NameLower}`} />
    </ListItem>);
  }

  render() {
    const { itemArray, filter } = this.props;
    if(itemArray.length === 0){
      return(<div></div>);
    }
    
    let items = itemArray;
    if (filter.length > 0 && items) {
      items = items.filter(item => {
        if(item.NameLower) {
          return item.NameLower.toLowerCase().indexOf(filter.toLowerCase()) > -1;
        }
        else {
          console.error('NameLower Not Found', item);
        }
        return false;
      });
    }

    return (
      <List>
        {items.map((item, i) => { return this.renderItem(item, i); })}
      </List>
    );
  }
}

AllItemsList.propTypes = {
  filter: PropTypes.string.isRequired,
  itemArray: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  products: PropTypes.array
};

export default withStyles(styles)(AllItemsList);