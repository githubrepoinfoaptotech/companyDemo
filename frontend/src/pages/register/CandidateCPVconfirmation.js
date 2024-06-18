import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
} from "@material-ui/core";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  Toolbar,
  AppBar,
} from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import Lottie from 'lottie-react'
import handshakelottie from '../../images/handshake.json'
import axios from "axios";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";
import useStyles from "../../themes/style";
import { useLocation } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import red from "@material-ui/core/colors/red";
import "react-toastify/dist/ReactToastify.css";
const positions = [toast.POSITION.TOP_RIGHT];

function CandidateCPVconfirmation() {
  const { search } = useLocation()
  const candidateId = new URLSearchParams(search).get('candidateId');
  const [modalOpen, setModalOpen] = useState(false);
  const [candidateView, setCandidateView] = useState({});
  const [cpvForm, setCpvForm] = useState([]);
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MuiAvatar: {
          root: {
            fontFamily: '"Satoshi"',
          },
        },
        MuiMenuItem: {
          root: {
            fontFamily: '"Satoshi"',
          },
        },
        MUIDataTableToolbar: {
          actions: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          },
          icon: {
            color: "#064be2",
            "& svg": {
              color: "white",
              width: "25px",
              cursor: "pointer",
              height: "25px",
              padding: "5px",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3)",
              borderRadius: "100%",
              backgroundColor: "#064be2",
            },
          },

          iconActive: {
            color: "#064be2",
            "& svg": {
              color: "white",
              width: "25px",
              cursor: "pointer",
              height: "25px",
              padding: "5px",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3)",
              borderRadius: "100%",
              backgroundColor: "#064be2",
            },
          },
        },
        MUIDataTableBody: {
          emptyTitle: {
            "@media (max-width: 425px)": {
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            },
            "@media (max-width: 959.95px)": {
              marginLeft: "-100px",
            },
          },
        },

        MUIDataTableBodyCell: {
          stackedCommon: {
            "@media (max-width:959.95px)": {
              fontSize: "13px !important",
              "&:nth-last-child(2)": { fontWeight: 700 },
              "&:last-child": { lineBreak: "anywhere" },
            },
          },
          responsiveStackedSmallParent: {
            "@media (max-width:425px)": { width: "93%" },
          },
        },
        MuiTable: {
          root: {
            "& caption": { fontFamily: '"Satoshi" !important' },
          },
        },
        MuiBadge: {
          badge: {
            height: "30px!important",
            fontFamily: '"Satoshi" !important',
          },
          colorSecondary: {
            backgroundColor: red[500] + "!important",
          },
          anchorOriginTopLeftCircular: {
            top: "14%",
            left: "-21px",
            inlineSize: "max-content",
          },
        },
        MuiTableCell: {
          head: {
            color: "#121224",
            backgroundColor: "#f0f5f9 !important",
            fontSize: "15px !important",
            fontWeight: "bold",
            letterSpacing: "0.02em",
          },
          body: {
            color: "#121224",
            fontFamily: '"Satoshi" !important',
            fontSize: "13.5px !important",
            "&:last-child": { whiteSpace: "nowrap" },
          },

          root: {
            padding: "14px",
            fontFamily: '"Satoshi" !important',
          },
          paddingCheckbox: {
            "@media (max-width:959.95px)": { width: "10px" },
          },
        },
        MuiList: {
          padding: {
            paddingBottom: "0px !important",
          },
        },
        MuiListItem: {
          secondaryAction: {
            paddingRight: "45px !important",
          },
        },
        MuiSelect: {
          select: {
            "&:focus": { backgroundColor: "none !important" },
          },
        },

        MuiTableRow: {
          root: {
            "&:nth-of-type(odd)": { backgroundColor: "white" },
            "&:nth-of-type(even)": { backgroundColor: "#f0f5f9" },
          },
        },

        MuiIconButton: {
          root: {
            padding: "9px",
          },
        },

        MuiTypography: {
          subtitle1: {
            fontSize: "1rem",
            fontWeight: "500",
            fontFamily: '"Satoshi" !important',
            "@media (max-width:959.95px)": { fontSize: "0.9rem !important" },
          },
          subtitle2: {
            fontWeight: "500",
            fontFamily: '"Satoshi" !important',
            textAlign: "center",
            padding: "10px",
            fontSize: "21px",
            "@media (max-width:959.95px)": {
              fontSize: "calc(1.1rem) !important",
            },
          },
          body1: {
            fontFamily: '"Satoshi" !important',
            fontSize: "14px",
            "@media (max-width:959.95px)": { fontSize: "13px !important" },
          },
          body2: {
            color: "#121224",
            fontFamily: '"Satoshi" !important',
            fontSize: "14px",
            "@media (max-width:959.95px)": { fontSize: "13px !important" },
          },
          h5: {
            color: "#121224",
            fontFamily: '"Satoshi" !important',
            fontSize: "14px",
            "@media (max-width:959.95px)": {
              fontSize: "calc(1.1rem) !important",
            },
          },
          h6: {
            color: "#121224",
            fontFamily: '"Satoshi" !important',
            fontSize: "14px",
            "@media (max-width:959.95px)": {
              fontSize: "calc(1.1rem) !important",
            },
          },
        },
        MuiPaper: {
          elevation4: {
            boxShadow: "none",
          },
        },

        MuiDialog: {
          paper: {
            margin: "15px !important",
            border: "1px solid #000 !important",
          },
        },

        MuiFab: {
          root: {
            "&:hover": {
              backgroundColor: "064be2 !important",
            },
          },
        },
        MuiButton: {
          root: {
            fontFamily: '"Satoshi !important"',
            fontSize: "14px",
            fontWeight: 500,
            boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3) !important",
            "@media (max-width:959.95px)": { fontSize: "10px !important" },
          },
          label: {
            fontFamily: '"Satoshi" !important',
            fontSize: "14px",
            "@media (max-width:959.95px)": { fontSize: "10px !important" },
          },
          containedPrimary: {
            backgroundColor: "#064be2 !important",
            textTransform: "initial !important",
            "&:active": {
              backgroundColor: "#064be2 !important",
              color: "#fff !important",
            },
            "&:hover": {
              backgroundColor: "#064be2 !important",
              color: "#fff !important",
            },
            "&:disabled": {
              backgroundColor: "#064be2c7 !important",
              color: "#fff !important",
            },
          },
          containedSizeSmall: {
            textTransform: "initial !important",
            padding: "4px 10px !important",
            fontWeight: "300 !important",
            height: "fit-content !important",
          },
          containedSecondary: {
            backgroundColor: red[500] + "!important",
            "&:active": {
              backgroundColor: red[500] + "!important",
              color: "#fff !important",
            },
            "&:hover": {
              backgroundColor: red[500] + "!important",
              color: "#fff !important",
            },
          },
        },
        MuiFormLabel: {
          root: {
            fontFamily: '"Satoshi" !important',
            fontSize: "20px",
            "@media (max-width:959.95px)": { fontSize: "15px !important" },
            color: "rgba(0, 0, 0, 0.87)",
          },
        },
        MuiCheckbox: {
          root: {
            color: "#bcbdbf",
          },
        },
        MuiFormControl: {
          root: {
            width: "100%",
          },
        },
        MuiTooltip: {
          tooltip: {
            fontFamily: '"Satoshi" !important',
          },
          // popper:{
          //   top: "-34px !important",
          //   left: '-45px !important'
          // }
        },
        MuiInputBase: {
          root: {
            width: "100%",
          },
          input: {
            width: "100%",
            border: "none",
            fontSize: "13px",
            display: "block",
            padding: "10px 12px !important",

            borderRadius: "4px",
          },
        },

        MuiAutocomplete: {
          input: {
            width: "100% !important",
          },
        },

        MuiFilledInput: {
          root: {
            width: "100%",
            display: "block",
            padding: "0px 25px 0px 0px !important",
            position: "relative",
            fontSize: "13px",
            marginTop: "24px",

            backgroundColor: "white",
            "&:hover": { backgroundColor: "unset !important" },
            "&.Mui-focused": { backgroundColor: "unset !important" },
          },

          underline: {
            "&&&:before": { borderBottom: "none" },
            "&&:after": { borderBottom: "none" },
          },
          inputAdornedEnd: {
            border: "1px solid #ced4da",
          },
        },

        MuiOutlined: {
          MuiChip: {
            avatar: { margin: "0px" },
          },
        },

        MuiCardContent: {
          root: {
            marginBottom: "10px !important",
            "&:last-child": { paddingBottom: "0px" },
          },
        },
        MuiCardActions: {
          root: {
            marginBottom: "1px !important",
            // padding: "0px",
            // marginBottom: "20px",
            // "@media (max-width:959.95px)": {
            //   marginBottom: "1px !important",
            // },
          },
        },

        MuiDrawer: {
          paperAnchorBottom: {
            width: "50%",
            left: "30%",
            bottom: "10%",
          },
          paper: {
            overflowY: "auto",
            overflowX: "hidden",
          },
        },
        MuiDialogTitle: {
          root: {
            padding: "0px 10px !important",
          },
        },

        MuiChip: {
          avatar: {
            width: "50px !important",
            height: "50px !important",
            fontSize: "1.5rem !important",
            margin: "0px",
          },
        },
        MuiInputLabel: {
          shrink: {
            width: "max-content",
            display: "initial !important",
            transformOrigin: "top left !important",
            fontSize: "16px",
          },
        },
      },

      MuiFormGroup: {
        row: {
          marginTop: "10px !important",
        },
      },
    });

  function fetchCPVData() {
    setLoader(true)
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/viewCpv`,
      data: {
        candidateId: candidateId,
      },
      headers: {
        "Content-Type": "application/json",
        // Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setCpvForm(response.data.data);
        } else {
          handleNotificationCall("error", response.data.message)
        }
        setLoader(false)
      })
      .catch(function (error) {
        setLoader(false)
        console.log(error);
      });
  }

  function handleSendConfirmation(acceptance) {
    setLoader(true)
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}auth/reciveCandidateConformation`,
      data: {
        id: cpvForm.id,
        candidateConformation: acceptance
      },
      headers: {
        "Content-Type": "application/json",
        // Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setCpvForm(response.data.data);
          fetchCPVData()
          handleModalClose()
        } else {
          handleNotificationCall("error", response.data.message)
        }
        setLoader(false)
      })
      .catch(function (error) {
        setLoader(false)
        console.log(error);
      });
  }

  var [errorToastId, setErrorToastId] = useState(null);
  var [notificationsPosition] = useState(2);

  const theme = useTheme();
  const classes = useStyles();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

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
      position: positions[notificationsPosition],
      progressClassName: classes.progress,
      onClose: notificationType === "error" && (() => setErrorToastId(null)),
      className: classes.notification,
    });

    if (notificationType === "error") setErrorToastId(toastId);
  }

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchCPVData();
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []);

  useEffect(() => {
    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}auth/viewCandidateOpen`,
      data: {
        id: new URLSearchParams(search).get('candidateId'),
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setCandidateView(response.data.data);
          setLoader(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []);


  return (
    <div className={classes.backgroundColor}>
      <MuiThemeProvider theme={getMuiTheme()}>
        <>
          <AppBar className={classes.appBarBg}>
            <Toolbar className={classes.toolbarLP}>
              {isMatch ? (
                <>
                  <div className={classes.refoTitleMobile}>
                    <p className="refo-name">refo</p>
                  </div>
                  <div className={classes.flexCenter} style={{width:'100%'}}>
                    <div class="refo-full-name">
                      <h1>refo<span>recruiter essentials & faster outcomes</span></h1>
                    </div>
                  </div>
                  {/* <DrawerComp /> */}
                </>
              ) : (
                <Grid className={classes.gridCenter} container spacing={2}>
                  <Grid item xs={1} md={1} className={classes.refoTitle}>
                    <p className="refo-name">refo</p>
                  </Grid>
                  <Grid item xs={11} md={11} className={classes.flexCenter}>
                    <div class="refo-full-name">
                      <h1>refo<span>recruiter essentials & faster outcomes</span></h1>
                    </div>
                  </Grid>
                </Grid>
              )}
            </Toolbar>
          </AppBar>

          <Grid container direction="row" justifyContent={"center"}>
            <Grid item xs={12} sm={10} md={10} lg={10} style={{ paddingTop: '5rem' }}>
              <Grid container direction="row" spacing={2}>
                {cpvForm?.candidateConformation === true ?
                  <div style={{ background: '#F6F7FF' }}>
                    <Lottie loop={false} animationData={handshakelottie} style={{ width: '270px', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto' }} />
                    <p style={{ fontSize: "30px", textAlign: "center", fontFamily: '"IBM Plex Sans Condensed", sans-serif', fontWeight: '600', lineHeight: "36px", position: 'absolute', left: "50%", top: "65%", transform: 'translate(-50%, -50%)', color: '#10670e' }}>Thank you for your acceptance</p>
                  </div>
                  :
                  <div style={{ padding: "0px 25px" }}>
                    <div className={classes.center}>
                      <Typography
                        variant="subtitle2"
                        className={
                          classes.inputRoot + " " + classes.probingTitle
                        }
                      >
                        Candidate Probing & Validation Form
                      </Typography>
                      {/* <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      style={{ position: 'absolute', right: 10, top: 10 }}
                      onClick={(e) => {
                        window.open(
                          `https://api.whatsapp.com/send?phone=+${candidateView.candidateDetail?.mobile
                          }&text="Hi ${candidateView.candidateDetail?.firstName +
                          "" +
                          candidateView.candidateDetail?.lastName
                          }, view link and confirm ${process.env.REACT_APP_SITE
                          }v1/%23/candidateCPV?candidateId=${candidateView?.id
                          }"`,
                        );
                      }}
                    >
                      {`Copy link to get ${candidateView.candidateDetail?.firstName} ${candidateView.candidateDetail?.lastName} Confirmation`}
                    </Button> */}
                    </div>
                    <Grid
                      container
                      direction="row"
                      spacing={2}
                    >
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle1"
                          style={{ fontSize: "1.2rem", textAlign: "center" }}
                        >
                          {`${candidateView.candidateDetail?.firstName} ${candidateView.candidateDetail?.lastName} Responses`}
                        </Typography>

                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>Intersted for Job Opening</Typography>
                      </Grid>

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        {cpvForm?.companyName}
                      </Grid>
                      <Grid item xs={12} sm={2} md={2} lg={2}>
                        <span className={`${classes.greenColor} `}>
                          {cpvForm?.companyName !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation on seeing Company Website
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        {cpvForm?.webSiteUrl}
                      </Grid>
                      <Grid item xs={12} sm={2} md={2} lg={2}>
                        <span className={classes.greenColor}>
                          {cpvForm?.webSiteUrl !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>Interested for Job Role title</Typography>
                      </Grid>

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        {cpvForm?.jobTitle}
                      </Grid>

                      <Grid item xs={12} sm={2} md={2} lg={2}>
                        <span className={classes.greenColor}>
                          {cpvForm?.jobTitle !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography>
                        Interested for Job Role Responsibilities
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      {cpvForm?.jobResponsibilities}
                    </Grid> 

                    <Grid item xs={12} sm={2} md={2} lg={2}>
                      <span className={classes.greenColor}>
                        {cpvForm?.jobResponsibilities !== null ? "Yes" : ""}
                      </span>
                    </Grid>*/}

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation that you are residing in Location
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        {cpvForm?.currentLocation}
                      </Grid>

                      <Grid item xs={12} sm={2} md={2} lg={2}>
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

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        {cpvForm?.jobLocation}
                      </Grid>

                      <Grid item xs={12} sm={2} md={2} lg={2}>
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

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        {cpvForm?.currentCompanyName}
                      </Grid>
                      <Grid item xs={12} sm={2} md={2} lg={2}>
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

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        {cpvForm?.inProjectOrBench}
                      </Grid>
                      <Grid item xs={12} sm={2} md={2} lg={2}>
                        <span className={classes.greenColor}>
                          {cpvForm?.inProjectOrBench !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation to work on Shifts as per the Job Role
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        {cpvForm?.shiftTimings}
                      </Grid>
                      <Grid item xs={12} sm={2} md={2} lg={2}>
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

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        {cpvForm?.noticePeriod}
                      </Grid>
                      <Grid item xs={12} sm={2} md={2} lg={2}>
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

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        {cpvForm?.payrollOrContract}
                      </Grid>

                      <Grid item xs={12} sm={2} md={2} lg={2}>
                        <span className={classes.greenColor}>
                          {cpvForm?.payrollOrContract !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation on your Current CTC and Take Home Salary
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Typography>
                            Current CTC : {cpvForm?.currentCtcAndTakeHome?.split(", ")[0]}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Typography>
                            Current Take Home: {cpvForm?.currentCtcAndTakeHome?.split(", ")[1]}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={2} md={2} lg={2}>
                        <span className={classes.greenColor}>
                          {cpvForm?.currentCtcAndTakeHome !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation on your Expected CTC and Take Home Salary
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Typography>
                            Expected CTC : {cpvForm?.expectedCtcAndTakeHome?.split(", ")[0]}

                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Typography>
                            Expected Take Home: {cpvForm?.expectedCtcAndTakeHome?.split(", ")[1]}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={2} md={2} lg={2}>
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

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        {cpvForm?.modeOfWork}
                      </Grid>
                      <Grid item xs={12} sm={2} md={2} lg={2}>
                        <span className={classes.greenColor}>
                          {cpvForm?.modeOfWork !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation on your Existing Offer details
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        {cpvForm?.existingOfferDetails}
                      </Grid>

                      <Grid item xs={12} sm={2} md={2} lg={2}>
                        <span className={classes.greenColor}>
                          {cpvForm?.existingOfferDetails !== null ? "Yes" : ""}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>
                          Confirmation on reason for Job Change
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        {cpvForm?.jobChangeReason}
                      </Grid>
                      <Grid item xs={12} sm={2} md={2} lg={2}>
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

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        {cpvForm?.documentsAvailabilty}
                      </Grid>
                      <Grid item xs={12} sm={2} md={2} lg={2}>
                        <span className={classes.greenColor}>
                          {cpvForm?.documentsAvailabilty !== null ? "Yes" : ""}
                        </span>
                      </Grid>
                      <div style={{
                        margin: "15px auto",
                      }}>
                        <Button variant="contained" size="small" style={{ background: '#06D001', color: '#fff' }} onClick={handleModalOpen}>
                          Accept
                        </Button>
                      </div>
                    </Grid>
                  </div>
                }
              </Grid>
            </Grid>
          </Grid>


          <Dialog
            aria-labelledby="dialog-title"
            onClose={handleModalClose}
            open={modalOpen}
            width="sm"
            maxWidth="sm"
            PaperProps={{
              style: {
                width: "100%",
              },
            }}
          >
            <DialogContent className={classes.center}>
              <Grid container direction="row" spacing={2}>
                <div className={classes.heading + " " + classes.inputRoot}>
                  <Typography variant="subtitle2" className={classes.inputRoot}>
                    Confirmation
                  </Typography>
                  <div className={classes.drawerClose}>
                    <CloseIcon className={classes.closeBtn} onClick={handleModalClose} />
                  </div>
                </div>
                <Divider />
                <div style={{ display: "flex", flexDirection: 'column', gap: '5px', width: "100%" }}>
                  <div style={{ padding: '0px 10px' }}>
                    I confirm all the above details are verfied by me
                  </div>
                  <div style={{ margin: "10px 15px", flex: 1, display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Button variant="contained" size="small" style={{ background: '#06D001', color: '#fff' }} onClick={() => handleSendConfirmation(true)}>
                      Accept
                    </Button>
                    <Button variant="contained" size="small" color="secondary" onClick={handleModalClose}>
                      Close
                    </Button>
                  </div>
                </div>
              </Grid>
            </DialogContent>
          </Dialog>


          <ToastContainer
            closeButton={
              <CloseButton className={classes.notificationCloseButton} />
            }
            closeOnClick={false}
            hideProgressBar={true}
          />
          <Backdrop className={classes.backdrop} open={loader}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      </MuiThemeProvider>
    </div>
  );
}

export default CandidateCPVconfirmation;
function CloseButton({ closeToast, className }) {
  return <CloseIcon className={className} onClick={closeToast} />;
}
