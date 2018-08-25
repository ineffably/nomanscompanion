import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  listItem: {
    maxWidth: 350
  }
};

class AllItemsList extends Component {

  handleToggle(item){
    return () => (console.log(item.Name));
  }

  renderItem(item){
    const { classes } = this.props;

    return (<ListItem
      key={item.Name}
      role={undefined}
      dense
      button
      onClick={this.handleToggle(item)}
      className={classes.listItem}
    >
      <Avatar alt="{item.Name}" src="images/dioxite.png" />
      <ListItemText primary={`${item.Name}`} />
    </ListItem>);
  }

  render() {
    const { itemArray, filter } = this.props;
    let items = itemArray;
    if(filter.length > 0) {
      items = itemArray.filter(item => item.Name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
    }
    
    return (
      <List>
        {items.map((item) => {return this.renderItem(item);})}
      </List>
    );
  }
}

AllItemsList.propTypes = {
  filter: PropTypes.string.isRequired,
  itemArray: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AllItemsList);