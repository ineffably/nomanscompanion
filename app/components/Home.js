import React, { Component } from 'react';

export default class Home extends Component {
  constructor(){
    super();
    this.state = { items: {}, refining: {}, crafting: {} };
  }

  async componentDidMount(){
    const itemResponse = await fetch('../data/Items.json');
    const items = await itemResponse.json();
    const refiningResponse = await fetch('../data/Refining.json');
    const refiningJson = await refiningResponse.json();
    this.setState({items: items, refining: refiningJson});
  }

  renderAllItems(){
    const allItems = this.state.items;
    const itemNames = Object.keys(this.state.items);
    return itemNames.map((name, i) => {
      const item = allItems[name];
      return(<div key={i}>{item.Name}</div>);
    });
  }

  render(){
    return(
      <div>
        <h3>Home Page</h3>
        {this.renderAllItems()}
      </div>);
  }
}