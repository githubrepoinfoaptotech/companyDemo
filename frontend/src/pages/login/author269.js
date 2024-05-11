import React, { useState, useEffect } from "react";
import { Grid, InputLabel, Typography, Button,  FormControl, Box, IconButton, InputAdornment, Backdrop, CircularProgress, TextField  } from "@material-ui/core";
 import {  createTheme,  MuiThemeProvider } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { withRouter, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
   validateCaptcha,
} from 'react-simple-captcha';
import CloseIcon from '@material-ui/icons/Close';
import { useUserDispatch, authUser } from "../../context/UserContext"; 
import Notification from "../../components/Notification";
import 'react-toastify/dist/ReactToastify.css'; 
import useStyles from "./styles";
import red from '@material-ui/core/colors/red';

 
function Login(props) {
  
  var userDispatch = useUserDispatch();
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
    email: Yup.string().required('Email is required').email('Email must be a Valid Email Address'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
 
      captcha:Yup.string().required('Captcha is required'),
      
  });
 

  const {
    register, 
    handleSubmit,
    reset,
    formState: { errors },
  } =useForm({
    resolver: yupResolver(validationSchema),
  });
 


function onLogin(values) {
   
  
  if (validateCaptcha(values.captcha) === true) {
 
    return new Promise((resolve) => {  
      setLoader(true);
  
    axios.post(`${process.env.REACT_APP_SERVER}superadmin/superAdminLogin`, {
      "email":values.email, 
      "password":values.password
  })  
    .then((result) => {    
   
       if(result.data.status === true){  
         authUser(result.data.token, userDispatch, history)  
        resolve();
      }   else {
        loadCaptchaEnginge(6);
        handleNotificationCall("error", result.data.message);
        reset({ captcha: '' })
      }
  
      setLoader(false);
  
  })
  .catch(function (error) {
    resolve();
  console.log(error);          
  }); 
  })
   } else{
    loadCaptchaEnginge(6);
    handleNotificationCall("error", "Invalid Captcha");
    reset({ captcha: '' })
   }


 
}


useEffect(() => {
  
  loadCaptchaEnginge(6);
}, [ ]);

const [values, setValues] = React.useState({ 
  showPassword: false,
});
const handleClickShowPassword = () => {
  setValues({ ...values, showPassword: !values.showPassword });
};
  

  const getMuiTheme = () => createTheme({
    
    overrides: {
       
        MuiTypography:{
          text:{
            fontFamily: '"Roboto", sans-serif',
          },
          h1:{
            fontFamily: '"Roboto", sans-serif',
          },
          h2:{
            fontFamily: '"Roboto", sans-serif',
          },
          h3:{
            fontFamily: '"Roboto", sans-serif',
          },
          h4:{
            fontFamily: '"Roboto", sans-serif',
          },
          h5:{
            fontFamily: '"Roboto", sans-serif',
          },
          body1:{
            fontFamily: '"Roboto", sans-serif',
          },
          body2:{
            fontFamily: '"Roboto", sans-serif',
          }
         
        }, 
        MuiFormControl:{
          root:{
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
             padding:"0px 39px 0px 0px"
            }
          },
           
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
    },
    
});

const positions = [ 
  toast.POSITION.TOP_RIGHT, 
];
 
  return (<>
    <MuiThemeProvider theme={getMuiTheme()}>     
    <Grid container className={classes.container}>
       
    
      <div className={classes.formContainer}>
        <div className={classes.form} >
      
        <Typography variant="h5"   className={classes.title} > Login to <span className="refo-font">refo</span></Typography>

        <Typography   className={classes.subtitle} > Enter your details below.</Typography>
       
 
        <Box  >
         
         <Grid container spacing={1}>
            
           <Grid item xs={12}  >  
           <InputLabel shrink htmlFor="email">  Email </InputLabel>
       <FormControl className={classes.margin}>
      
        <TextField classes={{ root: classes.customTextField }}   InputProps={{ disableUnderline: true }} size="small"  placeholder='Enter Email'    {...register('email')} error={errors.email ? true : false}/>
        <Typography variant="inherit" color="error"> {errors.email?.message} </Typography>
      </FormControl>
           </Grid>
           <Grid item xs={12}  >
           <InputLabel shrink htmlFor="password">   Password  </InputLabel>
      <FormControl className={classes.margin}> 
        <TextField classes={{ root: classes.customTextField }}     type={values.showPassword ? 'text' : 'password'} placeholder='Enter Password' id="password"   
         
         InputProps={{
          disableUnderline: true, 
           endAdornment: <InputAdornment position="end">
              <IconButton  aria-label="toggle password visibility" onClick={handleClickShowPassword}   >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment> 
        }}
      {...register('password')} error={errors.password ? true : false} />

    <Typography variant="inherit" color="error"> {errors.password?.message} </Typography>
      </FormControl>
           </Grid>
          
           <Grid item xs={12}  >
           <LoadCanvasTemplate />

           <FormControl className={classes.margin}> 
        
        <TextField classes={{ root: classes.customTextField }}  InputProps={{ disableUnderline: true }} size="small"  placeholder='Enter Captcha'    {...register('captcha')} error={errors.captcha ? true : false}/>
        <Typography variant="inherit" color="error"> {errors.captcha?.message.substring(0, 70)} </Typography>
      </FormControl>

      
         </Grid>
         </Grid>


         <div className={classes.formButtons}>
         <Button
             variant="contained"
             color="primary" 
             onClick={handleSubmit(onLogin)} 
           >
             Login
           </Button>
            
              
              </div> 
       </Box>
      
 
      
        </div>
       
      </div>
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
 