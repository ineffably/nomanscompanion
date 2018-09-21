import ReactTable from 'react-table';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  FormControlLabel,
  GridList,
  GridListTile,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ItemCard from './ItemCard';
import { DefaultConfig, Columns } from '../config/ColumnOptions';
import { isObject } from 'util';

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
  constructor() {
    super();
    this.toggleColumn = this.toggleColumn.bind(this);
    this.state = { allColumns: Columns, columns: [], columnConfig: DefaultConfig };
  }

  toggleColumn(ev) {
    const newState = this.state.columnConfig;
    newState[ev.target.value] = ev.target.checked;
    this.setState({ columnConfig: newState });
    this.updateColumns();
  }

  updateColumns() {
    const optionOverrides = this.getOptionOverrides(this.props.classes);
    const colConfig = { ...DefaultConfig };
    const colOptions = { ...optionOverrides };
    const columns = this.getColumns(Columns, colConfig, colOptions);
    this.setState({ columns: columns });
  }

  componentDidMount() {
    this.updateColumns();
  }

  getColumns(columns = [], config = {}, options = {}) {
    const result = columns.filter(c => config[c]).map(el => {
      const defaultOption = {
        Header: el,
        id: el,
        accessor: o => {
          const value = o[el];
          return (typeof value === 'object' ? JSON.stringify(value) : value);
        },
        sortMethod: (a, b) => {
          if (a === b || isObject(a) || isObject(b)) { return 0; }
          return (a > b) ? 1 : -1;
        }
      };
      const override = options[el] || {};
      return { ...defaultOption, ...override };
    });
    return result;
  }

  getOptionOverrides(classes) {
    const { history } = this.props;
    return {
      Icon: {
        accessor: item => {
          return (
            <ItemCard item={item}
              classes={classes}
              titleVariant={'body1'}
              symbolVariant={'body1'}
              costVariant={'body1'}
              backgroundSize={'90%'}
              onClick={() => { history.push(`/items/${item.Name}`); }}
            />);
        },
        style: {
          width: 100
        }
      },
      BaseValue: {
        sortMethod: (a, b) => {
          const x = parseInt(a, 10);
          const y = parseInt(b, 10);
          if (x === y) { return 0; }
          return (x > y) ? 1 : -1;
        }
      }
    };
  }

  renderColumnToggles(columns = [], config, listStyle) {
    return (
      <div>
        <Typography variant='title'>Columns:</Typography>
        <GridList cellHeight={48} spacing={2} cols={1} style={listStyle}>
          {columns.map((column, i) => {
            if (config[column] !== true && config[column] !== false) {
              console.log('unknown', column);
            }
            return (
              <GridListTile key={i} style={{ height: '35px' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      style={{ flex: '1' }}
                      onChange={this.toggleColumn}
                      value={column}
                      checked={config[column]}
                    />
                  }
                  label={column}
                />
              </GridListTile>);
          })}
        </GridList></div>);
  }

  render() {
    const { products } = this.props;
    const { allColumns, columns, columnConfig } = this.state;
    const listStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      width: '200px',
      height: '300px'
    };

    return (
      <div>
        {this.renderColumnToggles(allColumns, columnConfig, listStyle)}
        <ReactTable data={products} columns={columns} defaultPageSize={100} />
      </div>
    );
  }
}
ItemTable.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemTable);


