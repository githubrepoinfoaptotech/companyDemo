import React, { useState, useEffect, useRef, useReducer } from "react";
import MUIDataTable from "mui-datatables";
import {
  Grid,
  Button,
  List,
  Box,
  SwipeableDrawer,
  Typography,
  TablePagination,
  TextField,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
 import Tooltip from "@material-ui/core/Tooltip";
import Card from "@material-ui/core/Card";
 import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CloseIcon from "@material-ui/icons/Close";
 import { Autocomplete } from "@material-ui/lab";
import ViewIcon from "@material-ui/icons/Visibility";
import useMediaQuery from '@material-ui/core/useMediaQuery';
// data
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import moment from "moment";
 
import useStyles from "../../themes/style.js";

 
export default function Tables() {
  const classes = useStyles();
  const token = localStorage.getItem("token"); 
  const [loader, setLoader] = useState(false);
  const mobileQuery = useMediaQuery('(max-width:600px)'); 
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0); 
  
   const [page, setPage] = useState(0);
  const [currerntPage, setCurrerntPage] = useState(1);
  const [count, setCount] = useState(0);
  const [dataList, setDataList] = useState("ADD");
  const [messageActivity, setMessageActivity] = useState([]);
  const [messageView, setMesssageView] = useState({
            id:"", 
            phoneNumber: "",
            firstName: "",
            lastName: "",
            recruiterFirstName: "",
            recruiterLastName: "",
            requirementName: "",
            requirementUniqueId: "",
            candidateUniqueId: "",
            image:"",
            message:"",
            createdAt:""
  })
  const [recruiterId, setRecruiterId] = useState(null);



  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };
 


  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER}admin/freeMessageActivity`,
        data: {
          page: 1
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },

      })
        .then(function (response) {
           if (response.data.status === true) {
            setLoader(false);
            setMessageActivity(response.data.data);
            setCount(response.data.count);
          }
        });
    };
    const getUserName = async () => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/userList`,
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
  }, [reducerValue, token])

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [user, setUserName] = useState([]);

  const filterRef = useRef(null);

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
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
      recruiterId: recruiterId?.id,
    });


    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER}admin/freeMessageActivity`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },

    })
      .then(function (response) {
        if (response.data.status === true) {

          setLoader(false);
          setMessageActivity(response.data.data);
          setCount(response.data.count);
        }

      })

      .catch(function (error) {
        console.log(error);


      });

  }

  function handleShow(values, name) {
    setLoader(true);
    if (name === "VIEW") {
      setDataList("VIEW");
    }
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/viewSingleFreeMessage`,
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
          setState({ ...state, right: true });
        
          setMesssageView({
            ...messageView,
            id: response.data.data.id,
            phoneNumber: response.data.data.phoneNumber,
            firstName: response.data.data.candidate.candidateDetail?.firstName,
            lastName: response.data.data.candidate.candidateDetail?.lastName,
            recruiterFirstName: response.data.data.recruiter.firstName,
            recruiterLastName: response.data.data.recruiter.lastName,
            requirementName: response.data.data.requirement?.requirementName,
            requirementUniqueId: response.data.data.requirement?.uniqueId,
            candidateUniqueId: response.data.data.candidate?.uniqueId,
            image: response.data.data.screenShot,
            message: response.data.data.message,
            createdAt: response.data.data.createdAt
          });
          setLoader(false);
        }  else{
          setLoader(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }


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
     dataList === "VIEW" ? (
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
                    <Typography variant="subtitle1">View Message</Typography>
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
                    Candidate Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {messageView.firstName+" "+messageView.lastName +" ("+messageView.candidateUniqueId+")"}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography className={classes.boldtext}>
                    Recruiter Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {messageView.recruiterFirstName+" "+messageView.recruiterLastName}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography className={classes.boldtext}>
                    Requirement Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {messageView.requirementName+" ("+messageView.requirementUniqueId+")"}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography className={classes.boldtext}>
                    Mobile No:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {"91 "+ messageView?.phoneNumber?.slice("2")}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography className={classes.boldtext}>
                    Message:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {messageView.message}
                  </Grid>

 

                

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography className={classes.boldtext}>
                      Posted Date:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {moment(messageView.createdAt).format("DD-MM-YYYY")}
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setCurrerntPage(newPage + 1);
    setLoader(true);
    var form = filterRef.current;
    var data = JSON.stringify({
      page: newPage + 1,
      recruiterId: recruiterId?.id,
      fromDate: `${form['fromDate'].value}`,
      toDate: `${form['toDate'].value}`,
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/freeMessageActivity`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setLoader(false);
        setMessageActivity(response.data.data);
        setCount(response.data.count);
      }
      setLoader(false);
    });
  };

  const HeaderElements = () => (
    <>
      Total : {count}
    </>
  );

  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
          <PageTitle title="Free Message Activity" />

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
        <Autocomplete
              className={classes.filterFullWidth}
              options={user}
              getOptionLabel={(option) =>
                option.firstName + " " + option.lastName
              }
              value={recruiterId}
              onChange={(event, value) => setRecruiterId(value)}
              classes={{
                popupIndicator: classes.autocompleteIndicator,
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="recruiterId"
                  label="Recruiter"
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
                name: "Action"
              },

              {
                name: "Candidate Name",

              },
              {
                name: "Recruiter Name",
              },
              {
                name: "Requirement Name",
              },
              {
                name: "Mobile No",

              },
              {
                name: "Message",

              },
              {
                name: "Posted Date",

              },

            ]}
            data={messageActivity.map((item, index) => {
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
                        title="View Activity"
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
                  {item.candidate.candidateDetail?.firstName+" "+item.candidate.candidateDetail?.lastName}<br/>{" ("+item.candidate?.uniqueId+")"}
                </>,
                <>{item.recruiter.firstName+" "+item.recruiter.lastName}</>,
                <>{item.requirement?.requirementName}<br/>{" ("+item.requirement?.uniqueId+")" } </>,
                <>{item.phoneNumber}</>,
                <>{item.message===null?" ":item.message.length > 50 ? item.message.slice(0,50)+"..." : item.message}</>,
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


<DialogTitle className={classes.digTitle}>
        <div className={classes.center}>
          <Typography variant="subtitle2" className={classes.digColor+" "+classes.digCenter }> 
          Candidate Reply Message 
          </Typography>

          <div className={classes.drawerClose} >
            <CloseIcon
            className={classes.digClose}
            size="14px"
            onClick={handleModalClose}
             />
          </div>
        </div>

        </DialogTitle>


        <DialogContent className={classes.center}>
          <Grid container direction="row" spacing={2}>
          <img src={messageView?.image}  alt="Home" width="100%"/>
            </Grid>
        </DialogContent>
      </Dialog>
      
      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

