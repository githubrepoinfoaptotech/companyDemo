import React, { useState, useEffect } from "react";
import {
  Grid, InputLabel, Typography, Button, FormControl, List, Box, SwipeableDrawer, IconButton, InputAdornment,
  Backdrop, CircularProgress, TextField
} from "@material-ui/core";
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { withRouter, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';
// styles 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
// context
import { ToastContainer, toast } from 'react-toastify';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';
import CloseIcon from '@material-ui/icons/Close';
import { useUserDispatch, authUser } from "../../context/UserContext";
import Notification from "../../components/Notification";
import useStyles from "./styles";
import red from '@material-ui/core/colors/red';
import 'react-toastify/dist/ReactToastify.css';


function Login(props) {

  var userDispatch = useUserDispatch();
  const history = useHistory();
  var classes = useStyles();
  const [dataList, setDataList] = useState("VIEW");
  var [errorToastId, setErrorToastId] = useState(null);
  const [loader, setLoader] = useState(false);


  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
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
      position: positions[2],
      progressClassName: classes.progress,
      onClose: notificationType === "error" && (() => setErrorToastId(null)),
      className: classes.notification,
    });

    if (notificationType === "error") setErrorToastId(toastId);
  }


  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a Valid Email Address'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    captcha: Yup.string().required('Captcha is required'),

  });
  const emailSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a Valid Email Address'),
  });

  const {
    register: forgetUser,
    formState: { errors: forgetErrors },
    handleSubmit: forgetSubmit,
    reset: forgetReset,
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });



  function onLogin(values) {


    if (validateCaptcha(values.captcha) === true) {


      return new Promise((resolve) => {
        setLoader(true);

        axios.post(`${process.env.REACT_APP_SERVER}auth/login`, {
          "email": values.email,
          "password": values.password
        })
          .then((result) => {

            if (result.data.status === true) {
              authUser(result.data.token, userDispatch, history)

            } else {
              loadCaptchaEnginge(6);
              handleNotificationCall("error", result.data.message);
              reset({ captcha: '' })
            }

            setLoader(false);
            resolve();
          })
          .catch(function (error) {
            resolve();
            console.log(error);
          });
      })
    } else {
      loadCaptchaEnginge(6);
      handleNotificationCall("error", "Invalid Captcha");
      reset({ captcha: '' })
    }



  }


  useEffect(() => {

    loadCaptchaEnginge(6);
  }, []);

  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };


  function forgetPassword(values) {

    return new Promise((resolve) => {
      axios.post(`${process.env.REACT_APP_SERVER}auth/forgetPassword`, {
        "email": values.email
      })
        .then((result) => {

          if (result.data.status === true) {
            handleNotificationCall("success", result.data.message);
            setState({ ...state, "right": false });
            resolve();
          } else {
            handleNotificationCall("error", result.data.message);
          }



        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  const getMuiTheme = () => createTheme({

    overrides: {

      MuiTypography: {
        text: {
          fontFamily: '"Satoshi"',
        },
        h1: {
          fontFamily: '"Satoshi"',
        },
        h2: {
          fontFamily: '"Satoshi"',
        },
        h3: {
          fontFamily: '"Satoshi"',
        },
        h4: {
          fontFamily: '"Satoshi"',
        },
        h5: {
          fontFamily: '"Satoshi"',
        },
        body1: {
          fontFamily: '"Satoshi"',
        },
        body2: {
          fontFamily: '"Satoshi"',
        }

      },
      MuiFormControl: {
        root: {
          width: "100%"
        }
      },
      overrides: {
        MuiInputLabel: {
          outlined: {
            transform: "translate(14px, 12.5px) scale(1)"
          }
        },
        MuiAutocomplete: {
          inputRoot: {
            padding: "0px 39px 0px 0px"
          }
        },

      },
      MuiPaper: {
        elevation4: {
          boxShadow: "none"
        },
        elevation1: {
          boxShadow: "none !important"
        },

      },
      MuiOutlinedInput: {
        root: {
          // Hover state
          "&:hover $notchedOutline": {
            borderColor: "none",
          },
          // Focused state
          "&$focused $notchedOutline": {
            borderColor: "none",
          }
        },
        // Default State
        notchedOutline: {
          borderColor: "none",
        }
      },

      MuiButton: {

        root: {
          fontFamily: '"Satoshi !important"',
          fontSize: "14px",
          fontWeight: 500,
          boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3) !important",
          "@media (max-width:959.95px)": {
            fontSize: "10px !important",
          },
        },
        label: {
          fontFamily: '"Satoshi" !important',
          fontSize: "14px",
          "@media (max-width:959.95px)": {
            fontSize: "10px !important",
          },
        },
        containedPrimary: {
          backgroundColor: "#064be2 !important",
          textTransform: "initial !important",
          '&:active': {
            backgroundColor: "#064be2 !important",
            color: "#fff !important",
          },
          '&:hover': {
            backgroundColor: "#064be2 !important",
            color: "#fff !important",
          },
          '&:disabled': {
            backgroundColor: "#064be2c7 !important",
            color: "#fff !important",
          }
        },
        containedSizeSmall: {
          textTransform: "initial !important",
          padding: "4px 10px !important",
          fontWeight: "300 !important",
        },
        containedSecondary: {
          backgroundColor: red[500] + "!important",
          '&:active': {
            backgroundColor: red[500] + "!important",
            color: "#fff !important",
          },
          '&:hover': {
            backgroundColor: red[500] + "!important",
            color: "#fff !important",
          }
        },
      },

    }
  });



  const positions = [
    toast.POSITION.TOP_RIGHT,
  ];


  const list = (anchor) => (

    <MuiThemeProvider theme={getMuiTheme()}>

      {dataList === "VIEW" ?
        <>
          <Box sx={{ width: '100%' }} role="presentation"  >
            <List>

              <Card className={classes.root} >

                <CardHeader>


                  <Grid container direction="row" spacing={1} className={classes.drawerHeader}>

                    <Grid item xs={6}  >      <Typography variant="subtitle1">  Forgot Password  </Typography></Grid>

                    <Grid item xs={6} className={classes.drawerClose}>
                      <CloseIcon className={classes.closeBtn} size="14px" onClick={toggleDrawer(anchor, false)} />

                    </Grid>
                  </Grid>
                </CardHeader>
                <form onSubmit={forgetSubmit(forgetPassword)} >
                  <CardContent >

                    <Grid container direction="row" spacing={2}>
                      <Grid item xs={12}   >
                        <InputLabel shrink htmlFor="email">   Email  </InputLabel>
                        <FormControl className={classes.margin}>

                          <TextField size="small" classes={{ root: classes.customTextField }} InputProps={{ disableUnderline: true }} placeholder='Enter Email'
                            {...forgetUser('email')} error={forgetErrors.email ? true : false} />


                          <Typography variant="inherit" color="error">  {forgetErrors.email?.message}  </Typography>
                        </FormControl>


                      </Grid>

                    </Grid>

                  </CardContent>
                  <CardActions>


                    <Grid container direction="row" spacing={2} className={classes.drawerFooter}>

                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Send
                      </Button>
                      <Button variant="contained" size="small" color="secondary" onClick={toggleDrawer(anchor, false)}   >  Close  </Button>


                    </Grid>

                  </CardActions>
                </form>
              </Card>

            </List>

          </Box> </>

        : ""}

    </MuiThemeProvider>
  );
  return (<>
    <MuiThemeProvider theme={getMuiTheme()}>
      <Grid container className={classes.container}>

        <Grid item xs={12} md={5} className={classes.leftContainer}>

          <Typography variant="h5" className={classes.text + " " + classes.bottom}   > <span className="refo-font">refo</span></Typography>
          <Typography variant="h3" className={classes.h1}   >Powerful Features</Typography>

          <Typography className={classes.body} >  Messaging that ensures 'Reach People For Sure'</Typography>


          <Typography variant="h3" className={classes.h1}   >Fully Secured</Typography>

          <Typography className={classes.body} >  Data protected & secured for your own use and future reference</Typography>


          <Typography variant="h3" className={classes.h1}   >Easy Monitoring</Typography>

          <Typography className={classes.body} >  Reporting made simple to assess productivity and review performance</Typography>

        </Grid>

        <Grid item xs={12} md={7} order={{ xs: 1, md: 1 }} className={classes.formContainer}>
          <Grid className={classes.form} >

            <Typography variant="h5" className={classes.title} > Login to <span className="refo-font">refo</span></Typography>

            <Typography className={classes.subtitle} > Enter your details below.</Typography>


            <Box  >

              <Grid container spacing={1}>

                <Grid item xs={12}  >
                  <InputLabel shrink htmlFor="email" >  Email </InputLabel>
                  <FormControl className={classes.margin}>

                    <TextField classes={{ root: classes.customTextField }} InputProps={{ disableUnderline: true }} placeholder='Enter Email' size="small"  name="email" {...register('email')} error={errors.email ? true : false} />

                    <Typography variant="inherit" color="error"> {errors.email?.message} </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12}  >
                  <InputLabel shrink htmlFor="password">  Password  </InputLabel>
                  <FormControl className={classes.margin}>

                    <TextField classes={{ root: classes.customTextField }} type={values.showPassword ? 'text' : 'password'} name="password" placeholder='Enter Password' id="password"
                      InputProps={{
                        disableUnderline: true,
                        endAdornment: <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}   >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }}
                      {...register('password')} error={errors.password ? true : false} />

                    <Typography variant="inherit" color="error">
                      {errors.password?.message}
                    </Typography>
                  </FormControl>
                </Grid>

                <Grid item xs={12}  >
                  <LoadCanvasTemplate />

                  <FormControl className={classes.margin}>

                    <TextField size="small" classes={{ root: classes.customTextField }} InputProps={{ disableUnderline: true }} placeholder='Enter Captcha'    {...register('captcha')} error={errors.captcha ? true : false} />
                    <Typography variant="inherit" color="error"> {errors.captcha?.message} </Typography>
                  </FormControl>


                </Grid>
              </Grid>


              <Grid className={classes.formButtons}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(onLogin)}
                  disabled={isSubmitting}
                >
                  Login
                </Button>

                <Typography
                  color="primary"

                  className={classes.forgetButton}
                  onClick={(e) => {
                    setState({ ...state, "right": true });
                    forgetReset();
                    setDataList("VIEW");
                  }}   >
                  Forgot Password
                </Typography>
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
            </Box>



          </Grid>

        </Grid>

      </Grid>

      <ToastContainer

        closeButton={
          <CloseButton className={classes.notificationCloseButton} />
        }
        closeOnClick={false}
        hideProgressBar={true}
      />
    </MuiThemeProvider>

    <Backdrop className={classes.backdrop} open={loader}  >
      <CircularProgress color="inherit" />
    </Backdrop>

  </>
  );
}

export default withRouter(Login);

function CloseButton({ closeToast, className }) {
  return <CloseIcon className={className} onClick={closeToast} />;
}