import React, { useState } from "react";
import { ClickAwayListener, MenuItem, Popper } from "@material-ui/core";
import useStyles from "../../themes/style.js";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Tooltip from "@material-ui/core/Tooltip";
import ViewIcon from "@material-ui/icons/Visibility";

const ProjectAction = (props) => {
  const classes = useStyles();
  const resetCollapse = () =>{
    if(props.viewProjOpen.orgRecList || props.viewProjOpen.hireLevelList){
        props.setViewProjOpen({
            orgRecList:false,
            hireLevelList: false
        })
    }
    if (props.collapseopen.orgRecList || props.collapseopen.hireLevelList) {
        props.setCollapseopen({
            orgRecList:false,
            hireLevelList: false
        })
    }
  }

  const handleClick = (e) => {
    e.stopPropagation();
    props.handleMenuClick(props.index, e);
  };

  return (
    <>
      <MoreVertIcon
        key={props.index}
        className={classes.actions}
        onClick={handleClick}
        style={{cursor:"pointer"}}
      />
      <div className={classes.actionBtnPosition}>
        <Popper open={props.index === props.activeIndex} anchorEl={props.anchorEl} className={classes.actionBtnZIndex}>
          <ClickAwayListener
            onClickAway={(e) => {
              props.handleMenuClick(props.index, null);
            }}
          >
            <div className={classes.actiondrop}>
              <MenuItem
                onClick={(e) => {
                  props.handleMenuClick(props.index, null);
                    props.setDisplayAdd(false);
                    props.handleShow(props.item.id, "EDIT");
                }}
              >
                <Tooltip
                  title="Edit Project"
                  placement="right"
                  aria-label="edit"
                >
                  <EditIcon className={classes.toolIcon} />
                </Tooltip>
              </MenuItem>

              <MenuItem
                onClick={(e) => {
                  props.handleMenuClick(props.index, null);
                  props.handleShow(props.item.id, "APPROVAL");
                  resetCollapse()
                }}
              >
                <Tooltip
                  title="Project Approval"
                  placement="right"
                  aria-label="view"
                >
                  <ThumbUpIcon className={classes.toolIcon} />
                </Tooltip>
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  props.handleMenuClick(props.index, null);
                  props.handleShow(props.item.id, "VIEW");
                  resetCollapse()
                }}
              >
                <Tooltip
                  title="View Project"
                  placement="right"
                  aria-label="view"
                >
                  <ViewIcon className={classes.toolIcon} />
                </Tooltip>
              </MenuItem>

              {/* <MenuItem
                onClick={(e) => {
                  setMenu(false);
                  props.handleUse(props.item.candidateDetail?.mobile);
                }}
              >
                <Tooltip
                  title="Approve Project"
                  placement="right"
                  aria-label="Reuse Candidate"
                >
                  <PersonAddIcon className={classes.toolIcon} />
                </Tooltip>
              </MenuItem> */}
            </div>
          </ClickAwayListener>
        </Popper>
      </div>
    </>
  );
};

export default ProjectAction;
