import React, { useState } from "react";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Dot from "../Dot";
import {
  toggleSidebar,
  useLayoutDispatch,
} from "../../../../context/LayoutContext";

export default function SidebarLink({
  view,
  link,
  icon,
  label,
  children,
  location,
  isSidebarOpened,
  nested,
  type,
  subMenu,
}) {
  var classes = useStyles();
  
  var [isOpen, setIsOpen] = useState(false);
  var layoutDispatch = useLayoutDispatch();
  var isLinkActive =
    link &&
    (location.pathname === link || location.pathname.indexOf(link) !== -1);

  const history = useHistory();
  const [report, setReport] = useState(false);

  const handleReport = (e) => {
    setReport(e.currentTarget);
  };

  if (type === "reports" || type === "settings") {
    return (
      <>
        <ClickAwayListener onClickAway={(e) => setReport(false)}>
          <div className={classes.root}>
            <ListItem
              button
              className={classes.link}
              classes={{
                root: classnames(classes.linkRoot, {
                  [classes.linkActive]: isLinkActive && !nested,
                  [classes.linkNested]: nested,
                }),
              }}
              onClick={handleReport}
              disableRipple
            >
              <ListItemIcon
                className={classnames(classes.linkIcon, {
                  [classes.linkIconActive]: isLinkActive,
                })}
              >
                {icon ? icon : ""}
              </ListItemIcon>
              {isSidebarOpened ? (
                <ListItemText
                  classes={{
                    primary: classnames(classes.linkText, {
                      [classes.linkTextActive]: isLinkActive,
                      [classes.linkTextHidden]: !isSidebarOpened,
                    }),
                  }}
                  primary={label}
                />
              ) : (
                ""
              )}
            </ListItem>

            {report ? (
              <div
                className={
                  type === "reports"
                    ? classes.sidedropdown
                    : classes.sidedropdown1
                }
              >
                {subMenu.map((item) => {
                  return [
                    <ListItem
                      button
                      classes={{
                        root: classnames(classes.sidedropdownList),
                      }}
                      selected={location.pathname === item.link}
                      onClick={(e) => {
                        toggleCollapse(e, item.link);
                      }}
                      disableRipple
                    >
                      <ListItemIcon
                        className={classnames(classes.subMenulinkIcon, {})}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        classes={{
                          primary: classnames(classes.linkText, {}),
                        }}
                        primary={item.label}
                      />
                    </ListItem>,
                  ];
                })}
              </div>
            ) : (
              false
            )}
          </div>
        </ClickAwayListener>
      </>
    );
  }

  if (type === "divider") return <Divider className={classes.divider} />;
  if (link && link.includes("http")) {
    return (
      <ListItem
        button
        className={classes.link}
        classes={{
          root: classnames(classes.linkRoot, {
            [classes.linkActive]: isLinkActive && !nested,
            [classes.linkNested]: nested,
          }),
        }}
        disableRipple
      >
        <a className={classes.externalLink} href={link}>
          <ListItemIcon
            className={classnames(classes.linkIcon, {
              [classes.linkIconActive]: isLinkActive,
            })}
          >
            {nested ? <Dot color={isLinkActive && "primary"} /> : icon}
          </ListItemIcon>
          {isSidebarOpened ? (
            <ListItemText
              classes={{
                primary: classnames(classes.linkText, {
                  [classes.linkTextActive]: isLinkActive,
                  [classes.linkTextHidden]: !isSidebarOpened,
                }),
              }}
              primary={label}
            />
          ) : (
            ""
          )}
        </a>
      </ListItem>
    );
  }
  if (!children)
    return view === true ? (
      <>
        <ListItem
          button
          component={link && Link}
          to={link}
          style={{ pointerEvents: type === "title" ? "none" : "" }}
          className={classes.link}
          classes={{
            root: classnames(classes.linkRoot, {
              [classes.linkActive]: isLinkActive && !nested,
              [classes.linkNested]: nested,
            }),
          }}
          onClick={(e) => {
            toggleCollapse(e, link);
          }}
          disableRipple
        >
          <ListItemIcon
            className={classnames(classes.linkIcon, {
              [classes.linkIconActive]: isLinkActive,
            })}
          >
            {nested ? <Dot color={isLinkActive && "primary"} /> : icon}
          </ListItemIcon>
          {isSidebarOpened ? (
            <ListItemText
              classes={{
                primary: classnames(classes.linkText, {
                  [classes.linkTextActive]: isLinkActive,
                  [classes.linkTextHidden]: !isSidebarOpened,
                }),
              }}
              primary={label}
            />
          ) : (
            ""
          )}
        </ListItem>
      </>
    ) : (
      ""
    );

  return view === true ? (
    <>
      <ListItem
        button
        component={link && Link}
        onClick={(e) => {
          toggleCollapse(e, link);
        }}
        className={classes.link}
        to={link}
        disableRipple
        activeClassName=".activeness"
        selected={location.pathname === link}
        style={{ pointerEvents: type === "title" ? "none" : "" }}
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {icon}
        </ListItemIcon>

        {isSidebarOpened ? (
          <ListItemText
            classes={{
              primary: classnames(classes.linkText, {
                [classes.linkTextActive]: isLinkActive,
                [classes.linkTextHidden]: !isSidebarOpened,
              }),
            }}
            primary={label}
          />
        ) : (
          ""
        )}
      </ListItem>
      {children && (
        <Collapse
          in={isOpen && isSidebarOpened}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}
        >
          <List component="div" disablePadding>
            {children.map((childrenLink) => (
              <SidebarLink
                key={childrenLink && childrenLink.link}
                location={location}
                isSidebarOpened={isSidebarOpened}
                classes={classes}
                nested
                {...childrenLink}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  ) : (
    ""
  );

  // ###########################################################

  function toggleCollapse(e, link) {
    sessionStorage.setItem("recruitmentId", "");
    history.push(link);
    setReport(false);
    if (isSidebarOpened) {
      toggleSidebar(layoutDispatch);
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  }
}
