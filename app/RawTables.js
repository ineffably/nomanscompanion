import React, { Component } from 'react';
import ReactTable from 'react-table';
import { translateIcon, translateColor, lookupString } from './nmsutils';

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
    const productTableJson = await this.requestJson('data/raw/nms_reality_gcproducttable.transformed.json');
    const languageTable1Json = await this.requestJson('data/nms_loc1_english.transformed.json');
    const languageTable4Json = await this.requestJson('data/nms_loc4_english.transformed.json');
    const languageTableUpdate3Json = await this.requestJson('data/nms_update3_english.transformed.json');

    const languageTable = {...languageTable4Json.data, ...languageTable1Json.data, ...languageTableUpdate3Json.data};
    this.setState({ productTable: productTableJson, languageTable: {data: languageTable} });
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

    const columns = ['Name', 'Subtitle', 'Colour', 'Icon', 'SubstanceCategory', 'Type', 'BaseValue', 'Rarity', 'Legality', 
      'Consumable', 'ChargeValue', 'StackMultiplier', 'DefaultCraftAmount', 'CraftAmountStepSize'];
    const results = columns.map(el => {
      return {
        Header: el,
        id: el,
        accessor: o => {
          if(el === 'Rarity' || el === 'Legality') {
            return(<div>{o[el][el]}</div>);
          }
          if(el === 'Type'){
            return(<div>{o[el].ProductCategory}</div>);
          }
          if(el === 'SubstanceCategory'){
            return (<div>{o[el].SubstanceCategory}</div>);
          }
          if (el === 'Name' || el === 'Subtitle') {
            const value = lookupString(this.state.languageTable, o[el]) || o[el];
            return(<div>{value}</div>);
          }
          if (el === 'Colour') {
            const color = translateColor(o[el]);
            return(<div style={{width: '50px', height: '50px', backgroundColor: color}}></div>);
          }
          if (el === 'Icon') {
            const src = translateIcon(o[el].Filename);
            return(<img src={`icons/${src}`} style={{width: '50px'}} />);
          }
          const item = o[el];
          
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
