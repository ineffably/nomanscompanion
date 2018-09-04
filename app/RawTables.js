import React, { Component } from 'react';
import ReactTable from 'react-table';
import { transformRawTableFormat } from './nmsutils';

export default class RawTables extends Component {
  constructor() {
    super();
    this.state = { productTable: {} };
  }

  async componentDidMount() {
    const response = await fetch('data/raw/NMS_REALITY_GCPRODUCTTABLE.json');
    const data = await response.json();
    console.log('data', data);
    this.setState({ productTable: data });
  }

  getData() {
    const data = this.state.productTable;
    if (!data || !data.Data) { return null; }
    const table = data.Data.Property.Property;
    console.log('table', table);
    // const rawData = transformRawTableFormat(table);
    const rawData = table.map((entry) => {return this.transformRawTableFormat(entry, {});});
    console.log('rawData', rawData);
    return rawData;
  }

  getColumns() {
    const columns = ['Id', 'Name', 'BaseValue'];
    return columns.map(el => { return { Header: el, accessor: el }; });
  }

  render() {
    const columns = this.getColumns();
    const data = this.getData();
    if (!data) {
      return (<div>Empty</div>);
    }

    return (<div>
      <h2>Raw Tables</h2>
      <ReactTable data={data} columns={columns} />
    </div>);
  }
}
