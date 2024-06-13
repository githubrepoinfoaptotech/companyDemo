import React, { useState, useReducer } from "react";
import MUIDataTable from "mui-datatables";
import {
  Grid,
  Button,
  List,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Typography,
  Backdrop,
  CircularProgress,
  DialogTitle,
  Dialog,
  makeStyles
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import Notification from "../../components/Notification";
import useStyles from "../../themes/style.js";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useLocation } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ApprovedSuccess from "../../images/Approved_Mail.png"

const positions = [toast.POSITION.TOP_RIGHT];


function SimpleDialog(props) {
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  var [errorToastId, setErrorToastId] = useState(null);


  const handleDialogClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      handleClose();
    }
  };


  function sendNotification(componentProps, options) {
    return toast(
      <Notification
        {...componentProps}
        className={classes.notificationComponent}
      />,
      options,
    );
  }
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
      position: positions[2],
      progressClassName: classes.progress,
      onClose: notificationType === "error" && (() => setErrorToastId(null)),
      className: classes.notification,
      autoClose: notificationType === "error" ? false : 5000
    });

    if (notificationType === "error") setErrorToastId(toastId);
  }

  async function onLogin(values) {
    try {
      props.setLoader(true);
      const queryParams = new URLSearchParams(location.search);
      const otp_token = queryParams.get("approval_id");
  
      const result = await axios.post(`${process.env.REACT_APP_SERVER}CC/checkApprovalValidity`, {
        "otp": values.otp
      }, {
        headers: {
          Token: otp_token
        }
      });
  
      if (result.data.status === true) {
        setOpen(false);
        props.setData(result.data.c_data);
        props.setLof(result.data.levelOfHiring_data);
        props.setOrgRec(result.data.ordrec_data);
      } else if (result.data.status === false) {
        handleNotificationCall("error", result.data.message);
      }
  
      if (result?.data?.approved) {
        props.setApprove(result.data.approved);
      }
    } catch (error) {
      console.log(error);
    } finally {
      props.setLoader(false);
    }
  }
  
  const validationSchema = Yup.object().shape({
    otp: Yup.string().length(4, 'OTP must be exactly 4 digits').required('OTP is required')
  });

  const focusStyle = {
    border: '2px solid blue',
  };

  const inputStyle = {
    width: '3rem',
    height: '3rem',
    margin: '0 1rem',
    fontSize: '2rem',
    textAlign: 'center',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // const handleOtpsubmit = (value) => {
  //   onClose(value);
  // };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Dialog onClose={handleDialogClose} aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description" open={open} >
      <div style={{ padding: '20px', display: 'grid', justifyContent: 'center' }}>
        <DialogTitle id="simple-dialog-title"  >
          <Typography variant="h6" style={{ textAlign: 'center', margin: 0, fontWeight: 600 }}> OTP Verification</Typography>
        </DialogTitle>
        <Typography variant="body2" style={{ textAlign: 'center', margin: 0 }}> Enter the Verification code here</Typography>
        <List>
          <form onSubmit={handleSubmit(onLogin)} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "40px", padding: "20px 0px 0px 0px" }}>
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <OtpInput
                  value={field.value}
                  onChange={field.onChange}
                  containerStyle={containerStyle}
                  focusStyle={focusStyle}
                  inputStyle={inputStyle}
                  numInputs={4}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                />
              )}
            />
            {errors.otp && <p>{errors.otp.message}</p>}

            <Button variant="contained" color="primary" className={classes.button} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </form>

          {/* <Grid item xs={12}  >
            <InputLabel shrink htmlFor="otp" >  OTP </InputLabel>
            <FormControl className={classes.margin}>

              <TextField name="otp" {...register("otp")} classes={{ root: classes.customTextField }} InputProps={{ disableUnderline: true }} placeholder='Enter Otp' size="small" error={errors.otp ? true : false} />

              <Typography variant="inherit" color="error"> {errors.otp?.message} </Typography>
            </FormControl>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onLogin)}
          >
            Login
          </Button> */}
        </List>

        {/* <Backdrop className={classes.backdrop} open={loader}  >
          <CircularProgress color="inherit" />
        </Backdrop> */}
      </div>
    </Dialog>
  );
}


