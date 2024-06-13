import React, { useState, useEffect } from "react";
import {
  Grid, 
  Typography,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";

import axios from "axios";
import {jwtDecode} from "jwt-decode";
import useStyles from "../../themes/style.js";
import { signOut, useUserDispatch } from "../../context/UserContext";


export default function Plans(props) {
  const classes = useStyles();
  var userDispatch = useUserDispatch();
  const token = localStorage.getItem("token");
  const [loader, setLoader] = useState(false);
  //const [billingData, setBillingData] = React.useState([]);
  const [messageData, setMessageData] = React.useState(0);
 
 
  useEffect(() => {
    setLoader(true);
    // const fetchData = async () => {
    //   axios({
    //     method: "post",
    //     url: `${process.env.REACT_APP_SERVER}admin/pricingList`,
    //     data: {},
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: token,
    //     },
    //   }).then(function (response) {
    //     if (response.data.status === true) {
    //       setLoader(false);
    //       setBillingData(response.data.data);
    //     }
    //   });
    // };

    var decoded = jwtDecode(token);
    if (decoded.role !== "SUPERADMIN") {
      const walletData = async () => {
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
            if (response.data.status === true) {
              setLoader(false);
              setMessageData(response.data?.data?.remainingMessages);
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
      walletData();
    }
 

    // fetchData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6}>
          <PageTitle title="Refo Billing" />
        </Grid>

        <Grid item xs={6}></Grid>
      </Grid>

      <Grid container direction="row" spacing={2} >
        <Grid item xs={2}>
          <div className={classes.Boxblue}>
            <p className={classes.grid_title}>Remaining</p>
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography
                    size="xl"
                    weight="medium"
                    noWrap
                    className={classes.count}
                  >
                    {messageData === undefined ? 0 : messageData}
                  </Typography>
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
            </div>

            <Grid item xs={12} className={classes.center+" "+classes.planContainer }>
              <Link
              to={"candidate_activity"}
                className={classes.BarColor}
                 
              >
                
                Show Used Candidates
              </Link>
              
              <Link
                className={classes.BarColor}
                to={"transaction"} 
              >
                
                Show Previous Transactions
              </Link>
            </Grid>
          </div>
        </Grid>

       
      </Grid>

      {/* <Grid
        container
        direction="row"
        spacing={3}
        gap={2}
        style={{ padding: "25px 10%"}}
      >
        
         {billingData.map((item, index) => {
          return [
            <>
              <Grid item xs className={classes.flexCenter}>
                <Card className={classes.root + " " + classes.planbackground}>
                  <CardHeader
                    title={item.title}
                    subheader={"Amount: " + item.amount}
                  />
                  <CardContent>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      
                      {"Description:"}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      
                      {item.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      
                      {"Number Of Messages:"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      
                      {item.numberOfMessages}
                    </Typography>
                  </CardContent>

                  <CardActions disableSpacing className={classes.center} style={{marginTop:"20px"}}>
                    <Button variant="contained" color={"primary"} size="small">
                      
                      Upgrade
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </>,
          ];
        })}

         
      </Grid> */}

      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
