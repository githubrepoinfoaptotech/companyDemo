import React, { useState, useEffect, useReducer, useRef } from "react";
import MUIDataTable from "mui-datatables";
import {
  Grid,
  Button,
  List,
  Box,
  SwipeableDrawer,
  Switch,
  FormControl,
  InputLabel,
  Typography,
  TablePagination,
  TextField,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
// components
import PageTitle from "../../components/PageTitle";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import { toast } from "react-toastify";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import { Autocomplete } from "@material-ui/lab";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ViewIcon from "@material-ui/icons/Visibility";
 
import EditRoundedIcon from "@material-ui/icons/EditRounded";
// data
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Notification from "../../components/Notification";
import AddClient from "../../components/Admin/AddClient";

import CancelIcon from "@material-ui/icons/Cancel";
 import moment from "moment";
// import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
// import XlsxPopulate from "xlsx-populate";
// import { saveAs } from "file-saver";
import useStyles from "../../themes/style.js";
import useMediaQuery from '@material-ui/core/useMediaQuery';
 

const positions = [toast.POSITION.TOP_RIGHT];

export default function Tables() {
  const classes = useStyles(); 
  const mobileQuery = useMediaQuery('(max-width:600px)');    
  const token = localStorage.getItem("token");
  const [clientData, setClientData] = useState([]);
  const [clientEdit, setClientEdit] = useState({
    id: "",
    clientName: "",
    clientIndustry: "",
    clientWebsite: "",
    aggStartDate: "",
    aggEndDate: "",
    aggRec: "",
    aggName: "",
    aggEmail: "",
    aggMobile: "",
    status: "",
    createdAt: "",
  });

  const [loader, setLoader] = useState(false);

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [page, setPage] = useState(0);
  const [currerntPage, setCurrerntPage] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(0);
  const [dataList, setDataList] = useState("ADD");
  const [display, setDisplay] = useState(false);
  var [notificationsPosition] = useState(2);
  var [errorToastId, setErrorToastId] = useState(null);
  const [displayAdd, setDisplayAdd] = useState(false);
  const [Id, setId] = useState(0);

  

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
    clientName: Yup.string().max(255).required("Clients Name is required"),
    clientIndustry: Yup.string()
      .max(255)
      .required("Client Industry is required"),
    clientWebsite: Yup.string().max(255).required("Client Website is required"),
    aggStartDate: Yup.string().max(255).required("Start Date is required"),
    aggEndDate: Yup.string().max(255).required("End Date is required"),
  });

  const {
    register: editClient,
    formState: { errors: editErrors, isSubmitting: editIsSubmitting },
    handleSubmit: editSubmit,
    reset: editreset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  console.log(errors)
  useEffect(() => {
    setLoader(true);

    const fetchData = async () => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/getAllClients`,
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

          setClientData(response.data.data);
          setCount(response.data.count);
        }
      });
    };
    const getUserName = async () => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/getAllClientList`,
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
    fetchData();
    getUserName();
  }, [reducerValue, token]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userName, setUserName] = useState([]);
  const [clientId, setClientId] = useState(null);

  const filterRef = useRef(null);

  const handleFromDateChange = (event) => {
    setFromDate(filterRef.current.fromDate.value);
  };

  const handleToDateChange = (event) => {
    setToDate(filterRef.current.toDate.value);
  };

  const resetForm = (e) => {
    filterRef.current.reset();
    setClientId(null);
    forceUpdate();
  };

  function getFilterData() {
    setLoader(true);
    setCurrerntPage(1);
    setPage(0);
    const form = filterRef.current;
    var data = JSON.stringify({
      page: 1,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
      clientId: clientId?.id,
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/getAllClients`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setLoader(false);
          setClientData(response.data.data);
          setCount(response.data.count);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  function handleAdd(values) {
    return new Promise((resolve) => {
      setLoader(true);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/addClient`,
        data: {
          clientName: values.clientName,
          clientIndustry: values.clientIndustry,
          clientWebsite: values.clientWebsite,
          aggStartDate: values.aggStartDate,
          aggEndDate: values.aggEndDate,
          orgRec: recruiterFields,
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
        url: `${process.env.REACT_APP_SERVER}admin/editClient`,
        data: {
          id: clientEdit.id,
          clientName: values.clientName,
          clientIndustry: values.clientIndustry,
          clientWebsite: values.clientWebsite,
          aggStartDate: values.aggStartDate,
          aggEndDate: values.aggEndDate,
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

  function handleRecAdd() {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/addOrgRecruiter`,
      data: {
        name: name,
        email: email,
        mobile: mobile,
        clientId: clientEdit.id,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          handleShow(clientEdit.id, "EDIT");

          setDisplayAdd(false);
          handleNotificationCall("success", response.data.message);
        } else {
          handleNotificationCall("error", response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleClientStatus(id, value) {
    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/changeClientStatus`,
      data: {
        clientId: id,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setLoader(false);
         const switchState = clientData.map(item => {

          if (item.id === id) { 
            return { ...item, statusList: { ...item.statusList, statusName: value === true ? "ACTIVE" : "INACTIVE" } };
            
          }
          return item;
        }); 
        setClientData(switchState);
        handleNotificationCall("success", response.data.message);
      }
    });
  }

  function handleStatus(id, value) {
    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/changeOrgRecruiterStatus`,
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
        const switchState = recruiterEditFields.map(item => {

          if (item.id === id) { 
            return { ...item, isActive: value };
            
          }
          return item;
        }); 
         
        setRecruiterEditFields(switchState);
        handleNotificationCall("success", response.data.message);
      }
    });
  }

  function handleShow(values, name) {
    setLoader(true);
    reset();
    editreset();
    if (name === "EDIT") {
      setDataList("EDIT");
    } else {
      setDataList("VIEW");
    }
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/viewClient`,
      data: {
        id: values,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setRecruiterEditFields(response.data.orgRecruiter);
          setClientEdit({
            ...clientEdit,
            id: response.data.data.id,
            clientName: response.data.data.clientName,
            clientIndustry: response.data.data.clientIndustry,
            clientWebsite: response.data.data.clientWebsite,
            aggStartDate: moment(response.data.data.aggStartDate).format(
              "YYYY-MM-DD",
            ),
            aggEndDate: moment(response.data.data.aggEndDate).format(
              "YYYY-MM-DD",
            ),
            orgRec: response.data.orgRecruiter,
            status: response.data.data.statusList,
            createdAt: response.data.data.createdAt,
          });
          setState({ ...state, right: true });

          setLoader(false);
        }  else{
          setLoader(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [recruiterFields, setRecruiterFields] = useState([{
      name: "",
      mobile: "",
      email: "",
    }]);

  const recruiterChange = (event, index) => {
    const values = [...recruiterFields];
    values[index][event.target.name] = event.target.value;
    setRecruiterFields(values);
  };

  const [recruiterEditFields, setRecruiterEditFields] = useState([
    {
      name: "",
      mobile: "",
      email: "",
    },
  ]);

  // adds new input
  const recruiterAdd = () => {
    setRecruiterFields([
      ...recruiterFields,
      {
        name: "",
        mobile: "",
        email: "",
      },
    ]);

    const timeout = setTimeout(() => {
      const element = document.getElementById("section");

      element.scrollIntoView({ behavior: "smooth" });
    }, 500);

    return () => clearTimeout(timeout);
  };
  const recruiterRemove = (index) => {
    if (recruiterFields.length !== -1) {
      const values = [...recruiterFields];
      values.splice(-1);
      setRecruiterFields(values);
    }
  };

  const [state, setState] = useState({
    top: false,
    left: false,
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
                    <Typography variant="subtitle1">Edit Client</Typography>
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
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <InputLabel shrink htmlFor="clientName">
                      Clients Name
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          placeholder="Enter Clients Name"
                          id="clientName"
                          defaultValue={clientEdit.clientName}
                          {...editClient("clientName")}
                          error={editErrors.clientName ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.clientName?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <InputLabel shrink htmlFor="clientIndustry">
                      Client Industry
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          placeholder="Enter Client Industry"
                          id="clientIndustry"
                          defaultValue={clientEdit.clientIndustry}
                          {...editClient("clientIndustry")}
                          error={editErrors.clientIndustry ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.clientIndustry?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <InputLabel shrink htmlFor="clientWebsite">
                      Clients Website
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          placeholder="Enter Clients Website"
                          id="clientWebsite"
                          defaultValue={clientEdit.clientWebsite}
                          {...editClient("clientWebsite")}
                          error={editErrors.clientWebsite ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.clientWebsite?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <InputLabel shrink htmlFor="aggStartDate">
                      Agreement Start Date
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          type="date"
                          placeholder="Select Agreement Start Date"
                          id="aggStartDate"
                          defaultValue={clientEdit.aggStartDate}
                          {...editClient("aggStartDate")}
                          error={editErrors.aggStartDate ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.aggStartDate?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <InputLabel shrink htmlFor="aggEndDate">
                      Agreement End Date
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          type="date"
                          placeholder="Select Agreement End Date"
                          id="aggEndDate"
                          defaultValue={clientEdit.aggEndDate}
                          {...editClient("aggEndDate")}
                          error={editErrors.aggEndDate ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.aggEndDate?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} lg={12}>
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
                            name: "Org Point of Contact(POC) Name",
                          },
                          {
                            name: "Org Point of Contact(POC) Email",
                          },
                          {
                            name: "Org Point of Contact(POC) Mobile No",
                          },
                          {
                            name: "Status",
                          },
                          {
                            name: "Edit",
                          },
                        ]}
                        data={recruiterEditFields.map((item, index) => {
                          return [
                            index + 1,
                            item.id === Id ? (
                              display === false ? (
                                item.name
                              ) : (
                                <TextField
                                  InputProps={{ disableUnderline: true }}
                                  classes={{ root: classes.customTextField }}
                                  size="small"
                                  placeholder="Name"
                                  defaultValue={item.name}
                                  onChange={(e) => {
                                    setName(e.target.value);
                                  }}
                                />
                              )
                            ) : (
                              item.name
                            ),
                            item.id === Id ? (
                              display === false ? (
                                item.email
                              ) : (
                                <TextField
                                  InputProps={{ disableUnderline: true }}
                                  classes={{ root: classes.customTextField }}
                                  size="small"
                                  placeholder="Email"
                                  defaultValue={item.email}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                  }}
                                />
                              )
                            ) : (
                              item.email
                            ),
                            item.id === Id ? (
                              display === false ? (
                                item.mobile
                              ) : (
                                <TextField
                                  InputProps={{ disableUnderline: true }}
                                  classes={{ root: classes.customTextField }}
                                  size="small"
                                  placeholder="Mobile"
                                  defaultValue={item.mobile}
                                  onChange={(e) => {
                                    setMobile(e.target.value);
                                  }}
                                />
                              )
                            ) : (
                              item.mobile
                            ),
                            <Switch
                              checked={item.isActive}
                              onChange={(e) => {
                                handleStatus(item.id, e.target.checked);
                              }}
                              color="primary"
                              inputProps={{ "aria-label": "primary checkbox" }}
                            />,
                            display === false ? (
                              <EditRoundedIcon
                                onClick={(e) => {
                                  setDisplay(true);
                                  setId(item.id);
                                  setName(item.name);
                                  setEmail(item.email);
                                  setMobile(item.mobile);
                                }}
                                size="small"
                                color="primary"
                                className={classes.closeBtn}
                              />
                            ) : item.id === Id ? (
                              <div className={classes.space}>
                                <CheckCircleIcon
                                  size="14px"
                                  color="primary"
                                  className={classes.closeBtn}
                                  onClick={() => {
                                    axios({
                                      method: "post",
                                      url: `${process.env.REACT_APP_SERVER}admin/editOrgRecruiter`,
                                      data: {
                                        id: item.id,
                                        name: name,
                                        email: email,
                                        mobile: mobile,
                                      },
                                      headers: {
                                        "Content-Type": "application/json",
                                        Authorization: token,
                                      },
                                    })
                                      .then(function (response) {
                                        if (response.data.status === true) {
                                          handleNotificationCall(
                                            "success",
                                            response.data.message,
                                          );

                                          setDisplay(false);

                                          handleShow(clientEdit.id, "EDIT");
                                        } else {
                                          handleNotificationCall(
                                            "error",
                                            response.data.message,
                                          );
                                        }
                                      })
                                      .catch(function (error) {
                                        console.log(error);
                                      });
                                  }}
                                />

                                <CancelIcon
                                  size="14px"
                                  color="primary"
                                  className={classes.closeBtn}
                                  onClick={() => {
                                    setDisplay(false);
                                  }}
                                />
                              </div>
                            ) : (
                              <EditRoundedIcon
                                onClick={(e) => {
                                  setDisplay(true);
                                  setId(item.id);
                                  setName(item.name);
                                  setEmail(item.email);
                                  setMobile(item.mobile);
                                }}
                                size="small"
                                color="primary"
                                className={classes.closeBtn}
                              />
                            ),
                          ];
                        })}
                      />
                    </Grid>

                    {displayAdd === true ? (
                      <>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                          <InputLabel shrink>
                            Org Point of Contact(POC) Name
                          </InputLabel>

                          <FormControl className={classes.margin}>
                            <TextField
                              InputProps={{ disableUnderline: true }}
                              classes={{ root: classes.customTextField }}
                              size="small"
                              placeholder="Org Point of Contact(POC) Name"
                              defaultValue={name}
                              name="name"
                              onChange={(event) => setName(event.target.value)}
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4}>
                          <InputLabel shrink>
                            Org Point of Contact(POC) Email
                          </InputLabel>

                          <FormControl className={classes.margin}>
                            <TextField
                              InputProps={{ disableUnderline: true }}
                              classes={{ root: classes.customTextField }}
                              size="small"
                              placeholder="Org Point of Contact(POC) Email"
                              defaultValue={email}
                              name="email"
                              onChange={(event) => setEmail(event.target.value)}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                          <InputLabel shrink>
                            Org Point of Contact(POC) Mobile No
                          </InputLabel>

                          <FormControl className={classes.margin}>
                            <TextField
                              InputProps={{ disableUnderline: true }}
                              classes={{ root: classes.customTextField }}
                              size="small"
                              placeholder=" Org Point of Contact(POC) Mobile No"
                              defaultValue={mobile}
                              name="mobile"
                              onChange={(event) =>
                                setMobile(event.target.value)
                              }
                            />
                          </FormControl>
                        </Grid>
                      </>
                    ) : (
                      ""
                    )}

                    <Grid
                      item
                      xs={12}
                      lg={12}
                     
                      className={classes.drawerClose}
                    >
                      {displayAdd === true ? (
                        <>
                        
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            className={classes.closeBtn}
                            onClick={(e) => {
                              handleRecAdd();
                            }}
                          >
                            SAVE
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            className={classes.closeBtn }
                            onClick={(e) => {
                              setDisplayAdd(false);
                            }}
                          >
                            Close
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className={classes.lgButton}>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={(e) => {
                                setDisplayAdd(true);
                                setName("");
                                setEmail("");
                                setMobile("");
                              }}
                              className={classes.margin}
                              startIcon={<AddCircleIcon />}
                            >
                              Add New Org Point of Contact(POC)
                            </Button>
                          </div>

                          <div className={classes.smButton}>
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<AddCircleIcon />}
                              className={classes.addUser}
                              color="primary"
                              onClick={(e) => {
                                setDisplayAdd(true);
                                setName("");
                                setEmail("");
                                setMobile("");
                              }}
                            >
                              Add New Org POC
                            </Button>
                          </div>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions  >
                  <Grid
                    container
                    direction="row"
                    className={classes.clientDrawerFooter}
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
                      onClick={toggleDrawer(anchor, false)}
                      color="secondary"
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
     <AddClient 
      isSubmitting={isSubmitting}
      handleAdd={ handleAdd }
      handleSubmit={handleSubmit}
      toggleDrawer={toggleDrawer}
      recruiterChange={recruiterChange}
      recruiterFields={recruiterFields}
      errors={errors}
      register={register}
      recruiterAdd={recruiterAdd}
      recruiterRemove={recruiterRemove}
      />
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
                  <Grid item xs={10} md={6}>
                    <Typography variant="subtitle1">View Client - {clientEdit.clientName}</Typography>
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
                    Clients Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {clientEdit.clientName}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography className={classes.boldtext}>
                    Clients Industry:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {clientEdit.clientIndustry}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography className={classes.boldtext}>
                    Clients Website:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {clientEdit.clientWebsite}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography className={classes.boldtext}>
                    Agreement Start Date:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {clientEdit.aggStartDate}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography className={classes.boldtext}>
                    Agreement End Date:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {clientEdit.aggEndDate}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography className={classes.boldtext}>
                      Status:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {clientEdit.status ? (
                      clientEdit.status.statusName === "ACTIVE" ? (
                        <>
                          <Button
                            variant="contained"
                            size="small"
                            className={classes.green+" "+ classes.noPointer}
                          >
                            ACTIVE
                          </Button>
                        </>
                      ) : clientEdit.status.statusName === "INACTIVE" ? (
                        <>
                          <Button
                            variant="contained"
                            size="small"
                            className={classes.red+" "+ classes.noPointer}
                          >
                            INACTIVE
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            size="small"
                            className={classes.blue}
                          >
                            NEW
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
                    {moment(clientEdit.createdAt).format("DD-MM-YYYY")}
                  </Grid>

                  <Grid item xs={12}  md={12} lg={12}>
                    <Typography className={classes.boldtext}>
                      Recruiter Point of Contact(POC):
                    </Typography>
                    <br />
                    <MUIDataTable
                       
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
                          name: "Name",
                        },
                        {
                          name: "Email",
                        },

                        {
                          name: "Mobile No",
                        },
                      ]}
                      data={recruiterEditFields.map((item, index) => {
                        return [index + 1, item.name, item.email, item.mobile];
                      })}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  className={classes.clientDrawerFooter}
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
      ""
    );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setCurrerntPage(newPage + 1);
    setLoader(true);
    const form = filterRef.current;
    var data = JSON.stringify({
      page: newPage + 1,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
      clientId: clientId?.id,
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/getAllClients`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setLoader(true);

        setClientData(response.data.data);
        setCount(response.data.count);
      }
    });
  };

  // function getSheetData(data, header) {
  //   var fields = Object.keys(data[0]);
  //   var sheetData = data.map(function (row) {
  //     return fields.map(function (fieldName) {
  //       return row[fieldName] ? row[fieldName] : "";
  //     });
  //   });
  //   sheetData.unshift(header);
  //   return sheetData;
  // }

  // async function saveAsExcel(data) {
  //   let header = [
  //     "S.No",
  //     "Clients Name",
  //     "Clients Industry",
  //     "Clients Website",
  //     "Agreement Start Date",
  //     "Agreement End Date",
  //     "Status",
  //     "Posted Date",
  //   ];

  //   XlsxPopulate.fromBlankAsync().then(async (workbook) => {
  //     const sheet1 = workbook.sheet(0);
  //     const sheetData = getSheetData(data, header);
  //     const totalColumns = sheetData[0].length;

  //     sheet1.cell("A1").value(sheetData);
  //     const range = sheet1.usedRange();
  //     const endColumn = String.fromCharCode(64 + totalColumns);
  //     sheet1.row(1).style("bold", true);
  //     sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
  //     range.style("border", true);
  //     return workbook.outputAsync().then((res) => {
  //       saveAs(
  //         res,
  //         `Clients_${moment(new Date()).format("DD_MM_YYYY_HH_mm")}.xlsx`,
  //       );
  //     });
  //   });
  // }

  // function downloadExel() {
  //   setLoader(true);

  //   const form = filterRef.current;
  //   var data = JSON.stringify({
  //     fromDate: `${form["fromDate"].value}`,
  //     toDate: `${form["toDate"].value}`,
  //     clientId: clientId?.id,
  //     fileDownload: "yes",
  //   });

  //   axios({
  //     method: "post",
  //     url: `${process.env.REACT_APP_SERVER}admin/getAllClients`,
  //     data: data,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //   })
  //     .then(function (response) {
  //       if (response.data.status === true) {
  //         setLoader(false);
  //         saveAsExcel(response.data.data);
  //       }
  //     })

  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  const HeaderElements = () => (
    <>
      <Grid className={classes.HeaderElements}>
        {/* <Tooltip title="Dowmload" placement="bottom" aria-label="download">
          {count !== 0 ? (
            <CloudDownloadIcon
              className={classes.toolIcon}
              onClick={(e) => {
                downloadExel();
              }}
            />
          ) : (
            <CloudDownloadIcon className={classes.downloadIcon} />
          )}
        </Tooltip> */}
        Total : {count}
      </Grid>
    </>
  );

  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6}>
          <PageTitle title="Clients" />
        </Grid>

        <Grid item xs={6} className={classes.drawerClose}>
          <div className={classes.lgButton}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.addUser}
              startIcon={<AddCircleIcon />}
              onClick={(e) => {
                setDataList("ADD");
                reset();
                editreset();
                setState({ ...state, right: true });

                setRecruiterFields([{
                  name: "",
                  mobile: "",
                  email: "",
                }])  
              }}
            >
              Add New Clients
            </Button>
          </div>
          <div className={classes.smButton}>
          <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.addUser}
              startIcon={<AddCircleIcon />}
              onClick={(e) => {
                setDataList("ADD");
                reset();
                editreset();
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
            classes={{ paper: classes.clientDrawer }}
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
          <Autocomplete
            className={classes.filterFullWidth}
            options={userName}
            getOptionLabel={(option) =>
              option.clientName + " (" + option.uniqueId + ")"
            }
            value={clientId}
            onChange={(event, value) => setClientId(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="clientId"
                label="Clients"
                InputLabelProps={{ shrink: true }}
                type="text"
              />
            )}
          />

          <TextField
            name="fromDate"
           label="From"
            size="small"
            variant="standard"
            className={classes.filterWidth}
            InputLabelProps={{ shrink: true }}
            type="date"
            defaultValue={fromDate}
            onChange={handleFromDateChange}
            
          />

          <TextField
            name="toDate"
           label="To"
            size="small"
            variant="standard"
            className={classes.filterWidth}
            InputLabelProps={{ shrink: true }}
            type="date"
            defaultValue={toDate}
            onChange={handleToDateChange}
            
          />

          <div className={classes.buttons}>
            <Button
              variant="contained"
              size="small"
              color="primary" 
              type="submit"
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

      <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
          <MUIDataTable
             
            options={{
              textLabels: {
                body: {
                  noMatch: 'Oops! Matching record could not be found',
                }
              },
              pagination: false,
              selectableRows: "none",
              search: false,
              filter: false,
              print: false,
              download: false,
              sort: false,
              responsive: mobileQuery===true? 'vertical' : 'standard', 
              customToolbar: () => <HeaderElements />,
            }}
            columns={[
              {
                name: "S.No",
              },
              {
                name: "Actions",
              },
              {
                name: "Clients Name",
              },

              {
                name: "Clients Industry",
              },

              {
                name: "Clients Website",
              },
              {
                name: "Agreement Start Date",
              },

              {
                name: "Agreement End Date",
              },

              {
                name: "Status",
              },
              {
                name: "Posted Date",
              },
            ]}
            data={clientData.map((item, index) => {
              return [
                <>
                  {currerntPage !== 0
                    ? 10 * currerntPage - 10 + index + 1
                    : index + 1}
                </>,
                <>
                  <Grid container className={classes.space}>
                    <Grid item xs className={classes.toolAlign}>
                      <Tooltip
                        title="Edit Clients"
                        placement="bottom"
                        aria-label="edit"
                      >
                        <EditIcon
                          className={classes.toolIcon}
                          onClick={(e) => {
                            handleShow(item.id, "EDIT");
                            setDisplayAdd(false);
                          }}
                        />
                      </Tooltip>
                      <Tooltip
                        title="View Clients"
                        placement="bottom"
                        aria-label="view"
                      >
                        <ViewIcon
                          className={classes.toolIcon}
                          onClick={(e) => {
                            handleShow(item.id, "VIEW");
                          }}
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </>,
                <>
                  {item.clientName} {"(" + item.uniqueId + ")"}
                </>,

                item.clientIndustry,
                item.clientWebsite,
                item.aggStartDate
                  ? moment(item.aggStartDate).format("DD-MM-YYYY")
                  : "",
                item.aggEndDate
                  ? moment(item.aggEndDate).format("DD-MM-YYYY")
                  : "",

                item.statusList ? (
                  <Switch
                    checked={
                      item.statusList.statusName === "ACTIVE" ? true : false
                    }
                    onChange={(e) => {
                      handleClientStatus(item.id, e.target.checked);
                    }}
                    color="primary"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                ) : (
                  ""
                ),

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

