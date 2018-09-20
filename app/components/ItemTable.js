import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  FormControlLabel,
  GridList,
  GridListTile,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ItemCard from './ItemCard';
import ColumnOptions from './ColumnOptions';

const toggles = {
  'Id': true,
  'Name': true,
  'NameLower': true,
  'Subtitle': true,
  'Description': true,
  'DebrisFile': true,
  'BaseValue': true,
  'Level': true,
  'Icon': true,
  'HeroIcon': true,
  'Colour': true,
  'SubstanceCategory': true,
  'Type': true,
  'ProceduralType': true,
  'Rarity': true,
  'Legality': true,
  'Consumable': true,
  'ChargeValue': true,
  'StackMultiplier': true,
  'DefaultCraftAmount': true,
  'CraftAmountStepSize': true,
  'CraftAmountMultiplier': true,
  'Requirements': true,
  'Cost': true,
  'SpecificChargeOnly': true,
  'NormalisedValueOnWorld': true,
  'NormalisedValueOffWorld': true,
  'TradeCategory': true,
  'WikiEnabled': true,
  'IsCraftable': true,
  'EconomyInfluenceMultiplier': true,
  'ColorRGB': true,
  'PinObjeective': true,
  'PinObjeectiveTip': true,
  'ID': true,
  'Symbol': true,
  'WorldColour': true,
  'Category': true,
  'tradeCategory': true,
  'PinObjective': true,
  'PinObjectiveTip': true,
  'WorldColorRGB': true,
  'DeploysInto': true,
  'GroupID': true,
  'AltRequirements': true
};

const columns = ['Id', 'Name', 'NameLower', 'Subtitle', 'Description', 'DebrisFile',
  'BaseValue', 'Level', 'Icon', 'HeroIcon', 'Colour', 'SubstanceCategory',
  'Type', 'ProceduralType', 'Rarity', 'Legality', 'Consumable', 'ChargeValue',
  'StackMultiplier', 'DefaultCraftAmount', 'CraftAmountStepSize',
  'CraftAmountMultiplier', 'Requirements', 'Cost', 'SpecificChargeOnly',
  'NormalisedValueOnWorld', 'NormalisedValueOffWorld', 'TradeCategory',
  'WikiEnabled', 'IsCraftable', 'EconomyInfluenceMultiplier', 'ColorRGB',
  'PinObjeective', 'PinObjeectiveTip', 'ID', 'Symbol', 'WorldColour', 'Category',
  'tradeCategory', 'PinObjective', 'PinObjectiveTip', 'WorldColorRGB', 'DeploysInto',
  'GroupID', 'AltRequirements'];

const styles = {
  card: {
    height: 100,
    width: 100,
    backgroundColor: '#fff',
    padding: '5px',
    display: 'flex',
    flexDirection: 'column'
  },
  cost: {
    padding: '4px 5px',
    position: 'absolute',
    color: '#fff',
    right: 0,
    bottom: 0
  },
  symbol: {
    opacity: 0.8,
    margin: '2.5px 2.5px',
    color: '#333',
    backgroundColor: '#FFF',
    borderRadius: '3px',
    width: '12px',
    textAlign: 'center',
    fontSize: '50%'
  }
};

class ItemTable extends Component {
  renderTableHead(columns, colOptions, colConfig) {
    return (
      <TableHead style={{ backgroundColor: '#333' }}>
        <TableRow>
          {columns.map((col, i) => {
            if(!colOptions[col]){return null;}
            const column = colConfig[col];
            return(<TableCell style={{ color: '#fff' }} key={i}>{column.header}</TableCell>);
          })}
        </TableRow>
      </TableHead>);
  }

  toggleColumn(ev) {
    console.log(ev.target.value, ev.target.checked);
  }

  render() {
    const { products, classes } = this.props;
    const configOverrides = {
      Icon: {
        header: 'Icon',
        field: 'Icon',
        style: {
          width: 100
        },
        render: (item) => {
          return (
            <ItemCard item={item}
              classes={classes}
              titleVariant={'body1'}
              symbolVariant={'body1'}
              costVariant={'body1'}
              backgroundSize={'90%'} />);
        }
      }
    };
    const colOptions = { ...toggles };
    const colConfig = { ...ColumnOptions, ...configOverrides };

    const listStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      width: '200px',
      height: '300px'
    };

    return (
      <div>
        <Typography variant='title'>Columns:</Typography>
        <GridList cellHeight={48} spacing={2} cols={1} style={listStyle}>
          {columns.map((column, i) => {
            return (
              <GridListTile key={i}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      style={{ flex: '1' }}
                      onChange={this.toggleColumn}
                      value={column}
                    />
                  }
                  label={column}
                />
              </GridListTile>);
          })}
        </GridList>
        <Table>
          {this.renderTableHead(columns, colOptions, colConfig)}
          <TableBody>
            {products.map((item, i) => {
              return (
                <TableRow key={i}>
                  {columns.map((column, i) => {
                    if(!colOptions[column]){return null;}
                    const config = colConfig[column];
                    const style = config.style || {};
                    const childElement = config.render ? config.render(item) 
                      : (typeof item[column] === 'object') ? 
                        JSON.stringify(item[column]) : 
                        item[column];
                    return(<TableCell key={i} style={style} >{childElement}</TableCell>);
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}
ItemTable.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired
};

export default withStyles(styles)(ItemTable);


