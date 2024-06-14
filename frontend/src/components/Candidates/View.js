import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  List,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import useStyles from "../../themes/style.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CloseIcon from "@material-ui/icons/Close";
import { IoMdPhotos } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";

import WhatsappIcon from "@material-ui/icons/WhatsApp";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import axios from "axios";
import Notification from "../Notification";
import { toast } from "react-toastify";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { RemoveRedEye } from "@material-ui/icons";
import Slider from "react-slick";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { jwtDecode } from "jwt-decode";
import copy from 'copy-to-clipboard';

import "react-toastify/dist/ReactToastify.css";
import ViewFiles from "./ViewFiles.js";

export default function View(props) {

  const positions = [toast.POSITION.TOP_RIGHT];
  var [errorToastId, setErrorToastId] = useState(null);
  const [docFile, setDocFile] = useState("")
  const [fileType, setFileType] = useState("")
  const [fileOpen, setFileOpen] = useState(false)
  const handleFileClose =() =>{
    setFileOpen(false)
  }
  const handleFileOpen =(fileUrl,type) =>{
    console.log(fileUrl)
    setDocFile(fileUrl)
    setFileType(type)
    setFileOpen(true)
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

  const classes = useStyles();
  const mobileQuery = useMediaQuery("(max-width:600px)");
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  function handleCopy(candidateId) {


    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/candiateCpvLink`,
      data: {
        candidateId: candidateId,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {

          copy(response.data.link)
          handleNotificationCall("success", "Copied successfully");
        } else {
          handleNotificationCall("error", response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function sendCPV(candidateId) {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/sendCPVLink`,
      data: {
        candidateId: candidateId,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          handleNotificationCall("success", response.data.message);
          props.setCandidateView({
            ...props.candidateView,
            isCandidateCpv: true,
          });
        } else {
          handleNotificationCall("error", response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [cpvForm, setCpvForm] = useState([]);

  useEffect(() => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/viewCpv`,
      data: {
        candidateId: props.candidateView.id,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setCpvForm(response.data.data);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <Box sx={{ width: "100%" }} role="presentation">
        <List>
          <Card className={classes.root}>
            <CardHeader>
              <Grid
                container
                direction="row"
                spacing={1}
                className={classes.drawerViewHeader}
              >
                <Grid item xs={9} sm={6} md={9} lg={9}>
                  <Typography
                    variant="subtitle1"
                    className={classes.drawerTitle}
                  >
                    {decode.companyType === "COMPANY" ? `View Candidate -  ${props.candidateView.firstName} ${props.candidateView.lastName}` :

                      `View Candidate - ${props.candidateView.firstName + " " + props.candidateView.lastName}`
                        (
                          <RemoveRedEye
                            className={classes.toolIcon}
                            onClick={handleOpen}
                          />)
                    }
                    {/* View Candidate -
                    
                    - View 5 Layered Quality Checklist
                    <RemoveRedEye
                      className={classes.toolIcon}
                      onClick={handleOpen}
                    /> */}
                    <span className={classes.smButton}>
                      <CloseIcon
                        className={classes.closeBtn}
                        size="14px"
                        onClick={props.toggleDrawer("right", false)}
                      />
                    </span>
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={3}
                  sm={6}
                  md={3}
                  lg={7}
                  className={classes.drawerViewClose + " " + classes.lgButton}
                >
                  <CloseIcon
                    className={classes.closeBtn}
                    size="14px"
                    onClick={props.toggleDrawer("right", false)}
                  />
                </Grid>
              </Grid>
            </CardHeader>

            <CardContent className={classes.drawerViewContents}>
              <Grid container direction="row" spacing={2}>
                {props.CPV !== false ? (
                  <>
                    <Grid item xs={12} sm={5} md={5} lg={5}>
                      <Typography className={classes.boldtext}>CPV:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Grid className={classes.space}>
                        {props.candidateView.isCandidateCpv === true ? (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={"true"}
                          >
                            CPV Sent
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={(e) => {
                              sendCPV(props.candidateView.id);
                            }}
                          >
                            Send CPV
                          </Button>
                        )}

                        {props.candidateView.isCandidateCpv !== true ? (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<FileCopyIcon />}
                            onClick={(e) => {
                              handleCopy(props.candidateView.id);
                            }}
                          >
                            Copy URL
                          </Button>
                        ) : (
                          <></>
                        )}
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  ""
                )}

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    {decode.companyType === "COMPANY"
                      ? "Project Name:"
                      : "Client Name:"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>{props.candidateView.clientName}</Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    Requirement Name:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>
                    {props.candidateView.requirementName +
                      " (" +
                      props.candidateView.requiremenUniqueId +
                      ")"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    {decode.companyType === "COMPANY"
                      ? "Hiring Manager"
                      : "Client Coordinator"}
                    :
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography> {props.candidateView.cc} </Typography>
                </Grid>

                {props.Source !== false ? (
                  <>
                    <Grid item xs={12} sm={5} md={5} lg={5}>
                      <Typography className={classes.boldtext}>
                        Source:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7} md={7} lg={7}>
                      <Typography>{props.candidateView.source}</Typography>
                    </Grid>
                  </>
                ) : (
                  ""
                )}

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    Candidate Name:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>
                    {props.candidateView.firstName +
                      " " +
                      props.candidateView.lastName +
                      " (" +
                      props.candidateView.candidateUniqueId +
                      ")"}
                  </Typography>
                </Grid>

                {props.candidateView.mainId === decode.mainId ? (
                  <>
                    <Grid item xs={12} sm={5} md={5} lg={5}>
                      <Typography className={classes.boldtext}>
                        Email ID:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7} md={7} lg={7}>
                      <Typography>{props.candidateView.email}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={5} md={5} lg={5}>
                      <Typography className={classes.boldtext}>
                        Contact Number:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7} md={7} lg={7}>
                      <Typography>
                        {"91 " + props.candidateView.mobile.slice(2)}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={5} md={5} lg={5}>
                      <Typography className={classes.boldtext}>
                        Alternate Contact Number:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7} md={7} lg={7}>
                      <Typography>
                        {!props.candidateView.alternateMobile
                          ? "91 " + props.candidateView.alternateMobile.slice(2)
                          : ""}
                      </Typography>
                    </Grid>
                  </>
                ) : props.candidateView.hideContactDetails !== true ? (
                  <>
                    <Grid item xs={12} sm={5} md={5} lg={5}>
                      <Typography className={classes.boldtext}>
                        Email ID:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7} md={7} lg={7}>
                      <Typography>{props.candidateView.email}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={5} md={5} lg={5}>
                      <Typography className={classes.boldtext}>
                        Contact Number:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7} md={7} lg={7}>
                      <Typography>{props.candidateView.mobile}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={5} md={5} lg={5}>
                      <Typography className={classes.boldtext}>
                        Alternate Contact Number:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7} md={7} lg={7}>
                      <Typography>
                        {props.candidateView.alternateMobile}
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  ""
                )}
                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>Skills:</Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography> {props.candidateView.skills} </Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>Gender:</Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography> {props.candidateView.gender} </Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>Document:</Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <div className={classes.documentViewBtn}
                  onClick={()=>handleFileOpen(props.candidateView.document, "document")}>
                    <IoDocumentText style={{ width: "16px", height: "16px", color: "#fff" }} />
                    <Typography> Document </Typography>
                  </div>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>Photo:</Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <div className={classes.photoViewbtn}
                  onClick={()=>handleFileOpen(props.candidateView.photo, "photo")}>
                    <IoMdPhotos style={{ width: "16px", height: "16px", color: "#fff" }} />
                    <Typography> Photograph </Typography>
                  </div>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>DOB:</Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>
                    {props.candidateView.dob !== "undefined-undefined-undefined"
                      ? props.candidateView.dob
                      : ""}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    Current Company Name:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>
                    {props.candidateView.currentCompanyName}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    Native Location:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>{props.candidateView.nativeLocation}</Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    Current Location:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>{props.candidateView.currentLocation}</Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    Preferred Location:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>
                    {props.candidateView.preferredLocation}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    Total Years of Experience:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>{props.candidateView.experience}</Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    Relevant Experience:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>
                    {props.candidateView.relevantExperience}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    Educational Qualification:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>
                    {props.candidateView.educationalQualification}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    Differently Abled:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>
                    {props.candidateView.differentlyAbled}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    Current CTC:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>{props.candidateView.currentCtc}</Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    Expected CTC:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>{props.candidateView.expectedCtc}</Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    Notice Period:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>{props.candidateView.noticePeriod}</Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    Reason For Job Change:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>
                    {props.candidateView.reasonForJobChange}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    Candidate Attended:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>
                    {props.candidateView.candidateProcessed}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    PAN Number:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>
                    {props.candidateView.panNumber}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={5}>
                  <Typography className={classes.boldtext}>
                    LinkedIn Profile URL:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                  <Typography>
                    {props.candidateView.linkedInProfile}
                  </Typography>
                </Grid>

                {props.candidateView.candidateProcessed === "NO" ? (
                  <>
                    <Grid item xs={12} sm={5} md={5} lg={5}>
                      <Typography className={classes.boldtext}>
                        Reason:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7} md={7} lg={7}>
                      <Typography>{props.candidateView.reason}</Typography>
                    </Grid>
                  </>
                ) : (
                  ""
                )}

                {props.candidateView.isAnswered === "NO" ? (
                  <>
                    <Grid item xs={12} sm={5} md={5} lg={5}>
                      <Typography className={classes.boldtext}>
                        WhatsApp:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7} md={7} lg={7}>
                      <a
                        href={
                          "#/app/singlechat?user_id=" +
                          props.candidateView.chatId
                        }
                      >
                        <Button
                          variant="contained"
                          size="small"
                          className={classes.blue}
                        >
                          <WhatsappIcon /> <span> Show WhatsApp </span>
                        </Button>
                      </a>
                    </Grid>
                  </>
                ) : (
                  ""
                )}
              </Grid>

              <Grid direction="row" spacing={2} className={classes.PY20}>
                <MUIDataTable
                  title=""
                  options={{
                    pagination: false,
                    sort: false,
                    selectableRows: "none",
                    search: false,
                    filter: false,
                    download: false,
                    print: false,
                    viewColumns: false,
                    responsive: mobileQuery === true ? "vertical" : "standard",
                    textLabels: {
                      body: {
                        noMatch: "Oops! Matching record could not be found",
                      },
                    },
                  }}
                  columns={[{ name: "Status" }, { name: "Date" }]}
                  data={props.listCanditate.map((item, index) => {
                    return [
                      item.statusList?.statusName,
                      moment(
                        item.statusCode === 309
                          ? props.candidatesEdit?.joinedDate
                          : item.statusCode === 312
                            ? props.candidatesEdit?.invoicedDate
                            : item.createdAt,
                      ).format("DD-MM-YYYY"),
                    ];
                  })}
                />
              </Grid>
            </CardContent>
            <CardActions>
              <Grid
                container
                direction="row"
                spacing={2}
                className={classes.drawerFooter}
              >
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={props.toggleDrawer("right", false)}
                >
                  Close
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </List>
      </Box>

      <Dialog
        aria-labelledby="dialog-title"
        onClose={handleClose}
        open={open}
        width="lg"
        maxWidth="lg"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogTitle>
          <div className={classes.drawerHeader + " " + classes.inputRoot}>
            <Typography variant="subtitle2" className={classes.inputRoot}>
              {props.candidateView.firstName +
                " " +
                props.candidateView.lastName}
            </Typography>
            <div className={classes.drawerClose}>
              <CloseIcon className={classes.closeBtn} onClick={handleClose} />
            </div>
          </div>
        </DialogTitle>

        <DialogContent className={classes.center}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <Slider {...settings}>
                {props.candidateView?.resume !== null &&
                  props.candidateView?.resume !==
                  "https://liverefo.s3.amazonaws.com/" ? (
                  <div>
                    <div className={classes.center}>
                      <Typography
                        variant="subtitle2"
                        className={classes.inputRoot}
                      >
                        Updated Cv
                      </Typography>
                    </div>

                    <div className={classes.iframediv}>
                      <iframe
                        className={classes.modal}
                        src={
                          "https://docs.google.com/a/umd.edu/viewer?url=" +
                          props.candidateView?.resume +
                          "&embedded=true"
                        }
                        title="File"
                        height="100%"
                      ></iframe>

                      <div className={classes.iframeLogo}></div>
                    </div>

                    <div className={classes.center}>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {props.candidateView?.candidateSkillExplanationRecording !==
                  null &&
                  props.candidateView?.candidateSkillExplanationRecording !==
                  "" ? (
                  <div>
                    <div className={classes.center}>
                      <Typography
                        variant="subtitle2"
                        className={classes.inputRoot}
                      >
                        Candidate Skill Explanation Recording (If not available,
                        it means it is already there in Candidate Recruiter
                        Discussion)
                      </Typography>
                    </div>

                    <iframe
                      className={classes.modal}
                      src={
                        props.candidateView?.candidateSkillExplanationRecording
                      }
                      title="File"
                    ></iframe>

                    <div className={classes.center}>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {cpvForm ? (
                  <div>
                    <div className={classes.center}>
                      <Typography
                        variant="subtitle2"
                        className={
                          classes.inputRoot + " " + classes.probingTitle
                        }
                      >
                        Candidate Probing & Validation Form
                      </Typography>

                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          window.open(
                            `https://api.whatsapp.com/send?phone=+${props.candidateView?.mobile
                            }&text="Hi ${props.candidateView?.firstName +
                            "" +
                            props.candidateView?.lastName
                            }, view link and confirm ${process.env.REACT_APP_SITE
                            }v1/%23/candidateCPV?candidateId=${props.candidateView?.id
                            }"`,
                          );
                        }}
                      >
                        Get
                        {props.candidateView.firstName +
                          " " +
                          props.candidateView.lastName}
                        Confirmation
                      </Button>
                    </div>
                    <Grid
                      container
                      direction="row"
                      spacing={2}
                      className={classes.Candidateform}
                    >
                      <Grid item xs={12} sm={6} md={6} lg={6}></Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}></Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        {props.candidateView.firstName +
                          " " +
                          props.candidateView.lastName}
                        Responses
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>Intersted for Job Opening</Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        {cpvForm?.companyName}
                      </Grid>
                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.companyName !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation on seeing Company Website
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        {cpvForm?.webSiteUrl}
                      </Grid>
                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.webSiteUrl !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>Interested for Job Role title</Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        {cpvForm?.jobTitle}
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.jobTitle !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Interested for Job Role Responsibilities
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        {cpvForm?.jobResponsibilities}
                      </Grid> 

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.jobResponsibilities !== null ? "Yes" : ""}
                        </span>
                      </Grid>*/}

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation that you are residing in Location
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        {cpvForm?.currentLocation}
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.currentLocation !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Interested for Job Role location and willing to
                          relocate if not in same location
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        {cpvForm?.jobLocation}
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.jobLocation !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation on your employment with current Company
                          or inbetween jobs if not working now
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        {cpvForm?.currentCompanyName}
                      </Grid>
                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.currentCompanyName !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation that you are in Project and not in Bench
                          in current Role
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        {cpvForm?.inProjectOrBench}
                      </Grid>
                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.inProjectOrBench !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation to work on Shifts as per the Job Role
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        {cpvForm?.shiftTimings}
                      </Grid>
                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.shiftTimings !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation to Join within days and last working day
                          if in notice period
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        {cpvForm?.noticePeriod}
                      </Grid>
                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.noticePeriod !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation on Direct Payroll or on Contract with 3rd
                          Party Vendor
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        {cpvForm?.payrollOrContract}
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.payrollOrContract !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation on your Current CTC and Take Home Salary
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Typography>
                            Current CTC : {cpvForm?.currentCtcAndTakeHome}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Typography>
                            Current Take Home: {cpvForm?.currentTakeHome}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.currentCtcAndTakeHome !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation on your Expected CTC and Take Home Salary
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Typography>
                            Expected CTC : {cpvForm?.expectedCtcAndTakeHome}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Typography>
                            Expected Take Home: {cpvForm?.expectedTakeHome}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.expectedCtcAndTakeHome !== null
                            ? "Yes"
                            : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation on Work from Home, Work from Office,
                          Hybrid
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        {cpvForm?.modeOfWork}
                      </Grid>
                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.modeOfWork !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation on your Existing Offer details
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        {cpvForm?.existingOfferDetails}
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.existingOfferDetails !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation on reason for Job Change
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        {cpvForm?.jobChangeReason}
                      </Grid>
                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.jobChangeReason !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirm that on selection for Offer that you have all
                          relevant documents in order to submit for Offer
                          release and onboarding
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        {cpvForm?.documentsAvailabilty}
                      </Grid>
                      <Grid item xs={12} sm={3} md={3} lg={3}>
                        <span className={classes.greenColor}>
                          {cpvForm?.documentsAvailabilty !== null ? "Yes" : ""}
                        </span>
                      </Grid>
                    </Grid>

                    <div className={classes.center}>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {props.candidateView?.candidateMindsetAssessmentLink !== null &&
                  props.candidateView?.candidateMindsetAssessmentLink !==
                  "https://liverefo.s3.amazonaws.com/" ? (
                  <div>
                    <div className={classes.center}>
                      <Typography
                        variant="subtitle2"
                        className={classes.inputRoot}
                      >
                        Candidate Mindset Assessment Report
                      </Typography>
                    </div>
                    <div className={classes.center}>
                      <img
                        className={classes.modalImg}
                        src={
                          props.candidateView?.candidateMindsetAssessmentLink
                        }
                        alt="img"
                      />
                    </div>
                    <div className={classes.center}>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {props.candidateView?.candidateRecruiterDiscussionRecording !==
                  null &&
                  props.candidateView?.candidateRecruiterDiscussionRecording !==
                  "" ? (
                  <div>
                    <div className={classes.center}>
                      <Typography
                        variant="subtitle2"
                        className={classes.inputRoot}
                      >
                        Candidate Recruiter Discussion Video Recording(Might
                        also include Candidate Skill Explanation)
                      </Typography>
                    </div>

                    <iframe
                      className={classes.modal}
                      src={
                        props.candidateView
                          ?.candidateRecruiterDiscussionRecording
                      }
                      title="File"
                    ></iframe>
                    <div className={classes.center}>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {props.candidateView
                  ?.candidateAndTechPannelDiscussionRecording !== null &&
                  props.candidateView
                    ?.candidateAndTechPannelDiscussionRecording !== "" ? (
                  <div>
                    <div className={classes.center}>
                      <Typography
                        variant="subtitle2"
                        className={classes.inputRoot}
                      >
                        Candidate & Tech Panel discussion recording
                      </Typography>
                    </div>

                    <iframe
                      className={classes.modal}
                      src={
                        props.candidateView
                          ?.candidateAndTechPannelDiscussionRecording
                      }
                      title="File"
                    ></iframe>
                    <div className={classes.center}>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </Slider>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
        <ViewFiles
          docFile={docFile}
          fileType={fileType}
          fileOpen={fileOpen}
          handleFileClose={handleFileClose}
        />
    </>
  );
}
