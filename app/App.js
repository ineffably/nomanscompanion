import React, { Component } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';

const Home = () => {
  return (<div>Home</div>);
};

export default class App extends Component {
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
