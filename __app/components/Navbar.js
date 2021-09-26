import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import BuildIcon from '@material-ui/icons/Build';
import MoreIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';
import TableIcon from '@material-ui/icons/ViewColumn';
import { withRouter } from 'react-router';
import SearchBox from './SearchBox';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    maxHeight: '52px',
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '300px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#FFF',
    width: '100%',
    height: '50px'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    // paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '300px',
    [theme.breakpoints.up('md')]: {
      width: '300px',
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});


class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      drawer: false,
      filter: '',
      anchorEl: null,
      mobileMoreAnchorEl: null
    };
    this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
  }

  // handleProfileMenuOpen = event => {
  //   this.setState({ anchorEl: event.currentTarget });
  // };

  handleMenuClose() {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  }

  handleMobileMenuOpen() {
    // this.setState({ mobileMoreAnchorEl: event.currentTarget });
  }

  handleMobileMenuClose() {
    this.setState({ mobileMoreAnchorEl: null });
  }

  toggleDrawer(open) {
    return () => {
      this.setState({
        drawer: open,
      });
    };
  }

  render() {
    // const { anchorEl, mobileMoreAnchorEl } = this.state;
    // const isMenuOpen = Boolean(anchorEl);
    // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const { classes } = this.props;

    // const renderMenu = (
    //   <Menu
    //     anchorEl={anchorEl}
    //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //     open={isMenuOpen}
    //     onClose={this.handleMenuClose}
    //   >
    //     <MenuItem onClick={this.handleClose}>Profile</MenuItem>
    //     <MenuItem onClick={this.handleClose}>My account</MenuItem>
    //   </Menu>
    // <MenuItem>
    //   <IconButton color="inherit">
    //     <Badge className={classes.margin} badgeContent={4} color="secondary">
    //       <MailIcon />
    //     </Badge>
    //   </IconButton>
    //   <p>Messages</p>
    // </MenuItem>    
    // );

    // const renderMobileMenu = (
    // <Menu
    //   anchorEl={mobileMoreAnchorEl}
    //   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //   transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //   open={isMobileMenuOpen}
    //   onClose={this.handleMobileMenuClose}
    // >
    // );

    return (<div className={classes.root}>
      <Drawer open={this.state.drawer} onClose={this.toggleDrawer(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={this.toggleDrawer(false)}
          onKeyDown={this.toggleDrawer(false)}
        >
          <div className={classes.root}>
            <List>
              <ListItem button onClick={() => { setTimeout(() => this.props.history.push('/'), 1); }}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItem>
              <ListItem button onClick={() => { setTimeout(() => this.props.history.push('/crafting'), 1); }}>
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText primary={'Crafting'} />
              </ListItem>
              <ListItem button onClick={() => { setTimeout(() => this.props.history.push('/refinement'), 1); }}>
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText primary={'Refinement'} />
              </ListItem>
              <ListItem button onClick={() => { setTimeout(() => this.props.history.push('/table'), 1); }}>
                <ListItemIcon>
                  <TableIcon />
                </ListItemIcon>
                <ListItemText primary={'Table view'} />
              </ListItem>
            </List>
          </div>
        </div>
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon onClick={this.toggleDrawer(true)} />
          </IconButton>
          <Typography className={classes.title} variant="title" color="inherit" noWrap>
            No Mans Companion
          </Typography>
          <div className={classes.search}>
            <SearchBox {...this.props} classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }} />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton color="inherit">
              <Badge className={classes.margin} badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge className={classes.margin} badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge className={classes.margin} badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-owns={isMenuOpen ? 'material-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>);
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired
};

export default withRouter(withStyles(styles)(Navbar));
