import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Avatar, ButtonBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    minWidth: 220,
    padding: 0
  },
  content: {
    display: 'flex',
    flexFlow: 'row',
    paddingBottom: '16 !important'
  },
  avatar: {},
  title: {
    lineHeight: '24px'
  },
  cost: {}
};

class Item extends Component {
  render() {
    const { item, classes, count } = this.props;
    if (!item) {
      return (<span></span>);
    }

    const itemText = count ? `${item.Name} x ${count}` : item.Name;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <ButtonBase onClick={() => {this.props.history.push(`/items/${item.Name}`);}}>
            <Avatar className={classes.avatar} alt={item.NameLower} src={`${item.image}`} />
            <Typography className={classes.title}>{itemText}</Typography>
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