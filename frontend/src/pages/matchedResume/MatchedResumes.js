import React, { useEffect, useRef, useState, useReducer } from "react";
import {
  Button,
  Grid,
  Tooltip,
  Fab
} from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/Refresh';
import axios from "axios";
import MUIDataTable from "mui-datatables";
import PageTitle from "../../components/PageTitle/PageTitle";
import Notification from "../../components/Notification";
import Lottie from 'lottie-react';
import animation from '../../images/animation-upload.json';
import useStyles from "../../themes/style.js";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import jdSearchImage from '../../images/jd-search.png'
import ResumeLinearProgress from "./ResumeLinearProgress.js";

const positions = [toast.POSITION.TOP_RIGHT];
export default function MatchedResumes() {
  var theme = useTheme();
  const mobileQuery = useMediaQuery("(max-width:600px)");
  const classes = useStyles();
  const token = localStorage.getItem("token");

  const [loader, setLoader] = useState(false);
  const [candidateResume, setCandidateResume] = useState([]);
  const [downloadResume, setDownloadResume] = useState("");
  const [showResume, setShowResume] = useState(false);


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
  const iframeRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  const refreshIframe = () =>{
    setRotation(rotation + 360);
    iframeRef.current.src = "https://docs.google.com/a/umd.edu/viewer?url="+process.env.REACT_APP_URL+downloadResume+"&embedded=true";
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    if (event.target && event.target.files[0]?.size <= 5000000) {
      setLoader(true);
      const files = event.target.files[0];
      var FormData = require("form-data");
      var form_data = new FormData();
      form_data.append("job_description", files);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}AI/jdMatcher`,
        data: form_data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
        .then((response) => {
          if (response.data.status === true) {
            setCandidateResume(response.data.data);
            setDownloadResume(response.data.fileUrl);
            setShowResume(true);
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
      handleNotificationCall("error", "Maximum File Size Limit 5mb");
    }
  };

  const hanldeIframeLoad = ()=>{
    return(
      <h5>loading... please wait</h5>
    )
  }

  const table_options = {
    textLabels: {
      body: {
        noMatch: "Oops! Matching record could not be found",
      },
    },
    pagination: false,
    sort: false,
    selectableRows: "none",
    filter: false,
    print: false,
    download: false,
    responsive: mobileQuery === true ? "vertical" : "standard",
    onFilterChange: (changedColumn, filterList) => {},
    filterType: "dropdown",
    search: false,
  };


  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.heading}>
        <Grid item xs={7}>
          <PageTitle title="Match Job Description" />
        </Grid>
      </Grid>

      {!showResume  ? (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} lg={3} xl={3}></Grid>
          <Grid item xs={12} lg={6} xl={6}
            className={classes.resumeUploadParent}
          >
          {!loader && (
            <div className={classes.resumeUploadContainer}>
              <img src={jdSearchImage} alt="jd-matched-resumes" width='100%'  className={classes.uploadBtnImage} />
              <Button
                variant="contained"
                color="primary"
                onClick={handleButtonClick}
              >
                Upload Job Description
              </Button>
            </div>
          )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(event) => {
                handleFileChange(event);
              }}
              accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
          </Grid>
          <Grid item xs={12} lg={3} xl={3}></Grid>
        </Grid>
      ) : (
        <>
          <Grid container spacing={2}>
          <Grid item xs={12} lg={3} xl={3}></Grid>
          <Grid item xs={12} lg={6} xl={6}>
           <iframe ref={iframeRef} onLoad={hanldeIframeLoad} className="iframe" src={"https://docs.google.com/a/umd.edu/viewer?url=" + process.env.REACT_APP_URL+downloadResume+ "&embedded=true"  }  title="File"  width="100%" style={{height:'70vh', position:'relative'}}> </iframe>
           <Tooltip
            title="Refresh"
            placement="bottom"
            aria-label="view"
          >
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              className={classes.margin}
              style={{position:'absolute',zIndex:1,}}
              onClick={refreshIframe}
            >
              <RefreshIcon  style={{ transform: `rotate(${rotation}deg)`,transition: 'transform 2s' }} />
            </Fab>
          </Tooltip>
          </Grid>
          <Grid item xs={12} lg={3} xl={3}></Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MUIDataTable
                title=""
                options={table_options}
                columns={[
                  {
                    name: "S.No",
                  },
                  {
                    name: "file Name",
                  },
                  {
                    name: "percentage",
                  },
                ]}
                data={candidateResume?.map((item, index) => {
                  return [
                    index + 1,
                    item.originalName,
                    <>
                      <ResumeLinearProgress percentage={item?.percentage} />
                    </>,
                  ];
                })}
              />

            </Grid>
          </Grid>
        </>
      )}

      {loader && (
        <div className={classes.backdrop}>
            <Lottie animationData={animation} loop={true} style={{height:'50vh'}} />
            <div style={{color:'#064be2',display:'flex',justifyContent:'center' }}>Uploading File please Wait..</div>
        </div>
      )
      }
    </>
  );
}
