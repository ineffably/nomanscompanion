import React, { Component } from 'react';
import Home from './components/Home';
import {
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

export default class App extends Component {
  constructor(){
    super();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <CssBaseline />
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
