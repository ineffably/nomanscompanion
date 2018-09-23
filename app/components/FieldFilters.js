import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  FormControlLabel,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = {};

class FieldFilters extends Component {
  constructor(){
    super();
    this.toggleFilter = this.toggleFilter.bind(this);
    this.state = { activeFilters: {} };
  }
  renderFilter(id, values = []) {

    const checkboxes = values.map((value, i) => {
      return (
        <FormControlLabel
          key={i}
          control={
            <Checkbox
              key={i}
              id={id}
              color='primary'
              style={{ flex: '1' }}
              onChange={this.toggleFilter}
              value={value}
            />
          }
          label={value}
        />);
    });

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='body1'>{id}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {checkboxes}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  toggleFilter(ev) {
    const { id, value, checked } = ev.target;
    const { activeFilters } = this.state;
    const { onChangeFilter } = this.props;
    const currentValues = activeFilters[id];
    let stateUpdated = false;
    
    if(checked) {
      if(currentValues) {
        currentValues.push(value);
      }
      else {
        activeFilters[id] = [value];
      }
      stateUpdated = true;
      this.setState({activeFilters: activeFilters});
    }
    else {
      if(currentValues && currentValues.includes(value)){
        activeFilters[id] = currentValues.filter(entry => entry !== value);
        stateUpdated = true;
        this.setState({activeFilters: activeFilters});
      }
    }
    if(stateUpdated && onChangeFilter){
      onChangeFilter(this.state.activeFilters);
    }
  }

  render() {
    const { fieldFilters } = this.props;

    const filters = Object.keys(fieldFilters).map(field => {
      return this.renderFilter(field, fieldFilters[field]);
    });

    return (
      <div style={{ flex: '2', height: '300px', overflowY: 'auto' }}>
        <Typography variant='title'>Filters:</Typography>
        {filters}
      </div>);
  }
}
FieldFilters.propTypes = {
  fieldFilters: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onChangeFilter: PropTypes.func
};








export default withStyles(styles)(FieldFilters);