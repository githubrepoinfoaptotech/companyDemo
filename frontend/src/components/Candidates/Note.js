import React, { useState } from "react";
import { Grid, Button, List, Box, TextField, FormControl, FormControlLabel, withStyles, Checkbox, InputLabel, Typography, } from "@material-ui/core";
import useStyles from "../../themes/style.js";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CloseIcon from '@material-ui/icons/Close';
import { toast } from "react-toastify";
import moment from 'moment';
import axios from "axios";
import Notification from "../Notification/Notification.js";
import NoteAvatar from "../../images/notes_avatar.svg"


const GreenCheckbox = withStyles({
  root: {
    color: "#cbdefc",
    '&$checked': {
      color: "#d8efff",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const positions = [toast.POSITION.TOP_RIGHT];

export default function Add(props) {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  var [notificationsPosition] = useState(2);
  const [candidatesNote, setCandidatesNote] = useState(props.candidatesNote);
  var [errorToastId, setErrorToastId] = useState(null);
  function handleNotificationCall(notificationType, message) {
    var componentProps;

    if (errorToastId && notificationType === "error") return;

    switch (notificationType) {
      case "info":
        componentProps = {
          type: "feedback",
          message: message,
          variant: "contained",
          color: "primary",
        };
        break;
      case "error":
        componentProps = {
          type: "message",
          message: message,
          variant: "contained",
          color: "secondary",
        };
        break;
      default:
        componentProps = {
          type: "shipped",
          message: message,
          variant: "contained",
          color: "success",
        };
    }

    var toastId = sendNotification(componentProps, {
      type: notificationType,
      position: positions[notificationsPosition],
      progressClassName: classes.progress,
      onClose: notificationType === "error" && (() => setErrorToastId(null)),
      className: classes.notification,
    });

    if (notificationType === "error") setErrorToastId(toastId);
  }

  function sendNotification(componentProps, options) {
    return toast(
      <Notification
        {...componentProps}
        className={classes.notificationComponent}
      />,
      options,
    );
  }


  const handleChange = (index) => (event) => {
    const updatedNotes = candidatesNote.map((item, idx) => {
      if (idx === index) {
        return { ...item, approve: event.target.checked, approver: {firstName: "me", lastName: ""} };
      }
      return item;
    });
    setCandidatesNote(updatedNotes);
    if (!candidatesNote[index].approve) {
      handleSendApprove(candidatesNote[index].id);
    }
  };

  const handleSendApprove = async (id) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER}CC/approveNotes`,
        data: { 
          id: id,
          approve: true
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      if (response.data.status === true) {
        handleNotificationCall('success', response.data.message);
      } else {
        handleNotificationCall('error', response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={{ width: '100%' }} role="presentation"  >
        <List>
          <Card className={classes.root} >
            <CardHeader>
              <Grid container direction="row" spacing={1} className={classes.drawerHeader}>

                <Typography variant="subtitle1"> Notes </Typography>

                <Grid className={classes.drawerClose}>

                  <CloseIcon className={classes.closeBtn} size="14px" onClick={props.toggleDrawer("right", false)} />

                </Grid>


              </Grid>


            </CardHeader>
            <form onSubmit={props.noteSubmit(props.handleAddNotes)}>
              <CardContent>
                <Grid className={classes.noteMsgContainer}>
                  {candidatesNote.map((item, index) => {
                    return [
                      <div className="msg right-msg" key={index}>
                        <div
                          className="msg-img"
                          style={{backgroundImage: "url(../../images/notes_avatar.svg)"}}
                        >
                          <img src={NoteAvatar} width="100%" alt="note_avatar_image"/>
                        </div>

                        <div className={`${item.approve ? 'msg-bubble' : 'message-buuble'}`} data-approver={ item.approve ? ("Approved by " + item.approver?.firstName + " " + item.approver?.lastName):""}>
                          <div className="msg-info">
                            <div className="msg-info-name">{item.recruiter?.firstName + " " + item.recruiter?.lastName} </div>
                            <div className="msg-info-time">{moment(item.createdAt).format('DD-MM-YYYY')}</div>
                          </div>

                          <div className="msg-text">
                            {item.message}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between',   position: "absolute", right: 0, bottom: 0, }}>
                            <FormControlLabel
                              control={
                                <GreenCheckbox
                                  checked={item.approve}
                                  onChange={handleChange(index)}
                                  name="checkedG"
                                  disabled={item.approve}
                                />
                              }
                              label=""
                            />
                            </div>
                        </div>
                      </div>
                    ]
                  })}
                      <>

                        {/* <Box bgcolor={index % 2 === 0 ? "#AED6F1" : "#ABEBC6"} className={classes.notemsgBox}>
                          <Grid>
                            <Typography> {item.message}  </Typography>
                            <Grid className={classes.drawerClose + " " + classes.noteName} >
                              <div
                                style={{ display: 'flex', justifyContent: 'space-between' }}
                              >
                                <FormControlLabel
                                  control={
                                    <GreenCheckbox
                                      checked={item.approve}
                                      onChange={handleChange(index)}
                                      name="checkedG"
                                      disabled={item.approve}
                                    />
                                  }
                                  label=""
                                />
                              </div>
                              <div>
                                <span> {item.recruiter?.firstName + " " + item.recruiter?.lastName} </span>
                                <span> {moment(item.createdAt).format('DD-MM-YYYY')}</span>
                              </div>
                            </Grid>
                          </Grid>
                        </Box> */}
                      </>
                </Grid>
                <Grid container direction="row" spacing={1} className={classes.drawerClose}>
                  <Grid item xs={12} className={classes.NoteTop}>
                    <InputLabel shrink htmlFor="email"> Messaage </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField multiline rows={4} InputProps={{ disableUnderline: true }} classes={{ root: classes.customTextField }} size="small" placeholder='Enter Message' readOnly="true" name="message"
                        {...props.noteCandidates('message')} error={props.noteErrors.message ? true : false} />
                      <Typography variant="inherit" color="error">
                        {props.noteErrors.email?.message}
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className={classes.drawerClose}>
                  </Grid>
                </Grid>
              </CardContent>

              <CardActions>
                <Grid container direction="row" spacing={2} className={classes.drawerFooter}>
                  <Button variant="contained" size="small" color="primary" type='submit' >  Add  </Button>
                  <Button variant="contained" size="small" color="secondary" onClick={props.toggleDrawer("right", false)}>  Close  </Button>
                </Grid>
              </CardActions>
            </form>

          </Card>

         
        </List>
      </Box> </>
  );
}
