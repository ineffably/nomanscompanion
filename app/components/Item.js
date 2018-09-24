import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Avatar, ButtonBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    flex: 1,
    width: 250,
    minWidth: 220,
    padding: 0,
    marginTop: '5px'
  },
  content: {
    display: 'flex',
    paddingBottom: '16 !important'
  },
  avatar: {},
  title: {
    lineHeight: '24px',
    marginLeft: '8px'
  },
  cost: {}
};

class Item extends Component {
  render() {
    const { item, classes, count } = this.props;
    if (!item) {
      return (<span></span>);
    }

    const label = count ? `${item.Name} x ${count}` : item.Name;
    const itemText = `${label}`;
    
    return (
      <Card className={classes.card} elevation={1} >
        <CardContent className={classes.content} >
          <ButtonBase onClick={() => {this.props.history.push(`/items/${item.Name}`);}}>
            <Avatar className={classes.avatar} style={{ backgroundColor: item.ColorRGB}} alt={item.NameLower} src={`icons/${item.Icon.Filename}`} />
            <Typography noWrap={true} className={classes.title}>{itemText}</Typography>
          </ButtonBase>
        </CardContent>
      </Card>);
  }
}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  item: PropTypes.object,
  count: PropTypes.any
};

export default withStyles(styles)(Item);