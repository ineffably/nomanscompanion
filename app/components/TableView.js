import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ItemTable from './ItemTable';

const styles = {};

class TableView extends Component {
  constructor() {
    super();
    this.state = { filter: '' };
  }

  applyFilter() {}

  getUserFilterResults() {}

  render() {
    return (
      <div>
        <ItemTable {...this.props} />
      </div>);
  }

}
TableView.propTypes = {
  products: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TableView);

