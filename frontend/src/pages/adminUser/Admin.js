import React, { useState, useEffect, useReducer } from "react";
import MUIDataTable from "mui-datatables";
import {
  Grid,
  Button,
  List,
  Box,
  SwipeableDrawer,
  Switch,
  FormControlLabel,
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Typography,
  TablePagination,
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
  Checkbox,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import PageTitle from "../../components/PageTitle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import { toast } from "react-toastify";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FormGroup from "@material-ui/core/FormGroup";
import ViewIcon from "@material-ui/icons/Visibility";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Notification from "../../components/Notification";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import useStyles from "../../themes/style.js";
import { signOut, useUserDispatch } from "../../context/UserContext";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Autocomplete } from "@material-ui/lab";

const positions = [toast.POSITION.TOP_RIGHT];

export default function Admin(props) {
  const classes = useStyles();
  const mobileQuery = useMediaQuery('(max-width:600px)');  

  var userDispatch = useUserDispatch();
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState([]);
  const [userEdit, setUserEdit] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    companyName: "",
    companyWebsite: "",
    companyType: "",
    companyAddress: "",
    isActive: "",
    remainingMessage: "",
  });
  const [page, setPage] = useState(0);
  const [currerntPage, setCurrerntPage] = useState(1);

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const [dataList, setDataList] = useState("ADD");

  const [profileList, setProfileList] = useState("ADD");

  const [profile, setProfile] = useState({
    id: "",
    fbBaseUrl: "",
    phoneNumberId: "",
    waToken: "",
    fromMonth: "",
    toMonth: "",
    isEnableFree: false,
    isEnablePaid: false,
  });

  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);

  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  var [notificationsPosition] = useState(2);
  var [errorToastId, setErrorToastId] = useState(null);

  const HeaderElements = () => <>Total : {count}</>;

  const handleChangePage = (event, newPage) => {
    setLoader(true);
    setPage(newPage);
    setCurrerntPage(newPage + 1);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}superAdmin/viewAllAdmin`,
      data: {
        page: newPage + 1,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setUserData(response.data.data);
        setCount(response.data.count);
      }
      setLoader(false);
    });
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
      position: positions[notificationsPosition],
      progressClassName: classes.progress,
      onClose: notificationType === "error" && (() => setErrorToastId(null)),
      className: classes.notification,
    });

    if (notificationType === "error") setErrorToastId(toastId);
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a Valid Email Address"),
    fname: Yup.string()
      .max(255)
      .required("First Name is required")
      .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: "First Name be Alphanumeric",
      }),
    lname: Yup.string()
      .max(255)
      .required("Last Name is required")
      .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: "Last Name be Alphanumeric",
      }),
    mobile: Yup.string()
      .required("Mobile is required")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    company: Yup.string().max(255).required("Company Name is required"),
    companyWebsite: Yup.string().max(255).required("Company Website is required"),
    address: Yup.string().max(255).required("Company Address is required"),
    company_type: Yup.string().required("Select your company type")
  });

  const editSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a Valid Email Address"),
    fname: Yup.string()
      .max(255)
      .required("First Name is required")
      .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: "First Name be Alphanumeric",
      }),
    lname: Yup.string()
      .max(255)
      .required("Last Name is required")
      .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: "Last Name be Alphanumeric",
      }),
    mobile: Yup.string()
      .required("Mobile is required")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    company: Yup.string().max(255).required("Company Name is required"),
    companyWebsite: Yup.string().max(255).required("Company Website is required"),
    address: Yup.string().max(255).required("Company Address is required"),
  });

  var ProfileSchema = Yup.object().shape({});

  if (profile.isEnablePaid === true) {
    ProfileSchema = Yup.object().shape({
      fbBaseUrl: Yup.string().required("FB Base Url is required"),
      phoneNumber: Yup.string().required("Phone Number is required"),
      waToken: Yup.string().required("waToken is required"),
      fromMonth: Yup.string().required("From Month is required"),
      toMonth: Yup.string().required("To Month is required"),
      isEnableFree: Yup.bool().nullable().notRequired(),
      isEnablePaid: Yup.bool().nullable().notRequired(),
      // isEnableEmail: Yup.bool().nullable().notRequired()
    });
  } else {
    ProfileSchema = Yup.object().shape({
      fbBaseUrl: Yup.string(),
      phoneNumber: Yup.string(),
      waToken: Yup.string(),
      fromMonth: Yup.string().required("From Month is required"),
      toMonth: Yup.string().required("To Month is required"),
      isEnableFree: Yup.bool().nullable().notRequired(),
      isEnablePaid: Yup.bool().nullable().notRequired(),
      // isEnableEmail: Yup.bool().nullable().notRequired()
    });
  }

  const {
    register: editProfile,
    formState: {
      errors: editProfileErrors,
      isSubmitting: editProfileIsSubmitting,
    },
    handleSubmit: editProfileSubmit,
    reset: editProfilereset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(ProfileSchema),
  });

  const {
    register: addProfile,
    formState: {
      errors: addProfileErrors,
      isSubmitting: addProfileIsSubmitting,
    },
    handleSubmit: addProfileSubmit,
    reset: addProfilereset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(ProfileSchema),
  });

  const {
    register: editUser,
    formState: { errors: editErrors, isSubmitting: editIsSubmitting },
    handleSubmit: editSubmit,
    reset: editreset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(editSchema),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setLoader(true);

    const fetchData = async () => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}superAdmin/viewAllAdmin`,
        data: {
          page: "1",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {
             setUserData(response.data.data);
            setCount(response.data.count);
            setLoader(false);
          }
        })
        .catch(function (error) {
          console.log(error);
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 403
          ) {
            signOut(userDispatch, props.history);
          }
        });
    };
    fetchData();
       
 // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [reducerValue, token]);

  function handleStatus(id, value) {
    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}superAdmin/changeAdminState`,
      data: {
        id: id,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setLoader(false);
        const switchState = userData.map(item => {

          if (item.id === id) { 
            return { ...item, isActive:  value === true ? true : false  };
            
          }
          return item;
        }); 
        setUserData(switchState);
        handleNotificationCall("success", response.data.message);

       }
    });
  }

  function handleAdd(values) {
    return new Promise((resolve, reject) => {
      try {
        setLoader(true);
  
        axios({
          method: "post",
          url: `${process.env.REACT_APP_SERVER}superAdmin/addAdmin`,
          data: {
            firstName: values.fname,
            lastName: values.lname,
            email: values.email,
            password: values.password,
            mobile: values.mobile,
            companyName: values.company,
            companyWebsite: values.companyWebsite,
            companyAddress: values.address,
            company_type: values.company_type
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }).then(function (response) {
          if (response.data.status === true) {
            handleNotificationCall("success", response.data.message);
            forceUpdate();
            setState({ ...state, right: false });
          } else {
            handleNotificationCall("error", response.data.message);
          }
          setLoader(false);
          resolve();
        }).catch(function (error) {
          handleNotificationCall("error", error.message);
          setLoader(false);
          reject(error);
        });
      } catch (error) {
        handleNotificationCall("error", error.message);
        setLoader(false);
        reject(error);
      }
    });
  }
  

  function handleEdit(values) {
    return new Promise((resolve) => {
      setLoader(true);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}superAdmin/editAdmin`,
        data: {
          id: userEdit.id,
          firstName: values.fname,
          lastName: values.lname,
          email: values.email,
          password: values.password,
          mobile: values.mobile,
          companyName: values.company,
          companyWebsite: values.companyWebsite,
          companyAddress: values.address,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {
            handleNotificationCall("success", response.data.message);

            forceUpdate();

            setState({ ...state, right: false });
          } else {
            handleNotificationCall("success", response.data.message);
          }
          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }
  function handleProfile(values) {
    return new Promise((resolve) => {
      setLoader(true);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}superAdmin/companySettings`,
        data: {
          recruiterId: userEdit.id,
          fbBaseUrl: values.fbBaseUrl,
          phoneNumber: values.phoneNumber,
          waToken: values.waToken,
          fromMonth: values.fromMonth,
          toMonth: values.toMonth,
          isEnableFree: profile.isEnableFree,
          isEnablePaid: profile.isEnablePaid,
          // "isEnableEmail": values.isEnableEmail,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {
            handleNotificationCall("success", response.data.message);
            setState({ ...state, right: false });
          } else {
            handleNotificationCall("error", response.data.message);
          }
          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  function handleProfileStatus(id) {
    setUserEdit({
      ...userEdit,
      id: id,
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}superAdmin/companySettingsExist`,
      data: {
        id: id,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setProfile({
          ...profile,
          id: response.data.data.id,
          fbBaseUrl: response.data.data.fbBaseUrl,
          phoneNumberId: response.data.data.phoneNumberId,
          waToken: response.data.data.waToken,
          fromMonth: response.data.data.fromMonth,
          toMonth: response.data.data.toMonth,
          isEnableFree: response.data.data.isEnableFree,
          isEnablePaid: response.data.data.isEnablePaid,
          // "isEnableEmail": response.data.data.isEnableEmail
        });

        setProfileList("EDIT");
      } else {
        setProfile({
          id: "",
          fbBaseUrl: "",
          phoneNumberId: "",
          waToken: "",
          fromMonth: "",
          toMonth: "",
          isEnableFree: false,
          isEnablePaid: false,
        });

        setProfileList("ADD");
      }

      setDataList("SETTINGS");

      setState({ ...state, right: true });
    });
  }

  const [state, setState] = useState({
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const months = [
    {
      id: "1",
      Month: "JAN",
    },
    {
      id: "2",
      Month: "FEB",
    },
    {
      id: "3",
      Month: "MAR",
    },
    {
      id: "4",
      Month: "APR",
    },

    {
      id: "5",
      Month: "MAY",
    },
    {
      id: "6",
      Month: "JUN",
    },
    {
      id: "7",
      Month: "JUL",
    },
    {
      id: "8",
      Month: "AUG",
    },

    {
      id: "9",
      Month: "SEP",
    },

    {
      id: "10",
      Month: "OCT",
    },

    {
      id: "11",
      Month: "NOV",
    },

    {
      id: "12",
      Month: "DEC",
    },
  ];

  const list = (anchor) =>
    dataList === "EDIT" ? (
      <>
        <Box sx={{ width: "100%" }} role="presentation">
          <List>
            <Card className={classes.root}>
              <CardHeader>
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.drawerHeader}
                >
                  <Typography variant="subtitle1"> Edit Company </Typography>

                  <Grid className={classes.drawerClose}>
                    <CloseIcon
                      className={classes.closeBtn}
                      size="14px"
                      onClick={toggleDrawer(anchor, false)}
                    />
                  </Grid>
                </Grid>
              </CardHeader>

              <form onSubmit={editSubmit(handleEdit)}>
                <CardContent>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="fname">
                        
                        First Name
                      </InputLabel>

                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter First Name"
                          id="fname"
                          defaultValue={userEdit.firstName}
                          {...editUser("fname")}
                          error={editErrors.fname ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.fname?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}  lg={6}>
                      <InputLabel shrink htmlFor="lname">
                        
                        Last Name
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          size="small"
                          placeholder="Enter Last Name"
                          id="lname"
                          defaultValue={userEdit.lastName}
                          {...editUser("lname")}
                          error={editErrors.lname ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.lname?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                  

                   
                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="email">
                        Email
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          size="small"
                          placeholder="Enter Email"
                          id="email"
                          defaultValue={userEdit.email}
                          {...editUser("email")}
                          error={editErrors.email ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.email?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                  
                    <Grid item xs={12} sm={6} lg={6}>
                  
                      <InputLabel shrink htmlFor="mobile">
                        Mobile
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          size="small"
                          type="number"
                          placeholder="Enter Mobile"
                          id="mobile"
                          defaultValue={userEdit.mobile}
                          {...editUser("mobile")}
                          error={errors.mobile ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.mobile?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="company">
                        Company Name
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          size="small"
                          placeholder="Enter Company Name"
                          id="company"
                          defaultValue={userEdit.companyName}
                          {...editUser("company")}
                          error={editErrors.company ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.company?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="companyWebsite">
                        Company Website
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          size="small"
                          placeholder="Enter company website"
                          id="companyWebsite"
                          defaultValue={userEdit.companyWebsite}
                          {...editUser("companyWebsite")}
                          error={editErrors.companyWebsite ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.companyWebsite?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <InputLabel shrink htmlFor="address">
                        Company Address
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          multiline
                          rows={4}
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          size="small"
                          placeholder="Enter Company Address"
                          id="address"
                          defaultValue={userEdit.companyAddress}
                          {...editUser("address")}
                          error={editErrors.address ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.address?.message}
                        </Typography>
                      </FormControl>
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
                      color="primary"
                      size="small"
                       type="submit"
                       disabled={editIsSubmitting}
                    >
                      Update
                    </Button>
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
              </form>
            </Card>
          </List>
        </Box>
      </>
    ) : dataList === "ADD" ? (
      <>
        <Box sx={{ width: "100%" }} role="presentation">
          <List>
            <Card className={classes.root}>
              <CardHeader>
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.drawerHeader}
                >
                  <Typography variant="subtitle1"> Add New Company </Typography>

                  <Grid className={classes.drawerClose}>
                    <CloseIcon
                      className={classes.closeBtn}
                      size="14px"
                      onClick={toggleDrawer(anchor, false)}
                    />
                  </Grid>
                </Grid>
              </CardHeader>

              <CardContent>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <InputLabel shrink htmlFor="fname">
                      
                      First Name
                    </InputLabel>

                    <FormControl className={classes.margin}>
                      <TextField
                        InputProps={{ disableUnderline: true }}
                        classes={{ root: classes.customTextField }}
                        size="small"
                        placeholder="Enter First Name"
                        id="fname"
                        {...register("fname")}
                        error={errors.fname ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.fname?.message}
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <InputLabel shrink htmlFor="lname">
                      
                      Last Name
                    </InputLabel>

                    <FormControl className={classes.margin}>
                      <TextField
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        placeholder="Enter Last Name"
                        id="lname"
                        {...register("lname")}
                        error={errors.lname ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.lname?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <InputLabel shrink htmlFor="email">
                      
                      Email
                    </InputLabel>

                    <FormControl className={classes.margin}>
                      <TextField
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        placeholder="Enter Email"
                        id="email"
                        {...register("email")}
                        error={errors.email ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.email?.message}
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <InputLabel shrink htmlFor="password">
                      
                      Password
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        classes={{ root: classes.customTextField }}
                        type={values.showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        id="password"
                        InputProps={{
                          disableUnderline: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                              >
                                {values.showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        {...register("password")}
                        error={errors.password ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.password?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <InputLabel shrink htmlFor="mobile">
                      
                      Mobile
                    </InputLabel>

                    <FormControl className={classes.margin}>
                      <TextField
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        type="number"
                        placeholder="Enter Mobile"
                        id="mobile"
                        {...register("mobile")}
                        error={errors.mobile ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.mobile?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <InputLabel shrink htmlFor="company">
                      Company Name
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        placeholder="Enter Company Name"
                        id="company"
                        {...register("company")}
                        error={errors.company ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.company?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <InputLabel shrink htmlFor="companyWebsite">
                      Company Website
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        placeholder="Enter company website"
                        id="companyWebsite"
                        {...register("companyWebsite")}
                        error={errors.companyWebsite ? true : false}
                      />
                      <Typography variant="inherit" color="error">
                        {errors.companyWebsite?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}  sm={6} md={6} lg={6}>
                    <InputLabel shrink htmlFor="address">
                      Company Address
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        multiline
                        rows={4}
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        placeholder="Enter Company Address"
                        id="address"
                        {...register("address")}
                        error={errors.address ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {errors.address?.message}
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}  sm={6} md={6} lg={6}>
                  <FormControl className={classes.margin}>
                  <InputLabel shrink htmlFor="company_type">
                      Clients Type
                  </InputLabel>
                    <Autocomplete options={["RECRUITEMENT COMPANY","COMPANY"]}
                      disableClearable
                      getOptionLabel={option => option}
                      getOptionvalue={option => option}
                      // onChange={(event, value) => {props.handleChange(value.id);}}
                      classes={{
                        popupIndicator: classes.autocompleteIndicator
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...register('company_type')} error={errors.company_type ? true : false}
                          {...params}
                          variant="filled"
                          name="company_type"
                        />
                      )}
                    />

                    <Typography variant="inherit" color="error">
                      {errors.company_type?.message}
                    </Typography>
                  </FormControl>
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
                    color="primary"
                    size="small"
                    onClick={handleSubmit(handleAdd)}
                  >
                    ADD
                  </Button>
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
    ) : dataList === "VIEW" ? (
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
                  <Typography variant="subtitle1"> View Company</Typography>

                  <Grid className={classes.drawerViewClose}>
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
                      First Name
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    {userEdit.firstName}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    <Typography className={classes.boldtext}>
                      
                      Last Name
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    {userEdit.lastName}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    <Typography className={classes.boldtext}>
                      
                      Email
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    {userEdit.email}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    <Typography className={classes.boldtext}>
                      Mobile
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    {userEdit.mobile}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    <Typography className={classes.boldtext}>
                      
                      Company Name
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    {userEdit.companyName}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    <Typography className={classes.boldtext}>
                      Company Website
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    {userEdit.companyWebsite}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    <Typography className={classes.boldtext}>
                      
                      Company Type
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    {userEdit.companyType}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    <Typography className={classes.boldtext}>
                      
                      Company Address
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    {userEdit.companyAddress}
                  </Grid>

 

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    <Typography className={classes.boldtext}>
                      Posted Date
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    {moment(userEdit.createdAt).format("DD-MM-YYYY")}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    <Typography className={classes.boldtext}>
                      Remaining Credits
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    {userEdit.remainingMessage}
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
    ) : (
      <>
        <Box sx={{ width: "100%" }} role="presentation">
          <List>
            <Card className={classes.root}>
              <CardHeader>
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.drawerHeader}
                >
                  <Grid item xs={10} md={6}>
                    
                    <Typography variant="subtitle1"> Settings</Typography>
                  </Grid>

                  <Grid item xs={2} lg={6} className={classes.drawerClose}>
                    <CloseIcon
                      className={classes.closeBtn}
                      size="14px"
                      onClick={toggleDrawer(anchor, false)}
                    />
                  </Grid>
                </Grid>
              </CardHeader>

              {profileList === "EDIT" ? (
                <>
                  <form onSubmit={editProfileSubmit(handleProfile)}>
                    <CardContent>
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={12} lg={6}>
                          <InputLabel shrink htmlFor="fbBaseUrl">
                            
                            FB Base Url
                          </InputLabel>

                          <FormControl className={classes.margin}>
                            <TextField
                              classes={{ root: classes.customTextField }}
                              InputProps={{ disableUnderline: true }}
                              size="small"
                              placeholder="Enter FB Base Url"
                              type="text"
                              name="fbBaseUrl"
                              defaultValue={profile.fbBaseUrl}
                              {...editProfile("fbBaseUrl")}
                              error={editProfileErrors.fbBaseUrl ? true : false}
                            />

                            <Typography variant="inherit" color="error">
                              {editProfileErrors.fbBaseUrl?.message}
                            </Typography>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <InputLabel shrink htmlFor="phoneNumber">
                            
                            Phone Number
                          </InputLabel>

                          <FormControl className={classes.margin}>
                            <TextField
                              classes={{ root: classes.customTextField }}
                              InputProps={{ disableUnderline: true }}
                              size="small"
                              placeholder="Enter Phone Number"
                              name="phoneNumber"
                              type="number"
                              defaultValue={profile.phoneNumberId}
                              {...editProfile("phoneNumber")}
                              error={
                                editProfileErrors.phoneNumber ? true : false
                              }
                            />

                            <Typography variant="inherit" color="error">
                              {editProfileErrors.phoneNumber?.message}
                            </Typography>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                          <InputLabel shrink htmlFor="waToken">
                            
                            WaToken
                          </InputLabel>

                          <FormControl className={classes.margin}>
                            <TextField
                              classes={{ root: classes.customTextField }}
                              InputProps={{ disableUnderline: true }}
                              size="small"
                              placeholder="Enter waToken"
                              type="text"
                              name="waToken"
                              defaultValue={profile.waToken}
                              {...editProfile("waToken")}
                              error={editProfileErrors.waToken ? true : false}
                            />

                            <Typography variant="inherit" color="error">
                              {editProfileErrors.waToken?.message}
                            </Typography>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                          <InputLabel shrink htmlFor="fromMonth">
                            
                            Financial Year
                          </InputLabel>

                          <FormControl className={classes.margin}>
                            <Grid container direction="row" spacing={2}>
                              <Grid item xs={12} lg={6}>
                                <Select
                                  labelId="fromMonth"
                                  name="fromMonth"
                                  classes={{
                                    root: classes.customSelectField,
                                    icon: classes.customSelectIcon,
                                  }}
                                  defaultValue={profile.fromMonth}
                                  {...editProfile("fromMonth")}
                                  error={editErrors.fromMonth ? true : false}
                                  disableUnderline
                                >
                                  {months.map((item, index) => {
                                    return [
                                      <MenuItem value={item.id}>
                                        {item.Month}
                                      </MenuItem>,
                                    ];
                                  })}
                                </Select>

                                <Typography variant="inherit" color="error">
                                  {editProfileErrors.fromMonth?.message}
                                </Typography>
                              </Grid>

                              <Grid item xs={12} lg={6}>
                                <Select
                                  labelId="toMonth"
                                  name="toMonth"
                                  defaultValue={profile.toMonth}
                                  classes={{
                                    root: classes.customSelectField,
                                    icon: classes.customSelectIcon,
                                  }}
                                  {...editProfile("toMonth")}
                                  error={editErrors.toMonth ? true : false}
                                  disableUnderline
                                >
                                  {months.map((item, index) => {
                                    return [
                                      <MenuItem value={item.id}>
                                        {item.Month}
                                      </MenuItem>,
                                    ];
                                  })}
                                </Select>

                                <Typography variant="inherit" color="error">
                                  {editProfileErrors.toMonth?.message}
                                </Typography>
                              </Grid>
                            </Grid>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                          <InputLabel shrink>
                            
                            Whatsapp Message for Free?
                          </InputLabel>
                          <FormControl component="fieldset">
                            <FormGroup
                              aria-label="position"
                              row
                              {...editProfile("isEnableFree")}
                              error={
                                editProfileErrors.isEnableFree ? true : false
                              }
                            >
                              <FormControlLabel
                                defaultValue={profile.isEnableFree}
                                control={
                                  <Checkbox
                                    checked={profile.isEnableFree}
                                    onChange={(e) => {
                                      setProfile({
                                        ...profile,
                                        isEnableFree: e.target.checked,
                                      });
                                    }}
                                  />
                                }
                                label="Yes"
                                labelPlacement="end"
                              />
                            </FormGroup>

                            <Typography variant="inherit" color="error">
                              {editProfileErrors.isEnableFree?.message}
                            </Typography>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                          <InputLabel shrink>
                            
                            Whatsapp Message for Paid?
                          </InputLabel>
                          <FormControl component="fieldset">
                            <FormGroup
                              aria-label="position"
                              row
                              {...editProfile("isEnablePaid")}
                              error={
                                editProfileErrors.isEnablePaid ? true : false
                              }
                            >
                              <FormControlLabel
                                defaultValue={profile.isEnablePaid}
                                control={
                                  <Checkbox
                                    checked={profile.isEnablePaid}
                                    onChange={(e) => {
                                      setProfile({
                                        ...profile,
                                        isEnablePaid: e.target.checked,
                                      });
                                    }}
                                  />
                                }
                                label="Yes"
                                labelPlacement="end"
                              />
                            </FormGroup>

                            <Typography variant="inherit" color="error">
                              {editProfileErrors.isEnablePaid?.message}
                            </Typography>
                          </FormControl>
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
                          color="primary"
                          size="small"
                           type="submit"
                           disabled={editProfileIsSubmitting}
                        >
                          Update
                        </Button>

                        <Button
                          variant="contained"
                          size="small"
                          onClick={toggleDrawer(anchor, false)}
                        >
                          
                          Close
                        </Button>
                      </Grid>
                    </CardActions>
                  </form>
                </>
              ) : (
                <>
                  <form onSubmit={addProfileSubmit(handleProfile)}>
                    <CardContent>
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={12} lg={6}>
                          <InputLabel shrink htmlFor="fbBaseUrl">
                            
                            FB Base URL
                          </InputLabel>

                          <FormControl className={classes.margin}>
                            <TextField
                              classes={{ root: classes.customTextField }}
                              InputProps={{ disableUnderline: true }}
                              size="small"
                              placeholder="Enter FB Base URL"
                              type="text"
                              name="fbBaseUrl"
                              defaultValue={profile.fbBaseUrl}
                              {...addProfile("fbBaseUrl")}
                              error={addProfileErrors.fbBaseUrl ? true : false}
                            />

                            <Typography variant="inherit" color="error">
                              {addProfileErrors.fbBaseUrl?.message}
                            </Typography>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <InputLabel shrink htmlFor="phoneNumber">
                            
                            Phone Number
                          </InputLabel>

                          <FormControl className={classes.margin}>
                            <TextField
                              classes={{ root: classes.customTextField }}
                              InputProps={{ disableUnderline: true }}
                              size="small"
                              placeholder="Enter Phone Number"
                              type="number"
                              name="phoneNumber"
                              defaultValue={profile.phoneNumberId}
                              {...addProfile("phoneNumber")}
                              error={
                                addProfileErrors.phoneNumber ? true : false
                              }
                            />

                            <Typography variant="inherit" color="error">
                              {addProfileErrors.phoneNumber?.message}
                            </Typography>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                          <InputLabel shrink htmlFor="waToken">
                            
                            WaToken
                          </InputLabel>

                          <FormControl className={classes.margin}>
                            <TextField
                              classes={{ root: classes.customTextField }}
                              InputProps={{ disableUnderline: true }}
                              size="small"
                              placeholder="Enter waToken"
                              type="text"
                              name="waToken"
                              defaultValue={profile.waToken}
                              {...addProfile("waToken")}
                              error={addProfileErrors.waToken ? true : false}
                            />

                            <Typography variant="inherit" color="error">
                              {addProfileErrors.waToken?.message}
                            </Typography>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <InputLabel shrink htmlFor="fromMonth">
                            
                            Financial Year
                          </InputLabel>

                          <FormControl className={classes.margin}>
                            <Grid container direction="row" spacing={2}>
                              <Grid item xs={12} lg={6}>
                                <Select
                                  labelId="fromMonth"
                                  name="fromMonth"
                                  classes={{
                                    root: classes.customSelectField,
                                    icon: classes.customSelectIcon,
                                  }}
                                  {...addProfile("fromMonth")}
                                  error={
                                    addProfileErrors.fromMonth ? true : false
                                  }
                                  disableUnderline
                                >
                                  <MenuItem
                                    disable
                                    value=""
                                    placeholder="Select from Month"
                                  />
                                  {months.map((item, index) => {
                                    return [
                                      <MenuItem value={item.id}>
                                        {item.Month}
                                      </MenuItem>,
                                    ];
                                  })}
                                </Select>

                                <Typography variant="inherit" color="error">
                                  {addProfileErrors.fromMonth?.message}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} lg={6}>
                                <Select
                                  labelId="toMonth"
                                  name="toMonth"
                                  classes={{
                                    root: classes.customSelectField,
                                    icon: classes.customSelectIcon,
                                  }}
                                  {...addProfile("toMonth")}
                                  error={
                                    addProfileErrors.toMonth ? true : false
                                  }
                                  disableUnderline
                                >
                                  <MenuItem
                                    disable
                                    value=""
                                    placeholder="Select to Month"
                                  />

                                  {months.map((item, index) => {
                                    return [
                                      <MenuItem value={item.id}>
                                        {item.Month}
                                      </MenuItem>,
                                    ];
                                  })}
                                </Select>

                                <Typography variant="inherit" color="error">
                                  {addProfileErrors.toMonth?.message}
                                </Typography>
                              </Grid>
                            </Grid>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                          <InputLabel shrink>
                            
                            Whatsapp Message for Free?
                          </InputLabel>
                          <FormControl component="fieldset">
                            <FormGroup
                              aria-label="position"
                              row
                              {...addProfile("isEnableFree")}
                              error={
                                addProfileErrors.isEnableFree ? true : false
                              }
                            >
                              <FormControlLabel
                                defaultValue={profile.isEnableFree}
                                control={
                                  <Checkbox
                                    checked={profile.isEnableFree}
                                    onChange={(e) => {
                                      setProfile({
                                        ...profile,
                                        isEnableFree: e.target.checked,
                                      });
                                    }}
                                  />
                                }
                                label="Yes"
                                labelPlacement="end"
                              />
                            </FormGroup>

                            <Typography variant="inherit" color="error">
                              {addProfileErrors.isEnableFree?.message}
                            </Typography>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                          <InputLabel shrink>
                            
                            Whatsapp Message for Paid?
                          </InputLabel>
                          <FormControl component="fieldset">
                            <FormGroup
                              aria-label="position"
                              row
                              {...addProfile("isEnablePaid")}
                              error={
                                addProfileErrors.isEnablePaid ? true : false
                              }
                            >
                              <FormControlLabel
                                defaultValue={profile.isEnablePaid}
                                control={
                                  <Checkbox
                                    checked={profile.isEnablePaid}
                                    onChange={(e) => {
                                      setProfile({
                                        ...profile,
                                        isEnablePaid: e.target.checked,
                                      });
                                    }}
                                  />
                                }
                                label="Yes"
                                labelPlacement="end"
                              />
                            </FormGroup>

                            <Typography variant="inherit" color="error">
                              {addProfileErrors.isEnablePaid?.message}
                            </Typography>
                          </FormControl>
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
                          color="primary"
                          size="small"
                           type="submit"
                           disabled={addProfileIsSubmitting}
                        >
                          Save
                        </Button>

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
                  </form>
                </>
              )}
            </Card>
          </List>
        </Box>
      </>
    );

  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.heading}>
        <Grid item xs={9} sm={7} md={8} lg={6}>
          
          <PageTitle title="Companies" />
        </Grid>

        <Grid item xs={3} sm={5} md={4} lg={6} className={classes.drawerClose}>
          <div className={classes.lgButton}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              startIcon={<AddCircleIcon />}
              className={classes.margin}
              onClick={(e) => {
                setDataList("ADD");
                reset();
                setState({ ...state, right: true });
              }}
            >
              Add New Company
            </Button>
          </div>

          <div className={classes.smButton}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddCircleIcon />}
              className={classes.margin}
              color="primary"
              onClick={(e) => {
                setDataList("ADD");
                reset();
                setState({ ...state, right: true });
              }}
            >
              
              Add
            </Button>
          </div>
          <SwipeableDrawer
            anchor="right"
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
            classes={{ paper: classes.drawer }}
          >
            {list("right")}
          </SwipeableDrawer>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MUIDataTable
            options={{
              pagination: false,
              sort: false,
              selectableRows: "none",
              search: false,
              filter: false,
              print: false,
              download: false,
              responsive: mobileQuery===true? 'vertical' : 'standard',
              customToolbar: () => <HeaderElements />,
              textLabels: {
                body: {
                  noMatch: 'Oops! Matching record could not be found',
                }
              }
            }}
            columns={[
              {
                name: "S.No",
              },
              {
                name: "Name",
              },

              {
                name: "Email",
              },

              {
                name: "Mobile",
              },
              {
                name: "Company Name",
              },
              {
                name: "Company Address",
              },
              {
                name: "Status",
              },
              {
                name: "Posted Date",
              },
              {
                name: "Actions",
              },
            ]}
            data={userData.map((item, index) => {
              return [
                currerntPage !== 0
                    ? 10 * currerntPage - 10 + index + 1
                    : index + 1 ,
                item.recruiter?.firstName + " " + item.recruiter?.lastName, 
                item.email,
                item.recruiter?.mobile,
                item.recruiter?.companyName,
                item.recruiter?.companyAddress,
                <Switch
                  checked={item.isActive}
                  onChange={(e) => {
                    handleStatus(item.id, e.target.checked);
                  }}
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />,

                moment(item.createdAt).format("DD-MM-YYYY"),

                <>
                  <Grid container className={classes.space}>
                    <Grid item xs className={classes.toolAlign}>
                      <Tooltip
                        title="Edit Company"
                        placement="bottom"
                        aria-label="edit"
                      >
                        <EditIcon
                          className={classes.toolIcon}
                          onClick={(e) => {
                            editreset();
                            setDataList("EDIT");
                            setUserEdit({
                              ...userEdit,
                              id: item.id,
                              email: item.email,
                              firstName: item.recruiter.firstName,
                              lastName: item.recruiter.lastName,
                              mobile: item.recruiter.mobile,
                              companyName: item.recruiter.companyName,
                              companyWebsite: item.recruiter.companyWebsite,
                              companyType: item.companyType,
                              companyAddress: item.recruiter.companyAddress,
                              isActive: item.isActive,
                              createdAt: item.createdAt,
                              remainingMessage: "",
                            });
                            setState({ ...state, right: true });
                          }}
                        />
                      </Tooltip>
                      <Tooltip
                        title="View Company"
                        placement="bottom"
                        aria-label="view"
                      >
                        <ViewIcon
                          className={classes.toolIcon}
                          onClick={(e) => {
                            editreset();
                            setDataList("VIEW"); 
                            setLoader(true);

                            axios({
                              method: "post",
                              url: `${process.env.REACT_APP_SERVER}superAdmin/getWallet`,
                              data: {
                                mainId: item.mainId,
                              },
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: token,
                              },
                            }).then(function (response) {
                              if (response.data.status === true) {
                                setUserEdit({
                                  ...userEdit,
                                  id: item.id,
                                  email: item.email,
                                  firstName: item.recruiter.firstName,
                                  lastName: item.recruiter.lastName,
                                  mobile: item.recruiter.mobile,
                                  companyName: item.recruiter.companyName,
                                  companyWebsite: item.recruiter.companyWebsite,
                                  companyType: item.companyType,
                                  companyAddress: item.recruiter.companyAddress,
                                  isActive: item.isActive,
                                  createdAt: item.createdAt,
                                  remainingMessage:
                                    response?.data?.data !== null
                                      ? response.data.data.remainingMessages
                                      : 0,
                                });

                                setState({ ...state, right: true });
                                setLoader(false);
                              }
                            });
                          }}
                        />
                      </Tooltip>
                      <Tooltip
                        title="Settings"
                        placement="bottom"
                        aria-label="setting"
                      >
                        <SettingsIcon
                          className={classes.toolIcon}
                          onClick={(e) => {
                            addProfilereset();
                            editProfilereset();
                            handleProfileStatus(item.id);
                          }}
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </>,
              ];
            })}
          />

          <Grid container spacing={2} className={classes.pagination}>
            <TablePagination
              rowsPerPageOptions={[50]}
              component="div"
              count={count}
              rowsPerPage={50}
              page={page}
              onPageChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </Grid>

      

      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

