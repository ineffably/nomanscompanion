import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import BluePrint from './BluePrint';
import { Typography } from '@material-ui/core';

export default class CraftedBy extends Component {
  render(){
    const { item } = this.props;
    // const reqs = item.Requirements;
    


    const bluePrint = {
      Output: item,
      Input1: {},
      Input2: item.Requirements[1],
      Input3: item.Requirements[2]
    };

    console.log(bluePrint);
    
    return(<div>
      <Typography variant="headline" component="h2">Crafting:</Typography>
      
    </div>);

    // return(<div>
    //   <Typography variant="headline" component="h2">Crafting:</Typography>
    //   {blueprints.map((bp,i) => {return(<div key={i}><BluePrint {...this.props} blueprint={bp} /></div>);})}
    // </div>);
  }
}
CraftedBy.propTypes = {
  item: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired
};