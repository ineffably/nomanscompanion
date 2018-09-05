import React, { Component } from 'react';
import ReactTable from 'react-table';
import { transformTable, translateIcon, translateColor } from './nmsutils';

export default class RawTables extends Component {
  constructor() {
    super();
    this.state = { productTable: {} };
  }

  async componentDidMount() {
    const response = await fetch('data/raw/NMS_REALITY_GCPRODUCTTABLE.json');
    const json = await response.json();
    console.log('json', json);
    this.setState({ productTable: json });
  }

  getData() {
    const data = this.state.productTable;
    if (!data || !data.Data) { return null; }
    const table = data.Data;
    // how do I know a Property needs to be an array?
    const rawData = table.Property.Property.map((entry) => { return transformTable(entry, {}); });
    // const rawData = transformTable(table, {});
    const tempItem = rawData[0];
    // console.log(Object.keys(tempItem).join('\n'));
    console.log('rawData', tempItem);
    return rawData;
  }

  getColumns() {
    // ["Id", "Name", "NameLower", "Subtitle", "Description", "DebrisFile", "BaseValue", "Level", "Icon", "HeroIcon", 
    // "Colour", "SubstanceCategory", "Type", "ProceduralType", "Rarity", "Legality", "Consumable", "ChargeValue", 
    // "StackMultiplier", "DefaultCraftAmount", "CraftAmountStepSize", "CraftAmountMultiplier", "Requirements", "Cost", 
    // "SpecificChargeOnly", "NormalisedValueOnWorld", "NormalisedValueOffWorld", "TradeCategory", "WikiEnabled", "IsCraftable", 
    // "EconomyInfluenceMultiplier", "PinObjeective", "PinObjeectiveTip"]

    const columns = ['Id', 'Name', 'Colour', 'Icon'];
    const results = columns.map(el => {
      return {
        Header: el,
        id: el,
        accessor: o => {
          if (el === 'Colour') {
            const color = translateColor(o[el]);
            return(<div style={{width: '50px', height: '50px', backgroundColor: color}}></div>);
          }
          if (el === 'Icon') {
            const src = translateIcon(o[el].Filename);
            return(<img src={`icons/${src}`} style={{width: '50px'}} />);
          }
          return JSON.stringify(o[el]);
        }
      };
    });
    return results;
  }

  render() {
    const data = this.getData();
    if (!data) {
      return (<div>Empty</div>);
    }

    return (<div>
      <h2>Raw Tables</h2>
      <ReactTable data={data} columns={this.getColumns()} defaultPageSize={100} />
    </div>);
  }
}
