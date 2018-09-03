import React, { Component } from 'react';
import ReactTable from 'react-table';
// NMS_REALITY_GCPRODUCTTABLE

export default class RawTables extends Component {
  constructor() {
    super();
    this.state = { productTable: {} };
  }

  async componentDidMount() {
    const response = await fetch('data/raw/NMS_REALITY_GCPRODUCTTABLE.json');
    const data = await response.json();
    this.setState({ productTable: data });
  }

  xmlPropToObject(sourceLeaf, obj) {
    let result = obj || {};
    if (Array.isArray(sourceLeaf)) {
      const newObj = {};
      const resultObj = sourceLeaf.forEach(el => {
        this.xmlPropToObject(el, newObj);
      });
      result = {...result, ...resultObj};
    }
    else if(sourceLeaf.Property) {
      const newObj = {};
      const updatedObj = this.xmlPropToObject(sourceLeaf.Property, newObj);
      if(sourceLeaf.name){
        result.oldValue = sourceLeaf.value;
        result[sourceLeaf.name] = updatedObj;
      }
      else {
        result = updatedObj;
      }
    }
    else if(sourceLeaf.name) {
      result[sourceLeaf.name] = sourceLeaf.value;
    }
    return result;
  }

  getData() {
    const data = this.state.productTable;
    if (!data || !data.Data) { return null; }
    const table = data.Data.Property.Property;
    const rawData = table.map((entry) => {return this.xmlPropToObject(entry, {});});
    console.log('rawData', rawData[0]);
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

// xmlPropertyToValue(field, obj) {
//   let result = obj || {};

//   if (Array.isArray(field)) {
//     const newObj = {};
//     field.forEach(el => {
//       const resultObj = this.xmlPropertyToValue(el, newObj);
//       result = {...resultObj};
//     });
//     return result;
//   }

//   if (field.Property) {
//     const newObj = {};
//     result.lookup = field.value;
//     const propObject = this.xmlPropertyToValue(field.Property, newObj);
//     result[field.name] = propObject;
//   }
//   else if(field.name){
//     result[field.name] = field.value;
//   }


//   // if (field.name) {
//   //   if (field.Property) {
//   //     const newObj = {};
//   //     result.lookup = field.value;
//   //     result[field.name] = this.xmlPropertyToValue(field.Property, newObj);
//   //   }
//   //   else {
//   //     result[field.name] = field.value;
//   //   }
//   // }


//   // else {
//   //   result[field.name] = field.Property ? this.xmlPropertyToValue(field.Property, obj) : field.value;
//   // }
//   return result;
// }