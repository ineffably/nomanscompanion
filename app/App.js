import React, { Component } from 'react';
import Home from './components/Home';
import {
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';

export default class App extends Component {
  constructor(){
    super();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
