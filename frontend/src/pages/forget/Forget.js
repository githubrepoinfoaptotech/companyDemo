import { yupResolver } from '@hookform/resolvers/yup';
import {
  Backdrop, Box, Button, CircularProgress, FormControl, Grid, IconButton,TextField, InputAdornment, InputLabel, Typography
} from "@material-ui/core";
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
 import axios from 'axios';
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { useHistory, withRouter } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import Notification from "../../components/Notification";
 import useStyles from "./styles";
 import red from '@material-ui/core/colors/red';


function Forget(props) {
   const history = useHistory();
  var classes = useStyles();
  var [errorToastId, setErrorToastId] = useState(null);
  const [loader, setLoader] = useState(false);
 

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
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirm: Yup.string()
      .required('Confirm Password is required')
      .min(8, 'Confirm Password must be at least 8 characters'),

  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });



  function onChange(values) {

    if (values.password === values.confirm) {

      return new Promise((resolve) => {
        setLoader(true);

        axios.post(`${process.env.REACT_APP_SERVER}auth/changePassword`, {
          "token": props.match.params.id,
          "password": values.password
        })
          .then((result) => {

            if (result.data.status === true) {

              handleNotificationCall("success", result.data.message);

              setTimeout(() => {
                history.push("/login");
              }, 2000);

            } else {

              handleNotificationCall("error", result.data.message);

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
      handleNotificationCall("error", "Pssword is Mismatch");


    }

  }

  

  const [values, setValues] = React.useState({
    showPassword: false,
    showConfirmPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.confirm });
  };

  
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

        root:{ 
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
        containedPrimary:{ 
          backgroundColor: "#064be2 !important",   
          textTransform:  "initial !important", 
          '&:active':{
            backgroundColor: "#064be2 !important",
            color:"#fff !important",
          },
          '&:hover':{
            backgroundColor: "#064be2 !important",
            color:"#fff !important",
          },
          '&:disabled':{
            backgroundColor: "#064be2c7 !important",
            color:"#fff !important",
          }
      },
      containedSizeSmall:{
        textTransform:  "initial !important", 
        padding:  "4px 10px !important",
        fontWeight: "300 !important",
      },
      containedSecondary:{ 
        backgroundColor: red[500] +"!important",
        '&:active':{
          backgroundColor: red[500] +"!important",
          color:"#fff !important",
        },
        '&:hover':{
          backgroundColor: red[500] +"!important",
          color:"#fff !important",
        }
      },
      },

    }
  });

  const positions = [
    toast.POSITION.TOP_RIGHT,
  ];


  return (<>

<MuiThemeProvider theme={getMuiTheme()}>
       <Grid container className={classes.container}>
       <Grid item xs={12} md={5} className={classes.leftContainer}>
         
          <Typography variant="h5" className={classes.text + " " + classes.bottom}   > <span className="refo-font">refo</span></Typography>
          <Typography variant="h3" className={classes.h1}   >Powerful Features</Typography>

          <Typography className={classes.body} >Messaging that ensures 'Reach People For Sure'</Typography>


          <Typography variant="h3" className={classes.h1}   >Fully Secured</Typography>

          <Typography className={classes.body} >  Data protected & secured for your own use and future reference</Typography>


          <Typography variant="h3" className={classes.h1}   >Easy Monitoring</Typography>

          <Typography className={classes.body} >  Reporting made simple to assess productivity and review performance</Typography>

        </Grid>

        <Grid item xs={12} md={7} order={{ xs: 1, md: 1 }} className={classes.formContainer}>
          <Grid className={classes.form} >
            <Typography variant="h5" className={classes.title} > Reset Password - <span className="refo-font">refo</span></Typography>
            <Typography className={classes.subtitle} > Enter your new password below.</Typography>

            <Box  >

          
            <Grid container spacing={1}>

            <Grid item xs={12}  >
                <InputLabel shrink htmlFor="password">  Password  </InputLabel>
               <FormControl className={classes.margin}>
      
          <TextField classes={{ root: classes.customTextField }}     type={values.showPassword ? 'text' : 'password'} placeholder='Enter Password' 
       
            InputProps={{
            disableUnderline: true, 
            endAdornment: <InputAdornment position="end">
              <IconButton  aria-label="toggle password visibility" onClick={handleClickShowPassword}   >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment> 
            }}
            {...register('password')} error={errors.password ? true : false} />

             <Typography variant="inherit" color="error">{errors.password?.message}</Typography>
    </FormControl>
                </Grid>


                <Grid item xs={12}  >
                <InputLabel shrink htmlFor="confirm">   Confirm Password   </InputLabel>
                  <FormControl className={classes.margin}>       
      <TextField classes={{ root: classes.customTextField }}     type={values.showConfirmPassword ? 'text' : 'password'} placeholder='Enter Confirm Password'   
       
       InputProps={{
         disableUnderline: true, 
         endAdornment: <InputAdornment position="end">
            <IconButton  aria-label="toggle password visibility" onClick={handleClickConfirmPassword}   >
              {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment> 
      }}
    {...register('confirm')} error={errors.confirm ? true : false} />

<Typography variant="inherit" color="error"> {errors.confirm?.message} </Typography> 
                 
                  </FormControl>
                </Grid>


              </Grid>


              <Grid className={classes.formButtons}>
                <Button
                  variant="contained" 
                  color="primary" 
                  onClick={handleSubmit(onChange)}
                  disabled={isSubmitting}
                >
                  Change Password
                </Button>


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
   

    <Backdrop className={classes.backdrop} open={loader}  >
      <CircularProgress color="inherit" />
    </Backdrop>
    </MuiThemeProvider>
  </>
 
  );
}
function CloseButton({ closeToast, className }) {
  return <CloseIcon className={className} onClick={closeToast} />;
}
export default withRouter(Forget);

