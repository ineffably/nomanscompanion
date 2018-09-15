/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import { withStyles } from '@material-ui/core/styles';
import { Typography, ListItemIcon, ListItemText } from '@material-ui/core';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

const styles = (theme) => {
  return {
    root: {
      flexGrow: 1,
      height: 250
    },
    input: {
      display: 'flex',
      padding: 0,
      color: '#fff'
    },
    input1: {
      color: '#fff'
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
        0.08,
      ),
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
      fontSize: 16,
      color: '#fff'
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16,
      color: '#ccc'
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    divider: {
      height: theme.spacing.unit * 2,
    }
  };
};

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        className: props.selectProps.classes.input1,
        disableUnderline: true,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textPrimary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.data.value}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class SearchBox extends React.Component {
  constructor() {
    super();
    this.state = {
      single: null,
      multi: null,
      list: [],
      inputValue: ''
    };
  }

  handleChange() {
    return value => {
      if(!value.value){return;}
      this.props.history.push(`/items/${value.value}`);
      // this.setState({
      //   [name]: value,
      // });
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.products.length !== prevProps.products.length) {
      const labels = this.props.products.map((item, i) => {
        return {
          value: item.NameLower,
          label: (<div key={i} style={{ display: 'flex' }}>
            {<ListItemIcon >
              <div style={{ backgroundColor: item.ColorRGB, width: '50px' }}>
                <img src={`icons/${item.Icon.Filename}`} style={{ width: '50px' }} />
              </div>
            </ListItemIcon>}
            <ListItemText style={{ alignSelf: 'center', textAlign: 'center' }}>{item.NameLower}</ListItemText>
          </div>)
        };
      });
      this.setState({ list: labels });
    }
  }

  render() {
    const { classes } = this.props;
    const { list, single } = this.state;

    const selectStyles = {
      input: base => ({
        ...base,
        color: '#fff',
      }),
    };

    const promiseOptions = inputValue => {
      if (inputValue.length > 1) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(list.filter(p => p.value.toUpperCase().includes(inputValue.toUpperCase())));
          }, 100);
        });
      }
      return new Promise(resolve => {resolve([]);});
    };

    return (
      <div className={classes.root}>
        <NoSsr>
          <AsyncSelect
            cacheOptions
            defaultOptions
            classes={classes}
            styles={selectStyles}
            components={components}
            value={single}
            onChange={this.handleChange('single')}
            onInputChange={(value) => {
              this.setState({ inputValue: value });
              return value;
            }}
            loadOptions={promiseOptions}
            placeholder="Search..."
          />
        </NoSsr>
      </div>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SearchBox);