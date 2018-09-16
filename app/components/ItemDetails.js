import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  details: {
    marginTop: '16px',
    marginBottom: '16px'
  }
};

class ItemDetails extends Component {
  render() {
    const { item, classes } = this.props;
    const o = item;
    const values = [
      'BaseValue',
      'ChargeValue',
      'Legality',
      'Rarity',
      'Type',
      'ProceduralType',
      'SubstanceCategory'
    ];

    const getTableRow = (item, attrib) => {
      // const value = item[attrib] ? item[attrib] : null;
      return (
        <tr><td>{attrib}</td><td>{item[attrib]}</td></tr>
      );
    };

    const getTableRows = (item, attributes) => attributes.map(attrib => getTableRow(item, attrib));

    return (
      <Paper className={classes.details} >
        <Typography variant='headline'>{o.Subtitle}</Typography>
        <Typography variant='subheading'>{o.Description}</Typography>

        <table style={{ border: '2px solid #EEE' }} >
          <tbody>
            {getTableRows(item, values)}
            <tr><td>{'Category'}</td><td>{item.Category ? item.Category.SubstanceCategory : null}</td></tr>
            <tr><td>{'TradeCategory'}</td><td>{item.TradeCategory ? item.TradeCategory.TradingClass : null}</td></tr>
          </tbody>
        </table>
      </Paper>
    );

  }

}
ItemDetails.propTypes = {
  item: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemDetails);