import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BluePrint from './BluePrint';
import { Typography } from '@material-ui/core';

export default class CraftedBy extends Component {
  render(){
    const { item, data } = this.props;
    const { Crafting } = data;
    const crafting = Crafting || [];
    const blueprints = crafting.filter(blueprint => {
      return blueprint.Output === item.Name;
    });
    if(blueprints.length === 0){
      return(<span></span>);
    }
    
    return(<div>
      <Typography variant="headline" component="h2">Crafting:</Typography>
      {blueprints.map((bp,i) => {return(<div key={i}><BluePrint {...this.props} blueprint={bp} data={data} /></div>);})}
    </div>);
  }
}
CraftedBy.propTypes = {
  item: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};