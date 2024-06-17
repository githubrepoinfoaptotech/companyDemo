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
  Dialog, DialogContent,DialogTitle
} from "@material-ui/core";
  import Tooltip from "@material-ui/core/Tooltip";
import PageTitle from "../../components/PageTitle/PageTitle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import {  toast } from "react-toastify";
import moment from "moment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Notification from "../../components/Notification/Notification";
import ViewIcon from "@material-ui/icons/Visibility";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import {jwtDecode} from "jwt-decode";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from "../../themes/style.js";

const positions = [toast.POSITION.TOP_RIGHT];

export default function Tables() {
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);
  const messageRef = useRef(null);
  const [description, setDescription] = useState("");
  const [dropOpen, setDropOpen] = React.useState(false);
  const[statusCode, setStatusCode]=useState("");
  const mobileQuery = useMediaQuery('(max-width:600px)'); 
  const handleDropOpen = () => {
    setDropOpen(true);
  };

  const handleDropClose = () => {
    setDropOpen(false);
  };

  const [state, setState] = useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  var classes = useStyles();

  function sendNotification(componentProps, options) {
    return toast(
      <Notification
        {...componentProps}
        className={classes.notificationComponent}
      />,
      options,
    );
  }

  const HeaderElements = () => <>Total : {count}</>;

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
    subject: Yup.string().required("Subject is required"),
    description: Yup.string().required("Description is required"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const token = localStorage.getItem("token");
  var decode = jwtDecode(token);


  const [ticketData, setTicketData] = useState([]);
  const [ticketView, setTicketView] = useState([]);

  const [page, setPage] = useState(0);
  const [currerntPage, setCurrerntPage] = useState(1);
  const [Id, setId] = useState("");

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const filterRef = useRef(null);

  const handleFromDateChange = (event) => {
    setFromDate(filterRef.current.fromDate.value);
  };

  const handleToDateChange = (event) => {
    setToDate(filterRef.current.toDate.value);
  };
  var [notificationsPosition] = useState(2);
  var [errorToastId, setErrorToastId] = useState(null);

  function scrollDelay(id) {
    const timeout = setTimeout(() => {
      const element = document.getElementById("section" + id);

      element.scrollIntoView({ behavior: "smooth" });
    }, 1000);

    return () => clearTimeout(timeout);
  }

  useEffect(() => {
    setLoader(true);
    var decode = jwtDecode(token);

    var url = "";
    if (decode.role === "SUPERADMIN") {
      url = `${process.env.REACT_APP_SERVER}superadmin/supportViewAllTickets`;
    } else {
      url = `${process.env.REACT_APP_SERVER}admin/viewAllTickets`;
    }

    axios({
      method: "post",
      url: url,
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
        setTicketData(response.data.data);
        setCount(response.data.count);
      }
    });
  }, [token]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setLoader(true);
    setCurrerntPage(newPage + 1);
    var decode = jwtDecode(token);

    const form = filterRef.current;

    var data = JSON.stringify({
      page: newPage + 1,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
    });

    var url = "";
    if (decode.role === "SUPERADMIN") {
      url = `${process.env.REACT_APP_SERVER}superadmin/supportViewAllTickets`;
    } else {
      url = `${process.env.REACT_APP_SERVER}admin/viewAllTickets`;
    }
    axios({
      method: "post",
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setTicketData(response.data.data);
        setCount(response.data.count);
      }

      setLoader(false);
    });
  };

  function handleAdd(values) {
    return new Promise((resolve) => {
      setLoader(true);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/addTicket`,
        data: {
          subject: values.subject,
          description: values.description,
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

  function closeTicket(id) {
    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/closeTicket`,
      data: {
        id: id,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setDropOpen(false);
        setLoader(false);
        forceUpdate();
      }
    });
  }



  function sendMessage(Id) {

    if (description !== "") {
      setLoader(true);

      const form = messageRef.current;
      var data = JSON.stringify({
        supportTicketId: Id,
        description: `${form["description"].value}`,
      });
      var url = "";
    if (decode.role === "SUPERADMIN") {
      url = `${process.env.REACT_APP_SERVER}superadmin/superAdminSupportConversation`;
    } else {
      url = `${process.env.REACT_APP_SERVER}admin/supportConversation`;
    }

      var config = {
        method: "post",
        url: url,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };

      axios(config).then(function (response) {
        if (response.data.status === true) {
          setLoader(false);
          handleShow(Id);
          messageRef.current.reset();
          setDescription("");
          scrollDelay(Id);
        }
      });
    } else {
      handleNotificationCall("error", " Description is Required");
    }
  }

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      var url = "";
      var decode = jwtDecode(token);
    if (decode.role === "SUPERADMIN") {
      url = `${process.env.REACT_APP_SERVER}superadmin/supportViewAllTickets`;
    } else {
      url = `${process.env.REACT_APP_SERVER}admin/viewAllTickets`;
    }
      axios({
        method: "post",
        url: url,
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
          setTicketData(response.data.data);
          setCount(response.data.count);
        }
      });
    };

    fetchData();
  }, [reducerValue, token]);

  function handleShow(values) {
    setLoader(true);
    setDataList("VIEW");
    setId(values)
    var url = "";
    if (decode.role === "SUPERADMIN") {
      url = `${process.env.REACT_APP_SERVER}superadmin/ViewAllSupportConversation`;
    } else {
      url = `${process.env.REACT_APP_SERVER}admin/ViewAllSupportConversation`;
    }
    axios({
      method: "post",
      url: url,
      data: { supportTicketId: values },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
       if (response.data.status === true) {
        setState({ ...state, right: true });
        setLoader(false);
        setTicketView(response.data.data);
      }  else{
        setLoader(false);
      }
    });
  }
 

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
                  <Grid item xs={10} md={6}>
                    <Typography variant="subtitle1">
                      
                      Add New Ticket
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
              <form onSubmit={handleSubmit(handleAdd)}>
                <CardContent>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                      <InputLabel shrink htmlFor="subject">
                        
                        Subject
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter Subject"
                          id="subject"
                          name="subject"
                          {...register("subject")}
                          error={errors.subject ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.subject?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel shrink htmlFor="description">
                        
                        Description
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          multiline
                          rows={5}
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter Description"
                          id="description"
                          name="description"
                          {...register("description")}
                          error={errors.description ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.description?.message}
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
                    <Typography variant="subtitle1">
                      Ticket Conversations
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

              <CardContent className={classes.chatListBackGroundTicket}>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  className={classes.chatListContainerTicket}
                >
                  <Grid item xs className={classes.messagearea}>
                    {ticketView.map((row, index, arr) => {  
                      return (
                        <>
                          {row.userId !== decode.user_id ? (
                            <>
                              <div className={classes.message}>
                                <PersonPinIcon
                                  className={classes.messageAvatar}
                                />
                                <div className={classes.messagebubble}>
                                  {row.description}

                                  <Grid
                                    container
                                    direction="row"
                                    spacing={2} 
                                    className={classes.space + " " + classes.paperContainer}
                                  >
                                    <div className={classes.bubbleSpan}>
                                      
                                      {decode.role === "SUPERADMIN" ? "RECRUITER" :"SUPPORT"} -
                                      {moment(row.createdAt).format(
                                        "DD-MM-YYYY H:mm",
                                      )}
                                    </div>
                                  </Grid>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className={classes.messageRight}>
                                <PersonPinIcon
                                  className={classes.messageRightAvatar}
                                />

                                <div className={classes.messageRightBubble1}>
                                  {row.description}

                                  <Grid
                                    container
                                    direction="row"
                                    spacing={2}
                                    className={classes.space + " " + classes.paperContainer}
                                  >
                                    <div className={classes.bubbleSpan}>
                                      
                                      ME-
                                      {moment(row.createdAt).format(
                                        "DD-MM-YYYY H:mm",
                                      )}
                                    </div>
                                  </Grid>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      );
                    })}
                  </Grid>

                  <div id={"section" + Id}> </div>
                </Grid>
              </CardContent>
              <CardActions>
                <form
                  ref={messageRef}
                  className={classes.fullWidth+" "+classes.ticketForm}
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(Id);
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    spacing={2}
                    className={classes.space}
                  >
                    {statusCode !== 404 ?
                      <TextField
                      multiline
                      rows={3}
                      size="small"
                      classes={{ root: classes.customTextField }}
                      InputProps={{ disableUnderline: true }}
                      placeholder="Enter Description"
                      id="description"
                      name="description"
                      defaultValue={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />:
                    <TextField
                      multiline
                      rows={3}
                      size="small"
                      classes={{ root: classes.customTextField }}
                      InputProps={{ disableUnderline: true }}
                      placeholder="Ticket Closed"
                      id="description"
                      name="description"
                      disabled
                      defaultValue={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />}
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    spacing={2}
                    className={classes.drawerFooter}
                  >
                  
                  {statusCode !== 404 ?
                    <Button
                      variant="contained"
                      color="primary" 
                      size="small"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Send
                    </Button>:<></>}
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={toggleDrawer(anchor, false)}
                    >
                      Close
                    </Button>
                  </Grid>
                </form>
              </CardActions>
            </Card>
          </List>
        </Box>
      </>
    );

  ;

  function getFilterData() {
    setLoader(true);
    setCurrerntPage(1);
    setPage(0);
    const form = filterRef.current;
    var url = "";
    if (decode.role === "SUPERADMIN") {
      url = `${process.env.REACT_APP_SERVER}superadmin/supportViewAllTickets`;
    } else {
      url = `${process.env.REACT_APP_SERVER}admin/viewAllTickets`;
    }
    axios({
      method: "post",
      url: url,
      data: {
        page: "1",
        fromDate: `${form["fromDate"].value}`,
        toDate: `${form["toDate"].value}`,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setLoader(false);
        setTicketData(response.data.data);
        setCount(response.data.count);
      }
    });
  }

  const resetForm = (e) => {
    filterRef.current.reset();
    forceUpdate();
  };

  const [dataList, setDataList] = useState("ADD");

  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={4}>
          <PageTitle title="Tickets" />
        </Grid>

        <Grid item xs={8} className={classes.drawerClose}>
          
            {decode.role === "ADMIN" ? <>
            
             
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                reset();
                setDataList("ADD");
                setState({ ...state, right: true });
              }}
              className={classes.addUser}
              startIcon={<AddCircleIcon />}
            >
              Add New Ticket
            </Button>
            
            
        </>:

<></>}
          
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
          {/* <Autocomplete
                className={classes.filterWidth}
                options={userName}
                
                getOptionLabel={(option) =>
                    option.employeeId === "" ? option.firstName + " " + option.lastName + " "
                      : option.firstName +
                      " " +
                      option.lastName +
                      " (" +
                      option.employeeId +
                      ")"
                }
    
                value={recruiterId}
                onChange={(event, value) => setRecruiterId(value)}
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="recruiterId"
                    variant="standard"
                    label="Recruiter"
                    InputLabelProps={{ shrink: true }}
                    type="text"
                  />
                )}
              />
     */}
          <TextField
            name="fromDate"
           label="From"
            size="small"
            type="date"
            variant="standard"
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
            title=""
            options={{
              sort: false,
              selectableRows: "none",
              search: false,
              filter: false,
              print: false,
              download: false,
              pagination: false,
              customToolbar: () => <HeaderElements />,
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
                name: "Ticket NO",
              },
              {
                name: "Title",
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
            ]}
            data={ticketData.map((item, index) => {
              
              return [
                <>
                  {currerntPage !== 0
                    ? 10 * currerntPage - 10 + index + 1
                    : index + 1}
                </>,
                item.ticketNo,
                item.subject,
                item.statusCode === 401? "New" : item.statusCode === 402? "Waiting for Support Response"
                  : item.statusCode === 403? "Waiting for Customer Response"
                  : "Ticket Closed" ,

                <>
                  <Grid container className={classes.space}>
                    <Grid item xs className={classes.toolAlign}>
                      <Tooltip
                        title="Ticket Conversations"
                        placement="bottom"
                        aria-label="view"
                      >
                        <ViewIcon
                          className={classes.toolIcon}
                          onClick={(e) => {
                            setState({ ...state, right: true });
                            setStatusCode(item.statusCode); 
                            handleShow(item.id);
                          }}
                        />
                      </Tooltip>
                      { decode.role === "ADMIN" && item.statusCode === 404 ?
                      <Tooltip
                        title="Close Ticket"
                        placement="bottom"
                        aria-label="view"
                      >
                        <CancelIcon
                          className={classes.toolIconDelete}
                          onClick={(e) => { 
                            setId(item.id)
                            handleDropOpen()
                          }}
                        />
                    

                      </Tooltip>:<></>}
                      </Grid>
                  </Grid>
                </>,
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

      <Dialog onClose={handleDropClose} aria-labelledby="dialog-title" open={dropOpen} width='md'
          PaperProps={{
            style: {
              width: '100%',
            },
          }}>
          <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography variant="subtitle2" className={classes.digColor+" "+classes.digCenter}>Are you sure you want to close this ticket? </Typography>
          <div className={classes.drawerClose} >
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={handleDropClose}    
                />
          </div>
          </div>
          </DialogTitle>
          <DialogContent className={classes.chatListBackGround}>


         
            <div className={classes.sendWhatsapp}>
              

               

                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e) => {
                      closeTicket(Id)

                    }}>  Yes   </Button>

<Button variant="contained" size="small"   color="secondary" onClick={handleDropClose} >No</Button>
                 
               
            </div>
          </DialogContent>

        </Dialog>

      
      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

