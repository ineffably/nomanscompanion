import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    maxWidth: 345,
    display: 'flex'
  },
  media: {
    height: 140,
  },
  cover: {
    verticalAlign: 'middle',
    width: 50,
    height: 50,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  }
};

class ItemCard extends Component {
  render() {
    const { item, classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image="images/dioxite.png"
          title='{item.name}'
        />
        <div className={classes.details}>
          <CardContent>
            <Typography variant="title">{item.Name}</Typography>
          </CardContent>
        </div>
      </Card>);
  }
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemCard);