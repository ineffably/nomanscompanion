import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
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
    margin: 0,
    padding: 0,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
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
    const { item, classes, titleVariant, backgroundSize } = this.props;
    const backgroundStyles = {
      backgroundSize: backgroundSize ? backgroundSize : '100%',
      backgroundImage: `url('icons/${item.Icon.Filename}')`,
      backgroundColor: `${item.ColorRGB}`
    };

    return (
      <Card className={classes.card}>
        <Typography noWrap variant={titleVariant || 'headline'} className={classes.title}>
          {item.Name}
        </Typography>
        <CardContent className={classes.content}
          style={backgroundStyles}>
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
  item: PropTypes.object.isRequired,
  width: PropTypes.number,
  titleVariant: PropTypes.string,
  backgroundSize: PropTypes.string
};

export default withStyles(styles)(ItemCard);