import React, { useEffect, useState } from "react";
 import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import classnames from "classnames";
import { useTheme } from "@material-ui/styles";
import { Grid, Typography, Backdrop, CircularProgress, Box, Button, InputLabel, 
  FormControl, TextField
} from "@material-ui/core";
import { useLayoutState } from "../../context/LayoutContext";
 import CloseIcon from '@material-ui/icons/Close';

import Layouts from "./Share.js";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
 import { useForm } from 'react-hook-form';
import axios from 'axios';

import { ToastContainer } from 'react-toastify';

import useStyles from "./Sidebar/styles";
import loginUseStyles from "../login/styles";

import red from '@material-ui/core/colors/red';

 
export default function App(props) {
  var classes = useStyles();
  var loginClasses = loginUseStyles();

  var layoutState = useLayoutState();
  var theme = useTheme();

  var [isPermanent, setPermanent] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
  handleWindowWidthChange();
  return function cleanup() {
    window.removeEventListener("resize", handleWindowWidthChange);
};
}); 

  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    // var breakpointWidth = theme.breakpoints.values.md
    var breakpointWidth = theme.breakpoints.values.sm 
    var isSmallScreen = windowWidth < breakpointWidth
     if (isSmallScreen && isPermanent) {
    setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
    setPermanent(true);
    }
    }


    
     
  const getMuiTheme = () =>
  createTheme({
    overrides: {
      MuiAvatar:{
        root:{
          fontFamily: '"Satoshi"'
        }
      },
      MuiMenuItem:{
        root:{
          fontFamily: '"Satoshi"'
        }
      },
      MUIDataTableToolbar: {
        actions: {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        },
        icon:{
          color: "#064be2",
         "& svg":{
          color: "white",
          width: "25px",
          cursor: "pointer",
          height: "25px",
          padding: "5px",
          boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3)",
          borderRadius: "100%",
          backgroundColor: "#064be2"
         }
        },

        iconActive:{
          color: "#064be2",
          "& svg":{
           color: "white",
           width: "25px",
           cursor: "pointer",
           height: "25px",
           padding: "5px",
           boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3)",
           borderRadius: "100%",
           backgroundColor: "#064be2"
          }
        }
      },
          MUIDataTableBody:{
          
          emptyTitle:{  "@media (max-width: 425px)": { display: "flex", justifyContent: "flex-end", alignItems:"center" 
          },
          "@media (max-width: 959.95px)": {
             marginLeft: "-100px",    
          }
        }
          },
      
      MUIDataTableBodyCell: {  
       
        stackedCommon: {
         
          "@media (max-width:959.95px)": { fontSize: "13px !important",
            "&:nth-last-child(2)":{ fontWeight: 700 }, "&:last-child":{ lineBreak:"anywhere" }
          },

           
        },
        responsiveStackedSmallParent:{
          "@media (max-width:425px)": { width:"93%"
          },
        }
      },
      MuiTable:{
        root:{
          "& caption":{ fontFamily: '"Satoshi" !important',
          }
        }
      },
      MuiTab:{
        root:{
          minWidth: "20% !important",
        },
        wrapper:{
          textTransform: "initial !important",
        }
      },
      MuiTabs:{
        scroller:{
          overflowX: "auto !important",
        }
      },
      MuiBadge:{
        badge:{
          height:"30px!important",
          fontFamily: '"Satoshi" !important',
        },
        colorSecondary:{
          backgroundColor: red[500] +"!important",
        },
        anchorOriginTopLeftCircular:{
          top: "14%",
          left: "-21px",
          inlineSize: "max-content"
        }

      },
      MuiTableCell: {
        head: {
          color: "#121224",
          backgroundColor: "#f0f5f9 !important",
          fontSize: "15px !important",
          fontWeight: "bold",
          letterSpacing: "0.02em"
        },
        body: {
          color: "#121224",
          fontFamily: '"Satoshi" !important',
          fontSize: "13.5px !important",
          "&:last-child": { whiteSpace: "nowrap",
          },
          
        },
        
        root: {
          padding: "14px",
          fontFamily: '"Satoshi" !important',
         
        },
        paddingCheckbox:{
          "@media (max-width:959.95px)": { width:"10px",
          },
        }
      },
      MuiList:{
        padding:{
          paddingBottom: "0px !important"
        }
       
      },
      MuiListItem:{
        secondaryAction:{
          paddingRight:"45px !important"
        }
      },
      MuiSelect:{
        select:{
          "&:focus":{ backgroundColor:"none !important" 
          }
        }
      },
      
      MuiTableRow: {
       
        root:{
          '&:nth-of-type(odd)': { backgroundColor: "white",
          },
          '&:nth-of-type(even)': { backgroundColor: "#f0f5f9",
          },
        }
       
      },

      MuiIconButton:{
        root:{
          padding:"9px"
        }
      },

      MuiTypography: {
        subtitle1: {
          fontSize: "1rem",
          fontWeight: "500",
         fontFamily: '"Satoshi" !important',
          "@media (max-width:959.95px)": { fontSize: "0.9rem !important",
          },
        },
        subtitle2: {
          fontWeight: "500",
         fontFamily: '"Satoshi" !important',
          textAlign: "center",
          padding: "10px",
          fontSize: "21px",
          "@media (max-width:959.95px)": { fontSize: "calc(1.1rem) !important",
          },
        },
        body1: {
         fontFamily: '"Satoshi" !important',
          fontSize: "14px",
          "@media (max-width:959.95px)": { fontSize: "13px !important",
          },
        },
        body2: {
          color: "#121224",
         fontFamily: '"Satoshi" !important',
          fontSize: "14px",
          "@media (max-width:959.95px)": { fontSize: "13px !important",
          },
        },
        h5: {
          color: "#121224",
         fontFamily: '"Satoshi" !important',
          fontSize: "14px",
          "@media (max-width:959.95px)": { fontSize: "calc(1.1rem) !important",
          },
        },
        h6: {
          color: "#121224",
         fontFamily: '"Satoshi" !important',
          fontSize: "14px",
          "@media (max-width:959.95px)": { fontSize: "calc(1.1rem) !important",
          },
        },
      },
      MuiPaper: {
        elevation4: {
          boxShadow: "none", 
        },
      },
      
      MuiDialog:{ 
        paper: {
          margin: "15px !important",
          border: "1px solid #000 !important",
        },
      },

      
      MuiFab:{
      root:{
        "&:hover":{
        
          backgroundColor: "064be2 !important"
        }
      }
      },
      MuiButton: { 

        root:{  
          fontFamily: '"Satoshi !important"', fontSize: "14px", fontWeight: 500, boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3) !important", "@media (max-width:959.95px)": { fontSize: "10px !important", }, 
          "& $Mui-disabled":{
             color:"rgba(0, 0, 0, 0.26) !important",
             backgroundColor: "rgba(0, 0, 0, 0.26) !important",
          }
        
        },
        label: {
         fontFamily: '"Satoshi" !important',
          fontSize: "14px",
          "@media (max-width:959.95px)": { fontSize: "10px !important",
          },
        },
        containedPrimary:{ 
          backgroundColor: "#064be2",   
          textTransform:  "initial !important", 
          '&:active':{ backgroundColor: "#064be2 !important", color:"#fff !important",
          },
          '&:hover':{ backgroundColor: "#064be2 !important", color:"#fff !important",
          },
          '&:disabled':{ backgroundColor: "#064be2c7 !important", color:"#fff !important",
          }
      },
      containedSizeSmall:{
        textTransform:  "initial !important", 
        padding:  "4px 10px !important",
        fontWeight: "300 !important",
        height: "fit-content !important",
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
      MuiFormLabel: {
        root: {
         fontFamily: '"Satoshi" !important',
          fontSize: "20px",
          "@media (max-width:959.95px)": { fontSize: "15px !important",
          },
          color: "rgba(0, 0, 0, 0.87)",
        },
      },
      MuiCheckbox: {
        root: {
          color: "#bcbdbf",
        },
      },
      MuiFormControl: {
        root: {
          width: "100%",
        },
      },
      MuiTooltip:{
        tooltip:{
          fontFamily: '"Satoshi" !important',
        },
        // popper:{
        //   top: "-34px !important",
        //   left: '-45px !important'
        // }
      },
      MuiInputBase: {
        root: {
         
          width: "100%",
        },
        input: {
          width: "100%",
          border: "none",
          fontSize: "13px",
          display: "block",
         // padding: "10px 12px !important",
          
          borderRadius: "4px",

          padding: "6px 0 7px !important",
  

        },
      },
     
      MuiAutocomplete: {
        input: {
          width: "100% !important",
        },
      },
       
      MuiFilledInput: {
        root: {
          width: "100%",
          display: "block",
          padding: "0px 25px 0px 0px !important",
          position: "relative",
          fontSize: "13px",
          marginTop: "24px",
         
          backgroundColor: "white",
          "&:hover": { backgroundColor: "unset !important",
          },
          "&.Mui-focused": { backgroundColor: "unset !important",
          },
        },

        underline: {
          "&&&:before": { borderBottom: "none",
          },
          "&&:after": { borderBottom: "none",
          },
        },
        inputAdornedEnd: {
          border: "1px solid #ced4da",
        },
      },
     
      MuiOutlined: {
        MuiChip: {
          avatar: { margin: "0px",
          },
        },
      },

      MuiCardContent:{
        root:{
          "&:last-child":{ 
            paddingBottom: "10px !important",
           }
         
        }
      },
      MuiCardActions:{
        root:{
          marginBottom: "1px !important"
          // padding: "0px",
          // marginBottom: "20px", 
          // "@media (max-width:959.95px)": { 
          //   marginBottom: "1px !important",
          // },
        }
      },

    
    
      MuiDrawer: {
        paperAnchorBottom: {
          width: "50%",
          left: "30%",
          bottom: "10%",
        },
        paper:{
          overflowY:"auto",
          overflowX:"hidden",
        }
      },
      MuiDialogTitle:{
        root:{
          padding:"0px 10px !important"
        }
      },

      MuiChip: {
        avatar: {
          width: "50px !important",
          height: "50px !important",
          fontSize: "1.5rem !important",
          margin: "0px",
        },
      },
      MuiInputLabel: {
        shrink: {
          width: "max-content",
        },
      },
    },

    MuiFormGroup: {
      row: {
        marginTop: "10px !important",
      },
    },
   
    
  });


  const [validation, setValidation] = useState(false); 

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a Valid Email Address'),
   });

  const otpSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a Valid Email Address'),
    otp: Yup.string().required('OTP is required') 
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver( validation ===true? otpSchema : validationSchema ),
  });


  useEffect(() => {
    if(localStorage.getItem('token') !== null){
      setLoader(true);
    } else{
      setLoader(false);
    }
  
    }, []);


 
  function onLogin(values) {
     
    setValidation(false);

    setLoader(true);

  
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}auth/externalViewRequirementsCandidate`,
      data: {
        page: "1", 
        requirementId: new URLSearchParams(props.location.search).get('requirementId')
      },
      headers: {
        "Content-Type": "application/json", 
      },
    }).then(function (response) {
      if (response.data.status === true) {
        reset();
        localStorage.setItem('token', response.data.token);
        
       }
    });


      // return new Promise((resolve) => {
      //   setLoader(true);

      //   axios.post(`${process.env.REACT_APP_SERVER}auth/login`, {
      //     "email": values.email,
      //     "otp": values.otp
      //   })
      //     .then((result) => {
            
      //       if (result.data.status === true) {
      //         setValidation(false);

      //            //   localStorage.setItem('token', response.data.token);
      //   //   const decoded = jwtDecode(response.data.token);

      //   // localStorage.setItem('firstName', decoded.firstName);
      //   // localStorage.setItem('email', decoded.email);
      //   // localStorage.setItem('mobile', decoded.mobile);  
      //   // localStorage.setItem('companyName', decoded.companyName);    
      //   // localStorage.setItem('recruiterId', decoded.recruiterId);  

      //       } else {
              
      //         handleNotificationCall("error", result.data.message);
              
      //       }

      //       setLoader(false);
      //       resolve();
      //     })
      //     .catch(function (error) {
      //       resolve();
      //       console.log(error);
      //     });
      // }) 

  }


  function onCheck(values) {

     setValidation(true);
    // return new Promise((resolve) => {
    //   setLoader(true);

    //   axios.post(`${process.env.REACT_APP_SERVER}auth/login`, {
    //     "email": values.email, 
    //   })
    //     .then((result) => {
          

    //       if (result.data.status === true) {
    //         setValidation(true);
    //            //   localStorage.setItem('token', response.data.token);
    //   //   const decoded = jwtDecode(response.data.token);

    //   // localStorage.setItem('firstName', decoded.firstName);
    //   // localStorage.setItem('email', decoded.email);
    //   // localStorage.setItem('mobile', decoded.mobile);  
    //   // localStorage.setItem('companyName', decoded.companyName);    
    //   // localStorage.setItem('recruiterId', decoded.recruiterId);  

    //       } else {
            
    //         handleNotificationCall("error", result.data.message);
           
    //       } 
    //       setLoader(false); 
    //     })
    //     .catch(function (error) {
          
    //       console.log(error);
    //     });
    // }) 

}
  return ( 
   
      
       <MuiThemeProvider theme={getMuiTheme()}>

       { loader === true ? 

       <>
          <Sidebar />
          <div
             className={classnames(classes.content, {
              [classes.contentShift1]: isPermanent && !layoutState.isSidebarOpened,
              [classes.contentShift1]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar}> <Header history={props.history} />
            </div>
 
          <Layouts />
 

      </div>
        
        
        </>
        : 
        <>
         
        <Grid container className={loginClasses.container}>
       
       <Grid item xs={12} md={5} className={loginClasses.leftContainer}>
           
           <Typography variant="h5" className={loginClasses.text + " " + loginClasses.bottom}   > <span className="refo-font">refo</span></Typography>
           <Typography variant="h3" className={loginClasses.h1}   >Powerful Features</Typography>
       
           <Typography className={loginClasses.body} >  Messaging that ensures 'Reach People For Sure'</Typography>
       
       
           <Typography variant="h3" className={loginClasses.h1}   >Fully Secured</Typography>
       
           <Typography className={loginClasses.body} >  Data protected & secured for your own use and future reference</Typography>
       
       
           <Typography variant="h3" className={loginClasses.h1}   >Easy Monitoring</Typography>
       
           <Typography className={loginClasses.body} >  Reporting made simple to assess productivity and review performance</Typography>
       
         </Grid>
       
         <Grid item xs={12} md={7} order={{ xs: 1, md: 1 }} className={loginClasses.formContainer}>
           <Grid className={loginClasses.form} >
       
             <Typography variant="h5" className={loginClasses.title} > Login to <span className="refo-font">refo</span></Typography>
       
             <Typography className={loginClasses.subtitle} > Enter your details below.</Typography>
       
       
             <Box  >
       
               <Grid container spacing={1}>
       
                 <Grid item xs={12}  >
                   <InputLabel shrink htmlFor="email" >  Email </InputLabel>
                   <FormControl className={classes.margin}>
       
                     <TextField classes={{ root: loginClasses.customTextField }} InputProps={{ disableUnderline: true }} placeholder='Enter Email' size="small"  {...register('email')} error={errors.email ? true : false} />
       
                     <Typography variant="inherit" color="error"> {errors.email?.message} </Typography>
                   </FormControl>
                 </Grid>

                 {validation ===true?
                 <Grid item xs={12}  >
                   <InputLabel shrink htmlFor="otp">  OTP  </InputLabel>
                   <FormControl className={classes.margin}>
       
                     <TextField classes={{ root: loginClasses.customTextField }}  placeholder='Enter OTP' id="otp"
       
                       InputProps={{
                         disableUnderline: true, 
                       }}
                       {...register('otp')} error={errors.otp ? true : false} />
       
                     <Typography variant="inherit" color="error">
                       {errors.otp?.message}
                     </Typography>
                   </FormControl>
                 </Grid>
        :""}
                
               </Grid>
       
       
               <Grid className={loginClasses.formButtons}>
                 <Button
                   variant="contained"
                   color="primary" 
                   onClick={handleSubmit(validation ===true? onLogin: onCheck)}
                   disabled={isSubmitting}
                 >
                  {validation ===true? "Login": "Get OTP" } 
                 </Button>
       
               
              
               </Grid>
             </Box>
       
       
       
           </Grid>
       
         </Grid>
       
       </Grid>
        


       <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
       
      <ToastContainer
        closeButton={
          <CloseButton className={classes.notificationCloseButton} />
        }
        closeOnClick={false}
        hideProgressBar={true}
      />


        </> 

      }
      
</MuiThemeProvider>


  );

  // #######################################################################

  
 
}
function CloseButton({ closeToast, className }) {
  return <CloseIcon className={className} onClick={closeToast} />;
}