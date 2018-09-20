import React, { Component } from 'react';
import Home from './components/Home';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ItemView from './components/ItemView';
import RawTables from './RawTables';
import { getRefinementTables, getCraftingTable } from './nmsutils';
import CraftingView from './components/CraftingView';
import RefinementView from './components/RefinementView';
import Navbar from './components/Navbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TableView from './components/TableView';

const theme = createMuiTheme();
const styles = (theme) => {
  return {
    app: {
      marginLeft: theme.spacing.unit,
      marginTop: theme.spacing.unit
    }
  };
};

class App extends Component {
  constructor() {
    super();
    this.state = { refinerData: [], products: [], craftingTable: [], nameMap: [] };
  }

  mapIdToName(products){
    return products.reduce((value, item) => {
      value[item.Id] = item.Name;
      return value;
    }, {});
  }

  async loadProductsAndSubstances() {
    const productData = await fetch('data/raw/nms_reality_combinedproducts.en.json');
    const productJson = await productData.json();
    const substanceData = await fetch('data/raw/nms_reality_combinedsubstance.en.json');
    const substanceJson = await substanceData.json();
    const combined = productJson.data.concat(substanceJson.data);

    console.info('Product Count:', productJson.data.length);
    console.info('Substance Count:', substanceJson.data.length);
    console.info('AllItems Count:', combined.length);

    const filtered = combined.filter(item => item.Name !== 'OBSOLETE ITEM');

    return filtered.sort((a, b) => {
      if (!a.NameLower) {
        return 1;
      }
      if (a.NameLower === b.NameLower) {
        return 0;
      }
      return a.NameLower > b.NameLower ? 1 : -1;
    });
  }

  async getRefinmentData(){
    const realityDataJson = await (await fetch('data/defaultreality.en.transformed.json')).json();
    const { RefinerRecipeTable1Input, RefinerRecipeTable2Input, RefinerRecipeTable3Input } = getRefinementTables(realityDataJson);
    return RefinerRecipeTable1Input.concat(RefinerRecipeTable2Input).concat(RefinerRecipeTable3Input);    
  }

  async componentDidMount() {
    const refinerData = await this.getRefinmentData();
    const items = await this.loadProductsAndSubstances();
    this.setState({ refinerData: refinerData, products: items, craftingTable: getCraftingTable(items), nameMap: this.mapIdToName(items) });
  }

  render() {
    const state = { ...this.state };
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Navbar {...state} />
          <CssBaseline />
          <div className={this.props.classes.app}>
            <Switch>
              <Route exact path="/" render={(props) => <Home {...state} {...props} />} />
              <Route exact path="/items/:name" render={(props) => <ItemView {...state} {...props} />} />
              <Route exact path="/crafting" render={(props) => <CraftingView {...state} {...props} />} />
              <Route exact path="/refinement" render={(props) => <RefinementView {...state} {...props} />} />
              <Route exact path="/raw" render={(props) => <RawTables {...state} {...props} />} />
              <Route exact path="/table" render={(props) => <TableView {...state} {...props} />} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
