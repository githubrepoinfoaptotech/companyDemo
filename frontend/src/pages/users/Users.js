import React, { useState, useEffect, useReducer, useRef } from "react";
import MUIDataTable from "mui-datatables";
import {
  Grid,
  Button,
  List,
  Box,
  SwipeableDrawer,
  Switch,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  TablePagination,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import PageTitle from "../../components/PageTitle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import { toast } from "react-toastify";
import moment from "moment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Notification from "../../components/Notification";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";
import { Autocomplete } from "@material-ui/lab";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignAdd from "../../components/Admin/AssignAdd.js";

import useStyles from "../../themes/style.js";
import AddUser from "../../components/Admin/AddUser";
import { jwtDecode } from "jwt-decode";

const positions = [toast.POSITION.TOP_RIGHT];

export default function Tables() {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const mobileQuery = useMediaQuery('(max-width:600px)');

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userRole = decode?.role
  const companyType = decode?.companyType
  const [userData, setUserData] = useState([]);
  const [userEdit, setUserEdit] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    companyName: "",
    isActive: "",
    employeeId: "",
    companyAddress: "",
    headOfficeLocation: "",
    branchOfficeLocation: "",
    capabilities: "",
    recruiterCapacity: ""
  });
  const [page, setPage] = useState(0);
  const [currerntPage, setCurrerntPage] = useState(1);
  const [count, setCount] = useState(0);

  const [assignPage, setAssignPage] = useState(0);
  const [assignCurrerntPage, setAssignCurrerntPage] = useState(1);
  const [assigncount, setAssignCount] = useState(0);

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const [dataList, setDataList] = useState("ADD");

  var [notificationsPosition] = useState(2);
  var [errorToastId, setErrorToastId] = useState(null);

  const [assignData, setAssignData] = useState([]);
  const [requirementName, setRequirementName] = useState([]);

  const HeaderElements = () => <>Total : {count}</>;

  // const [values, setValues] = React.useState({
  //   showPassword: false,
  // });

  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword });
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setLoader(true);
    setCurrerntPage(newPage + 1);

    const form = filterRef.current;

    var data = JSON.stringify({
      page: newPage + 1,
      roleName: `${form["roleName"].value}`,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
      recruiterId: recruiterId?.id,
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/viewAllUsers`,
      data: data,
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


  const handlerequirementChangePage = (event, newPage) => {
    setAssignPage(newPage);
    setLoader(true);
    setAssignCurrerntPage(newPage + 1);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/viewAllAssigendRequirements`,
      data: {
        recruiterId: recruiterId?.id,
        page: newPage + 1
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {

      if (response.data.status === true) {
        setAssignData(response.data.data);
        setAssignCount(response.data.count);
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

  const [roleName, setRoleName] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a Valid Email Address"),
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
    roleName: Yup.string().required("User Category is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    employeeId: Yup.string(),
    companyName: userRole === "SUBVENDOR" ? Yup.string().required("Company Name is required") : Yup.string(),
    companyAddress: (companyType === "COMPANY" && userRole === "SUBVENDOR") ? Yup.string().required("Company Address is required") : Yup.string(),
    headOfficeLocation: (companyType === "COMPANY" && userRole === "SUBVENDOR") ? Yup.string().required("Head Office Location is required") : Yup.string(),
    branchOfficeLocation: (companyType === "COMPANY" && userRole === "SUBVENDOR") ? Yup.string().required("Branch office Location is required") : Yup.string(),
    capabilities: (companyType === "COMPANY" && userRole === "SUBVENDOR") ? Yup.string().required("Hiring Support Capabilities is required") : Yup.string(),
    recruiterCapacity: (companyType === "COMPANY" && userRole === "SUBVENDOR") ? Yup.string().required("Recruiter Capacity is required") : Yup.string(),
  });

  const editSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a Valid Email Address"),
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
    roleName: Yup.string().required("User Category is required"),
    employeeId: Yup.string(),
    companyName: userEdit.roleName === "SUBVENDOR" ? Yup.string().required("company Name is required") : Yup.string(),
    companyAddress: (companyType === "COMPANY" && userEdit.roleName === "SUBVENDOR") ? Yup.string().required("Company Address is required") : Yup.string(),
    headOfficeLocation: (companyType === "COMPANY" && userEdit.roleName === "SUBVENDOR") ? Yup.string().required("Head Office Location is required") : Yup.string(),
    branchOfficeLocation: (companyType === "COMPANY" && userEdit.roleName === "SUBVENDOR") ? Yup.string().required("Branch office Location is required") : Yup.string(),
    capabilities: (companyType === "COMPANY" && userEdit.roleName === "SUBVENDOR") ? Yup.string().required("Hiring Support Capabilities is required") : Yup.string(),
    recruiterCapacity: (companyType === "COMPANY" && userEdit.roleName === "SUBVENDOR") ? Yup.string().required("Recruiter Capacity is required") : Yup.string(),
  });

  const assignSchema = Yup.object().shape({
    requirementId: Yup.string().required("Requirement Name is required"),
  });


  const {
    register: assignRequirement,
    formState: { errors: assignErrors, isSubmitting: assignIsSubmitting },
    handleSubmit: assignSubmit,
    reset: assignReset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(assignSchema),
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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/viewAllUsers`,
        data: {
          page: "1",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {

        if (response.data.status === true) {
          setLoader(false);
          setUserData(response.data.data);
          setCount(response.data.count);
        }
      });

      getUserName();
      // setUserName(dataset)
    };



    const getRequirementName = async () => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/getAllRequirementList`,
        data: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {
            setLoader(false);
            setRequirementName(response.data.data);
          }
        })

        .catch(function (error) {
          console.log(error);
        });
    };


    fetchData();
    getRequirementName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducerValue, token]);

  const getUserName = async () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/allRecruiterList`,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {

        if (response.data.status === true) {
          setLoader(false);
          setUserName(response.data.data);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  function handleStatus(id, value) {

    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/changeUserState`,
      data: {
        id: id,
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setLoader(false);
        const switchState = userData.map(item => {
          if (item.user.id === id) {
            return { ...item, user: { ...item.user, isActive: value } };

          }
          return item;
        });
        setUserData(switchState);
        handleNotificationCall("success", response.data.data);
      }
    });
  }



  function getAssigendRequirements(id) {
    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/viewAllAssigendRequirements`,
      data: {
        recruiterId: id,
        page: "1",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setLoader(false);
          setAssignData(response.data.data);
          setAssignCount(response.data.count);
        }
      })

      .catch(function (error) {
        console.log(error);
      });

  }


  function handleAssignStatus(id, value) {

    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/changeAssignedRequirementStatus`,
      data: {
        id: id,
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    }).then(function (response) {

      if (response.data.status === true) {

        const switchState = assignData.map(item => {
          if (item.id === id) {
            return { ...item, isActive: value };

          }
          return item;
        });
        setAssignData(switchState);
        setLoader(false);
        handleNotificationCall("success", response.data.message);
      }
    });
  }

  function handleAssignRequirements(values) {

    return new Promise((resolve) => {
      setLoader(true);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/assignRequirements`,
        data: {
          recruiterId: recruiterId?.id,
          requirementId: requirementId?.id,
        },

        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        resolve();
        if (response.data.status === true) {
          handleNotificationCall("success", response.data.message);
          forceUpdate();
          assignReset();
          setRecruiterId(null);
          setRequirementId(null);

          setState({ ...state, right: false });
        } else {
          handleNotificationCall("error", response.data.message);
        }
        setLoader(false);
      });
    });
  }


  function handleAdd(values) {
    return new Promise((resolve) => {
      setLoader(true);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/addUser`,
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          mobile: values.mobile,
          roleName: values.roleName,
          employeeId: values.employeeId,
          companyName: values.companyName,
          companyAddress: values.companyAddress,
          headOfficeLocation: values.headOfficeLocation,
          branchOfficeLocation: values.branchOfficeLocation,
          capabilities: values.capabilities,
          recruiterCapacity: values.recruiterCapacity,
        },

        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        resolve();
        if (response.data.status === true) {
          handleNotificationCall("success", response.data.message);
          forceUpdate();
          setState({ ...state, right: false });
        } else {
          handleNotificationCall("error", response.data.message);
        }
        setLoader(false);
      });
    });
  }

  function handleEdit(values) {
    return new Promise((resolve) => {
      setLoader(true);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/editUser`,
        data: {
          id: userEdit.id,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          mobile: values.mobile,
          password: values.password,
          roleName: values.roleName,
          companyName: values.companyName,
          employeeId: values.employeeId,
          companyAddress: values.companyAddress,
          headOfficeLocation: values.headOfficeLocation,
          branchOfficeLocation: values.branchOfficeLocation,
          capabilities: values.capabilities,
          recruiterCapacity: values.recruiterCapacity,
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
            handleNotificationCall("error", response.data.message);
          }

          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  const [state, setState] = useState({
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userName, setUserName] = useState([]);
  const [recruiterId, setRecruiterId] = useState(null);
  const [requirementId, setRequirementId] = useState(null);


  const filterRef = useRef(null);

  const handleFromDateChange = (event) => {
    setFromDate(filterRef.current.fromDate.value);
  };

  const handleToDateChange = (event) => {
    setToDate(filterRef.current.toDate.value);
  };

  const resetForm = (e) => {
    filterRef.current.reset();
    setRoleName('');
    setRecruiterId(null);
    forceUpdate();
  };

  function getFilterData() {
    setLoader(true);
    setCurrerntPage(1);
    setPage(0);
    const form = filterRef.current;

    var data = JSON.stringify({
      page: 1,
      roleName: `${form["roleName"].value}`,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
      recruiterId: recruiterId?.id,
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/viewAllUsers`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setLoader(false);
          setUserData(response.data.data);
          setCount(response.data.count);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  }

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
                  <Grid item xs={10} md={6}>

                    <Typography variant="subtitle1">

                      Edit User
                    </Typography>
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

              <form onSubmit={editSubmit(handleEdit)}>
                <CardContent>
                  <Grid container direction="row" spacing={2}>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <FormControl className={classes.margin}>
                        <InputLabel shrink htmlFor="roleName">
                          Select User Category
                        </InputLabel>

                        <Select
                          label="Role"
                          name="roleName"
                          defaultValue={userEdit.roleName}
                          {...editUser("roleName")}
                          error={editErrors.roleName ? true : false}
                          classes={{
                            root: classes.customSelectField,
                            icon: classes.customSelectIcon,
                          }}
                          disableUnderline
                          onChange={(e) => {
                            setUserEdit({
                              ...userEdit,
                              roleName: e.target.value
                            });
                          }}
                        >
                          <MenuItem value="RECRUITER">Recruiter</MenuItem>
                          <MenuItem value="CLIENTCOORDINATOR">{companyType === "COMPANY" ? "Hiring Manager" : "Client Coordinator"}</MenuItem>
                          <MenuItem value="SUBVENDOR"> {companyType === "COMPANY" ? "Vendor" : "Sub Vendor"}</MenuItem>
                          {companyType === "COMPANY" ?
                            <></>
                            :
                            <MenuItem value="FREELANCER">  Freelancer </MenuItem>
                          }
                        </Select>
                      </FormControl>
                    </Grid>

                    {userEdit.roleName === "SUBVENDOR" &&
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <InputLabel shrink htmlFor="companyName">

                          Company Name
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            size="small"
                            classes={{ root: classes.customTextField }}
                            InputProps={{ disableUnderline: true }}
                            placeholder="Enter Company Name"
                            id="companyName"
                            defaultValue={userEdit.companyName}
                            {...editUser("companyName")}
                            error={editErrors.companyName ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {editErrors.companyName?.message}
                          </Typography>
                        </FormControl>
                      </Grid>
                      }

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="firstName">

                        First Name
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter First Name"
                          id="firstName"
                          defaultValue={userEdit.firstName}
                          {...editUser("firstName")}
                          error={editErrors.firstName ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.firstName?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="lastName">

                        Last Name
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter Last Name"
                          id="lastName"
                          defaultValue={userEdit.lastName}
                          {...editUser("lastName")}
                          error={editErrors.lastName ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.lastName?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="email">
                        Email
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
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

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="mobile">
                        Mobile
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          type="number"
                          placeholder="Enter Mobile"
                          id="mobile"
                          defaultValue={userEdit.mobile}
                          {...editUser("mobile")}
                          error={editErrors.mobile ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.mobile?.message}
                        </Typography>
                      </FormControl>
                    </Grid>



                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="employeeId">
                        Employee ID
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          type="number"
                          placeholder="Enter Employee ID"
                          id="employeeId"
                          defaultValue={userEdit.employeeId}
                          {...editUser("employeeId")}
                          error={editErrors.employeeId ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.employeeId?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                    {(companyType === "COMPANY" && userEdit.roleName === "SUBVENDOR") ? (
                      <>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                        <InputLabel shrink htmlFor="companyAddress">
                          Company Address
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            size="small"
                            classes={{ root: classes.customTextField }}
                            InputProps={{ disableUnderline: true }}
                            placeholder="Enter Company Address"
                            id="companyAddress"
                            defaultValue={userEdit.companyAddress}
                            {...editUser("companyAddress")}
                            error={editErrors.companyAddress ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {editErrors.companyAddress?.message}
                          </Typography>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6}>
                        <InputLabel shrink htmlFor="headOfficeLocation">
                          Head Office Location
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            size="small"
                            classes={{ root: classes.customTextField }}
                            InputProps={{ disableUnderline: true }}
                            placeholder="Enter Head Office Location"
                            id="headOfficeLocation"
                            defaultValue={userEdit.headOfficeLocation}
                            {...editUser("headOfficeLocation")}
                            error={editErrors.headOfficeLocation ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {editErrors.headOfficeLocation?.message}
                          </Typography>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6}>
                        <InputLabel shrink htmlFor="branchOfficeLocation">
                          Branch Office Location
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            size="small"
                            classes={{ root: classes.customTextField }}
                            InputProps={{ disableUnderline: true }}
                            placeholder="Enter Branch Office Location"
                            id="branchOfficeLocation"
                            defaultValue={userEdit.branchOfficeLocation}
                            {...editUser("branchOfficeLocation")}
                            error={editErrors.branchOfficeLocation ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {editErrors.branchOfficeLocation?.message}
                          </Typography>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                        <InputLabel shrink htmlFor="capabilities">
                         Hiring Support
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            size="small"
                            classes={{ root: classes.customTextField }}
                            InputProps={{ disableUnderline: true }}
                            placeholder="IT/Non-IT/NICHE/SUPER NICHE/Leadership"
                            id="capabilities"
                            defaultValue={userEdit.capabilities}
                            {...editUser("capabilities")}
                            error={editErrors.capabilities ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {editErrors.capabilities?.message}
                          </Typography>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                        <InputLabel shrink htmlFor="recruiterCapacity">
                          Recruiter Capacity
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            size="small"
                            classes={{ root: classes.customTextField }}
                            InputProps={{ disableUnderline: true }}
                            placeholder="Enter Recruiter Capacity"
                            id="recruiterCapacity"
                            defaultValue={userEdit.recruiterCapacity}
                            {...editUser("recruiterCapacity")}
                            error={editErrors.recruiterCapacity ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {editErrors.recruiterCapacity?.message}
                          </Typography>
                          </FormControl>
                        </Grid>
                      </>
                    ):(
                      <></>
                    )}
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
        <AddUser
          toggleDrawer={toggleDrawer}
          handleSubmit={handleSubmit}
          handleAdd={handleAdd}
          setRoleName={setRoleName}
          roleName={roleName}
          errors={errors}
          register={register}
          isSubmitting={isSubmitting}
        />
        {/* <Box sx={{ width: "100%" }} role="presentation">
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
                    
                    <Typography variant="subtitle1"> Add User </Typography>
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
              <form onSubmit={handleSubmit(handleAdd)}>
                <CardContent>
                  <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                      <FormControl className={classes.margin}>
                        <InputLabel shrink htmlFor="roleName">
                          Select User Category
                        </InputLabel>

                        <Select
                          label="Role"
                          name="roleName" 
                          defaultValue={""}
                          classes={{
                            root: classes.customSelectField,
                            icon: classes.customSelectIcon,
                          }}
                           
                          {...register("roleName", {
                            onChange: (e) => {
                              setRoleName(e.target.value); 
                            }
                          })}

                          error={errors.roleName ? true : false}
                          disableUnderline
                        >
                          <MenuItem value="RECRUITER">Recruiter</MenuItem>
                          <MenuItem value="CLIENTCOORDINATOR">  Client Coordinator </MenuItem>
                          <MenuItem value="SUBVENDOR">  Subvendor </MenuItem>
                          <MenuItem value="FREELANCER">  Freelancer </MenuItem>
                        </Select>

                        <Typography variant="inherit" color="error">
                          {errors.roleName?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    {roleName==="SUBVENDOR"? 
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="companyName">   Company Name  </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter Company Name"
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
                   :""}
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="firstName">
                        
                        First Name
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter First Name"
                          id="firstName"
                          name="firstName"
                          {...register("firstName")}
                          error={errors.firstName ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.firstName?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="lastName">
                        
                        Last Name
                      </InputLabel>
                      <FormControl className={classes.margin}>
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
                          name="email"
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
              

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="employeeId">
                        
                        Employee ID
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          size="small"
                          type="number"
                          placeholder="Enter Employee Id"
                          id="employeeId"
                          name="employeeId"
                          {...register("employeeId")}
                          error={errors.employeeId ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.employeeId?.message}
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
                      disabled={isSubmitting}
                      type="submit"
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
            </Card>
          </List>
        </Box> */}
      </>
    ) : dataList === "ASSIGN" ? (
      <>

        <Box sx={{ width: "100%" }} role="presentation">
          <List>
            <>
              <AssignAdd
                externalUser={""}
                toggleDrawer={toggleDrawer}
                handleAssignRequirements={handleAssignRequirements}
                assignSubmit={assignSubmit}
                assignRequirement={assignRequirement}
                assignErrors={assignErrors}
                setRequirementId={setRequirementId}
                handlerequirementChangePage={handlerequirementChangePage}
                assigncount={assigncount}
                assignPage={assignPage}
                handleAssignStatus={handleAssignStatus}
                requirementName={requirementName}
                setRecruiterId={setRecruiterId}
                assignIsSubmitting={assignIsSubmitting}
                assignData={assignData}
                assignCurrerntPage={assignCurrerntPage}
                getAssigendRequirements={getAssigendRequirements}
                recruiter={"false"}
              />
            </>
          </List>
        </Box>

        {/* <Box sx={{ width: "100%" }} role="presentation">
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
                    
                    <Typography variant="subtitle1"> Assign Requirement to User </Typography>
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
              <form onSubmit={assignSubmit(handleAssignRequirements)}>
                <CardContent>
                    
                <Grid container spacing={2} className={classes.filterGap}>
                  <div>
                    <FormControl className={classes.margin}>
                      <InputLabel shrink htmlFor="requirementId">  Requirement Name   </InputLabel> 
                      <Autocomplete
                      className={classes.AutocompleteFullWidth}
                          options={requirementName} 
                          name="requirementId"   
                       
                        disableClearable
                        error={assignErrors.requirementId ? true : false}
                        {...assignRequirement("requirementId")   }
                        getOptionLabel={(option) =>
                          option.requirementName  + " (" + option.uniqueId + ")"
                      }
                        onChange={(event, value) => {
                          setRequirementId(value); 
                        }}
 
                          renderInput={(params) => (
                            <TextField   {...params}    name="requirementId"      variant="filled"  />
                          )}

                         
                        /> 
                       </FormControl>
                    </div>
  
                    <Button
                      variant="contained"
                      color="primary" 
                      size="small"
                      disabled={assignIsSubmitting}
                      type="submit"
                    
                      className={classes.mt16}
                    >
                      Assign
                    </Button>
                    
                     
                  </Grid>


                  <Grid container spacing={2} className={classes.filterGap}>
                  
                  <Typography variant="inherit" color="error">
                          {assignErrors.requirementId?.message}
                        </Typography>
                    
                    

                  </Grid>
                  
 <Grid container direction="row" spacing={2}>
 <Grid item xs={12}   >
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
              responsive: mobileQuery===true? 'vertical' : 'standard',
              textLabels: {
                body: {
                  noMatch: 'Oops! Matching record could not be found',
                }
              },
            }}
            columns={[
              {
                name: "S.No",
              },
              {
                name: "User",
              },
              {
                name: "Requirement Name",
              },
              {
                name: "Status",
              },
              {
                name: "Posted Date",
              },
            ]}
            data={assignData.map((item, index) => {
              return [
                <>   {assignCurrerntPage !== 0 ? 10 * assignCurrerntPage - 10 + index + 1 : index + 1}  </>,
               <>{item.recruiter?.firstName + " " + item.recruiter?.lastName} </>,
               <>   {item.requirement?.requirementName} {"(" + item.requirement?.uniqueId + ")"} </>, 
               <Switch
               checked={item.isActive}
               onChange={(e) => {
                 handleAssignStatus(item.id, e.target.checked);
               }}
               color="primary"
               inputProps={{ "aria-label": "primary checkbox" }} />,
                moment(item.createdAt).format("DD-MM-YYYY"),
              ];
            })}
          />  </Grid>
 </Grid>
<Grid container spacing={2} className={classes.pagination}>
            <TablePagination
              rowsPerPageOptions={[50]}
              component="div"
              count={assigncount}
              rowsPerPage={50}
              page={assignPage}
              onPageChange={handlerequirementChangePage}
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
                      onClick={toggleDrawer(anchor, false)}
                    >
                      
                      Close
                    </Button>
                  </Grid>
                </CardActions>
                </form>
            </Card>
          </List>
        </Box> */}


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
                  className={classes.drawerViewHeader}
                >
                  <Grid item xs={10} md={6}>

                    <Typography variant="subtitle1">

                      View User - {userEdit.firstName + " " + userEdit.lastName}
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
                  <Grid item xs={12} sm={6} md={6} lg={6}>   <Typography className={classes.boldtext}>   First Name:   </Typography>    </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {userEdit.firstName}    </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   Last Name:   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {userEdit.lastName}  </Grid>


                  <Grid item xs={12} sm={6} md={6} lg={6}>     <Typography className={classes.boldtext}>  User Category:  </Typography> </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {userEdit.roleName === "RECRUITER" ? "Recruiter" :
                    userEdit.roleName === "CLIENTCOORDINATOR" ? "Hiring Manager" :
                      userEdit.roleName === "SUBVENDOR" ? (companyType === "COMPANY" ? "Vendor" : "Sub Vendor") :
                        userEdit.roleName === "FREELANCER" ? "Freelancer" :
                          ""}   </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>Email:</Typography>   </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {userEdit.email}  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>    <Typography className={classes.boldtext}>   Mobile:   </Typography>   </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {userEdit.mobile} </Grid>


                  {userEdit.roleName === "SUBVENDOR" ? <>
                    <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>  Company Name: </Typography>   </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}> {userEdit.companyName}  </Grid></>
                    : ""}


                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography className={classes.boldtext}>  Employee Id:       </Typography> </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>    {userEdit.employeeId}     </Grid>

                  {userEdit.roleName === "SUBVENDOR" && (
                   <>
                    <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>  Company Address: </Typography>   </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}> {userEdit.companyAddress}  </Grid>
                    
                    <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>  Head office Location: </Typography>   </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}> {userEdit.headOfficeLocation}  </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>  Branch office Location: </Typography>   </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}> {userEdit.branchOfficeLocation}  </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>  Hiring Support: </Typography>   </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}> {userEdit.capabilities}  </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>  Recruiter Capacity: </Typography>   </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}> {userEdit.recruiterCapacity}  </Grid>
                  </>
                  )}

                  <Grid item xs={12} sm={6} md={6} lg={6}> <Typography className={classes.boldtext}>   Posted Date:   </Typography> </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}> {moment(userEdit.createdAt).format("DD-MM-YYYY")}  </Grid>
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


  const table_options = {
    textLabels: {
      body: {
        noMatch: 'Oops! Matching record could not be found',
      }
    },
    sort: false,
    selectableRows: "none",
    search: false,
    filter: false,
    print: false,
    download: false,
    pagination: false,
    customToolbar: () => <HeaderElements />,
    page: page,
    responsive: mobileQuery === true ? 'vertical' : 'standard',
  };






  const table_column = [
    {
      name: "S.No",
    },
    {
      name: "Actions",
    },
    {
      name: "Name",
    },
    {
      name: "Email",
    },
    {
      name: "Employee ID",
    },

    {
      name: "Mobile",
    },

    {
      name: "User Category",
    },

    {
      name: "Status",
    },
    {
      name: "Posted Date",
    },
  ]


  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6}>

          <PageTitle title="Users" />
        </Grid>

        <Grid item xs={6} className={classes.drawerClose}>
          <div className={classes.lgButton}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                reset();
                editreset();
                setDataList("ADD");
                setState({ ...state, right: true });
              }}
              className={classes.addUser}
              startIcon={<AddCircleIcon />}
            >
              Add New User

            </Button>
          </div>
          <div className={classes.smButton}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                reset();
                editreset();
                setDataList("ADD");
                setState({ ...state, right: true });
              }}
              className={classes.addUser}
              startIcon={<AddCircleIcon />}
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

      <form
        ref={filterRef}
        onSubmit={(e) => {
          e.preventDefault();
          getFilterData();
        }}
      >
        <Grid container spacing={2} className={classes.filterGap}>
          <div className={classes.filterFullWidth} >
            <InputLabel shrink id="roleName"> User Category </InputLabel>

            <TextField
              name="roleName"
              variant="standard"
              defaultValue=""
              onChange={(e) => setRoleName(e.target.value)}
              value={roleName}
              InputProps={{ className: classes.h34 }}
              disableunderline="true"
              select>

              <MenuItem value="RECRUITER">Recruiter</MenuItem>
              <MenuItem value="CLIENTCOORDINATOR"> {companyType === "COMPANY" ? "Hiring Manager" : "Client Coordinator"} </MenuItem>
              <MenuItem value="SUBVENDOR">  {companyType === "COMPANY" ? "Vendor" : "Sub Vendor"} </MenuItem>
              {companyType === "COMPANY" ?
                <></>
                :
                <MenuItem value="FREELANCER">  Freelancer </MenuItem>
              }
            </TextField>
          </div>
          <Autocomplete
            className={classes.filterFullWidth}
            options={userName}
            getOptionLabel={(option) => {
              const roleName = option.user?.role?.roleName;
              const firstName = option.firstName;
              const lastName = option.lastName;
              let label = `${firstName} ${lastName}`;
              if (roleName) {
                label += ` (${roleName})`;

                if (roleName === 'SUBVENDOR') {
                  label = label.replace('(SUBVENDOR)', `(${option?.companyName})`);
                } else if (roleName === 'CLIENTCOORDINATOR') {
                  label = label.replace('(CLIENTCOORDINATOR)', '(Hiring Manager)');
                }
              }

              return label;
            }}
            onChange={(event, value) => setRecruiterId(value)}
            value={recruiterId}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                name="recruiterId"
                variant="standard"
                label={companyType === "COMPANY" ? "User" : "Recruiter"}
                InputLabelProps={{ shrink: true }}
                type="text"
              />
            )}
          />

          <TextField
            name="fromDate"
            label="From"
            size="small"
            type="date"
            variant="standard"
            format={'DD/MM/YYYY'}
            InputLabelProps={{ shrink: true }}
            className={classes.filterWidth}
            defaultValue={fromDate}
            onChange={handleFromDateChange}

          />


          <TextField
            name="toDate"
            label="To"
            size="small"
            type="date"
            format={'DD/MM/YYYY'}
            variant="standard"
            InputLabelProps={{ shrink: true }}
            className={classes.filterWidth}
            defaultValue={toDate}
            onChange={handleToDateChange}

          />

          <div className={classes.buttons}>
            <Button
              variant="contained"
              size="small"
              type="submit"
              color="primary"
            >
              Search
            </Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => resetForm()}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </form>

      <Grid container spacing={2}>
        <Grid item xs >
          <MUIDataTable
            options={table_options}
            columns={table_column}
            data={userData.map((item, index) => {

              return [
                currerntPage !== 0
                  ? 10 * currerntPage - 10 + index + 1
                  : index + 1,

                <Grid container className={classes.space}>
                  <Grid item xs className={classes.toolAlign}>
                    <Tooltip
                      title="Edit User"
                      placement="bottom"
                      aria-label="edit"
                    >
                      <EditIcon
                        className={classes.toolIcon}
                        onClick={(e) => {
                          setState({ ...state, right: true });
                          editreset();
                          setDataList("EDIT");

                          setUserEdit({
                            ...userEdit,
                            id: item.user.id,
                            email: item.user.email,
                            firstName: item.firstName,
                            lastName: item.lastName,
                            mobile: item.mobile,
                            roleName: item.user.roleName,
                            companyName: item.companyName,
                            employeeId: item.employeeId,
                            companyAddress: item.companyAddress,
                            headOfficeLocation: item.headOfficeLocation,
                            branchOfficeLocation: item.branchOfficeLocation,
                            capabilities: item.capabilities,
                            recruiterCapacity: item.recruiterCapacity
                          });
                        }}
                      />
                    </Tooltip>

                    <Tooltip
                      title="View User"
                      placement="bottom"
                      aria-label="view"
                    >
                      <ViewIcon
                        className={classes.toolIcon}
                        onClick={(e) => {
                          setState({ ...state, right: true });
                          editreset();
                          setDataList("VIEW");

                          setUserEdit({
                            ...userEdit,
                            id: item.user.id,
                            email: item.user.email,
                            firstName: item.firstName,
                            lastName: item.lastName,
                            mobile: item.mobile,
                            roleName: item.user.roleName,
                            employeeId: item.employeeId,
                            companyName: item.companyName,
                            companyAddress: item.companyAddress,
                            headOfficeLocation: item.headOfficeLocation,
                            branchOfficeLocation: item.branchOfficeLocation,
                            capabilities: item.capabilities,
                            recruiterCapacity: item.recruiterCapacity
                          });
                        }}
                      />
                    </Tooltip>
                    {item.user?.roleName === "SUBVENDOR" || item.user?.roleName === "FREELANCER" ?
                      <Tooltip
                        title="Assign Requirements"
                        placement="bottom"
                        aria-label="view"
                      >
                        <AssignmentIndIcon
                          className={classes.toolIcon}
                          onClick={(e) => {
                            setDataList("ASSIGN");
                            setRecruiterId(item);
                            getAssigendRequirements(item.id);
                            setState({ ...state, right: true });
                            assignReset();
                          }}
                        />
                      </Tooltip>
                      : ""}
                  </Grid>
                </Grid>,
                <>
                  {
                    item.firstName + " " + item.lastName
                  }
                  {
                    item.companyName &&` (${ item.companyName})` 
                  }
                </>
                ,
                item.user.email,
                item.employeeId,
                item.mobile,
                item.user?.roleName === "RECRUITER" ? "Recruiter" :
                  item.user?.roleName === "CLIENTCOORDINATOR" ? "Hiring Manager" :
                    item.user?.roleName === "SUBVENDOR" ? (companyType === "COMPANY" ? "Vendor" : "Sub Vendor") :
                      item.user?.roleName === "FREELANCER" ? "Freelancer" :
                        "",
                <Switch
                  checked={item.user.isActive}
                  onChange={(e) => {
                    handleStatus(item.user.id, e.target.checked);
                  }}
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }} />,
                moment(item.createdAt).format("DD-MM-YYYY"),

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

