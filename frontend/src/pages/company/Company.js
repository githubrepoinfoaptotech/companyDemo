import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import {
  Grid,
  Button,
  List,
  Box, 
  SwipeableDrawer,  
  Typography,
  TablePagination,
  Backdrop,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { toast } from "react-toastify";
import PageTitle from "../../components/PageTitle/PageTitle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import moment from "moment";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from '@material-ui/icons/CheckCircle'; 
import axios from "axios"; 
import ViewIcon from "@material-ui/icons/Visibility";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from "../../themes/style.js";
import Notification from "../../components/Notification/Notification";
import "react-toastify/dist/ReactToastify.css";

const positions = [toast.POSITION.TOP_RIGHT];
 
export default function Company() {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const mobileQuery = useMediaQuery('(max-width:600px)');  
  const token = localStorage.getItem("token");
  const [companyData, setCompanyData] = useState([]); 
  const [page, setPage] = useState(0);
  const [currerntPage, setCurrerntPage] = useState(1);
  const [count, setCount] = useState(0);

  var [notificationsPosition] = useState(2);
  var [errorToastId, setErrorToastId] = useState(null);
  
  const [companyDetails, setCompanyDetails] = useState([]); 

  const HeaderElements = () => <>Total : {count}</>;

  const [open, setOpen] = React.useState(false); 
  const [Detail, setDetail] = React.useState({
    id:"",
    role:"",
  }); 

  

  const handleClose = () => {
    setOpen(false);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setLoader(true);
    setCurrerntPage(newPage + 1); 
    var data = JSON.stringify({
      page: newPage + 1, 
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}superAdmin/viewAllcompanyregisteration`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      
      if (response.data.status === true) {
        setCompanyData(response.data.data);
        setCount(response.data.count);
      }

      setLoader(false);
    });
  };

  
  function handleShow(values, name) {
    setLoader(true);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}superAdmin/viewCompanyregisteration`,
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
            setLoader(false);
            setCompanyDetails(response.data.data)
         
          }  else{
            setLoader(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

 
      
  }

  function handleApprove(id, role, value) {
  
    var url ="";

    if(role === "MSME"){
      url = `${process.env.REACT_APP_SERVER}superAdmin/msmeApproved`
    } else{
      url = `${process.env.REACT_APP_SERVER}superAdmin/comapnyApproved`
    }

    setLoader(true);
    axios({
      method: "post",
      url: url,
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
        const switchState = companyData.map(item => { 
          if (item.id === id) {
            return { ...item, isapproved: value }; 
          }
          return item;
        }); 
        setCompanyData(switchState);
        handleNotificationCall("success", response.data.message);
        handleClose();
       }
    });
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
      position: positions[notificationsPosition],
      progressClassName: classes.progress,
      onClose: notificationType === "error" && (() => setErrorToastId(null)),
      className: classes.notification,
    });

    if (notificationType === "error") setErrorToastId(toastId);
  }

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}superAdmin/viewAllcompanyregisteration`,
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
          setCompanyData(response.data.data);
          setCount(response.data.count);
        }
      });
    }; 
 
    fetchData(); 
  
  }, [token]);

   

  const [state, setState] = useState({
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  

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
                      
                      View Company
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

              <CardContent  className={classes.drawerViewContent+" "+classes.mB10 }>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   <Typography className={classes.boldtext}>   Name of your Company:   </Typography>    </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.companyName}    </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   Founded In (Year):   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.foundedIn}  </Grid> 

                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>  Name of the Proprietor / CEO / Principal Consultant / Head:   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.ownerName}  </Grid> 

                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   Mobile Number:   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.mobile}  </Grid> 

                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   Email ID:   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.email}  </Grid> 

                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   Countries you provide Hiring Support:   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.countries}  </Grid> 
                  
                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   Present Location:   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.presentLocation}  </Grid> 


                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   Branches (If any):   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.branches}  </Grid> 


                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   Recruiter Strength:   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.recruiterStrength}  </Grid> 

                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   Hiring Domain Expertise:   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.hiring_SDE}  </Grid> 

                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   What kind of Hiring Support? (Kind of People you Source):   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.hiringSupport}  </Grid> 


                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   List your Projects (Optional):   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.clientList}  </Grid> 


                  {companyDetails?.clientTestimonials?.map((item, index) => {
                 return (
<>
         <Grid item xs={12} sm={6} md={6} lg={6}> 
          <Typography className={classes.boldtext}>   Client Testimonials{index+1}:   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {item.description}

                    </Grid> 
                  
</>
                 ) 
                  
                
                  })
                  }

          



                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   Recruiter Sourcing Strength:   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.recruiterStrength}  </Grid> 

                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   Mention your Minimum Commercial Fee per Permanent Placement Candidate %:   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.minimumCadidatePlacementFee}  </Grid> 



                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   Do you also do Contract Staffing:   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.contractStaffing===true? "Yes": "No"}  </Grid> 



                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   From where will you Source Profile   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.profileSource}  </Grid> 

                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   Are you using an ATS (Applicant Tracking System) already? (If Yes):   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.using_ATS}  </Grid> 


                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   Your Company GST Number (Optional):   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {companyDetails.gst}  </Grid> 










                  <Grid item xs={12} sm={6} md={6} lg={6}> <Typography className={classes.boldtext}>   Posted Date:   </Typography> </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}> {moment(companyDetails.createdAt).format("DD-MM-YYYY")}  </Grid>
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
        responsive: mobileQuery===true? 'vertical' : 'standard',
    };

 
 

  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6}>
          
          <PageTitle title="Registered Companies" />
        </Grid>

        <Grid item xs={6} className={classes.drawerClose}>
      
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
        <Grid item xs >
          <MUIDataTable 
            options={table_options}
            columns={ [
              {
                name: "S.No",
              }, 
              {
                name: "Actions",
              }, 
              {
                name: "Name of the your Company",
              },
              {
                name: "Email ID",
              },
             
              {
                name: "Mobile Number"

              },
              {
                name: "Approve"

              },
               
              {
                name: "Posted Date",
              },
            ]}
            data={companyData.map((item, index) => {
             
           
              return [
                currerntPage !== 0 ? 10 * currerntPage - 10 + index + 1  : index + 1 , 
                <Tooltip
                title="View Company"
                placement="bottom"
                aria-label="view"
              >
                <ViewIcon
                  className={classes.toolIcon}
                  onClick={(e) => {   handleShow(item.id,  "VIEW"); }}
                />
              </Tooltip>,
                 item.companyName,
                item.email, 
                item.mobile, 

              item.isapproved === true? 
              <Tooltip
              title="Approved"
              placement="right"
              aria-label="view"
                >
                <CheckCircleIcon 
                color="primary"
                />
              </Tooltip>
              : 
              <Button 
              variant="contained"
              color="primary"
              size="small"
           
              onClick={()=>{
               
                setOpen(true);
                setDetail({
                  id: item.id,
                  role: item.role
                });
              }}
              > 
              Approve
                
              </Button>,
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
        onClose={handleClose}
        open={open}
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
        <Typography variant="subtitle2" className={classes.digColor+" "+classes.digCenter}> Confirmation </Typography>
          <div className={classes.drawerClose} >
                <CloseIcon
                  className={classes.digClose}
                  size="14px"
                  onClick={ handleClose }        
                  />
          </div>
        </div>
      </DialogTitle>


        <DialogContent className={classes.center} >


        <div className={classes.sendWhatsapp}>
        <>
             

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
               
                   onClick={ ()=>{
                    handleApprove(Detail?.id, Detail?.role, true); 
                   }
                  }
                >
                Yes
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  color='secondary'
                  onClick={ handleClose }        
                >
                  No
                </Button>
              </>

              </div>

        </DialogContent>
      </Dialog>
    

      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