export default function ApproveMail( ) {
  const classes = useStyles();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const approval_token = queryParams.get("approval_id");
  const mobile = queryParams.get("mobile");

  const [loader, setLoader] = useState(false);
  const mobileQuery = useMediaQuery('(max-width:600px)');
  const [sourceData, setSourceData] = useState({});
  const [levelOfHiring, setLevelOfHiring] = useState([]);
  const [OrgRecData, setOrgRecData] = useState([]);
  const [approved, setApproved] = useState("");

  const useTableStyles = makeStyles(theme => ({
    MuiToolbar:{
      "&root":{
        background:'red'
      }
    }
  }))



  function handleApproval(isApproved) {
    try {
      setLoader(true);
      const queryParams = new URLSearchParams(location.search);
      const otp_token = queryParams.get("approval_id");

      axios.post(`${process.env.REACT_APP_SERVER}CC/approveCLient`, {
        "approved": isApproved
      }, {
        headers: {
          Token: otp_token
        }
      })
        .then((result) => {
          if (result.data.status === true) {
              setApproved(result.data.approved)
          }

          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoader(false);

        });
    } catch (error) {
      console.error(error)
    }


  }
  return (
    <Box style={{ display: 'flex', justifyContent: 'center', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Grid container spacing={2} direction="row" className={classes.ApproveMailContainer}>

        {!approved ?
          <>
          <SimpleDialog setData={setSourceData} setLof={setLevelOfHiring} setOrgRec={setOrgRecData} setApprove={setApproved} setLoader={setLoader}/>

            <Grid container direction="row" spacing={2} className={classes.heading}>
              <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', }}>
                <Typography variant="h3" style={{ textAlign: 'center' }}>Approval Mail</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} >
              <Grid item xs={12}>
                <MUIDataTable
                  title="Project Details"
                  options={{
                    textLabels: {
                      body: {
                        noMatch: 'Oops! Matching record could not be found',
                      }
                    },
                    viewColumns: false,
                    pagination: false,
                    sort: false,
                    selectableRows: "none",
                    search: false,
                    filter: false,
                    download: false,
                    print: false,
                    fixedHeader: false,
                    responsive: mobileQuery === true ? 'vertical' : 'standard',
                  }}
                  columns={[
                    {
                      name: "S.No",
                    },

                    {
                      name: "Project Name",
                    },

                    {
                      name: "Project Division",
                    },
                    {
                      name: "Hiring Manager",
                    },
                    {
                      name: "Hr Business Unit Code",
                    },
                    {
                      name: "Project Region",
                    },
                    {
                      name: "Project Location",
                    },
                    {
                      name: "Reason for Hiring",
                    },
                  ]}
                  data={Object.keys(sourceData).length ? [[
                    1,
                    sourceData.clientName,
                    sourceData.clientIndustry,
                    (sourceData.handler.firstName) + (sourceData.handler.lastName),
                    sourceData.hrbpCode,
                    sourceData.projectRegion,
                    sourceData.projectLocation,
                    sourceData.reasonForHiring,
                  ]] : []
                  }
                />

              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={6}>
                <MUIDataTable
                  title="Number To Be Hired"
                  options={{
                    textLabels: {
                      body: {
                        noMatch: 'Oops! Matching record could not be found',
                      }
                    },
                    viewColumns: false,
                    searchAlwaysOpen: false,
                    pagination: false,
                    sort: false,
                    selectableRows: "none",
                    search: false,
                    filter: false,
                    download: false,
                    print: false,
                    fixedHeader: false,
                    responsive: mobileQuery === true ? 'vertical' : 'standard',
                  }}
                  columns={[
                    {
                      name: "S.No",
                    },

                    {
                      name: "Hiring Level",
                    },

                    {
                      name: "Number To Be Hired",
                    },

                  ]}
                  data={levelOfHiring.length ? levelOfHiring.map((lof, index) => [
                    (index + 1),
                    lof.name,
                    lof.noOfHires
                  ]) : []
                  }
                />

              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={6}>
                <MUIDataTable
                  title="Recruiter Details"
                  options={{
                    textLabels: {
                      body: {
                        noMatch: 'Oops! Matching record could not be found',
                      }
                    },
                    viewColumns: false,
                    pagination: false,
                    sort: false,
                    selectableRows: "none",
                    search: false,
                    filter: false,
                    download: false,
                    print: false,
                    fixedHeader: false,
                    responsive: mobileQuery === true ? 'vertical' : 'standard',
                  }}
                  columns={[
                    {
                      name: "S.No",
                    },

                    {
                      name: "Recruiter Name",
                    },

                    {
                      name: "Email",
                    },
                    {
                      name: "Mobile Number",
                    },

                  ]}
                  data={OrgRecData.length ? OrgRecData.map((rec, index) => [
                    (index + 1),
                    rec.name,
                    rec.email,
                    rec.mobile

                  ]) : []
                  }
                />

              </Grid>
              <Grid item xs={12} style={{ display: 'flex', gap: "20px", justifyContent: 'center', margin: 'auto' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleApproval("Approved")}
                >
                  Approved
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleApproval("Disapproved")}
                >
                  Not Approved
                </Button>

                <Button
                  variant="contained"
                  color="default"
                  onClick={() => handleApproval("Pending")}
                >
                  Pending
                </Button>
              </Grid>
            </Grid>
          </>
          :
          approved ==="Approved" ?
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',position:'absolute',top:0,bottom:0,left:0,right:0}}>
            <CheckCircleIcon style={{ color: "#08c905",fontSize:'50px' }} />   
            <h1 style={{color:"#08c905",fontSize:'50px',marginLeft:'10px'}}>Approved</h1>
          </div>:
          approved ==="Disapproved" ?
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',position:'absolute',top:0,bottom:0,left:0,right:0}}>
            <HighlightOffIcon style={{ color: "#FF0000",fontSize:'50px' }} />
            <h1 style={{color:"#FF0000",fontSize:'50px',marginLeft:'10px'}}>Not Approved</h1>
          </div>:
          approved ==="Pending" ?
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',position:'absolute',top:0,bottom:0,left:0,right:0}}>
            <ScheduleIcon style={{ color: "#1679AB",fontSize:'50px' }} />
            <h1 style={{color:"#1679AB",fontSize:'50px',marginLeft:'10px'}}>Pending</h1>
          </div>:<>

          </>
   
        }
      </Grid>
      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}


