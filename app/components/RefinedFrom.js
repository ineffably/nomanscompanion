import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Refinement from './Refinement';
import { Typography } from '@material-ui/core';

export default class RefinedFrom extends Component {
  render(){
    const { item, data } = this.props;
    const { Refining } = data;
    const refining = (Refining || []).filter(o => {return o.Output === item.Name;});
    if(refining.length === 0){
      return(<div></div>);
    }
    return(<div>
      <Typography variant="headline" component="h2">Refinement:</Typography>
      {refining.map((recipe,i) => {return(<Refinement {...this.props} key={i} recipe={recipe} />);})}
    </div>);
  }
}
RefinedFrom.propTypes = {
  item: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};
