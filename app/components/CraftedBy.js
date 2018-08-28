import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BluePrint from './BluePrint';

export default class CraftedBy extends Component {
  render(){
    const { item, data } = this.props;
    const { Crafting } = data;
    const crafting = Crafting || [];
    const blueprints = crafting.filter(blueprint => {
      return blueprint.Output === item.Name;
    });
    
    return(<div>
      {blueprints.map((bp,i) => {return(<div key={i}><BluePrint {...this.props} blueprint={bp} data={data} /></div>);})}
    </div>);
  }
}
CraftedBy.propTypes = {
  item: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};