import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    height: 300,
    width: 300,
    backgroundColor: '#fff',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column'
  },
  media: {
    height: 140,
  },
  content: {
    position: 'relative',
    flexGrow: 1,
    backgroundColor: '#777',
    margin: 0,
    padding: 0
  },
  cover: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundSize: '100%',
    'background-size': '100%'
  },
  title: {
    backgroundColor: '#fff'
  },
  cost: {
    padding: '10px 13px',
    position: 'absolute',
    color: '#fff',
    right: 0,
    bottom: 0
  },
  symbol: {
    opacity: 0.8,
    margin: '10px 10px',
    color: '#333',
    backgroundColor: '#FFF',
    borderRadius: '15px',
    width: '40px',
    textAlign: 'center'
  }
};

class ItemCard extends Component {
  render() {
    const { item, classes } = this.props;
    return (
      <Card className={classes.card}>
        <Typography variant="headline" className={classes.title}>
          {item.Name}
        </Typography>
        <CardContent className={classes.content} style={{ background: `url('icons/${item.Icon.Filename}') no-repeat center 5px ${item.ColorRGB}` }}>
          <Typography variant="headline" className={classes.symbol}>
            {item.Symbol}
          </Typography>
          <Typography variant="headline" className={classes.cost}>
            {item.BaseValue}
          </Typography>
        </CardContent>
      </Card>);
  }
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemCard);