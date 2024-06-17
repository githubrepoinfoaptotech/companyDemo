import React from "react";
import { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  Toolbar,
  AppBar,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { ToastContainer } from "react-toastify";

import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";
import useStyles from "../../themes/style";
import DrawerComp from "./DrawerComp";
import { TagsInput } from "react-tag-input-component";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import icon1 from "../../images/dashboard/home.png";
import { useHistory } from "react-router-dom";
import moment from "moment";
import CloseIcon from "@material-ui/icons/Close";

import red from "@material-ui/core/colors/red";
import "react-toastify/dist/ReactToastify.css";
import "./register.css"
const positions = [toast.POSITION.TOP_RIGHT];

function Register() {
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

  const [clientData, setClientData] = useState([]);

  const handle = (e) => {
    const value = [];
    e.map((name) => (name !== " " ? value.push(name) : ""));
    setClientData(value);
  };
  const years = Array.from(
    { length: 60 },
    (_, i) => moment(new Date()).format("YYYY") - i,
  );

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

  const [state, setState] = React.useState({
    JobPortal: false,
    SocialMedia: false,
    Reference: false,
    OthersMention: false,
    OthersMentionValue: "",
    contractStaffing: "",
    minimumCadidatePlacementFee: "",
    foundedIn: "",
    hiringSupport: "",
  });

  const handleCheckChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const validationSchema = Yup.object().shape({
    companyName: Yup.string()
      .max(255)
      .required("Name of your Company is required"),
    foundedIn: Yup.string().required("Founded In is required"),
    firstName: Yup.string()
      .max(255)
      .required("First Name is required")
      .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: "First Name be Alphanumeric",
      }),
    lastName: Yup.string()
      .max(255)
      .required("Last Name is required")
      .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: "Last Name be Alphanumeric",
      }),
    mobile: Yup.string()
      .required("Mobile is required")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a Valid Email Address"),
    presentLocation: Yup.string().required("Present Location is required"),
    branches: Yup.string().required("Branches is required"),
    recruiterStrength: Yup.string().required("Recruiter Strength is required"),
    hiring_SDE: Yup.string().required(
      "Hiring - Strength Domain Expertise is required",
    ),
    recruiterCoreSkills: Yup.string().required(
      "Recruiter's Core Skills (Sourcing Strength) is required",
    ),
    minimumCadidatePlacementFee: Yup.string().required(
      "Your Minimum Commercial Fee per Candidate Placement is required",
    ),
    contractStaffing: Yup.string().required("Contract Staffing is required"),
    minimumMarkup: Yup.string(),
    using_ATS: Yup.string().required("Mention ATS Details is required"),
    hiringSupport: Yup.string().required(
      "What kind of Hiring Support? (Kind of People you Source) is required",
    ),
    otherHiringSupport: Yup.string(),
    clientList: Yup.string(),
    profileSource:
      state.JobPortal === true ||
      state.SocialMedia === true ||
      state.Reference === true ||
      state.OthersMention === true
        ? Yup.string()
        : Yup.string().required("From where will you Source Profile"),
    gst: Yup.string(),
    countries: Yup.string().required(
      "Countries you provide Hiring Support is required",
    ),
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

  const [testimonialsFields, setTestimonialsFields] = useState([
    {
      testimonials: "",
    },
  ]);

  const testimonialsAdd = () => {
    setTestimonialsFields([
      ...testimonialsFields,
      {
        testimonials: "",
      },
    ]);
  };

  const testimonialsRemove = (index) => {
    if (testimonialsFields.length !== -1) {
      const values = [...testimonialsFields];
      values.splice(-1);
      setTestimonialsFields(values);
    }
  };

  const testimonialsChange = (event, index) => {
    const values = [...testimonialsFields];
    values[index][event.target.name] = event.target.value;
    setTestimonialsFields(values);
  };

  function handleAdd(values) {
    return new Promise((resolve) => {
      setLoader(true);
      var profileSource =
        state.JobPortal === true
          ? "Job Portal, "
          : "" + state.SocialMedia === true
          ? "Social Media, "
          : "" + state.Reference === true
          ? "Reference, "
          : "" + state.OthersMention === true
          ? state.OthersMentionValue
          : "";
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}auth/companyregisteration`,
        data: {
          companyName: values.companyName,
          foundedIn: values.foundedIn,
          firstName: values.firstName,
          lastName: values.lastName,
          mobile: values.mobile,
          email: values.email,
          presentLocation: values.presentLocation,
          branches: values.branches,
          recruiterStrength: values.recruiterStrength,
          hiring_SDE: values.hiring_SDE,
          recruiterCoreSkills: values.recruiterCoreSkills,
          minimumCadidatePlacementFee: values.minimumCadidatePlacementFee,
          contractStaffing: values.contractStaffing,
          minimumMarkup: values.minimumMarkup,
          clientList: clientData,
          profileSource: profileSource,
          using_ATS: values.using_ATS,
          hiringSupport: state.hiringSupport,
          otherHiringSupport: values.otherHiringSupport,
          clientTestimonial: testimonialsFields,
          countriesHiringSupport: values.countries,
          gst: values.gst,
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
  }

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
                  <DrawerComp />
                </>
              ) : (
                <Grid className={classes.gridCenter} container spacing={2}>
                  <Grid item xs={1} md={1} className={classes.refoTitle}>
                    <p className="refo-name">refo</p>
                  </Grid>
                  <Grid item xs={9} md={7} className={classes.flexCenter}>
                    <nav>
                      <ul>
                        <li className="list">
                          
                          <a href={`${process.env.REACT_APP_SITE}`}>
                            <img src={icon1} alt="Home" /> Home
                          </a>
                        </li>
                        <li className="list">
                          <a href={`${process.env.REACT_APP_SITE}`}>
                            Why refo
                          </a>
                        </li>
                        <li className="list">
                          <a href={`${process.env.REACT_APP_SITE}`}>
                            Customer Experience
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </Grid>

                  <Grid item xs={2} md={4} className={classes.loginContainer}>
                    <Box className="registration_firm">
                      <a
                        href={`${process.env.REACT_APP_SITE}/v1/#/register`}
                        className="iconBlink"
                      >
                        List your consultancy
                      </a>
                    </Box>
                    <div className={classes.regLoginContainer}>
                      <p
                        className={classes.beta}
                      >
                        Beta
                      </p>
                      <Box>
                        <a
                          href={`${process.env.REACT_APP_SITE}/v1/#/login`}
                          className={classes.btnLogin}
                        >
                          Login
                        </a>
                      </Box>
                    </div>
                  </Grid>
                </Grid>
              )}
            </Toolbar>
          </AppBar>

          <Grid container direction="row"  justifyContent={"center"}>
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
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <InputLabel shrink htmlFor="companyName">
                      Name of your Company
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        size="small"
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        placeholder="Enter name of your Company"
                        id="companyName"
                        name="companyName"
                        {...register("companyName")}
                        error={errors.companyName ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.companyName?.message}
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <InputLabel shrink htmlFor="foundedIn">
                      Founded In (Year)
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <Select
                        name="foundedIn"
                        value={state.foundedIn}
                        {...register("foundedIn")}
                        error={errors.foundedIn ? true : false}
                        classes={{
                          root: classes.customSelectField,
                          icon: classes.customSelectIcon,
                        }}
                        disableUnderline
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        {years.reverse().map((item, index) => {
                          return [<MenuItem value={item}>{item}</MenuItem>];
                        })}
                      </Select>

                      <Typography variant="inherit" color="error">
                        {errors.foundedIn?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <InputLabel shrink htmlFor="firstName">
                      Name of the Proprietor / CEO / Principal Consultant / Head
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            classes={{ root: classes.customTextField }}
                            InputProps={{ disableUnderline: true }}
                            size="small"
                            placeholder="Enter First Name"
                            id="firstName"
                            name="firstName"
                            {...register("firstName")}
                            error={errors.firstName ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {errors.firstName?.message}
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <TextField
                            classes={{ root: classes.customTextField }}
                            InputProps={{ disableUnderline: true }}
                            size="small"
                            placeholder="Enter Last Name"
                            id="lastName"
                            name="lastName"
                            {...register("lastName")}
                            error={errors.lastName ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {errors.lastName?.message}
                          </Typography>
                        </Grid>
                      </Grid>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6}>
                    <InputLabel shrink htmlFor="mobile">
                      Mobile Number
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        type="number"
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        placeholder="Enter Mobile Number"
                        id="mobile"
                        name="mobile"
                        {...register("mobile")}
                        error={errors.mobile ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.mobile?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6}>
                    <InputLabel shrink htmlFor="email">
                      Email ID
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        placeholder="Enter Email ID"
                        id="email"
                        name="email"
                        {...register("email")}
                        error={errors.email ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.email?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6}>
                    <InputLabel shrink htmlFor="countries">
                      Countries you provide Hiring Support
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        placeholder="Enter Countries you provide Hiring Support"
                        id="countries"
                        name="countries"
                        {...register("countries")}
                        error={errors.countries ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.countries?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6}>
                    <InputLabel shrink htmlFor="presentLocation">
                      Present Location
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        placeholder="Enter your Firm Present Location"
                        id="presentLocation"
                        name="presentLocation"
                        {...register("presentLocation")}
                        error={errors.presentLocation ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.presentLocation?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6}>
                    <InputLabel shrink htmlFor="branches">
                      Branches (If any)
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        placeholder="Enter Branches"
                        id="branches"
                        name="branches"
                        {...register("branches")}
                        error={errors.branches ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.branches?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6}>
                    <InputLabel shrink htmlFor="recruiterStrength">
                      Recruiter Strength
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        placeholder="Enter Recruiter Strength"
                        id="recruiterStrength"
                        name="recruiterStrength"
                        {...register("recruiterStrength")}
                        error={errors.recruiterStrength ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.recruiterStrength?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6}>
                    <InputLabel shrink htmlFor="hiring_SDE">
                      Hiring Domain Expertise
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        placeholder="Enter your strength area in Hiring like IT, Forma, Manufacturing Company"
                        id="hiring_SDE"
                        name="hiring_SDE"
                        {...register("hiring_SDE")}
                        error={errors.hiring_SDE ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.hiring_SDE?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6}>
                    <InputLabel shrink htmlFor="hiringSupport">
                      What kind of Hiring Support? (Kind of People you Source)
                    </InputLabel>

                    <Select
                      label="Role"
                      name="hiringSupport"
                      value={state.hiringSupport}
                      {...register("hiringSupport")}
                      error={errors.hiringSupport ? true : false}
                      classes={{
                        root: classes.customSelectField,
                        icon: classes.customSelectIcon,
                      }}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      disableUnderline
                    >
                      <MenuItem value="BlueCollar (Electrician, Plumber, Delivery People etc.,)">
                        
                        BlueCollar (Electrician, Plumber, Delivery People etc.,)
                      </MenuItem>
                      <MenuItem value="WhiteCollar (Tech Jobs, Functional)">
                        
                        WhiteCollar (Tech Jobs, Functional)
                      </MenuItem>
                      <MenuItem value="PinkCollar (Nurses, Secretaries, Elementary School Teachers etc.,)">
                        
                        PinkCollar (Nurses, Secretaries, Elementary School
                        Teachers etc.,)
                      </MenuItem>
                      <MenuItem value="GreenCollar (Land Surveyor, Ecologist, Solar Installer etc.,)">
                        
                        GreenCollar (Land Surveyor, Ecologist, Solar Installer
                        etc.,)
                      </MenuItem>
                      <MenuItem value="GoldCollar (Lawyers, Doctors, Research Scientist)">
                        
                        GoldCollar (Lawyers, Doctors, Research Scientist)
                      </MenuItem>
                      <MenuItem value="NewCollar (Cybersecurity Analysts, Application Developers, Cloud Computing Specialists etc.,)">
                        
                        NewCollar (Cybersecurity Analysts, Application
                        Developers, Cloud Computing Specialists etc.,)
                      </MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
                    </Select>

                    <Typography variant="inherit" color="error">
                      {errors.hiringSupport?.message}
                    </Typography>

                    {state.hiringSupport === "Others" ? (
                      <TextField
                        required="true"
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        placeholder="Enter Other Hiring Support"
                        id="otherHiringSupport"
                        name="otherHiringSupport"
                        {...register("otherHiringSupport")}
                        error={errors.otherHiringSupport ? true : false}
                      />
                    ) : (
                      ""
                    )}

                    <Typography variant="inherit" color="error">
                      {errors.otherHiringSupport?.message}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6} >
                    <InputLabel shrink htmlFor="clients">
                      List your Projects (Optional)
                    </InputLabel>
                    <FormControl className={classes.customTagsInput}  >
                      <TagsInput
                        value={clientData}
                        onChange={handle}
                        separators={["Enter", ","]}
                        id="clients"
                        name="clients"
                        placeHolder="List your Projects"
                      />
                    </FormControl>
                  </Grid>

                  {testimonialsFields.map((user, index) => (
                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="testimonials">
                        
                        Client Testimonials
                      </InputLabel>
                      <FormControl>
                        <div key={index} className={classes.registerFields}>
                          <TextField
                            multiline
                            required="true"
                            classes={{ root: classes.customTextField }}
                            InputProps={{ disableUnderline: true }}
                            size="small"
                            placeholder="Enter Client Testimonials"
                            id="testimonials"
                            name="testimonials"
                            value={user.testimonials}
                            onChange={(event) =>
                              testimonialsChange(event, index)
                            }
                          />

                          <div className={classes.registerFieldsDiv}>
                            <AddCircleIcon
                              color="primary"
                              size="small"
                              onClick={testimonialsAdd}
                              className={classes.closeTestBtn}
                            />
                            {index + 1 !== 1 ? (
                              <RemoveCircle
                                color="secondary"
                                size="small"
                                onClick={testimonialsRemove}
                                className={classes.closeTestBtn}
                              />
                            ) : (
                              " "
                            )}
                          </div>
                        </div>
                      </FormControl>
                    </Grid>
                  ))}

                  <Grid item xs={12} sm={6} lg={6}>
                    <InputLabel shrink htmlFor="recruiterCoreSkills">
                      Recruiter Sourcing Strength
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        placeholder="Enter Recruiter Sourcing Strength like IT Skills, Non-IT Skills"
                        id="recruiterCoreSkills"
                        name="recruiterCoreSkills"
                        {...register("recruiterCoreSkills")}
                        error={errors.recruiterCoreSkills ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.recruiterCoreSkills?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6}>
                    <InputLabel shrink htmlFor="minimumCadidatePlacementFee">
                      Mention your Minimum Commercial Fee per Permanent
                      Placement Candidate %
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <Select
                        name="minimumCadidatePlacementFee"
                        value={state.minimumCadidatePlacementFee}
                        {...register("minimumCadidatePlacementFee")}
                        error={
                          errors.minimumCadidatePlacementFee ? true : false
                        }
                        classes={{
                          root: classes.customSelectField,
                          icon: classes.customSelectIcon,
                        }}
                        disableUnderline
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        {Array.from(Array(36), (e, i) => {
                          return (
                            <MenuItem value={i + 1 + "%"}>
                              
                              {i + 1 + "%"}
                            </MenuItem>
                          );
                        })}
                      </Select>

                      <Typography variant="inherit" color="error">
                        {errors.minimumCadidatePlacementFee?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6}>
                    <InputLabel shrink htmlFor="contractStaffing">
                      Do you also do Contract Staffing
                    </InputLabel>
                    <Select
                      name="contractStaffing"
                      value={state.contractStaffing}
                      {...register("contractStaffing")}
                      error={errors.contractStaffing ? true : false}
                      classes={{
                        root: classes.customSelectField,
                        icon: classes.customSelectIcon,
                      }}
                      disableUnderline
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      <MenuItem value="Yes"> Yes </MenuItem>
                      <MenuItem value="No">No </MenuItem>
                    </Select>
                    <Typography variant="inherit" color="error">
                      {errors.contractStaffing?.message}
                    </Typography>
                  </Grid>

                  {state.contractStaffing === "Yes" ? (
                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="minimumMarkup">
                        Mention your Minimum Commercial Markup % or Flat fee per
                        Contract Candidate (Margin Amount)
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          required={"true"}
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          size="small"
                          placeholder="Mention your Minimum Commercial Markup % or Flat fee per Contract Candidate (Margin Amount)"
                          id="minimumMarkup"
                          name="minimumMarkup"
                          {...register("minimumMarkup")}
                          error={errors.minimumMarkup ? true : false}
                        />
                      </FormControl>
                    </Grid>
                  ) : (
                    ""
                  )}

                  <Grid item xs={12} sm={6} lg={6}>
                    <InputLabel shrink htmlFor="source">
                      From where will you Source Profile
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.JobPortal}
                              onChange={handleCheckChange}
                              name="JobPortal"
                            />
                          }
                          label="Job Portal"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.SocialMedia}
                              onChange={handleCheckChange}
                              name="SocialMedia"
                            />
                          }
                          label="Social Media"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.Reference}
                              onChange={handleCheckChange}
                              name="Reference"
                            />
                          }
                          label="Reference"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.OthersMention}
                              onChange={handleCheckChange}
                              name="OthersMention"
                            />
                          }
                          label="Others Mention"
                        />
                      </FormGroup>

                      {state.OthersMention === true ? (
                        <TextField
                          required="true"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          size="small"
                          placeholder="Others Mention"
                          id="OthersMentionValue"
                          name="OthersMentionValue"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      ) : (
                        ""
                      )}

                      <Typography variant="inherit" color="error">
                        {errors.profileSource?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6}>
                    <InputLabel shrink htmlFor="using_ATS">
                      Are you using an ATS (Applicant Tracking System) already?
                      (If Yes)
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        placeholder="Mention ATS Details"
                        id="using_ATS"
                        name="using_ATS"
                        {...register("using_ATS")}
                        error={errors.using_ATS ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.using_ATS?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6}>
                    <InputLabel shrink htmlFor="using_ATS">
                      Your Company GST Number (Optional)
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField 
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        placeholder="Enter Your Company GST Number"
                        id="gst"
                        name="gst"
                        {...register("gst")}
                        error={errors.gst ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.gst?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} className={classes.regBtn}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
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

function CloseButton({ closeToast, className }) {
  return <CloseIcon className={className} onClick={closeToast} />;
}

export default Register;

