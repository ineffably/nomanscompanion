import React, { Component } from 'react';
import Home from './components/Home';
import {
  Route,
  Switch,
  HashRouter as Router
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ItemView from './components/ItemView';
import RawTables from './RawTables';
import { getRefinementTables } from './nmsutils';

export default class App extends Component {
  constructor(){
    super();
    this.state = { refineData: {}, products: [] };
  }

  setupImages(items) {
    const imagePath = 'images';
    items.forEach(item => {
      item.image = item.Name.replace(/ +?/g, '');
      item.image = [imagePath, '/', item.image.toLowerCase(), '.png'].join('');
    });
  }

  async loadProductsAndSubstances() {
    const productData = await fetch('data/raw/nms_reality_gcproducttable.en.transformed.json');
    const productJson = await productData.json();
    const substanceData = await fetch('data/raw/nms_reality_combinedsubstance.en.json');
    const substanceJson = await substanceData.json();
    const combined = productJson.data.concat(substanceJson.data);
    console.log('Product Count:', productJson.data.length);
    console.log('Substance Count:', substanceJson.data.length);
    console.log('AllItems Count:', combined.length);
    
    return combined.sort((a,b) => {
      if(!a.NameLower){
        return 1;
      }
      if(a.NameLower === b.NameLower){
        return 0;
      }
      return a.NameLower > b.NameLower ? 1 : -1;
    });
  }

  async componentDidMount() {
    const realityDataJson = await (await fetch('data/defaultreality.transformed.json')).json();
    const refineData = getRefinementTables(realityDataJson);
    const items = await this.loadProductsAndSubstances();
    this.setState({ refineData: refineData, products: items });
  }

  render() {
    const state = {...this.state};
    return (
      <Router>
        <div className="App">
          <CssBaseline />
          <div className="container">
            <Switch>
              <Route exact path="/" render={(props) => <Home {...state} {...props} />} />
              <Route exact path="/items/:name" render={(props) => <ItemView {...state} {...props} />} />
              <Route exact path="/raw" render={(props) => <RawTables {...state} {...props} />} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
