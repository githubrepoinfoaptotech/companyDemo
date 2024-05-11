import { Drawer, IconButton, List } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import {  ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import candidates from '../../../images/graduated.png'

import useStyles from "../../../components/Sidebar/styles";
import SidebarLink from "./components/SidebarLink/SidebarLink";

import { toggleSidebar, useLayoutDispatch, useLayoutState } from "../../../context/LayoutContext";

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();
 
 
const share =[
  {id: 0, label: "Candidates", type: "title", link: "#", view: true, icon: <Tooltip title="Candidates" placement="right"><IconButton> <img src={candidates} alt="candidates" className={classNames(classes.Icon3)}/></IconButton></Tooltip> },
]

const search =[
  {id: 0, label: "Search", type: "title", link: "#", view: true, icon: <Tooltip title="Search" placement="right"><IconButton> <img src={candidates} alt="candidates" className={classNames(classes.Icon3)}/></IconButton></Tooltip> },
]

          // global
          var {isSidebarOpened} = useLayoutState();
          var layoutDispatch = useLayoutDispatch();
          var [isPermanent, setPermanent] = useState(true);

          useEffect(function () {
            window.addEventListener("resize", handleWindowWidthChange);
          handleWindowWidthChange();
          return function cleanup() {
            window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

          return (

          <Drawer
            variant={isPermanent ? "permanent" : "temporary"}
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: isSidebarOpened,
              [classes.drawerClose]: !isSidebarOpened,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: isSidebarOpened,
                [classes.drawerClose]: !isSidebarOpened,
              }),
            }}
            open={isSidebarOpened}
            onClose={() => toggleSidebar(layoutDispatch)}
           >
             <div className={classes.mobileBackButton}>
              <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
                <ArrowBackIcon
                  classes={{
                    root: classNames(classes.headerIcon, classes.headerIconCollapse),
                  }}
                />
              </IconButton>
            </div>
            <List className={classes.sidebarList}>
              <>
              { localStorage.getItem('test') !== "test@gmail.com"? share.map(link => (
                  <SidebarLink
                    key={link.id}
                    location={location}
                    isSidebarOpened={isSidebarOpened}
                    {...link}
                  />
                
                )) :
                
                search.map(link => (
                  <SidebarLink
                    key={link.id}
                    location={location}
                    isSidebarOpened={isSidebarOpened}
                    {...link}
                  />
                
                ))
                }
              </>
            </List>
          </Drawer>
          );

          // ##################################################################
      function handleWindowWidthChange() {
      var windowWidth = window.innerWidth;
      // var breakpointWidth = theme.breakpoints.values.md
      var breakpointWidth = theme.breakpoints.values.sm 
      var isSmallScreen = windowWidth < breakpointWidth

      if (isSmallScreen && isPermanent) {
      setPermanent(false);
      } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
      }
      }
      }

export default withRouter(Sidebar);
