import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridListTile } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ItemCard from './ItemCard';

const styles = {
  listItem: {},
  card: {
    height: 200,
    width: 200,
    backgroundColor: '#fff',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column'
  },
  media: {
    height: 100,
  },
  gridList: {
    width: '400',
    height: '70%'
  },
};

class AllItemsList extends Component {

  handleToggle(item) {
    return () => {
      this.props.history.push(`/items/${item.Name}`);
    };
  }

  renderItem(item, key) {
    const { classes } = this.props;
    return (<GridListTile
      cols={1}
      key={key}
      role={undefined}
      onClick={this.handleToggle(item)}
      className={classes.listItem}
    >
      <ItemCard 
        item={item} 
        classes={{card: classes.card}} 
        titleVariant={'title'}
        backgroundSize={'90%'}
      />
    </GridListTile>);
  }

  render() {
    const { products, filter, classes } = this.props;
    
    if (products.length === 0) {
      return (<div></div>);
    }
    let items = products;
    if (filter.length > 0 && items) {
      items = items.filter(item => {
        if (item.NameLower) {
          return item.NameLower.toLowerCase().indexOf(filter.toLowerCase()) > -1;
        }
        else {
          console.error('NameLower Not Found', item);
        }
        return false;
      });
    }
    
    return (
      <GridList cellHeight={200} className={classes.gridList} cols={2}>
        {items.map((item, i) => { return this.renderItem(item, i); })}
      </GridList>
    );
  }
}

AllItemsList.propTypes = {
  filter: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  products: PropTypes.array,
  style: PropTypes.object
};

export default withStyles(styles)(AllItemsList);