import React, { useState, useEffect, useReducer, useRef } from "react";
import MUIDataTable from "mui-datatables";
import {
  Grid,
  Button,
  List,
  Box,
  SwipeableDrawer,
  TextField,
  FormControl,
  InputLabel,
  Typography,
  TablePagination,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PageTitle from "../../components/PageTitle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import { toast } from "react-toastify";
import ViewIcon from "@material-ui/icons/Visibility";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Notification from "../../components/Notification";
import moment from "moment";
import {jwtDecode} from "jwt-decode";
import Tooltip from "@material-ui/core/Tooltip";
import "react-toastify/dist/ReactToastify.css";
import useStyles from "../../themes/style.js";
import { signOut, useUserDispatch } from "../../context/UserContext";
import AddCircleIcon from "@material-ui/icons/AddCircle";
 import Pdf from "react-to-pdf";
import  ViewPDF from "./components/Pdf";
import useMediaQuery from '@material-ui/core/useMediaQuery';



export default function Transaction(props) {

  
  const ref = React.createRef();
  const mobileQuery = useMediaQuery('(max-width:600px)'); 
  const classes = useStyles();
  var userDispatch = useUserDispatch();
   const token = localStorage.getItem("token");
  const positions = [toast.POSITION.TOP_RIGHT];
  const downloadRef= useRef();
  const [pricingData, setPricingData] = useState([]);
  const [total,setTotal]=useState("");
  const [gst,setGst]=useState("")
  const [companyName, setCompanyName]=useState("");
  const [transactionsView, setTransactionsView] = useState({
    id: "",
    recruiterId: "",
    paymentTypes: "",
    pricing: "",
    amount: "",
    status: "",
    postedDate:"",
  });

  
  const [confirmOpen, setConfirmOpen]=useState(false);

  const handleConfirmOpen = (value) => {
    setConfirmOpen(true);

    setTransactionsView({
      ...transactionsView,
      id: value,
    })
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };
 


  const [page, setPage] = useState(0);
  const [currerntPage, setCurrerntPage] = useState(1);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [dataList, setDataList] = useState("ADD");
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [transdata, setTransdata] = useState([]);
  const [adminData, setAdminData] = useState([]);
  var [notificationsPosition] = useState(2);
  var [errorToastId, setErrorToastId] = useState(null);

  const filterRef = useRef(null);

  const decode = jwtDecode(token);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [recruiterId, setRecruiterId] = useState(null);
  const [pricingId, setPricingId] = useState(null);

  const [TransactionData, setTransactionData] = useState(false); 

  const [modalOpen, setModalOpen] = React.useState(false);
 
  const handleClickOpen = (id) => {
    setModalOpen(true);
   
    setLoader(true); 
   
   
    var data = JSON.stringify({
      id: id
    }); 

    var url = "";
    if (decode.role === "SUPERADMIN") {
      url = `${process.env.REACT_APP_SERVER}superAdmin/purchaseInvoice`;
    } else {
      url = `${process.env.REACT_APP_SERVER}admin/purchaseInvoice`;
    }

    axios({
      method: "post",
      url:  url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          
          setLoader(false);
           setModalOpen(false);
          setTransactionData(response.data.data); 
          setTotal(response.data.data.totalAmount);
          setGst(response.data.data.gst) 
          setCompanyName(response.data.data.recruiter?.companyName);
          downloadRef.current.click()
        } else{
          setLoader(false);
           setModalOpen(false);
        }
      })

      .catch(function (error) {
        console.log(error);
        setLoader(false);
        setModalOpen(false);
      }); 
    
  };

  
  const [modalPendingOpen, setModalPendingOpen] = React.useState(false);

  const handlePendingOpen = () => {
    setModalPendingOpen(true);
  };


  const handlePendingClose = () => {
    setModalPendingOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const options = {
    orientation: 'landscape',
    unit: 'px',
    format: [850,700]
  };

  const handleFromDateChange = (event) => {
    setFromDate(filterRef.current.fromDate.value);
  };

  const handleToDateChange = (event) => {
    setToDate(filterRef.current.toDate.value);
  };

 

  const resetForm = (e) => {
    filterRef.current.reset();
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
      companyId: recruiterId?.id,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
    });

    var url = "";
    if (decode.role === "SUPERADMIN") {
      url = `${process.env.REACT_APP_SERVER}superAdmin/purchaseHistory`;
    } else {
      url = `${process.env.REACT_APP_SERVER}admin/viewMyPurchase`;
    }

    axios({
      method: "post",
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setLoader(false);
          setTransdata(response.data.data);
          setCount(response.data.count);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  }



  const handleChangePage = (event, newPage) => {
    setLoader(true);
    setCurrerntPage(newPage + 1);
    setPage(newPage);
 
    var url = "";
    if (decode.role === "SUPERADMIN") {
      url = `${process.env.REACT_APP_SERVER}superAdmin/purchaseHistory`;
    } else {
      url = `${process.env.REACT_APP_SERVER}admin/viewMyPurchase`;
    }

    const form = filterRef.current;

    axios({
      method: "post",
      url: url,
      data: {
        page: newPage + 1,
        companyId: recruiterId?.id,
        fromDate: `${form["fromDate"].value}`,
        toDate: `${form["toDate"].value}`,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setTransdata(response.data.data);
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
    user: Yup.string().required("User is Required"),
    paymentMethod: Yup.string().required("Payment Method is Required"),
    pricing: Yup.string().required("Pricing is Required"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  
  
  var [WalletValue, setWalletValue] = useState(0);


  useEffect(() => {
    var decoded = jwtDecode(token);
   
    if (decoded.role !== "SUPERADMIN") {
      const fetchData = async () => {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_SERVER}auth/getMyWallet`,
          data: {},
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
          .then(function (response) {
            if (response.data.data !== null) {
              setWalletValue(response.data.data?.remainingMessages);
            } else {
              setWalletValue(0);
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
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducerValue, token]);


  useEffect(() => {
    var decode = jwtDecode(token);
    setLoader(true);
    if (decode.role === "SUPERADMIN") {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}pricing/viewAllPricing`,
        data: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then((data) => {
        setPricingData(data.data.data);
        setLoader(false);
      });

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}superAdmin/adminList`,
        data: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then((response) => {
        if (response.data.status === true) {
 
          setAdminData(response.data.data);
        }
      });
    } else {
      setAdminData([]);
      setPricingData([]);
    }
  }, [token]);

  useEffect(() => {
    setLoader(true);
    var decode = jwtDecode(token);
    const fetchData = async () => {
      var url = "";
      if (decode.role === "SUPERADMIN") {
        url = `${process.env.REACT_APP_SERVER}superAdmin/purchaseHistory`;
      } else {
        url = `${process.env.REACT_APP_SERVER}admin/viewMyPurchase`;
      }

      axios({
        method: "post",
        url: url,
        data: {
          page: 1,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((response) => {
          if (response.data.status === true) {
            setLoader(false);
            setTransdata(response.data.data);
            setCount(response.data.count);
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


  function handleAdd(values) {
    return new Promise((resolve) => {
      setLoader(true);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}superAdmin/addPurchase`,
        data: {
          recruiterId: adminData
            .filter((item) => item.id.includes(recruiterId.id))
            .map((recruiter) => recruiter.recruiter.id)[0],
          mainId: recruiterId.id,
          paymentTypes: values.paymentMethod,
          pricingId: pricingId.id,
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
      });
    });
  }


  
  function emergencyCredit() {

     
    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/addFreeCredits`,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setLoader(false);
          forceUpdate();
          handlePendingClose();
          handleNotificationCall("success", response.data.message);
        } else{
          setLoader(false); 
          handleNotificationCall("error", response.data.message);
        }
      })

      .catch(function (error) {
        console.log(error);
      });

  }
 
  function changePendingStatus(Id){
     setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}superadmin/changePendingPaymentStatus`,
      data: {id:Id},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setLoader(false);
          forceUpdate();
          handleConfirmClose();
          handleNotificationCall("success", response.data.message);
        } else{
          setLoader(false); 
          handleNotificationCall("error", response.data.message);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  } 


  function handleShow(values, name) {
    if (name === "VIEW") {
      setDataList("VIEW");
    }

    setLoader(true);

    var url = "";
    if (decode.role === "SUPERADMIN") {
      url = `${process.env.REACT_APP_SERVER}superAdmin/singlePurchase`;
    } else {
      url = `${process.env.REACT_APP_SERVER}admin/singlePurchase`;
    }

    axios({
      method: "post",
      url: url,
      data: {
        purchaseId: values,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
         if (response.data.status === true) {
          setTransactionsView({
            ...transactionsView,
            id: response.data.data.id,
            recruiterId: response.data.data.recruiterId,
            paymentTypes: response.data.data.paymentTypes,
            pricing: response.data.data.pricing?.numberOfMessages,
            amount: response.data.data.pricing?.amount,
            status: response.data.data.statusList?.statusName,
            postedDate: response.data.data.createdAt,
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

  var table_data = {};

  var table_columns = [];

  if (decode.role === "SUPERADMIN") {
    table_columns = [
      {
        name: "S.No",
      },
      {
        name: "Company",
      },
      {
        name: "Payment Type",
      },
      {
        name: "Pricing Plan",
      },
      {
        name: "Number of Messages",
      },
      {
        name: "Amount",
      },
      {
        name: "Status",
      },
      {
        name: "Actions",
      },
      {
        name: "Posted Date",
      },
    ];

    table_data = transdata.map((item, index) => {
      return [
        <>
          {currerntPage !== 0 ? 10 * currerntPage - 10 + index + 1 : index + 1}
        </>,
        item.recruiter.companyName,
        item.paymentTypes,
        item.pricing?.title,
        item.pricing?.numberOfMessages,
        item.pricing?.amount,

        item.statusList.statusCode === 501? 
        <Button variant="contained" size="small" className={ classes.red}
        onClick={(e)=>{  handleConfirmOpen(item.id) }}  >   {item.statusList.statusName}  </Button>
        : 
        <Button variant="contained" size="small" className={ classes.blue}
         >   {item.statusList.statusName}  </Button>
        ,
        <>
          <Grid container className={classes.space}>
            <Grid item xs className={classes.toolAlign}>
              <Tooltip
                title="Company Purchase"
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
              <Tooltip title="Invoice" placement="bottom" aria-label="invoice">

             
            <Pdf targetRef={ref} filename="invoice.pdf" options={options} x={.5} y={.5} scale={1}>
        {({ toPdf }) => <InsertDriveFileIcon className={classes.toolIcon} 
        onClick={(e) => {  handleClickOpen(item.id);  toPdf();  } } /> }
      </Pdf>


 
              </Tooltip>
            </Grid>
          </Grid>
        </>,
        moment(item.createdAt).format("DD-MM-YYYY"),
      ];
    });
  } else {
    table_columns = [
      {
        name: "S.No",
      },
      {
        name: "Payment Type",
      },
      {
        name: "Pricing Plan",
      },
      {
        name: "Number of Messages",
      },
      {
        name: "Amount",
      },
      {
        name: "Status",
      },
      {
        name: "Action",
      },
      {
        name: "Posted Date",
      },
    ];

    table_data = transdata.map((item, index) => {
      return [
        <>
          {currerntPage !== 0 ? 10 * currerntPage - 10 + index + 1 : index + 1}
        </>,
        item.paymentTypes,
        item.pricing?.title,
        item.pricing?.numberOfMessages,
        item.pricing?.amount,
        <Button variant="contained" size="small" className={  item.statusList.statusCode === 501? classes.noPointer +" "+classes.red: classes.noPointer +" "+classes.blue  }>   {item.statusList.statusName}  </Button>,

        <>
          <Grid container className={classes.space}>
            <Tooltip
              title="Company Purchase"
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
            {/* <Tooltip title="Invoice" placement="bottom" aria-label="invoice">

                <Pdf targetRef={ref} filename="invoice.pdf" options={options} x={.5} y={.5} scale={1}>
        {({ toPdf }) => <InsertDriveFileIcon className={classes.toolIcon} 
        onClick={(e) => {  handleClickOpen(item.id);  toPdf();  } } /> }
      </Pdf>


 
              </Tooltip> */}
          </Grid>
        </>,
        moment(item.createdAt).format("DD-MM-YYYY"),
      ];
    });
  }

  const [state, setState] = useState({
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

  const HeaderElements = () => <>Total : {count}</>;

  const list = (anchor) =>
    dataList === "ADD" ? (
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
                  <Typography variant="subtitle1">
                    
                    Add New Company Purchase
                  </Typography>

                  <Grid className={classes.drawerClose}>
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
                        <InputLabel shrink htmlFor="user">
                          Select Company
                        </InputLabel>

                        <Autocomplete
                          options={adminData}
                          {...register("user")}
                          error={errors.user ? true : false}
                          getOptionLabel={(option) =>
                            option.recruiter !== null? option.recruiter?.companyName !== null? option.recruiter?.companyName : "" : ""
                          }
                          onChange={(event, value) => {
                            setRecruiterId(value);
                          }}
                          classes={{
                            popupIndicator: classes.autocompleteIndicator,
                          }}
                          renderInput={(params) => (
                            <TextField
                              name="user"
                              {...params}
                              variant="filled"
                              placeholder="Select Company"
                              InputLabelProps={{ shrink: true }}
                            />
                          )}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.user?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="paymentMethod">
                        
                        Payment Method
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          placeholder="Payment Method"
                          name="paymentMethod"
                          {...register("paymentMethod")}
                          error={errors.paymentMethod ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.paymentMethod?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <FormControl className={classes.margin}>
                        <InputLabel shrink htmlFor="pricing">
                          
                          Select Pricing
                        </InputLabel>

                        <Autocomplete
                          options={pricingData}
                          {...register("pricing")}
                          error={errors.pricing ? true : false}
                          getOptionLabel={(option) => option.title}
                          onChange={(event, value) => {
                            setPricingId(value);
                          }}
                          classes={{
                            popupIndicator: classes.autocompleteIndicator,
                          }}
                          renderInput={(params) => (
                            <TextField
                              name="pricing"
                              InputLabelProps={{ shrink: true }}
                              {...params}
                              variant="filled"
                              placeholder="Select Pricing"
                            />
                          )}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.pricing?.message}
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
              </form>
            </Card>
          </List>
        </Box>
      </>
    ) : dataList === "VIEW" ? (
      <>
        <Box sx={{ width: "100%" }} role="presentation">
          <List>
            <Card  className={classes.root}>
              <CardHeader>
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.drawerViewHeader}
                >
                  <Typography variant="subtitle1">
                    
                    View Company Purchase
                  </Typography>

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
                      Payment Type
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    {transactionsView.paymentTypes}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    <Typography className={classes.boldtext}>
                      Number of Messages
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    {transactionsView.pricing}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    <Typography className={classes.boldtext}>
                      Amount
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    {transactionsView.amount}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    <Typography className={classes.boldtext}>
                      Status
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                     <Button variant="contained" size="small" className={ transactionsView.status=== "Pending"? classes.red+" "+classes.noPointer : classes.blue+" "+classes.noPointer}>   {transactionsView.status}  </Button>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    <Typography className={classes.boldtext}>
                      Posted Date
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    {moment(transactionsView.postedDate).format("DD-MM-YYYY")}
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
      ""
    );

  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.heading}>
        <Grid item xs={9} sm={7} md={8} lg={6}>
          
          <PageTitle title="Transaction History" />
        </Grid>

        <Grid item xs={3} sm={5} md={4} lg={6} className={classes.drawerClose}>
          {decode.role === "SUPERADMIN" ? (
            <>
              <div className={classes.lgButton}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddCircleIcon />}
                  className={classes.addUser}
                  color="primary"
                  onClick={(e) => {
                    setDataList("ADD");
                    reset();
                    setState({ ...state, right: true });
                  }}
                >
                  Add Company Purchase
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
                    setDataList("ADD");
                    reset();
                    setState({ ...state, right: true });
                  }}
                >
                  
                  Add
                </Button>
              </div>
            </>
          ) : (
            <>
           
           {WalletValue ===0?
           <>
            <div className={classes.lgButton}>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddCircleIcon />}
                className={classes.addUser}
                color="primary"
                onClick={(e) => {
                  //emergencyCredit()
                  handlePendingOpen();
                }}
              >
                Add Emergency Credit Purchase
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
                //  emergencyCredit()
                handlePendingOpen();
                }}
              >
                
                Add
              </Button>
            </div>
            </> : ""   }

          </>
          )}
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
          {decode.role === "SUPERADMIN" ? (
            <>
              <Autocomplete
                options={adminData}
                className={classes.filterFullWidth}
                getOptionLabel={(option) =>
                  option.recruiter !== null? option.recruiter?.companyName !== null? option.recruiter?.companyName : "" : ""
                }
                defaultValue={recruiterId}
                onChange={(event, value) => setRecruiterId(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="recruiterId"
                    label="Company"
                    placeholder="Select Company"
                    InputLabelProps={{ shrink: true }}
                    type="text"
                  />
                )}
              />
            </>
          ) : (
            ""
          )}

          <TextField
            name="fromDate"
           label="From"
            InputLabelProps={{ shrink: true }}
            className={classes.filterWidth}
            type="date"
            defaultValue={fromDate}
            onChange={handleFromDateChange}
          />

          <TextField
            name="toDate"
           label="To"
            InputLabelProps={{ shrink: true }}
            className={classes.filterWidth}
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

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MUIDataTable
            title={""}
            options={{
              textLabels: {
                body: {
                  noMatch: 'Oops! Matching record could not be found',
                }
              },
              pagination: false,
              sort: false,
              selectableRows: "none",
              search: false,
              filter: false,
              print: false,
              download: false,
              customToolbar: () => <HeaderElements />,
              responsive: mobileQuery===true? 'vertical' : 'standard',
            }}
            columns={table_columns}
            data={table_data}
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



      <Dialog
         aria-labelledby="dialog-title"
         onClose={handlePendingClose}
         open={modalPendingOpen}
         width="sm"
         maxWidth="sm"
         
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
      <DialogTitle className={classes.digTitle}>
        <div className={classes.center}>

          <Typography variant="subtitle2" className={classes.digColor+" "+classes.digCenter } >
            Confirmation
          </Typography>
          <div className={classes.drawerClose}>
              <CloseIcon
              
                className={classes.digClose}
                size="14px"
                onClick={handlePendingClose}         
                />
          </div>
        </div>
        </DialogTitle>
        <DialogContent  >

        <Typography variant="subtitle2" className={classes.digContentSize}> Do you want to make the emergency credit purchase and defer payment. The outstanding amount will be reduced once it is paid during the next transaction. Are you interested in continuing? </Typography>

<div className={classes.sendWhatsapp}>
                <Button
                  variant="contained"
                  color="primary" 
                  size="small"
                  onClick={(e) => {
                    emergencyCredit()
                  }}
                >
                  
                  Yes
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={handlePendingClose}  >
                  No
                </Button>
</div>


         </DialogContent>
      </Dialog>





      <Dialog
         aria-labelledby="dialog-title"
         onClose={handleClose}
         open={modalOpen}
         width="lg"
         maxWidth="lg"
        PaperProps={{
          style: {
            width: "100%",
            left:"100%",
          },
        }}
      >
        <DialogContent  >
     <ViewPDF list={TransactionData} downloadRef={downloadRef} total={total} companyName={companyName} gst={gst}  />
        </DialogContent>
      </Dialog>


      <Dialog
         aria-labelledby="dialog-title"
         onClose={handleConfirmClose}
         open={confirmOpen}
         width="sm"
         maxWidth="sm"
        PaperProps={{
          style: {
            width: "100%",
           
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
        <div className={classes.center}>

          <Typography variant="subtitle2" className={classes.digColor+" "+classes.digCenter } >
            Confirmation
          </Typography>
          <div className={classes.drawerClose}>
              <CloseIcon
              
                className={classes.digClose}
                size="14px"
                onClick={handleConfirmClose}        
                />
          </div>
        </div>
        </DialogTitle>
        <DialogContent  >
 
<Typography variant="subtitle2"> Are you sure? </Typography>

<div className={classes.sendWhatsapp}>
             
            
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={(e) => {
                    changePendingStatus(transactionsView.id);
                  }}
                >
                  
                  Yes
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={handleConfirmClose}  >
                  No
                </Button>

</div>

         </DialogContent>
      </Dialog>


      <SwipeableDrawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
        classes={{ paper: classes.drawer }}
      >
        {list("right")}
      </SwipeableDrawer>
      

      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

