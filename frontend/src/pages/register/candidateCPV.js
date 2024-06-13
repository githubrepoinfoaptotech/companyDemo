import React, { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Button,
  Backdrop,
  CircularProgress,
  SwipeableDrawer,
  Dialog,
  DialogContent,
  List,
  Divider,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  Toolbar,
  AppBar,
  TextField,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import Tooltip from "@material-ui/core/Tooltip";
import Lottie from 'lottie-react'
import handshakelottie from '../../images/handshake.json'
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import GetAppIcon from "@material-ui/icons/GetApp";
import moment from "moment";

import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";
import useStyles from "../../themes/style";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import JoditEditor from 'jodit-react';
import red from "@material-ui/core/colors/red";
import "react-toastify/dist/ReactToastify.css";
const positions = [toast.POSITION.TOP_RIGHT];

function CompanyRegister(props) {
  const search = props.location.search;
  const ContentRef = useRef();
  const candidateId = new URLSearchParams(search).get('candidateId');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [candidateView, setCandidateView] = useState({});

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
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

  const history = useHistory();

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

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().nullable().required("Parent or Group Companies Name is required"),
    webSiteUrl: Yup.string().nullable().required("WebSite Url is required"),
    jobDescription: Yup.string().nullable(),
    acknowledgement: Yup.bool().oneOf([true], 'Read and agree to the Job Description').required('Read and agree to the Job Description'),
    companyNameConfirmation: Yup.bool().oneOf([true], 'Give the confirmation').required('Give the confirmation'),
    jobTitle: Yup.string().nullable().required("Job Role Title is required"),
    currentLocation: Yup.string().nullable().required("Residing Location is required"),
    inProjectOrBench: Yup.string().required("In Project or Bench is required"),
    jobLocation: Yup.string().nullable().required("Job Role Location is required"),
    currentCompanyName: Yup.string().nullable().required("Current Company Name is required"),
    shiftTimings: Yup.string().nullable().required("Acceptance for Shifts is required"),
    noticePeriod: Yup.string().nullable().required("Can Join Within Days is required"),
    payrollOrContract: Yup.string().nullable().required("Direct Payroll or Contract is required"),
    currentCtcAndTakeHome: Yup.string().nullable().required("Your Current CTC is required"),
    expectedCtcAndTakeHome: Yup.string().nullable().required("Expected CTC is required"),
    currentTakeHome: Yup.string().nullable().required("Your Current Take Home is required"),
    expectedTakeHome: Yup.string().nullable().required("Expected Take Home is required"),
    modeOfWork: Yup.string().nullable().required("WFH/WFO/Hybrid is required"),
    existingOfferDetails: Yup.string().nullable().required("Existing Offer Details is required"),
    jobChangeReason: Yup.string().nullable().required("Reason for Job Change is required"),
    documentsAvailabilty: Yup.string().nullable().required("Confirm that on selection for Offer that you have all relevant documents in order to submit for Offer release and onboarding is required"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  const [loader, setLoader] = useState(false);
  // const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  // const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  // const handleScroll = () => {
  //   const editor = ContentRef.current;
  //   if (editor) {
  //     const { scrollTop, scrollHeight, clientHeight } = editor.editor;
  //     console.log(scrollTop, scrollHeight, clientHeight)
  //     if (scrollHeight - scrollTop === clientHeight) {
  //       setIsScrolledToBottom(true);
  //       alert("yes")
  //     }
  //   }
  // };

  // const handleCheckboxChange = (event) => {
  //   setIsCheckboxChecked(event.target.checked);
  // };

  function handleAdd(values) {
    if (ContentRef.current.value !== "") {
      return new Promise((resolve) => {
        setLoader(true);

        axios({
          method: "post",
          url: `${process.env.REACT_APP_SERVER}recruiter/candidateCpvForm`,
          data: {
            candidateId: candidateId,
            companyName: values.companyName,
            webSiteUrl: values.webSiteUrl,
            jobDescription: ContentRef.current.value,
            jobTitle: values.jobTitle,
            currentLocation: values.currentLocation,
            inProjectOrBench: values.inProjectOrBench,
            jobLocation: values.jobLocation,
            currentCompanyName: values.currentCompanyName,
            shiftTimings: values.shiftTimings,
            noticePeriod: values.noticePeriod,
            payrollOrContract: values.payrollOrContract,
            currentCtcAndTakeHome: `${values.currentCtcAndTakeHome}, ${values.currentTakeHome}`,
            expectedCtcAndTakeHome: `${values.expectedCtcAndTakeHome}, ${values.expectedTakeHome}`,
            modeOfWork: values.modeOfWork,
            existingOfferDetails: values.existingOfferDetails,
            jobChangeReason: values.jobChangeReason,
            documentsAvailabilty: values.documentsAvailabilty
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {

            if (response.data.status === true) {
              handleNotificationCall("success", response.data.message);

              reset();
              setTimeout(() => {
                history.push("/login");
              }, 2000);
            } else {
              handleNotificationCall("error", response.data.message);
            }
            setLoader(false);
            resolve();
          })
          .catch(function (error) {
            console.log(error);
          });
      });

    } else {

      handleNotificationCall("success", "Job Description is required");

    }

  }

  const [requirementsView, setRequirementsView] = useState({
    id: "",
    requirementName: "",
    clientId: "",
    skills: "",
    // orgRecruiterId: "",
    // orgRecruiterName: "",
    jobLocation: "",
    experience: "",
    uniqueId: "",
    clientUniqueId: "",
    clientName: "",
    gist: "",
    jd: "",
    hideFromInternal: "",
    modeOfWork: "",
    specialHiring: "",
    status: "",
    createdAt: "",
  });

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
          reset({
            companyName: response.data?.companyName,
            webSiteUrl: response.data?.companyWebsite,
            //  jobDescription: response.data.data.requirement?.gist,
            jobTitle: response.data.data.requirement?.requirementName,
            currentLocation: response.data.data.candidateDetail?.currentLocation,
            inProjectOrBench: "",
            jobLocation: response.data.data.requirement?.jobLocation,
            currentCompanyName: response.data.data.candidateDetail?.currentCompanyName,
            shiftTimings: "",
            noticePeriod: response.data.data.candidateDetail?.noticePeriod,
            payrollOrContract: "",
            currentCtcAndTakeHome: response.data.data.candidateDetail?.currentCtc,
            expectedCtcAndTakeHome: response.data.data.candidateDetail?.expectedCtc,
            modeOfWork: "",
            existingOfferDetails: "",
            jobChangeReason: response.data.data.candidateDetail?.reasonForJobChange,
            documentsAvailabilty: "",
          })

        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []);

  const joditConfig = useMemo((placeholder) => ({
    readonly: true,
    spellcheck: true,
    minHeight: 200,
    maxHeight: 300,
  }),
    []
  );

  const list = (anchor) =>
  (
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
                <Grid item xs={10} md={6}>
                  <Typography variant="subtitle1">
                    View Requirement - {requirementsView.requirementName}
                  </Typography>
                </Grid>

                <Grid item xs={2} lg={6} className={classes.drawerViewClose}>
                  <CloseIcon
                    className={classes.closeBtn}
                    size="14px"
                    onClick={toggleDrawer(anchor, false)}
                  />
                </Grid>
              </Grid>
            </CardHeader>

            <CardContent className={classes.drawerViewContent}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Typography className={classes.boldtext}>
                    Requirement Name:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  {requirementsView.requirementName +
                    " (" +
                    requirementsView.uniqueId +
                    ") "}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Parent or Group Companies Name:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  {requirementsView.clientName +
                    " (" +
                    requirementsView.clientUniqueId +
                    ") "}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Organization Recruiter Name:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  {requirementsView.orgRecruiterName}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Experience:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  {requirementsView.experience}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Skills:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  {requirementsView.skills}
                </Grid>


                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Location:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>   {requirementsView.jobLocation}
                </Grid>



                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Mode of work:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>   {requirementsView.modeOfWork}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Special hiring:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>   {requirementsView.specialHiring}
                </Grid>


                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Hide to Internal Employees:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  {requirementsView.hideFromInternal === true ? "YES" : "NO"}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    JD :
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <div className={classes.space + " " + classes.alignItemsEnd}  >


                    {requirementsView?.jd !== "https://liverefo.s3.amazonaws.com/" && requirementsView?.jd !== null ? <>
                      <Tooltip
                        title="View JD"
                        placement="bottom"
                        aria-label="view"
                      >
                        <RemoveRedEyeIcon
                          className={classes.toolIcon}
                          onClick={handleModalOpen}
                        />
                      </Tooltip>

                      <Tooltip
                        title="Downlaod JD"
                        placement="bottom"
                        aria-label="downlaod"
                      >
                        <a className={classes.messageContent} href={requirementsView?.jd} download>

                          <GetAppIcon className={classes.toolIcon} />
                        </a>
                      </Tooltip>
                    </> : ""}
                  </div>

                </Grid>


                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Requirement Gist:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div dangerouslySetInnerHTML={{ __html: requirementsView.gist }} style={{ height: "100px", overflowY: "scroll" }}></div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Typography className={classes.boldtext}>
                    Status:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  {requirementsView.status ? (
                    requirementsView.status.statusName === "ACTIVE" ? (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          className={classes.green + " " + classes.noPointer}
                        >
                          ACTIVE
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          className={classes.red + " " + classes.noPointer}
                        >
                          INACTIVE
                        </Button>
                      </>
                    )
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Posted Date:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  {moment(requirementsView.createdAt).format(
                    "DD-MM-YYYY",
                  )}
                </Grid>
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
                  onClick={toggleDrawer(anchor, false)}
                >
                  Close
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </List>
      </Box>

    </>
  );

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
                  <div className={classes.flexCenter} style={{ width: '100%' }}>
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
            {candidateView?.isCandidateCpv === true ?
              <Grid item xs={12} sm={8} md={8} lg={8}>
                <div style={{ background: '#F6F7FF' }}>
                  <Lottie loop={false} animationData={handshakelottie} style={{ width: '270px', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto' }} />
                  <p style={{ fontSize: "30px", textAlign: "center", fontFamily: '"IBM Plex Sans Condensed", sans-serif', fontWeight: '600', lineHeight: "36px", position: 'absolute', left: "50%", top: "65%", transform: 'translate(-50%, -50%)', color: '#10670e' }}>Thank you for your response</p>
                </div>
              </Grid>
              :
              <Grid item xs={12} sm={8} md={8} lg={8}>
                <form
                  onSubmit={handleSubmit(handleAdd)}
                  className={classes.formFields}
                >
                  <Grid
                    container
                    direction="row"
                    spacing={4}
                    className={classes.formBox}
                  >
                    <Grid item xs={12} >
                      <Typography className={classes.CPVHeading}>
                        Role Interest Confirmation given by {candidateView?.candidateDetail?.firstName + " " + candidateView?.candidateDetail?.lastName}
                      </Typography>
                      <Divider className={classes.mT10} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography>  Intersted for Job Opening</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="companyName">
                        Company Name
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true, readOnly: true }}
                          placeholder="Enter company name"
                          id="companyName"
                          name="companyName"
                          {...register("companyName")}
                          error={errors.companyName ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.companyName?.message}
                        </Typography>
                      </FormControl>
                      <FormControlLabel
                        className={classes.acknowledgementCheckBox}
                        control={
                          <Checkbox
                            name="companyNameConfirmation"
                            color="primary"
                            {...register("companyNameConfirmation")}
                            // onChange={handleCheckboxChange}
                            style={{ marginBottom: "5px" }}
                          />
                        }
                        label="I am interested."
                      />
                      <Typography variant="inherit" color="error">
                        {errors.companyNameConfirmation?.message}
                      </Typography>
                    </Grid>


                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography> Confirmation on seeing Company Website</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="webSiteUrl">
                        Website
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true, readOnly: true }}
                          placeholder="Enter website url"
                          id="webSiteUrl"
                          name="webSiteUrl"
                          {...register("webSiteUrl")}
                          error={errors.webSiteUrl ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.webSiteUrl?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography> Confirmation on reading Job Discription fully</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="jobDescription">
                        Job Description
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <JoditEditor
                          value={candidateView?.requirement?.gist}
                          tabIndex={1} // tabIndex of textarea
                          ref={ContentRef}
                          config={joditConfig}
                          className="job_description_cpv"
                        // onScroll={handleScroll}
                        />
                        <FormControlLabel
                          className={classes.acknowledgementCheckBox}
                          control={
                            <Checkbox
                              {...register("acknowledgement")}
                              name="acknowledgement"
                              color="primary"
                              // onChange={handleCheckboxChange}
                              style={{ marginBottom: "5px" }}
                            />
                          }
                          label="I have read, understand, and agree to the job role details mentioned above."
                        />
                        <Typography variant="inherit" color="error">
                          {errors.acknowledgement?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography> Interested for Job Role title</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="jobTitle">
                        Job Role Title
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true, readOnly: true }}
                          placeholder="Enter job title"
                          id="jobTitle"
                          name="jobTitle"
                          {...register("jobTitle")}
                          error={errors.jobTitle ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.jobTitle?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography> Interested for Job Role Responsibilities</Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <InputLabel shrink htmlFor="jobResponsibilities">
                      Job Responsibilities
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <Grid item xs={3} >
                        <Button
                          variant="contained"
                          className={classes.button}
                          color="primary"
                          size="small"
                          startIcon={<DescriptionIcon />}
                          aria-label="upload JD"
                          component="span"
                          onClick={() => {
                            viewRequirement(candidateView?.requirement?.id);
                          }}
                        >
                          View
                        </Button>
                      </Grid>

                    </FormControl>
                  </Grid> */}

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography> Confirmation that you are residing in Location</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="currentLocation">
                        Mention Residing Location
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter candidate residing location"
                          id="currentLocation"
                          name="currentLocation"
                          {...register("currentLocation")}
                          error={errors.currentLocation ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.currentLocation?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography> Interested for Job Role location and willing to relocate if not in same location</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="jobLocation">
                        Job Role Location
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true, readOnly: true }}
                          placeholder="Enter job location"
                          id="jobLocation"
                          name="jobLocation"
                          {...register("jobLocation")}
                          error={errors.jobLocation ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.jobLocation?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography> Confirmation on your employment with current Company or not working now</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="currentCompanyName">
                        Current Company Name
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter candidate current company or enter inbetween jobs"
                          id="currentCompanyName"
                          name="currentCompanyName"
                          {...register("currentCompanyName")}
                          error={errors.currentCompanyName ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.currentCompanyName?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography> Confirmation that you are in Project and not in Bench in current Role</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="inProjectOrBench">
                        In Project or Bench
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter in project or bench"
                          id="inProjectOrBench"
                          name="inProjectOrBench"
                          {...register("inProjectOrBench")}
                          error={errors.inProjectOrBench ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.inProjectOrBench?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography> Confirmation to work on Shifts as per the Job Role</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="shiftTimings">
                        Acceptance for Shifts
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter shift timings or normal shift"
                          id="shiftTimings"
                          name="shiftTimings"
                          {...register("shiftTimings")}
                          error={errors.shiftTimings ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.shiftTimings?.message}
                        </Typography>
                      </FormControl>
                    </Grid>




                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography> Confirmation to Join within days and last working day if in notice period</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="noticePeriod">
                        Can Join Within Days
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter notice period or last working date"
                          id="noticePeriod"
                          name="noticePeriod"
                          {...register("noticePeriod")}
                          error={errors.noticePeriod ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.noticePeriod?.message}
                        </Typography>
                      </FormControl>
                    </Grid>



                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography> Confirmation on Direct Payroll or on Contract with 3rd Party Vendor</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="payrollOrContract">
                        Direct Payroll or Contract
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter direct payroll or contract"
                          id="payrollOrContract"
                          name="payrollOrContract"
                          {...register("payrollOrContract")}
                          error={errors.payrollOrContract ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.payrollOrContract?.message}
                        </Typography>
                      </FormControl>
                    </Grid>



                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography> Confirmation on your Current CTC and Take Home Salary</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="currentCtcAndTakeHome">
                        Your Current CTC & Take Home
                      </InputLabel>

                      <Grid container direction="row" spacing={2}    >
                        <Grid item xs={6} >
                          <FormControl className={classes.margin}>
                            <TextField
                              size="small"
                              classes={{ root: classes.customTextField }}
                              InputProps={{ disableUnderline: true }}
                              placeholder="Enter current ctc"
                              id="currentCtcAndTakeHome"
                              name="currentCtcAndTakeHome"
                              {...register("currentCtcAndTakeHome")}
                              error={errors.currentCtcAndTakeHome ? true : false}
                            />

                            <Typography variant="inherit" color="error">
                              {errors.currentCtcAndTakeHome?.message}
                            </Typography>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} >
                          <FormControl className={classes.margin}>
                            <TextField
                              size="small"
                              classes={{ root: classes.customTextField }}
                              InputProps={{ disableUnderline: true }}
                              placeholder="Enter current take home"
                              id="currentTakeHome"
                              name="currentTakeHome"
                              {...register("currentTakeHome")}
                              error={errors.currentTakeHome ? true : false}
                            />
                            <Typography variant="inherit" color="error">
                              {errors.currentTakeHome?.message}
                            </Typography>
                          </FormControl>
                        </Grid>
                      </Grid>


                    </Grid>





                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography> Confirmation on your Expected CTC and Take Home Salary</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="expectedCtcAndTakeHome">
                        Expected CTC & Take Home
                      </InputLabel>

                      <Grid container direction="row" spacing={2}      >
                        <Grid item xs={6} >
                          <FormControl className={classes.margin}>
                            <TextField
                              size="small"
                              classes={{ root: classes.customTextField }}
                              InputProps={{ disableUnderline: true }}
                              placeholder="Enter expected ctc"
                              id="expectedCtcAndTakeHome"
                              name="expectedCtcAndTakeHome"
                              {...register("expectedCtcAndTakeHome")}
                              error={errors.expectedCtcAndTakeHome ? true : false}
                            />

                            <Typography variant="inherit" color="error">
                              {errors.expectedCtcAndTakeHome?.message}
                            </Typography>
                          </FormControl>
                        </Grid>

                        <Grid item xs={6} >
                          <FormControl className={classes.margin}>
                            <TextField
                              size="small"
                              classes={{ root: classes.customTextField }}
                              InputProps={{ disableUnderline: true }}
                              placeholder="Enter expected take home"
                              id="expectedTakeHome"
                              name="expectedTakeHome"
                              {...register("expectedTakeHome")}
                              error={errors.expectedTakeHome ? true : false}
                            />

                            <Typography variant="inherit" color="error">
                              {errors.expectedTakeHome?.message}
                            </Typography>
                          </FormControl>
                        </Grid>
                      </Grid>

                    </Grid>



                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography> Confirmation on Work from Home, Work from Office, Hybrid</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="modeOfWork">
                        WFH/WFO/Hybrid
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter WFH/WFO/Hybrid"
                          id="modeOfWork"
                          name="modeOfWork"
                          {...register("modeOfWork")}
                          error={errors.modeOfWork ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.modeOfWork?.message}
                        </Typography>
                      </FormControl>
                    </Grid>


                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography> Confirmation on your Existing Offer details</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="existingOfferDetails">
                        Existing Offer Details
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter existing offer details"
                          id="existingOfferDetails"
                          name="existingOfferDetails"
                          {...register("existingOfferDetails")}
                          error={errors.existingOfferDetails ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.existingOfferDetails?.message}
                        </Typography>
                      </FormControl>
                    </Grid>



                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography> Confirmation on reason for Job Change</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="jobChangeReason">
                        Reason for Job Change
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter reason for job change"
                          id="jobChangeReason"
                          name="jobChangeReason"
                          {...register("jobChangeReason")}
                          error={errors.jobChangeReason ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.jobChangeReason?.message}
                        </Typography>
                      </FormControl>
                    </Grid>



                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography> Confirm that on selection for Offer that you have all relevant documents in-order to submit for Offer release and onboarding</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      {/* <InputLabel shrink htmlFor="documentsAvailabilty">
                    Reason for Job Change
                    </InputLabel> */}
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Yes, I have"
                          id="documentsAvailabilty"
                          name="documentsAvailabilty"
                          {...register("documentsAvailabilty")}
                          error={errors.documentsAvailabilty ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.documentsAvailabilty?.message}
                        </Typography>
                      </FormControl>
                    </Grid>


                    <Grid item xs={12} className={classes.regBtn}>
                      <Typography>I Confirm all above details</Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                        disabled={isSubmitting}
                        style={{ marginTop: '10px' }}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            }
          </Grid>


          <SwipeableDrawer
            anchor="right"
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
            classes={{ paper: classes.drawer }}
          >
            {list("right")}
          </SwipeableDrawer>



          <Dialog
            aria-labelledby="dialog-title"
            onClose={handleModalClose}
            open={modalOpen}
            width="lg"
            maxWidth="lg"
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

                    JD
                  </Typography>
                  <div className={classes.drawerClose}>
                    <CloseIcon className={classes.closeBtn} onClick={handleModalClose} />
                  </div>
                </div>
                <div className={classes.iframediv}>
                  <iframe
                    src={
                      "https://docs.google.com/a/umd.edu/viewer?url=" +
                      requirementsView?.jd +
                      "&embedded=true"
                    }
                    title="File"
                    width="100%"
                    height="500"
                  >

                  </iframe>

                  <div className={classes.iframeLogo} >
                  </div>
                </div>

                <div className={classes.sendWhatsapp + " " + classes.inputRoot}>
                  <Button variant="contained" size="small" color="secondary" onClick={handleModalClose}>
                    Close
                  </Button>
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

export default CompanyRegister;
function CloseButton({ closeToast, className }) {
  return <CloseIcon className={className} onClick={closeToast} />;
}
