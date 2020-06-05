/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
// core components
import AdminNavbarLinks from 'components/Navbars/AdminNavbarLinks';

import styles from 'assets/jss/material-dashboard-react/components/sidebarStyle';
// import headerLinksStyle from 'assets/jss/material-dashboard-react/components/headerLinksStyle';

// import Poppers  from '@material-ui/core/Popper';
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';

import { ModalProps, Theme, createStyles } from '@material-ui/core';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStyles = makeStyles(styles as any);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const useHeaderLinksStyle = makeStyles(headerLinksStyle as any);

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
      borderRadius: '3px',
    },
    text: {
      color:'white'
    },
    list: {
      marginLeft:15,
      marginRight:15,
      marginBottom:0,
      paddingBottom:0,
    },
    listItem: {
      paddingTop:10,
      paddingBottom:10, 
      borderRadius: '3px',
    }
  }),
);

// Sidebar.propTypes = {
//     rtlActive: PropTypes.bool,
//     handleDrawerToggle: PropTypes.func,
//     bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
//     logo: PropTypes.string,
//     image: PropTypes.string,
//     logoText: PropTypes.string,
//     routes: PropTypes.arrayOf(PropTypes.object),
//     open: PropTypes.bool
//   };
 
interface RouteType {
  path?:string;
  layout?:string;
  icon?:string |  typeof Icon;
  name:string
  routes?:RouteType[]
}



interface RoutesType {
  routes: RouteType[];
}

interface SidebarType extends RoutesType{
  rtlActive: boolean;
  handleDrawerToggle: ModalProps['onClose'];
  bgColor: 'purple'| 'blue'|'green'|'orange'| 'red';
  logo: string;
  image: string;
  logoText:string;
  open: boolean;
  color:string;
}

interface LinkItemType {
  color:string;
  item:RouteType;
  classes:Record<string, string>;
}

function activeRoute(routeName:string) {
  return window.location.href.indexOf(routeName) > -1;
}



const LinkItem = (props:LinkItemType)=>{
  const classes2 = useStyles2();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const { item, color, classes } = props;
  const { path, layout, icon, name, routes } = item;
  const ItemIcon = icon || Icon;
  let activePro = ' ';
  let listItemClasses;
  if (path === '/upgrade-to-pro') {
    activePro = `${classes.activePro  } `;
    listItemClasses = classNames({
      [` ${  classes[color]}`]: true
    });
  } else {
    listItemClasses = classNames({
      [` ${  classes[color]}`]: activeRoute(layout! + path!)
    });
  }

  if(routes){
    const index =  routes.findIndex(item2=>activeRoute(item2.layout! + item2.path!));    
    listItemClasses = classNames({
      [` ${  classes[color]}`]: index >=0
    });
  }

  const whiteFontClasses = classNames({
    [` ${  classes.whiteFont}`]: activeRoute(layout! + path!)
  });

  const listItem  = (
    <ListItem button className={classes.itemLink + listItemClasses}>
      {typeof icon === 'string' ? (
        <Icon
          className={classNames(classes.itemIcon, whiteFontClasses)}
        >
          {icon}
        </Icon>
      ) : (
        <ItemIcon
          className={classNames(classes.itemIcon, whiteFontClasses)}
        />
      )}
    
      <ListItemText
        primary={name}
        className={classNames(classes.itemText, whiteFontClasses)}
        disableTypography={true}
        
      />
    </ListItem>
  );

  if(layout) {
    return (
      <NavLink
        to={layout! + path!}
        className={activePro + classes.item}
        activeClassName="active"
        key={layout! + path!}
      >
        {listItem}
      </NavLink>
    );
  }


  //   listItemClasses = classNames({
  //     [` ${  classes[color]}`]: true
  //   });

  return  (
    <List component="nav" className={classes2.list}>
      <ListItem button onClick={handleClick} className={classNames(listItemClasses, classes2.listItem)}>
        {typeof icon === 'string' ? (
          <Icon
            className={classNames(classes.itemIcon, whiteFontClasses)}
          >
            {icon}
          </Icon>
        ) : (
          <ItemIcon
            className={classNames(classes.itemIcon, whiteFontClasses)}
          />
        )}
        <ListItemText
          primary={name}
          className={classNames(classes.itemText, whiteFontClasses)}
          disableTypography={true}
        />
        {open ? <ExpandLess className={classNames(classes.itemIcon, whiteFontClasses)} /> :
        <ExpandMore className={classNames(classes.itemIcon, whiteFontClasses)} />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {routes?.map(item=>(
          <NavLink
            to={item.layout! +item.path!}
            className={activePro + classes.item}
            activeClassName="active"
            key={layout! + path!}
          >
            <ListItem button className={classes2.nested}>

              <ListItemText
                primary={item.name}
                className={classNames(classes.itemText, whiteFontClasses)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>

        ))}
      
      </Collapse>
    
    </List>
  );
    
};


const Links = (props:RoutesType &{classes:Record<string, string>, color:string})=>{
  const { classes, routes, color } = props;
  return (
    <List className={classes.list}>
      {routes.map((item, key) => {
        if(item.layout){
          return (<LinkItem item={item as RouteType} key={item.name} classes={classes} color={color} />);
        }
        // return <Links {...props} routes={item}/>
        return (<LinkItem item={item as RouteType} key={item.name} classes={classes} color={color} />);
            
        
      })}
    </List>
  );
};

export default function Sidebar(props:SidebarType) {
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
 
  const { color, logo, image, logoText, routes } = props;


  const brand = (
    <div className={classes.logo}>
      <a
        href="./"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? 'left' : 'right'}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            <Links routes={routes} classes={classes} color={color} />
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: `url(${  image  })` }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? 'right' : 'left'}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}> 
            <Links routes={routes} classes={classes} color={color} />
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: `url(${  image  })` }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

