import React, { Component } from 'react';
import ReactTable from 'react-table';

export default class RawTables extends Component {
  constructor() {
    super();
    this.state = { productTable: {} };
  }

  async requestJson(file) {
    const response = await fetch(file);
    return await response.json();
  }

  async componentDidMount() {
    const productTableJsonEnglish = await this.requestJson('data/raw/nms_reality_gcproducttable.en.transformed.json');
    this.setState({ productTable: productTableJsonEnglish });
  }

  getColumns() {
    // ["Id", "Name", "NameLower", "Subtitle", "Description", "DebrisFile", "BaseValue", "Level", "Icon", "HeroIcon", 
    // "Colour", "SubstanceCategory", "Type", "ProceduralType", "Rarity", "Legality", "Consumable", "ChargeValue", 
    // "StackMultiplier", "DefaultCraftAmount", "CraftAmountStepSize", "CraftAmountMultiplier", "Requirements", "Cost", 
    // "SpecificChargeOnly", "NormalisedValueOnWorld", "NormalisedValueOffWorld", "TradeCategory", "WikiEnabled", "IsCraftable", 
    // "EconomyInfluenceMultiplier", "PinObjeective", "PinObjeectiveTip"]

    // Invariants:
    // Level : 0
    // ProceduralType.ProceduralProductCategory : Loot

    const columns = ['NameLower', 'Subtitle', 'ColorRGB', 'Icon', 'SubstanceCategory', 'Type', 'BaseValue', 'Rarity', 'Legality', 
      'Consumable', 'ChargeValue', 'StackMultiplier', 'DefaultCraftAmount', 'CraftAmountStepSize'];
    const results = columns.map(el => {
      return {
        Header: el,
        id: el,
        accessor: o => {
          const item = o[el];
          if (el === 'ColorRGB') {
            return(<div style={{width: '50px', height: '50px', backgroundColor: item}}></div>);
          }
          if (el === 'Icon') {
            return(<img src={`icons/${item.Filename}`} style={{width: '50px'}} />);
          }
          return(<div>{typeof item === 'object' ? JSON.stringify(item) : item }</div>);
        }
      };
    });
    return results;
  }

  render() {
    const data = this.state.productTable.data;
    if (!data) {
      return (<div>Empty</div>);
    }
    
    return (<div>
      <h2>Raw Tables</h2>
      <ReactTable data={data} columns={this.getColumns()} defaultPageSize={100} />
    </div>);
  }
}
