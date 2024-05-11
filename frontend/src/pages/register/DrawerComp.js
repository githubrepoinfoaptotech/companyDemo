import {React, useState } from "react";
import {
  Drawer,
  IconButton,Box
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "../../themes/style"
import icon1 from "../../images/dashboard/home.png"
import icon2 from "../../images/dashboard/office-building.png"
import icon4 from "../../images/dashboard/rating.png"
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import './register.css'


const DrawerComp = ({ links }) => {
  const [open, setOpen] = useState(false);

  const classes=useStyles()

  const getMuiTheme = () =>
  createTheme({
    overrides: {
      MuiAvatar: {
        root: {
          fontFamily: '"Satoshi"',
        },
      },
      MuiMenuItem: {
        root: {
          fontFamily: '"Satoshi"',
        },
      },
      MUIDataTableToolbar: {
        actions: {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        },
        icon: {
          color: "#064be2",
          "& svg": {
            color: "white",
            width: "25px",
            cursor: "pointer",
            height: "25px",
            padding: "5px",
            boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3)",
            borderRadius: "100%",
            backgroundColor: "#064be2",
          },
        },

        iconActive: {
          color: "#064be2",
          "& svg": {
            color: "white",
            width: "25px",
            cursor: "pointer",
            height: "25px",
            padding: "5px",
            boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3)",
            borderRadius: "100%",
            backgroundColor: "#064be2",
          },
        },
      },
      MUIDataTableBody: {
        emptyTitle: {
          "@media (max-width: 425px)": {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          },
          "@media (max-width: 959.95px)": {
            marginLeft: "-100px",
          },
        },
      },

      MUIDataTableBodyCell: {
        stackedCommon: {
          "@media (max-width:959.95px)": {
            fontSize: "13px !important",
            "&:nth-last-child(2)": { fontWeight: 700 },
            "&:last-child": { lineBreak: "anywhere" },
          },
        },
        responsiveStackedSmallParent: {
          "@media (max-width:425px)": { width: "93%" },
        },
      },
      MuiTable: {
        root: {
          "& caption": { fontFamily: '"Satoshi" !important' },
        },
      },
      MuiBadge: {
        badge: {
          height: "30px!important",
          fontFamily: '"Satoshi" !important',
        },
        colorSecondary: {
          backgroundColor: red[500] + "!important",
        },
        anchorOriginTopLeftCircular: {
          top: "14%",
          left: "-21px",
          inlineSize: "max-content",
        },
      },
      MuiTableCell: {
        head: {
          color: "#121224",
          backgroundColor: "#f0f5f9 !important",
          fontSize: "15px !important",
          fontWeight: "bold",
          letterSpacing: "0.02em",
        },
        body: {
          color: "#121224",
          fontFamily: '"Satoshi" !important',
          fontSize: "13.5px !important",
          "&:last-child": { whiteSpace: "nowrap" },
        },

        root: {
          padding: "14px",
          fontFamily: '"Satoshi" !important',
        },
        paddingCheckbox: {
          "@media (max-width:959.95px)": { width: "10px" },
        },
      },
      MuiList: {
        padding: {
          paddingBottom: "0px !important",
        },
      },
      MuiListItem: {
        secondaryAction: {
          paddingRight: "45px !important",
        },
      },
      MuiSelect: {
        select: {
          "&:focus": { backgroundColor: "none !important" },
        },
      },

      MuiTableRow: {
        root: {
          "&:nth-of-type(odd)": { backgroundColor: "white" },
          "&:nth-of-type(even)": { backgroundColor: "#f0f5f9" },
        },
      },

      MuiIconButton: {
        root: {
          padding: "9px",
        },
      },

      MuiTypography: {
        subtitle1: {
          fontSize: "1rem",
          fontWeight: "500",
          fontFamily: '"Satoshi" !important',
          "@media (max-width:959.95px)": { fontSize: "0.9rem !important" },
        },
        subtitle2: {
          fontWeight: "500",
          fontFamily: '"Satoshi" !important',
          textAlign: "center",
          padding: "10px",
          fontSize: "21px",
          "@media (max-width:959.95px)": {
            fontSize: "calc(1.1rem) !important",
          },
        },
        body1: {
          fontFamily: '"Satoshi" !important',
          fontSize: "14px",
          "@media (max-width:959.95px)": { fontSize: "13px !important" },
        },
        body2: {
          color: "#121224",
          fontFamily: '"Satoshi" !important',
          fontSize: "14px",
          "@media (max-width:959.95px)": { fontSize: "13px !important" },
        },
        h5: {
          color: "#121224",
          fontFamily: '"Satoshi" !important',
          fontSize: "14px",
          "@media (max-width:959.95px)": {
            fontSize: "calc(1.1rem) !important",
          },
        },
        h6: {
          color: "#121224",
          fontFamily: '"Satoshi" !important',
          fontSize: "14px",
          "@media (max-width:959.95px)": {
            fontSize: "calc(1.1rem) !important",
          },
        },
      },
      MuiPaper: {
        elevation4: {
          boxShadow: "none",
        },
      },

      MuiDialog: {
        paper: {
          margin: "15px !important",
          border: "1px solid #000 !important",
        },
      },

      MuiFab: {
        root: {
          "&:hover": {
            backgroundColor: "064be2 !important",
          },
        },
      },
      MuiButton: {
        root: {
          fontFamily: '"Satoshi !important"',
          fontSize: "14px",
          fontWeight: 500,
          boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3) !important",
          "@media (max-width:959.95px)": { fontSize: "10px !important" },
        },
        label: {
          fontFamily: '"Satoshi" !important',
          fontSize: "14px",
          "@media (max-width:959.95px)": { fontSize: "10px !important" },
        },
        containedPrimary: {
          backgroundColor: "#064be2 !important",
          textTransform: "initial !important",
          "&:active": {
            backgroundColor: "#064be2 !important",
            color: "#fff !important",
          },
          "&:hover": {
            backgroundColor: "#064be2 !important",
            color: "#fff !important",
          },
          "&:disabled": {
            backgroundColor: "#064be2c7 !important",
            color: "#fff !important",
          },
        },
        containedSizeSmall: {
          textTransform: "initial !important",
          padding: "4px 10px !important",
          fontWeight: "300 !important",
          height: "fit-content !important",
        },
        containedSecondary: {
          backgroundColor: red[500] + "!important",
          "&:active": {
            backgroundColor: red[500] + "!important",
            color: "#fff !important",
          },
          "&:hover": {
            backgroundColor: red[500] + "!important",
            color: "#fff !important",
          },
        },
      },
      MuiFormLabel: {
        root: {
          fontFamily: '"Satoshi" !important',
          fontSize: "20px",
          "@media (max-width:959.95px)": { fontSize: "15px !important" },
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
      MuiTooltip: {
        tooltip: {
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
          padding: "10px 12px !important",

          borderRadius: "4px",
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
          "&:hover": { backgroundColor: "unset !important" },
          "&.Mui-focused": { backgroundColor: "unset !important" },
        },

        underline: {
          "&&&:before": { borderBottom: "none" },
          "&&:after": { borderBottom: "none" },
        },
        inputAdornedEnd: {
          border: "1px solid #ced4da",
        },
      },

      MuiOutlined: {
        MuiChip: {
          avatar: { margin: "0px" },
        },
      },

      MuiCardContent: {
        root: {
          marginBottom:"10px !important",
          "&:last-child": { paddingBottom: "0px" },
        },
      },
      MuiCardActions: {
        root: {
          marginBottom: "1px !important",
          // padding: "0px",
          // marginBottom: "20px",
          // "@media (max-width:959.95px)": {
          //   marginBottom: "1px !important",
          // },
        },
      },

      MuiDrawer: {
        paperAnchorBottom: {
          width: "50%",
          left: "30%",
          bottom: "10%",
        },
        paper: {
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor:"#243763"
        },
      },
      MuiDialogTitle: {
        root: {
          padding: "0px 10px !important",
        },
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
  return (
    <>
      <MuiThemeProvider theme={getMuiTheme()}>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
        >
          <nav>
            <ul className="unOrder">
              <li className="list-item">
                <img src={icon1} alt="Home"/>
                  Home
              </li>
              <li className="list-item">
                  <img src={icon2} alt="Why refo"/>
                  Why refo
              </li>
              
              <li className="list-item">
                <img src={icon4} alt="customer experience"/>
                Customer Experience
              </li>
            
              <li className="list-item" >
                    <Box className="registration_firm">
                        <a
                          href={`${process.env.REACT_APP_SITE}/v1/#/register`}
                          className="iconBlink"
                        >
                          
                          List your consultancy
                        </a>
                      </Box>
              </li>
              <li className="list-item" style={{width:"80%"}}>
                <Box>
                  <a href={`${process.env.REACT_APP_SITE}/v1/#/login`} className={classes.btnLogin}> Login </a>
                </Box>
              </li>
            </ul>
          </nav>
          {/* <img src={peek} className={classes.sideBarPeek} alt="peeking"/> */}
        </Drawer>
        <p className={classes.betaMobile} >Beta</p>
        <IconButton
          className={classes.regMenuBtn}
          onClick={() => setOpen(!open)}
        >
        
          <MenuIcon />
        </IconButton>
      </MuiThemeProvider>
    </>
  );
};

export default DrawerComp;
