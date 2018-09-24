import ReactTable from 'react-table';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  FormControlLabel,
  GridList,
  GridListTile,
  Typography,
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ItemCard from './ItemCard';
import { DefaultConfig, Columns } from '../config/ColumnOptions';
import { isObject } from 'util';
import FieldFilters from './FieldFilters';

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
  },
  textField: {
    width: '95%',
    display: 'flex',
    margin: '0 10'
  },
  listStyle: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '200px',
    height: '300px'
  },
  gridListTile: {
    height: '35px'
  }
};

class ItemTable extends Component {
  constructor() {
    super();
    this.toggleColumn = this.toggleColumn.bind(this);
    this.filterChanged = this.filterChanged.bind(this);
    this.state = { allColumns: Columns, columns: [], columnConfig: DefaultConfig, filterTimeout: 0, filter: '', valueFilters: {} };
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
    const { card, cost, symbol } = classes;
    return {
      Icon: {
        accessor: item => {
          return (
            <ItemCard item={item}
              classes={{ card, cost, symbol }}
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

  applyFilter(value){
    if(this.state.filter !== value){
      this.setState({filter: value});
    }
  }

  renderSearchBox() {
    const onTextChange = (ev) => {
      const { filterTimeout } = this.state;
      if(filterTimeout){
        global.clearTimeout(filterTimeout);
      }
      const val = ev.target.value;
      const timeout = global.setTimeout(() => {
        this.applyFilter(val && val.length > 1 ? val : '');
      }, 100);
      global.setTimeout(() => {this.setState({filterTimeout: timeout});}, 1);
    };

    return (
      <div style={{flex: 1}}>
        <TextField
          id="itemFilter"
          label="Item Search"
          placeholder="Enter Item Name"
          style={styles.textField}
          margin="normal"
          onChange={onTextChange}
        />
      </div>);
  }

  renderColumnToggles(columns = [], config) {
    return (
      <div style={{flex: 0}}>
        <Typography variant='title'>Columns:</Typography>
        <GridList cellHeight={48} spacing={2} cols={1} style={styles.listStyle}>
          {columns.map((column, i) => {
            if (config[column] !== true && config[column] !== false) {
              console.info('unknown', column);
            }
            return (
              <GridListTile key={i} >
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

  filterChanged(newFilter) {
    this.setState({valueFilters: newFilter});
  }

  filterData(data){
    const {valueFilters, filter} = this.state;
    const filteredFields = Object.keys(valueFilters);
    const filteredValues = data.filter(item => {
      let result = item.Name.indexOf(filter.toUpperCase()) > -1;
      if(result){
        let goodField = true;
        filteredFields.forEach(field => {
          const values = valueFilters[field] || [];
          if(values && values.length > 0){
            const containsValue = values.includes(item[field]);
            if(!containsValue){
              goodField = false;
            }
          }
        });
        result = goodField;
      }
      return result;
    });
    return filteredValues;
  }

  render() {
    const { products, history, fieldFilters } = this.props;
    const { allColumns, columns, columnConfig } = this.state;
    const data = this.filterData(products);
    return (
      <div>
        <div style={{ display: 'flex' }}>
          {this.renderColumnToggles(allColumns, columnConfig)}
          {this.renderSearchBox()}
          {<FieldFilters history={history} fieldFilters={fieldFilters} onChangeFilter={this.filterChanged} />}
        </div>
        <ReactTable data={data} columns={columns} defaultPageSize={50} />
      </div>
    );
  }
}
ItemTable.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  fieldFilters: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemTable);


