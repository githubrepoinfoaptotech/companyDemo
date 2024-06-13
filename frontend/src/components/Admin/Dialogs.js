import { React, useRef } from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
} from "@material-ui/core";
import moment from "moment";
import {jwtDecode} from "jwt-decode";
import useStyles from "../../themes/style.js";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
import FinalInterview from '../../images/icon/FinalInterview.png'; 
import DocumentCollected from '../../images/icon/DocumentCollected.png'; 
import ScheduleInterview from '../../images/icon/ScheduleInterview.png';
 
const Dialogs = (props) => { 
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const messageRef = useRef();
  const classes = useStyles(); 
  const maxDate = moment().format("YYYY-MM-DD"); 

  return (
    <>
      <Dialog
        onClose={props.handleStatusClose}
        aria-labelledby="dialog-title"
        open={props.stausOpen}
        width="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
      <DialogTitle className={classes.digTitle}>
        <div className={classes.center}>
          <div className={classes.drawerClose}> 
            {props.view !== "undefined" && props.view !== "Offer Declined" ? 
              
                <ArrowBackIcon
                  className={classes.digClose}
                  onClick={(e) => {
                    props.setView("undefined");
                  }}
                />
              
            : "" }
          </div>
          <Typography variant="subtitle2" className={classes.digColor+" "+classes.digCenter }  >
                
            { props.shortList.statusCode === 301 ? "Has the profile been processed"
            : props.shortList.statusCode === 3081 ? "Can you confirm if the candidate has indeed joined?"
              : props.shortList.statusCode === 309  ? "Invoice details"
              : props.shortList.statusCode === 312 ? "Are you certain you want to transfer this candidate to a credit note?"
              : "Send WhatsApp message"}
          </Typography>
          <div className={classes.drawerClose} >
                    <CloseIcon
                      className={classes.digClose}
                      size="14px"
                      onClick={props.handleStatusClose}
                    />
          </div>
        </div>
      </DialogTitle>
        <DialogContent className={classes.chatListBackGround}>

          { props.shortList.statusCode === 303 ? 
<>
    {props.shortList.free === "NO" ? 
                <Typography>
                  Dear <b>{props.shortList.cand_name}, </b> <br /> <br />
                  CONGRATS! Your profile has been shortlisted by our Client.
                  Your interview is going to be scheduled. Please reply to this message with this Job Id 
                  <b>{props.shortList.job_id}</b> to confirm your available date and time <br />
                  <br />
                  <b>{props.shortList.rec_name}</b>, <br />
                  <b>
                    {props.shortList.rec_mobile_no}, {localStorage.getItem('companyName')}
                  </b>
                  , Recruiter
                </Typography>

             
               : 
                <TextField
                  size="small"
                  classes={{ root: classes.customTextField }}
                  InputProps={{ disableUnderline: true }}
                  multiline
                  inputRef={messageRef}
                  rows={5}
                  defaultValue={`Dear ${props.shortList.cand_name},\n\nCongratulations! Our client has shortlisted your profile. The scheduling of your interview needs to be arranged. Kindly confirm your availability by responding to this message regarding Job ID ${props.shortList.job_id} (${props.shortList.job_name}). \n \nThank you and best regards,\n${localStorage.getItem('firstName') +"" + decode.lastName} \n${localStorage.getItem('mobile')? "+91 "+localStorage.getItem('mobile'):"" } \nRecruiter \n${localStorage.getItem('companyName')}`}
                  variant="outlined"
                />
              }

</>

           : props.shortList.statusCode === 3031 ? 
            <>
              {props.shortList.free === "NO" ? 
                <Typography>
                  Dear <b>{props.shortList.cand_name}, </b> <br /> <br />
                  CONGRATS! Your profile has been shortlisted after an interview by our Client for further level. Your interview is going to be scheduled. Please reply to this message with this Job Id {" "}
                  <b>{props.shortList.job_id}</b> to confirm your available date and time. <br />
                  <br />
                  <b>{props.shortList.rec_name}</b>, <br />
                  <b>
                    {props.shortList.rec_mobile_no}, {localStorage.getItem('companyName')}
                  </b>
                  , Recruiter
                </Typography>
               : 
                <TextField
                  size="small"
                  classes={{ root: classes.customTextField }}
                  InputProps={{ disableUnderline: true }}
                  multiline
                  inputRef={messageRef}
                  rows={5}
                  defaultValue={`Dear ${props.shortList.cand_name},\n\nCongratulations! Your interview has been confirmed for the position of ${props.shortList.job_name} (Job ID ${props.shortList.job_id}) on DD/MM/YYYY at TIME. We kindly ask you to acknowledge this schedule.  \n \nThank you and best regards,\n${localStorage.getItem('firstName') +"" + decode.lastName} \n${localStorage.getItem('mobile')? "+91 "+localStorage.getItem('mobile'):"" } \nRecruiter \n${localStorage.getItem('companyName')}`}
                  variant="outlined"
                />
            }
            </>
          : props.shortList.statusCode === 304 ? 
            <>
              {props.view === "null" || props.view === "undefined" ? 
                <>
                <div className={classes.sendInterview}>
                  <div className={classes.sendInterviewContainer}>
                    <Button
                    startIcon={<><img  className={classes.w15} src={ScheduleInterview} alt="Schedule Interview" /> </>}
                    variant="contained"
                    size="small"
                    className={classes.dialogSIBtn}
                    onClick={(e) => {
                            props.setView("Schedule Another Interview");
                          }}
                    >
                    Schedule Another Interview
                    </Button>

                    <Button
                    startIcon={<><img  className={classes.w15}src={FinalInterview} alt="Final Interview Scheduled" /> </>}
                    variant="contained"
                    size="small"
                    className={classes.dialogFISBtn}
                    onClick={(e) => {
                            props.setView("Schedule Final Interview");
                          }}
                    >
                    Schedule Final Interview
                    </Button>

                    <Button
                    startIcon={<><img  className={classes.w15} src={DocumentCollected} alt="Document Collected" /></>}
                    variant="contained"
                    size="small"
                    className={classes.dialogDCBtn}
                    onClick={(e) => {
                            props.setView("Send Document");
                          }}
                    >
                    Send Document
                    </Button>
                  </div>
                </div>
 
                </>
               : ""}

              {props.view === "Schedule Another Interview" ? 
                props.shortList.free === "NO" ? 
                  <Typography>
                  Dear <b>{props.shortList.cand_name}, </b> <br /> <br />
                  CONGRATS! Your profile has been shortlisted after an interview by our Client for further level. Your interview is going to be scheduled. Please reply to this message with this Job Id {" "}
                  <b>{props.shortList.job_id}</b> to confirm your available date and time. <br />
                  <br />
                  <b>{props.shortList.rec_name}</b>, <br />
                  <b>
                    {props.shortList.rec_mobile_no}, {localStorage.getItem('companyName')}
                  </b>
                  , Recruiter
                </Typography>
                 : 
                  <TextField
                  size="small"
                  classes={{ root: classes.customTextField }}
                  InputProps={{ disableUnderline: true }}
                  multiline
                  inputRef={messageRef}
                  rows={5}
                 defaultValue={`Dear ${props.shortList.cand_name},\n\nCongratulations! Your profile has been selected for the next stage of the interview process. Please confirm your availability for the Job ID ${props.shortList.job_id} (${props.shortList.job_name}) by providing us with your preferred date and time.\n \nThank you and best regards,\n${localStorage.getItem('firstName') +"" + decode.lastName} \n${localStorage.getItem('mobile')? "+91 "+localStorage.getItem('mobile'):"" } \nRecruiter \n${localStorage.getItem('companyName')}`}
  
                variant="outlined"
                />
                
             : props.view === "Schedule Final Interview" ? 
                props.shortList.free === "NO" ? 
                  <Typography>
                    Dear <b>{props.shortList.cand_name}, </b> <br /> <br />
                    CONGRATS! Your profile has been shortlisted for final level of interview by our Client. Your interview is going to be scheduled. Please reply to this message with this Job Id{" "}
                    <b>{props.shortList.job_id}</b> to confirm your available date and time. <br />
                    <br />
                    <b>{props.shortList.rec_name}</b>, <br />
                    <b>
                      {props.shortList.rec_mobile_no}, {localStorage.getItem('companyName')}
                    </b>
                    , Recruiter
                  </Typography>
                 : 
                  <TextField
                    size="small"
                    classes={{ root: classes.customTextField }}
                    InputProps={{ disableUnderline: true }}
                    multiline
                    rows={5}
                    inputRef={messageRef}
                    defaultValue={`Dear ${props.shortList.cand_name},\n\nCongratulations! Your profile is shortlisted for the final level of interview! We kindly ask you to confirm your availability by providing your preferred date and time for the Job ID ${props.shortList.job_id} (${props.shortList.job_name}).\n \nThank you and best regards,\n${localStorage.getItem('firstName') +"" + decode.lastName} \n${localStorage.getItem('mobile')? "+91 "+localStorage.getItem('mobile'):"" } \nRecruiter \n${localStorage.getItem('companyName')}`}
                    variant="outlined"
                  />
                
               : props.view === "Send Document" ? 
                props.shortList.free === "NO" ? 
                  <Typography>
                    Dear <b>{props.shortList.cand_name}, </b> <br /> <br />
                    CONGRATS! Your profile has been selected after the interview process by our Client. We would request you to share the documents for package discussion to proceed further. <br />
                    <br />
                    <b>{props.shortList.rec_name}</b>, <br />
                    <b>
                      {props.shortList.rec_mobile_no}, {localStorage.getItem('companyName')}
                    </b>
                    , Recruiter
                  </Typography>
                 : 
                  <TextField
                    size="small"
                    classes={{ root: classes.customTextField }}
                    InputProps={{ disableUnderline: true }}
                    multiline
                    rows={5}
                    inputRef={messageRef}
                    defaultValue={`Dear ${props.shortList.cand_name},\n\nCongratulations! Our client has shortlisted your profile and would like to initiate a discussion regarding the salary for the position of ${props.shortList.job_name} (Job ID ${props.shortList.job_id}).Therefore, we kindly ask you to provide the necessary employment-related documents.\n \nThank you and best regards,\n${localStorage.getItem('firstName') +"" + decode.lastName} \n${localStorage.getItem('mobile')? "+91 "+localStorage.getItem('mobile'):"" } \nRecruiter \n${localStorage.getItem('companyName')}`}
                    variant="outlined"
                  />
                
               : ""}
            </>
           : props.shortList.statusCode === 3041 ? 
            props.shortList.free === "NO" ? 
              <Typography>
                Dear <b>{props.shortList.cand_name}, </b> <br /> <br />
                Dear Six, CONGRATS! Your profile has been selected after the interview process by our Client. We would request you to share the documents for package discussion to proceed further. <br />
                <br />
                <b>{props.shortList.rec_name}</b>, <br />
                <b>
                  {props.shortList.rec_mobile_no}, {localStorage.getItem('companyName')}
                </b>
                , Recruiter
              </Typography>
             : 
              <TextField
                size="small"
                classes={{ root: classes.customTextField }}
                InputProps={{ disableUnderline: true }}
                multiline
                rows={5}
                inputRef={messageRef}
                defaultValue={`Dear ${props.shortList.cand_name},\n\nCongratulations! Our client has shortlisted your profile and would like to initiate a discussion regarding the salary for the position of ${props.shortList.job_name} (Job ID ${props.shortList.job_id}).Therefore, we kindly ask you to provide the necessary employment-related documents.\n \nThank you and best regards,\n${localStorage.getItem('firstName') +"" + decode.lastName} \n${localStorage.getItem('mobile')? "+91 "+localStorage.getItem('mobile'):"" } \nRecruiter \n${localStorage.getItem('companyName')}`}
                variant="outlined"
              />
            
           : props.shortList.statusCode === 305 ? 
            props.shortList.free === "NO" ? 
              <Typography>
                Dear <b>{props.shortList.cand_name}, </b> <br /> <br />
                CONGRATS! Your salary breakdown has been shared with you by our client. Please reply to this message with this Job Id{" "}
                <b>{props.shortList.job_id} </b> to confirm that you accept the salary breakdown so that the offer could be released.{" "}
                <br />
                <br />
                <b>{props.shortList.rec_name}</b>, <br />
                <b>
                  {props.shortList.rec_mobile_no}, {localStorage.getItem('companyName')}
                </b>
                , Recruiter
              </Typography>
             : 
              <TextField
                size="small"
                classes={{ root: classes.customTextField }}
                InputProps={{ disableUnderline: true }}
                multiline
                rows={5}
                inputRef={messageRef}
                defaultValue={`Dear ${props.shortList.cand_name},\n\nCongratulations! Our client has shortlisted your profile and would like to initiate a discussion regarding the salary for the position of ${props.shortList.job_name} (Job ID ${props.shortList.job_id}).Therefore, we kindly ask you to provide the necessary employment-related documents.\n \nThank you and best regards,\n${localStorage.getItem('firstName') +"" + decode.lastName} \n${localStorage.getItem('mobile')? "+91 "+localStorage.getItem('mobile'):"" } \nRecruiter \n${localStorage.getItem('companyName')}`}
                variant="outlined"
              />
            
           : props.shortList.statusCode === 307 ? 
             props.shortList.free === "NO" ? 
              <Typography>
                Dear <b>{props.shortList.cand_name}, </b> <br /> <br />
                CONGRATS! Your offer has been released by our Client. Please reply to this message with this Job Id  {" "}
                <b> {props.shortList.job_id}</b> to confirm that you accept the offer so that onboarding process can be initiated.
                <br />
                <br />
                <b>{props.shortList.rec_name}</b>, <br />
                <b>
                  {props.shortList.rec_mobile_no}, {localStorage.getItem('companyName')}
                </b>
                , Recruiter
              </Typography>
             : 
              <TextField
                size="small"
                classes={{ root: classes.customTextField }}
                InputProps={{ disableUnderline: true }}
                multiline
                rows={5}
                inputRef={messageRef}
                 defaultValue={`Dear ${props.shortList.cand_name},\n\nThe offer for the position of ${props.shortList.job_name} (Job ID ${props.shortList.job_id}) has been released by our client. To initiate the onboarding process, please reply to this message confirming your acceptance of the offer.\n \nThank you and best regards,\n${localStorage.getItem('firstName') +"" + decode.lastName} \n${localStorage.getItem('mobile')? "+91 "+localStorage.getItem('mobile'):"" } \nRecruiter \n${localStorage.getItem('companyName')}`}

                variant="outlined"
              />
            
           : props.shortList.statusCode === 3081 ? 
            <>
              <Grid
                container
                direction="row"
                spacing={2}
                className={classes.center +" "+ classes.p1020p}
                
              >
                <Grid item xs={6}>
                  <Typography>Date of Joining</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="date"
                    defaultValue={moment().format("YYYY-MM-DD")}
                    className={classes.textField}
                    inputRef={props.joiningRef}
                    inputProps={{ max: maxDate}}
                    InputLabelProps={{
                      reqired: true,
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </>
           : props.shortList.statusCode === 309 ? 
            <>
              <Grid container direction="row" spacing={2}  className={classes.p1020p}>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    spacing={1}
                    className={classes.center}
                  >
                    <Grid item xs={6}>
                      <Typography> Invoice Amount </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        size="small"
                        classes={{ root: classes.customTextField }}
                        type="number"
                        placeholder="Enter Invoice Amount"
                        {...props.invoiceCandidates("invoice")}
                        error={props.invoiceErrors.invoice ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {props.invoiceErrors.invoice?.message}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    spacing={1}
                    className={classes.center}
                  >
                    <Grid item xs={6}>
                      <Typography>Invoice Date</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        size="small"
                        classes={{ root: classes.customTextField }}
                        type="date"
                        inputProps={{ max: maxDate}}
                        defaultValue={moment().format("YYYY-MM-DD")}
                        className={classes.textField}
                        inputRef={props.invoiceRef}
                        InputLabelProps={{
                          reqired: true,
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          : "" }

          <div className={classes.sendWhatsapp}>
            {props.shortList.statusCode === 301 ? 

              <>
               <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={ props.handleDropReasonOpen}
                >
                  Dropped
                </Button>
               <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={ props.handleChangeMessageOpen }
                >
                  { decode.companyType === "COMPANY" ? "Submitted to Hiring Manager" : "Submitted to Client"  }
                </Button>
              </>
            
             :props.shortList.statusCode === 3081 ? 
              <>
             

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={(e) => {
                    props.joinedStatus();
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color='secondary'
                  onClick={props.handleStatusClose}
                >
                  No
                </Button>
              </>
             : props.shortList.statusCode === 309 ? 
              <>
              

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={props.invoiceSubmit(props.InvoicedStatus)}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color='secondary'
                  onClick={props.handleStatusClose}
                >
                  Close
                </Button>
              </>
             : props.shortList.statusCode === 312 ? 
              <>
             

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
              
                  onClick={ props.handleReasonOpen}
                >
                  Yes  
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={props.handleStatusClose}
                >
                  No
                </Button>
              </>
            : 
              <>
                {props.shortList.statusCode === 304 ? 
                  props.view === "Schedule Another Interview" ||
                  props.view === "Schedule Final Interview" ||
                  props.view === "Send Document" ? 
                    <>
                      <Divider/>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={props.validation}
                        type="submit"
                        onClick={(e) => {
                          var message = "";
                          props.shortList.free === "NO"
                            ? message = ""
                            :message = messageRef.current.value;

                          if (props.shortList.free === "NO") {
                            if (props.shortList.statusCode === 303) {
                              message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been shortlisted by our Client. Your interview is going to be scheduled. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm your available date and time. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                            } else if (props.shortList.statusCode === 3031) {
                              message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been shortlisted after an interview by our Client for further level. Your interview is going to be scheduled. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm your available date and time. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                            } else if (props.shortList.statusCode === 304) {
                              <>
                                {props.view === "Schedule Another Interview"
                                  ? message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been shortlisted after an interview by our Client for further level. Your interview is going to be scheduled. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm your available date and time. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`
                                  : props.view === "Schedule Final Interview"
                                  ? message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been shortlisted for final level of interview by our Client. Your interview is going to be scheduled. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm your available date and time. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`
                                  : props.view === "Send Document"
                                  ? message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been selected after the interview process by our Client. We would request you to share the documents for package discussion to proceed further. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`
                                  : ""}
                              </>;
                            } else if (props.shortList.statusCode === 305) {
                              message = `Dear ${props.shortList.cand_name}, CONGRATS! Your salary breakdown has been shared with you by our client. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm that you accept the salary breakdown so that the offer could be released. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                            } else if (props.shortList.statusCode === 307) {
                              message = `Dear ${props.shortList.cand_name}, CONGRATS! Your offer has been released by our Client. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm that you accept the offer so that onboarding process can be initiated. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                            } else {
                            }
                          }
                          props.changeStatus(
                            false,
                            message,
                            props.view,
                            props.shortList.id,
                          );
                        }}
                      >
                        Save Only
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={props.validation}
                        type="submit"
                        onClick={(e) => {
                          var message = "";
                          props.shortList.free === "NO"
                            ? message = ""
                            : message = messageRef.current.value;

                          if (props.shortList.free === "NO") {
                            if (props.shortList.statusCode === 303) {
                              message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been shortlisted by our Client. Your interview is going to be scheduled. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm your available date and time. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                            } else if (props.shortList.statusCode === 3031) {
                              message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been shortlisted after an interview by our Client for further level. Your interview is going to be scheduled. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm your available date and time. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                            } else if (props.shortList.statusCode === 304) {
                              <>
                                {props.view === "Schedule Another Interview"
                                  ? message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been shortlisted after an interview by our Client for further level. Your interview is going to be scheduled. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm your available date and time. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`
                                  : props.view === "Schedule Final Interview"
                                  ? message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been shortlisted for final level of interview by our Client. Your interview is going to be scheduled. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm your available date and time. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`
                                  : props.view === "Send Document"
                                  ? message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been selected after the interview process by our Client. We would request you to share the documents for package discussion to proceed further. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`
                                  : ""}
                              </>;
                            } else if (props.shortList.statusCode === 305) {
                              message = `Dear ${props.shortList.cand_name}, CONGRATS! Your salary breakdown has been shared with you by our client. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm that you accept the salary breakdown so that the offer could be released. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                            } else if (props.shortList.statusCode === 307) {
                              message = `Dear ${props.shortList.cand_name}, CONGRATS! Your offer has been released by our Client. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm that you accept the offer so that onboarding process can be initiated. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                            } else {
                            }
                          }
                          props.changeStatus(
                            true,
                            message,
                            props.view,
                            props.shortList.id,
                          );
                        }}
                      >
                        Save & Send
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        color='secondary'
                        onClick={props.handleStatusClose}
                      >
                        Close
                      </Button>

                    </>
                  : ""                
                 : props.shortList.statusCode === 3041 ? 
                  <>
                   

                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        var message ="";
                        if (props.shortList.free === "NO") {
                          message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been selected after the interview process by our Client. We would request you to share the documents for package discussion to proceed further. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`                        } else {
                           message = messageRef.current.value;
                        }
                        props.changeStatus(
                          false,
                          message,
                          props.view,
                          props.shortList.id,
                        );
                      }}
                    >
                      Save Only
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        var message =""
                        if (props.shortList.free === "NO") {
                          message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been selected after the interview process by our Client. We would request you to share the documents for package discussion to proceed further. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`                        } else {
                         message = messageRef.current.value;
                        }
                        props.changeStatus(
                          true,
                          message,
                          props.view,
                          props.shortList.id,
                        );
                      }}
                    >
                      Save & Send
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                      onClick={props.handleStatusClose}
                    >
                      Cancel
                    </Button>
                  </>
                 : 
                  <>
                 

                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      disabled={props.validation}
                      type="submit"
                      onClick={(e) => {
                        var message = "";
                        props.shortList.free === "NO"
                          ? message = ""
                          : message = messageRef.current.value;

                        if (props.shortList.free === "NO") {
                          if (props.shortList.statusCode === 303) {
                            message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been shortlisted by our Client. Your interview is going to be scheduled. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm your available date and time. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                          } else if (props.shortList.statusCode === 3031) {
                            message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been shortlisted after an interview by our Client for further level. Your interview is going to be scheduled. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm your available date and time. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                          } else if (props.shortList.statusCode === 304) {
                            <>
                              {props.view === "Schedule Another Interview"
                                ? message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been shortlisted after an interview by our Client for further level. Your interview is going to be scheduled. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm your available date and time. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`
                                : props.view === "Schedule Final Interview"
                                ? message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been shortlisted for final level of interview by our Client. Your interview is going to be scheduled. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm your available date and time. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`
                                : props.view === "Send Document"
                                ? message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been selected after the interview process by our Client. We would request you to share the documents for package discussion to proceed further. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`
                                : ""}
                            </>;
                          } else if (props.shortList.statusCode === 305) {
                            message = `Dear ${props.shortList.cand_name}, CONGRATS! Your salary breakdown has been shared with you by our client. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm that you accept the salary breakdown so that the offer could be released. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                          } else if (props.shortList.statusCode === 307) {
                            message = `Dear ${props.shortList.cand_name}, CONGRATS! Your offer has been released by our Client. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm that you accept the offer so that onboarding process can be initiated. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                          } else {
                          }
                        }

                        props.changeStatus(
                          false,
                          message,
                          props.view,
                          props.shortList.id,
                        );
                      }}
                    >
                      Save Only
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      disabled={props.validation}
                      type="submit"
                      onClick={(e) => {
                        var message = "";
                        props.shortList.free === "NO"
                          ? message = ""
                          : message = messageRef.current.value;

                        if (props.shortList.free === "NO") {
                          if (props.shortList.statusCode === 303) {
                            message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been shortlisted by our Client. Your interview is going to be scheduled. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm your available date and time. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                          } else if (props.shortList.statusCode === 3031) {
                            message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been shortlisted after an interview by our Client for further level. Your interview is going to be scheduled. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm your available date and time. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                          } else if (props.shortList.statusCode === 304) {
                            <>
                              {props.view === "Schedule Another Interview"
                                ? message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been shortlisted after an interview by our Client for further level. Your interview is going to be scheduled. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm your available date and time. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`
                                : props.view === "Schedule Final Interview"
                                ? message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been shortlisted for final level of interview by our Client. Your interview is going to be scheduled. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm your available date and time. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`
                                : props.view === "Send Document"
                                ? message = `Dear ${props.shortList.cand_name}, CONGRATS! Your profile has been selected after the interview process by our Client. We would request you to share the documents for package discussion to proceed further. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`
                                : ""}
                            </>;
                          } else if (props.shortList.statusCode === 305) {
                            message = `Dear ${props.shortList.cand_name}, CONGRATS! Your salary breakdown has been shared with you by our client. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm that you accept the salary breakdown so that the offer could be released. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                          } else if (props.shortList.statusCode === 307) {
                            message = `Dear ${props.shortList.cand_name}, CONGRATS! Your offer has been released by our Client. Please reply to this message with this Job Id ${props.shortList.job_id} to confirm that you accept the offer so that onboarding process can be initiated. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                          } else {
                          }
                        }

                        props.changeStatus(
                          true,
                          message,
                          props.view,
                          props.shortList.id,
                        );
                      }}
                    >
                      Save & Send
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                      color='secondary'
                      onClick={props.handleStatusClose}
                    >
                      Close
                    </Button>
                  </>
                }
              </>
            }
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={props.handleStatusNewClose}
        aria-labelledby="dialog-title"
        open={props.stausNewOpen}
        width="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      > 
      <DialogTitle className={classes.digTitle}>
        <div className={classes.center}>
          <Typography variant="subtitle2"  className={classes.digColor+" "+classes.digCenter}> 
              {props.view === "Joining Confirmation"? "Send WhatsApp message" : props.view === "Ditch"?  
              "Are you sure candidate has not joined?": "Can you confirm that the candidate has declined the offer?" }
          </Typography>
          <div className={classes.drawerClose} >
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={props.handleStatusNewClose}        
                />
           </div>
        </div>
      </DialogTitle>
        <DialogContent className={classes.chatListBackGround}>

          {props.view === "Joining Confirmation" ? 
            props.shortList.free === "NO" ? 
              <Typography>
                Dear <b>{props.shortList.cand_name}, </b> <br /> <br />
                CONGRATS on your new position and best wishes! Please reply to this message with this Job Id <b>{props.shortList.job_id} </b> 
                to confirm that you have joined with our Client. We appreciate your ongoing partnership with <b>{localStorage.getItem('companyName')}</b>. <br />
                <br />
                <b>{props.shortList.rec_name}</b>, <br />
                <b>
                  {props.shortList.rec_mobile_no}, {localStorage.getItem('companyName')}
                </b>
                , Recruiter
              </Typography>
            : 
              <TextField
                size="small"
                inputRef={messageRef}
                classes={{ root: classes.customTextField }}
                InputProps={{ disableUnderline: true }}
                multiline
                rows={5}
                defaultValue={`Dear ${props.shortList.cand_name},\n\nCongratulations! We hope that you have successfully joined in our client company, and we kindly request you to acknowledge the same for the position of ${props.shortList.job_name} (Job ID ${props.shortList.job_id}).\n \nThank you and best regards,\n${localStorage.getItem('firstName') +"" + decode.lastName} \n${localStorage.getItem('mobile')? "+91 "+localStorage.getItem('mobile'):"" } \nRecruiter \n${localStorage.getItem('companyName')}`}
                variant="outlined"
              />
            
           : ""}

          <div className={classes.sendWhatsapp}>
            {props.view === "Offer Declined" ? 
              <>
               

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                 
                  onClick={  props.handleReasonOpen }
                 
                >
                  Yes
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  color='secondary'
                  onClick={props.handleStatusNewClose}
                >
                  No
                </Button>
              </>
             : props.view === "Ditch" ? 
              <>
              

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                 
                  onClick={  props.handleReasonOpen }
                >
                  Yes
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  color='secondary'
                  onClick={props.handleStatusNewClose}
                >
                  No
                </Button>
              </>
             : 
              <>
              
                <Divider/>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={props.validation}
                  type="submit"
                  onClick={(e) => {
                    var message = "";

                    props.shortList.free === "NO"
                      ? (message = "")
                      : (message = messageRef.current.value);

                    if (props.shortList.free === "NO") {
                      message = `Dear ${props.shortList.cand_name}, CONGRATS on your new position and best wishes! Please reply to this message with this Job Id ${props.shortList.job_id} o confirm that you have joined with our Client. We appreciate your ongoing partnership with ${localStorage.getItem('companyName')}. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                    }

                    props.changeStatus(
                      false,
                      message,
                      props.view,
                      props.shortList.id,
                    );
                  }}
                >
                  Save Only
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={props.validation}
                  type="submit"
                  onClick={(e) => {
                    var message = "";

                    props.shortList.free === "NO"
                      ? (message = "")
                      : (message = messageRef.current.value);

                    if (props.shortList.free === "NO") {
                      message = `Dear ${props.shortList.cand_name}, CONGRATS on your new position and best wishes! Please reply to this message with this Job Id ${props.shortList.job_id} o confirm that you have joined with our Client. We appreciate your ongoing partnership with ${localStorage.getItem('companyName')}. ${props.shortList.rec_name}, ${props.shortList.rec_mobile_no}, ${localStorage.getItem('companyName')}, Recruiter`;
                    }

                    props.changeStatus(
                      true,
                      message,
                      props.view,
                      props.shortList.id,
                    );
                  }}
                >
                  Save & Send
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  color='secondary'
                  onClick={props.handleStatusNewClose}
                >
                  Close
                </Button>
              </>
            }
          </div>
        </DialogContent>
      </Dialog>


      <Dialog
        onClose={ props.handleChangeMessageClose}
        aria-labelledby="dialog-title"
        open={ props.changeMessageOpen }
        width="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      > 
      <DialogTitle className={classes.digTitle}>
      <div className={classes.center}>
        <Typography variant="subtitle2" className={classes.digColor+" "+classes.digCenter}> Confirmation </Typography>
        <div className={classes.drawerClose} >
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={ props.handleChangeMessageClose }        
                />
        </div>
        
      </div>
      </DialogTitle>
        
        <DialogContent className={classes.chatListBackGround}>
        <Typography variant="subtitle2"> Are you sure want to change this status? </Typography>
        <div className={classes.sendWhatsapp}>
        <>
              
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={(e)=>{ props.changeStcStatus()}}
                >
                Yes
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  color='secondary'
                  onClick={ props.handleChangeMessageClose }
                >
                  No
                </Button>

              </>

              </div>
        </DialogContent>
      </Dialog>


      <Dialog
        onClose={ props.handleDropReasonClose}
        aria-labelledby="dialog-title"
        open={ props.dropReasonOpen }
        width="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      > 
      <DialogTitle className={classes.digTitle}>
      <div className={classes.center}>
        <Typography variant="subtitle2" className={classes.digColor+" "+classes.digCenter}> Reason for drop this candidate </Typography>
          <div className={classes.drawerClose} >
                <CloseIcon
                  className={classes.digClose}
                  size="14px"
                  onClick={ props.handleDropReasonClose }        
                  />
          </div>
        </div>
      </DialogTitle>

        <DialogContent className={classes.chatListBackGround}>
        <TextField
          size="small"
          classes={{ root: classes.customTextField }} 
          placeholder="Enter Reason for Drop this Candidate"
          {...props.dropCandidates("reason")}
          error={props.dropErrors.reason ? true : false}
        />

        <div className={classes.sendWhatsapp}>
        <>
             

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
               
                   onClick={props.dropSubmit(props.DropStatus)}
                >
                Save
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  color='secondary'
                  onClick={ props.handleDropReasonClose }
                >
                  Close
                </Button>
              </>

              </div>
        </DialogContent>
      </Dialog>



      <Dialog
        onClose={ props.handleReasonClose}
        aria-labelledby="dialog-title"
        open={ props.reasonOpen }
        width="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      > 
      <DialogTitle className={classes.digTitle}>
      <div className={classes.center}>
        <Typography variant="subtitle2" className={classes.digColor}> {props.shortList.statusCode === 312? "Kindly provide the reason for transferring the candidate to a credit note" :  props.view === "Offer Declined" ?  "Kindly provide the reason for the candidate's rejection of the job offer" : "Kindly provide the reason for ditch"} </Typography> 
        <div className={classes.drawerClose} >
              <CloseIcon
              
                className={classes.digClose}
                size="14px"
                onClick={ props.handleReasonClose }        
                />
        </div>
      </div>
      </DialogTitle>
        <DialogContent className={classes.chatListBackGround}>

          <TextField
          size="small"
          classes={{ root: classes.customTextField }}
          InputProps={{ disableUnderline: true }} 
          placeholder={props.shortList.statusCode === 312? "Kindly provide the reason for transferring the candidate to a credit note." : props.view === "Offer Declined" ?  "Kindly provide the reason for the candidate's rejection of the job offer" : "Enter Reason for Candidate Ditch"} 
           
          inputRef={props.reasonRef}
          variant="outlined"
          />
              

        <div className={classes.sendWhatsapp}>
        <>
              


                { props.shortList.statusCode === 312?
                  <Button
                  variant="contained"
                  color="primary"
                  size="small"
               
                  onClick={(e) => {
                    props.creditNoteStatus();
                  }}
                >
                Save
                </Button>
                : props.view === "Offer Declined" ? 
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
               
                  onClick={(e) => {
                    props.OfferDeclineStatus();
                  }}
                >
                Save
                </Button>
                :
                <Button
                variant="contained"
                color="primary"
                size="small"
             
                onClick={(e) => {
                  props.updateJoiningDitchedStatus();
                }}

                >
                Save
                </Button>
                }


                 <Button
                  variant="contained"
                  size="small"
                  color='secondary'
                  onClick={ props.handleReasonClose }
                >
                  Close
                </Button>
              </>

              </div>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default Dialogs;
