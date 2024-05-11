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
} from "@material-ui/core";
   import PageTitle from "../../components/PageTitle/PageTitle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
 import moment from "moment";
 import CloseIcon from "@material-ui/icons/Close";
 import axios from "axios"; 
 import ViewIcon from "@material-ui/icons/Visibility";
 import useMediaQuery from '@material-ui/core/useMediaQuery';
 
import useStyles from "../../themes/style.js";

 
export default function Company() {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const mobileQuery = useMediaQuery('(max-width:600px)');  
  const token = localStorage.getItem("token");
  const [contactData, setContactData] = useState([]); 
  const [page, setPage] = useState(0);
  const [currerntPage, setCurrerntPage] = useState(1);
  const [count, setCount] = useState(0); 
  
  const [contactDetails, setContactDetails] = useState([]); 

  const HeaderElements = () => <>Total : {count}</>;

 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setLoader(true);
    setCurrerntPage(newPage + 1); 
    var data = JSON.stringify({
      page: newPage + 1, 
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}superAdmin/viewAllRequests`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      
      if (response.data.status === true) {
        setContactData(response.data.data);
        setCount(response.data.count);
      }

      setLoader(false);
    });
  };

  
 
   
  function handleShow(values, name) {
    setLoader(true);
  
 
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}superAdmin/viewRequest`,
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
            setContactDetails(response.data.data)

          }  else{
            setLoader(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

 
      
  }

  

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}superAdmin/viewAllRequests`,
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
          setContactData(response.data.data);
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
                  className={classes.drawerHeader}
                >
                  <Grid item xs={10} md={6}>
                    
                    <Typography variant="subtitle1">
                      
                      View Contact Sales
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

              <CardContent className={classes.mB10}>
                <Grid container direction="row" spacing={2}>

             
                  <Grid item xs={12} sm={6} md={6} lg={6}>   <Typography className={classes.boldtext}>  Company Name:   </Typography>    </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {contactDetails.companyName}    </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>  	Request:   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {contactDetails.context}  </Grid> 


                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>  Email ID:   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {contactDetails.email}  </Grid> 
 

                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   Mobile Number:   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {contactDetails.mobile}  </Grid> 
 

                  <Grid item xs={12} sm={6} md={6} lg={6}>  <Typography className={classes.boldtext}>   Message:   </Typography>       </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>   {contactDetails.message}  </Grid> 
                   

                  <Grid item xs={12} sm={6} md={6} lg={6}> <Typography className={classes.boldtext}>   Posted Date:   </Typography> </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}> {moment(contactDetails.createdAt).format("DD-MM-YYYY")}  </Grid>
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
          
          <PageTitle title="Contact Sales" />
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
                name: "Company Name",
              },
              {
                name: "Request",
              },
              {
                name: "Email ID",
              },
             
              {
                name: "Mobile Number" 
              },
               
              {
                name: "Posted Date",
              },
            ]}
            data={contactData.map((item, index) => {
           
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
                 item.context,
                item.email, 
                item.mobile, 
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

