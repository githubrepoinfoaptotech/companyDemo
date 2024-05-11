import React, {  useRef, useState } from "react";
import {
  Button,
  Grid,
} from "@material-ui/core";
import axios from "axios";
import PageTitle from "../../components/PageTitle/PageTitle";
import Notification from "../../components/Notification";
import Lottie from 'lottie-react';
import animation from '../../images/animation-upload.json';
import resumeParseImage from '../../images/resume-parse.png';
import useStyles from "../../themes/style.js";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./resume-style.css";
import Resume from "./Resume.js";
// import {mock_data} from './mock_data.js'

const positions = [toast.POSITION.TOP_RIGHT];

export default function ResumeSearch() {

  const classes = useStyles();
  const token = localStorage.getItem("token");

  const [loader, setLoader] = useState(false);
  const [candidateResume,setCandidateResume] = useState([]);
  const [downloadResume,setDownloadResume] = useState('');
  const [showResume, setShowResume] = useState(false)

  console.log(candidateResume);

  var [errorToastId, setErrorToastId] = useState(null);

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
    });

    if (notificationType === "error") setErrorToastId(toastId);
  }

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    if (event.target && event.target.files[0]?.size <= 5000000) {
      setLoader(true);
      const files = event.target.files[0];
      var FormData = require('form-data');
      var form_data = new FormData();
      form_data.append('resume', files)


      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}AI/resumePraser`,
        data: form_data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
        .then((response) => {
          if (response.data.status === true) {
            setCandidateResume(response.data?.data)
            setDownloadResume(response.data?.fileUrl)
            setShowResume(true)
            handleNotificationCall("success", response.data.message);
          } else {
            handleNotificationCall("error", response.data.message);
          }

          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      handleNotificationCall("error", 'Maximum File Size Limit 5mb');
    }
  };

  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.heading}>
        <Grid item xs={7}>
          <PageTitle title="Resume Parsing" />
        </Grid>
      </Grid>
      {!showResume ? 
        <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={6} className={classes.resumeUploadParent}>
          {!loader && (
            <div className={classes.resumeUploadContainer}>
              <img src={resumeParseImage} alt="jd-matched-resumes" width='100%' className={classes.uploadBtnImage}/>
              <Button variant="contained" color="primary" onClick={handleButtonClick}>
              Upload Resume
              </Button>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(event)=>{
              handleFileChange(event)
            }}
            accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />

        </Grid>
      </Grid>
      :
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Resume candidateData={candidateResume} downloadResume={downloadResume} />
          </Grid>
        </Grid>
      }

      {/* <Grid container spacing={2}>
          <Grid item xs={12}>
            <Resume candidateData={mock_data?.data} downloadResume={mock_data.fileUrl} />
          </Grid>
        </Grid> */}


      {loader && (
        <div className={classes.backdrop}>
            <Lottie animationData={animation} loop={true} style={{height:'50vh'}} />
            <div style={{color:'#064be2',display:'flex',justifyContent:'center' }}>Uploading File please Wait..</div>
        </div>
      )
      }

      {/* <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </>
  );
}
