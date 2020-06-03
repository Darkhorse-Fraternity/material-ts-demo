/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle";
import { ModalProps } from "@material-ui/core";



const useStyles = makeStyles(styles as any);


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
    path:string;
    layout:string;
    icon:string |  typeof Icon;
    name:string
}

interface RoutesType {
    routes: (RouteType |RouteType[])[];
}

interface SidebarType extends RoutesType{
    rtlActive: boolean;
    handleDrawerToggle: ModalProps['onClose'];
    bgColor: "purple"| "blue"|"green"|"orange"| "red";
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
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

const LinkItem = (props:LinkItemType)=>{
    const {item,color,classes} = props;
    const {path,layout,icon,name} = item
    let activePro = " ";
    let listItemClasses;
    if (path === "/upgrade-to-pro") {
      activePro = classes.activePro + " ";
      listItemClasses = classNames({
        [" " + classes[color]]: true
      });
    } else {
      listItemClasses = classNames({
        [" " + classes[color]]: activeRoute(layout + path)
      });
    }
    const whiteFontClasses = classNames({
      [" " + classes.whiteFont]: activeRoute(layout + path)
    });
    return (
      <NavLink
        to={layout + path}
        className={activePro + classes.item}
        activeClassName="active"
        key={layout + path}
      >
        <ListItem button className={classes.itemLink + listItemClasses}>
          {typeof icon === "string" ? (
            <Icon
              className={classNames(classes.itemIcon, whiteFontClasses)}
            >
              {icon}
            </Icon>
          ) : (
            <item.icon
              className={classNames(classes.itemIcon, whiteFontClasses)}
            />
          )}
          <ListItemText
            primary={name}
            className={classNames(classes.itemText, whiteFontClasses)}
            disableTypography={true}
          />
        </ListItem>
      </NavLink>
    );
}


const Links = (props:RoutesType &{classes:Record<string, string>,color:string})=>{
    const {classes,routes,color} = props;
    return (
        <List className={classes.list}>
          {routes.map((item, key) => {
            if(!Array.isArray(item)){
                return (<LinkItem item={item as RouteType} key={key} classes={classes} color={color} />)
            }else {
                // return <Links {...props} routes={item}/>
                return <div key={key}/>
            }
        
          })}
        </List>
      );
}

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
          anchor={props.rtlActive ? "left" : "right"}
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
            <Links routes={routes} classes={classes} color={color}/>
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
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
            <Links routes={routes} classes={classes} color={color}/>
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

