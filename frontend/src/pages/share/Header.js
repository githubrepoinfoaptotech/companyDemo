import React, {useState} from "react";
import { IconButton, Toolbar,  AppBar, Typography,ClickAwayListener,  ListItem,
  ListItemAvatar,
  ListItemText, } from "@material-ui/core";
import useStyles from "../../themes/style.js"; 
import {  Menu as MenuIcon } from "@material-ui/icons";
import classNames from "classnames";
import {
  toggleSidebar,
  useLayoutDispatch,
  useLayoutState,
} from "../../context/LayoutContext";
import Avatar from "@material-ui/core/Avatar";
import { signOut, useUserDispatch } from "../../context/UserContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

 import "react-toastify/dist/ReactToastify.css";

export default function Header(props) {
   var classes = useStyles();
  var layoutDispatch = useLayoutDispatch();
  var layoutState = useLayoutState();
  var [profileMenu, setProfileMenu] = useState(null);
  var userDispatch = useUserDispatch();

  return (
    <>
    <AppBar position="fixed" className={layoutState.isSidebarOpened ? classes.appBar1 : classes.appBar}>
        <Toolbar className={classes.toolbar }>
          <IconButton
            color="inherit"
            onClick={() => toggleSidebar(layoutDispatch)}
            className={classNames(
              classes.headerMenuButtonSandwich,
              classes.headerMenuButtonCollapse,
            )}
          >
            {layoutState.isSidebarOpened ? (
              // <ArrowBackIcon
              //       classes={{
              //         root: classNames(
              //           classes.headerIcon,
              //           classes.headerIconCollapse,
              //         ),
              //       }}
              //     />

              <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
            ) : (
                  <MenuIcon
                    classes={{
                      root: classNames(
                        classes.headerIcon,
                        classes.headerIconCollapse,
                      ),
                    }}
                  />
            )}
          </IconButton>

          <div className={layoutState.isSidebarOpened ? classes.headerTopOpen :  classes.headerTop}> 
              <div   className={layoutState.isSidebarOpened? classes.headerWidth: classes.headerWidth1 +", "+ classes.headerGap}>
                <Typography variant="h5" className={classes.title}>
                   <span className="refo-font">refo</span>
                </Typography>
             

                {localStorage.getItem('test') === "test@gmail.com"?
                <div className={classes.grow}>

 
 

<ClickAwayListener onClickAway={(e) => setProfileMenu(false)}>
<div  >
<IconButton
aria-haspopup="true"
color="inherit"
className={classes.headerMenuButton }
aria-controls="profile-menu"
onClick={(e) => setProfileMenu(e.currentTarget)}
>
<Avatar
alt="Profile"
 
className={classes.profileButton}
/>
</IconButton>

{profileMenu ? (


<div className={classes.dropdown}> 

<ListItem className={classes.profileHeader}>
<ListItemAvatar>
<Avatar  alt={ "Test" }
sizes="medium"
 
className={classes.chipAvatar}
/>
</ListItemAvatar>
<ListItemText
 primary= {  <> <Typography>   Test </Typography> 
          
            </>
          }
  
/>
 
</ListItem>



<ListItem className={classes.profileMenuIcon}   onClick={() => signOut(userDispatch, props.history)}   >
 <ExitToAppIcon  /> Logout
</ListItem>


</div>
) : null}
</div>
</ClickAwayListener>



</div>
 :""}
         
              </div> 
          </div> 
        </Toolbar>  
      </AppBar> 
    </>
  );
}
