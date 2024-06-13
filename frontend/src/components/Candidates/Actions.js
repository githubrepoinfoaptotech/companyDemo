import React, { useState } from "react";
import { ClickAwayListener, MenuItem, Popper } from "@material-ui/core";
import useStyles from "../../themes/style.js";
import UndoIcon from "@material-ui/icons/Undo";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import EventNoteIcon from "@material-ui/icons/EventNote";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import Tooltip from "@material-ui/core/Tooltip";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { jwtDecode } from "jwt-decode";

const Actions = (props) => {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

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
      />
      <div className={classes.actionBtnPosition}>
        <Popper open={props.index === props.activeIndex} anchorEl={props.anchorEl} className={classes.actionBtnZIndex}>
          <ClickAwayListener onClickAway={() => props.handleMenuClick(props.index, null)}>
            <div className={classes.actiondrop}>

              <MenuItem onClick={(e) => {
                props.handleMenuClick(props.index, null);
                props.setPhoneValidation(false);
                props.editreset();
                props.setFile([]);
                props.setDocFile([]);
                props.setProfile([]);
                props.setAssessment([]);
                props.handleShow(props.item.id, "EDIT");
              }} >

                <Tooltip title="Edit Candidate" placement="right" aria-label="edit">
                  <EditIcon
                    className={classes.toolIcon}
                  />
                </Tooltip>

              </MenuItem>

              {/* 
  <MenuItem    onClick={(e) => {
      props.handleMenuClick(props.index, null);
      props.handleShow(props.item.id, "VIEW");
    }}   >
<Tooltip title="View Candidate" placement="right" aria-label="view">
  <ViewIcon
    className={classes.toolIcon}
  
  />
</Tooltip>
</MenuItem> */}



              {decode.role === "ADMIN" || decode.role === "CLIENTCOORDINATOR" ? (
                <>
                  {props.item.statusCode !== 301 ? (
                    <MenuItem onClick={(e) => {
                      props.handleMenuClick(props.index, null);
                      props.handleReverseOpen();
                      props.setCandidateList({
                        ...props.candidateList,

                        id: props.item.id,
                      });
                    }}    >
                      <Tooltip
                        title="Undo Candidate"
                        placement="right"
                        aria-label="undo"
                      >
                        <UndoIcon
                          className={classes.toolIconDelete}

                        />
                      </Tooltip>{" "}
                    </MenuItem>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}

              <MenuItem onClick={(e) => {
                props.handleMenuClick(props.index, null);
                props.handleShow(props.item.id, "NOTES");
                props.noteReset();
              }}    >
                <Tooltip
                  title="View Candidate Notes"
                  placement="right"
                  aria-label="view"
                >
                  <EventNoteIcon
                    className={classes.toolIcon}

                  />
                </Tooltip>
              </MenuItem>

              {props.item.free === "NO" ? (
                <>
                  <MenuItem onClick={(e) => {
                    props.handleMenuClick(props.index, null);
                    props.handleMessageOpen();
                    props.setCandidateList({
                      ...props.candidateList,

                      id: props.item.id,
                      name:
                        props.item.candidateDetail?.firstName +
                        " " +
                        props.item.candidateDetail?.lastName,
                      mobile: props.item.candidateDetail?.mobile,
                      message:
                        "Hi " +
                        props.item.candidateDetail?.firstName +
                        ", Can we chat now or sometime today about job opening. we are already discussing. " +
                        props.item.recruiter.firstName +
                        " " +
                        props.item.recruiter.lastName +
                        ", " +
                        props.item.recruiter.mobile +
                        ", " +
                        localStorage.getItem('companyName') +
                        ". Always reply by clicking back arrow button/right swipe only.",
                      rec_name:
                        props.item.recruiter.firstName +
                        " " +
                        props.item.recruiter.lastName,
                      rec_mobile_no: props.item.recruiter.mobile,
                    });
                  }}    >
                    <Tooltip
                      title="Initiate Message"
                      placement="right"
                      aria-label="message"
                    >
                      <InsertCommentIcon
                        className={classes.toolIcon}

                      />
                    </Tooltip>
                  </MenuItem>
                </>
              ) : (
                ""
              )}


              <MenuItem onClick={(e) => { props.handleMenuClick(props.index, null); props.handleUse(props.item.candidateDetail?.mobile) }}    >
                <Tooltip
                  title="Reuse Candidate"
                  placement="right"
                  aria-label="Reuse Candidate"
                >
                  <PersonAddIcon
                    className={classes.toolIcon}

                  />
                </Tooltip>
              </MenuItem>


              {props.item.statusCode === 301 ||
                props.item.statusCode === 303 ||
                props.item.statusCode === 3031 ||
                props.item.statusCode === 304 ||
                props.item.statusCode === 3041 ||
                props.item.statusCode === 305 ||
                props.item.statusCode === 306 ||
                props.item.statusCode === 307 ? (
                <MenuItem
                  onClick={(e) => {
                    props.handleMenuClick(props.index, null);
                    props.handleDropOpen();
                    props.setCandidateList({
                      ...props.candidateList,

                      id: props.item.id,
                    });
                  }}
                >
                  <Tooltip
                    title="Drop Candidate"
                    placement="right"
                    aria-label="Drop Candidate"
                  >
                    <DeleteIcon
                      className={classes.toolIconDelete}

                    />
                  </Tooltip>
                </MenuItem>
              ) : (
                ""
              )}
            </div>
          </ClickAwayListener>
        </Popper>
      </div>

    </>
  );
};

export default Actions;
