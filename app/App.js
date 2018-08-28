import React, { Component } from 'react';
import Home from './components/Home';
import {
  Route,
  Switch,
  HashRouter as Router
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ItemView from './components/ItemView';

export default class App extends Component {
  constructor(){
    super();
    this.state = { data: {}, items: [], refining: [], crafting: [] };
  }

  setupImages(items) {
    const imagePath = '/images';
    items.forEach(item => {
      item.image = item.Name.replace(/ +?/g, '');
      item.image = [imagePath, '/', item.image.toLowerCase(), '.png'].join('');
    });
  }

  async componentDidMount() {
    const itemResponse = await fetch('../data/Data.json');
    const data = await itemResponse.json();
    this.setupImages(data.Items);
    this.setState({ data: data, items: data.Items, refining: data.Refining, crafting: data.Crafting });
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
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
