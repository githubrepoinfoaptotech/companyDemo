import { makeStyles } from "@material-ui/styles";
import chat_image from '../pages/chat/img/modal.jpg';
import emergency_image from '../images/siren.png';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import { alpha } from "@material-ui/core/styles/colorManipulator";
import iFrameLogo from "../images/iFrameLogo.png";
import { jwtDecode } from "jwt-decode";


const token = localStorage.getItem("token")

let companyType;
if (token) {
  try {
    const decode = jwtDecode(token);
    companyType = decode.companyType;
  } catch (error) {
    console.error("Error decoding token:", error);
  }
}

export default makeStyles(theme => ({

  tableOverflow: {
    overflow: 'auto'
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  customTextField: {
    "& input:placeholder": {
      fontSize: "13px"
    },
    marginTop: "5px !important",
    border: "1px solid #ced4da",
  },
  customDateField: {
    marginTop: "24px !important",
    border: "1px solid #ced4da",
    width: "100%"
  },
  customSelectField: {
    border: "1px solid #ced4da",
    padding: "7px 12px !important",
    marginTop: "7px !important",
    width: "100%",
    "&:before": {
      borderBottom: "none",
    }
  },
  actionIcon: {
    width: "20px",
  },
  customAutocompleteField: {
    border: "1px solid #ced4da",
    width: "100% !important",
    padding: "7px 12px !important",
    marginTop: "7px !important",
    "&:before": {
      borderBottom: "none",
    }
  },
  customSelectTextField: {
    '& div': {
      borderRadius: '0px !important',
      border: 'none !important'
    },
    "&:focus": {
      borderColor: "unset",
    },
    "& input:placeholder": {
      fontSize: "13px"
    },
    marginTop: "5px !important",
  },
  button: {
    display: "flex",
    gap: "10px",
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      display: "inline-flex",
      flexDirection: "column"
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: "10px",
    whiteSpace: "nowrap",
    [theme.breakpoints.only("xs")]: {
      width: "100%" // additionals
    }
  },
  space: {
    display: "flex",
    gap: "10px",
    whiteSpace: "nowrap",
    flexWrap: "nowrap",
    [theme.breakpoints.down("sm")]: {
      whiteSpace: "break-spaces",
    },

  },

  red: {
    backgroundColor: red[500],
    color: "white",
    fontSize: "12px",
    "&:hover": {
      backgroundColor: red[500],
      color: "white",
    }
  },
  whatsapp_green: {
    color: green[500],
  },
  mail_blue: {
    color: blue[500],
  },
  barBlue: {
    color: "blue",
  },
  green: {
    backgroundColor: green[500],
    color: "white",
    // fontSize: "12px",
    "&:hover": {
      backgroundColor: green[500],
      color: "white",
    }
  },
  blue: {
    backgroundColor: "#064be2",
    color: "white",
    // fontSize: "12px",
    "&:hover": {
      backgroundColor: "#064be2",
      color: "white",
    }
  },

  purple: {
    backgroundColor: purple[500],
    color: "white",
    // fontSize: "12px",
    "&:hover": {
      backgroundColor: purple[500],
      color: "white",
    }
  },
  orange: {
    backgroundColor: orange[500],
    color: "white",
    //fontSize: "12px",
    "&:hover": {
      backgroundColor: orange[500],
      color: "white",
    }
  },
  yellow: {
    backgroundColor: yellow[500],
    color: "black",
    // fontSize: "12px",
    "&:hover": {
      backgroundColor: yellow[500],
      color: "black",
    }
  },
  teal: {
    backgroundColor: teal[500],
    color: "white",
    // fontSize: "12px",
    "&:hover": {
      backgroundColor: teal[500],
      color: "white",
    }
  },
  cyan: {
    backgroundColor: cyan[500],
    color: "white",
    // fontSize: "12px",
    "&:hover": {
      backgroundColor: cyan[500],
      color: "white",
    }
  },
  autoComp: {
    width: "200px",
    [theme.breakpoints.down("md")]: {
      width: "150px"
    },
  },
  clearIndicator: {
    backgroundColor: "gray",
    "& span": {
      "& svg": {
        "& path": {
          d: "path('M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z')" // your svg icon path here
        }
      }
    }
  },
  table: {
    minWidth: 650,
  },
  autocompleteIndicator: {
    marginRight: "0px !important",
  },
  backdrop: {
    zIndex: 1500,
    color: '#fff',
  },

  drawer: {
    width: "50%",
    padding: "10px",
    [theme.breakpoints.only("xs")]: {
      width: "85%",
    },
    [theme.breakpoints.only("sm")]: {
      width: "60%",
    }
  },
  clientDrawer: {
    width: "70%",
    padding: "10px",

    [theme.breakpoints.between('sm', 'md')]: {
      width: "80%",
    },
    [theme.breakpoints.only("xs")]: {
      width: "90%",
    },

  },
  sourceDrawer: {
    width: "30%",
    padding: "10px",
    [theme.breakpoints.only("xs")]: {
      width: "70%",
    },
    [theme.breakpoints.only("sm")]: {
      width: "40%",
    }
  },

  drawerHeader: {
    borderBottom: "1px solid rgb(0 0 0 / 10%)",
    // padding: "5px 10px",
    padding: "5px !important",
    width: "100% !important",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down("sm")]: {
      // padding: "5px",
      // margin: "-4px",
    },

  },
  drawerTitle: {
    alignItems: "center",
    display: "flex",
    gap: "10px",
    [theme.breakpoints.down("sm")]: {
      gap: "5px",
    },
  },
  wrapperHeader: {
    borderBottom: "1px solid rgb(0 0 0 / 10%)"
  },
  drawerClose: {
    display: 'flex',
    justifyContent: 'end',
    gap: "10px",
    // textAlign: "end"
  },
  closeBtn: {
    cursor: "pointer"
  },
  noPointer: {
    cursor: "unset"
  },
  drawerFooter: {
    borderTop: "1px solid rgba(0, 0, 0, 0.1) !important",
    position: "fixed !important",
    bottom: "0 !important",
    width: "48% !important",
    justifyContent: "center !important",
    padding: "10px",
    background: "white",
    zIndex: "120",
    margin: "0px !important",
    gap: "10px",

    [theme.breakpoints.only("sm")]: {
      width: "58% !important",
    },
    [theme.breakpoints.only("xs")]: {
      // width: "98% !important",
      // position: "unset !important",

      width: "79% !important",
      position: "fixed  !important",
    },
  },


  clientDrawerFooter: {
    borderTop: "1px solid rgba(0, 0, 0, 0.1) !important",
    position: "fixed !important",
    bottom: "0 !important",
    width: "67% !important",
    justifyContent: "center !important",
    padding: "10px",
    background: "white",
    zIndex: "120",
    margin: "0px !important",
    gap: "10px",
    [theme.breakpoints.between('sm', 'md')]: {
      width: "76% !important",
    },
    [theme.breakpoints.only("xs")]: {
      width: "100% !important",
      position: "unset !important",
    },

  },


  sourceDrawerFooter: {
    borderTop: "1px solid rgba(0, 0, 0, 0.1) !important",
    position: "fixed !important",
    bottom: "0 !important",
    width: "28% !important",
    justifyContent: "center !important",
    padding: "10px",
    background: "white",
    zIndex: "10",
    margin: "0px !important",
    gap: "10px",

    [theme.breakpoints.only("sm")]: {
      width: "35% !important",
    },
    [theme.breakpoints.only("xs")]: {
      width: "62% !important",
    },
  },

  filterGap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    columnGap: "10px",
    rowGap: "10px",
    paddingTop: "20px",

  },
  filterGapSearch: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    columnGap: "10px",
    rowGap: "10px",
    paddingTop: "20px",
    "& $.rti--container": {
      border: "1px solid #ced4da",
      width: "50% !important",
      borderRadius: "0px",
      [theme.breakpoints.only("sm")]: {
        width: "100% !important",
      },


    }
  },
  runBtn: {
    marginTop: "20px",
    "&:before": {
      marginTop: "0px"

    },
  },

  toolIcon: {
    cursor: "pointer",
    width: "25px",
    height: "25px",
    padding: "5px",
    backgroundColor: "#064be2",
    borderRadius: "100%",
    color: "white",
    boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3)"
  },
  cpvIcon: {
    cursor: "pointer",
    width: "25px",
    height: "25px",
    color: "#064be2",
  },
  downloadIcon: {
    cursor: "pointer",
    width: "25px",
    height: "25px",
    padding: "5px",
    backgroundColor: "grey",
    borderRadius: "100%",
    color: "white",
    boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3)"
  },
  toolIconDelete: {
    cursor: "pointer",
    width: "25px",
    height: "25px",
    padding: "5px",
    backgroundColor: "#f50057",
    color: "white",
    borderRadius: "100%",
    boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3)"
  },
  toolIconAdd: {
    cursor: "pointer",
    width: "25px",
    height: "25px",
    padding: "5px",
    backgroundColor: "#4bb543",
    color: "white",
    borderRadius: "100%",
    boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3)"
  },
  toolAlign: {
    display: "flex",
    gap: "3px"
  },
  tableHead: {
    gap: '10px',
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px",
    alignItems: "flex-end",
    [theme.breakpoints.down("md")]: {
      padding: "5px",
    },
  },

  barHead: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    [theme.breakpoints.down("md")]: {
      padding: "5px",
    },
  },
  pagination: {
    justifyContent: 'end'
  },
  boldtext: {
    fontWeight: "bold",
  },
  addUser: {
    [theme.breakpoints.down("md")]: {
      fontSize: 24,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 0,
      height: "fit-content"
    },
  },
  fullWidth: {
    width: "100%"
  },
  AutocompleteFullWidth: {
    width: "230px",
    // [theme.breakpoints.down("md")]: {
    //   width: "150px;", 
    // }, 
  },

  mt16: {
    marginTop: "16px",
    [theme.breakpoints.only("xs")]: {
      marginTop: "0px;",
    },
  },


  filterFullWidth: {
    width: "240px",
    [theme.breakpoints.only("xs")]: {
      width: "170px",
    },
    [theme.breakpoints.only("sm")]: {
      width: "150px;",
    },

  },
  filterWidth: {
    width: "200px",
    [theme.breakpoints.only("xs")]: {
      width: "calc(100% - 55%)",
    },
    [theme.breakpoints.only("sm")]: {
      width: "150px;",
    },
  },
  searchWidth: {
    width: "500px",
    [theme.breakpoints.only("xs")]: {
      width: "calc(100% - 8%)",
    },
    [theme.breakpoints.only("sm")]: {
      width: "183px;",
    },
  },
  dialogArrowBack: {
    background: "#5C6BC0",
    padding: "1px",
    borderRadius: "100%",
    color: "white",
    "&:hover": {
      cursor: "pointer",
    },
  },
  chatListBackGroundTicket: {
    backgroundImage: 'url(' + chat_image + ')',
    padding: "20px !important",
    height: "72vh",
    overflowY: "Scroll",
    [theme.breakpoints.down("md")]: {
      height: "68vh",
    },
  },
  chatListBG: {
    backgroundImage: 'url(' + chat_image + ')',
    padding: "20px !important",
    [theme.breakpoints.down("md")]: {
      padding: "18px !important",
    },
  },
  chatListBackGround: {

    padding: "20px !important",
    [theme.breakpoints.down("md")]: {
      padding: "18px !important",
    },
  },
  chatListContent: {
    margin: "22px"
  },

  fields: {
    display: "flex",
    alignItems: "center",
    width: "100%",

    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexWrap: "wrap",
      minWidth: "100%"
    },
  },
  fieldsInput: {
    padding: "10px 8px",
    maxWidth: "33.3333% !important",
    textAlign: "end",
    [theme.breakpoints.up("lg")]: {
      maxWidth: "32% !important",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100% !important",
    },
    "&:last-child": {
      maxWidth: "4% !important",
    },
    [theme.breakpoints.down("sm") && theme.breakpoints.down("md")]: {
      "&:last-child": {
        maxWidth: "100% !important",
      }
    },
  },
  HeaderElements: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    gap: '10px',
    padding: "10px",
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: '10px',
  },
  sendWhatsapp: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: '10px',
    padding: "8px",
    paddingTop: "15px !important",
    [theme.breakpoints.down("md")]: {
      gap: '8px',
      padding: "0px",
    },
  },
  sendBackUp: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: '40px',
    padding: "8px",
    paddingTop: "15px !important",
    [theme.breakpoints.down("md")]: {
      gap: '8px',
      padding: "0px",
    },
  },
  sendInterview: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: '20px',
    padding: "8px",
    paddingTop: "15px !important",
    [theme.breakpoints.down("md")]: {
      gap: '8px',
      padding: "0px",
    },
  },
  whatsapp: {
    fontSize: "0.8rem",
    marginLeft: "5px",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.5rem",
    },
  },
  MuiPopover: {
    paper: {
      maxWidth: "calc(50% - 32px) !important",
      [theme.breakpoints.down("md")]: {
        maxWidth: "calc(100% - 32px) !important",
      },
    }
  },
  paddingRight: {
    paddingRight: "5px",
  }
  ,
  marginTop: {
    marginTop: "5px",
  },
  tableTop: {
    marginTop: "10px"
  },
  NoteTop: {
    marginTop: "20px"
  },
  noteMsgContainer: {
    height: "60vh",
    overflowY: "scroll"
  },

  notemsgBox: {
    padding: "10px ",
    margin: "8px",
    borderRadius: "8px",
    boxShadow: "5px 3px 6px -2px rgb(0 0 0 / 44%)",
  },

  barName: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "inherit",
    flex: "0 1"
  },
  tertiary: {
    backgroundColor: "#064be2 !important",
    color: "white",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#053db7 !important",
    },

  },
  closeAddBtn: {
    cursor: "pointer",
    position: "relative",
    top: "15px",
    [theme.breakpoints.down("md")]: {
      top: "0px",
    },
  },
  closeMinBtn: {
    cursor: "pointer",
    position: "relative",
    top: "15px",
    [theme.breakpoints.down("md")]: {
      top: "0px",
    },
  },

  pageTitle: {
    fontWeight: "400",
    fontSize: "calc(1.2rem)",
    [theme.breakpoints.down("md")]: {
      fontSize: "calc(0.6rem)",

    },
  },


  //Header Styles //

  logotype: {
    color: "white",
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5),
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },

  title: {
    fontSize: "25px !important",
    fontWeight: "600 !important",
    color: "#064be2 !important",
    letterSpacing: "8px !important"

  },
  subtitle: {
    fontSize: "13px !important",
    fontWeight: "300 !important",
  },
  header: {
    color: 'black',
    width: '100%',
    maxHeight: '90px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'margin-left .3s ease',
    backgroundColor: ' #fff',
    boxShadow: 'none',
    borderRadius: 0,
    borderBottom: ' 1px solid #f4f4f4',
    marginBottom: '20px'
  },
  toolbar: {
    width: '100%',

    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    [theme.breakpoints.only("sm")]: {
      overflowX: "auto",
      overflowY: "hidden"
    },
  },
  hide: {
    display: "none",
  },
  grow: {
    //flexGrow: 1,
    display: 'flex',
    // justifyContent: 'left',
    // width: '100%',
    // paddingRight: "64px",
    // [theme.breakpoints.only("xs")]: {
    //   paddingRight: "37px",
    // },
  },
  search: {
    alignItems: "center",
    position: "relative",
    display: "flex",
    paddingLeft: theme.spacing(1.0),
    width: 36,
    backgroundColor: alpha(theme.palette.common.black, 0),
    transition: theme.transitions.create(["background-color", "width"]),
    "&:hover": {
      cursor: "pointer",
      backgroundColor: alpha(theme.palette.common.black, 0.08),
    },
  },
  searchFocused: {
    // backgroundColor: alpha(theme.palette.common.black, 0.08),
    backgroundColor: "#f0f5f9",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 370,
    },
  },
  digTitle: {
    // backgroundColor:"#064be2 !important",
    color: "white",
    backgroundColor: "#064be2 !important",

  },
  digColor: {
    color: "white"
  },
  digClose: {
    cursor: "pointer",
    color: "white"
  },
  searchIcon: {
    cursor: "pointer",
    width: "25px",
    //height: "25px",  
    borderRadius: "100%",
    color: "blue",
    right: 0,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: theme.transitions.create("left"),
    "&:hover": {
      cursor: "pointer",
    },
  },
  searchIconOpened: {
    right: theme.spacing(1.25),
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    width: '100%',
    fontSize: '13px',
    padding: '4% 0%',

  },
  messageContent: {
    display: "flex",
    flexDirection: "column",
  },
  headerMenu: {
    marginTop: theme.spacing(7),
  },


  headerMenuList: {
    display: "flex",
    flexDirection: "column",
  },
  headerMenuItem: {
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light,
      // color: "white",
    },
  },
  headerMenuButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),
    [theme.breakpoints.down("md")]: {
      marginLeft: "5px",
    }
  },
  profileButton: {
    width: "40px !important",
    height: "40px !important",
    borderRadius: "50%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "contain",
    border: "1px solid #eee"
  },
  walletButton: {
    width: "50px",
    height: "50px",
  },

  avatarButton: {
    width: "200px",
    height: "200px",
    borderRadius: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "contain",

    [theme.breakpoints.down("sm")]: {
      width: "120px",
      height: "120px",
    }
  },

  // headerMenuButtonSandwich: {
  //   marginLeft: 9,
  //   [theme.breakpoints.down("xs")]: {
  //     marginLeft: 0,
  //     display: "block",
  //   }, 
  //   padding: theme.spacing(0.5),
  //   display: "none",
  // },
  headerMenuButtonCollapse: {
    marginRight: theme.spacing(2),
  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    headerMenuButtonCollapse: {
      display: "block",
      marginRight: theme.spacing(2),
    }
  },
  headerIconLablel: {
    fontSize: 20,
    color: "#9c9d9e",
  },
  headerIcon: {
    fontSize: 25,
    color: "#9c9d9e",
  },
  headerIconCollapse: {
    color: "black",
  },
  profileMenu: {
    minWidth: "22rem",
    [theme.breakpoints.down("md")]: {
      minWidth: 214,
    },

  },
  chipAvatar: {
    width: "50px",
    height: "50px",
    margin: "0px"
  },
  chipMessageAvatar: {
    width: "30px !important",
    height: "30px !important",
    marign: "0px"
  },
  chipSize: {
    border: "none",
    height: "max-content",
    display: "flex",
    gap: "10px",
    right: "4px"
  },
  chipMessage: {
    border: "none",
    height: "max-content",
    display: "flex",
    gap: "10px",
    right: "4px"
  },
  chipMessageBox: {
    background: "#2196f3",
    padding: "8px",
  },
  scrollCard: {
    padding: "16px 16px 50px 16px !important"
  },
  profileMenuUser: {
    display: "flex",
    //flexDirection: "column",
    padding: "10px 15px !important",
    borderBottom: "1px solid #dede",
    marginTop: "-10px"
  },
  profileMenuItem: {
    color: theme.palette.text.hint,
  },


  profileMenuIcon: {
    gap: "10px",
    padding: "10px",
    color: "#000000ab",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#2196f3",
      color: "#fff",
      boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12) !important"

    },
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
  messageNotification: {
    height: "auto",
    display: "flex",
    alignItems: "center",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light,
    },
  },
  messageNotificationSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  messageNotificationBodySide: {
    alignItems: "flex-start",
    marginRight: 0,
  },
  sendMessageButton: {
    margin: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textTransform: "none",
  },
  sendButtonIcon: {
    marginLeft: theme.spacing(2),
  },
  purchaseBtn: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    marginRight: theme.spacing(3)
  },

  root: {
    boxShadow: "none"
  },
  commonStyle: {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '15rem',
    height: '15rem',
    [theme.breakpoints.up("lg")]: {
      width: '25rem',
      height: '25rem',
    }
  },
  clientSpace: {
    maxWidth: "30%",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    }
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  left: {
    justifyContent: "left",
    alignItems: "center"
  },
  noteName: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'baseline',
    margin: "10px 0px 0px 0px",
    color: "grey",
    fontSize: "12px",
    gap: "10px"
  },
  customSelectIcon: {
    marginRight: "12px",
    top: "calc(57% - 12px) !important"
  },
  wallet: {
    transform: 'translate(10px, 5px)',
    cursor: "pointer",
  },
  BarGap: {
    padding: "10px"
  },
  BarColor: {
    color: "white"
  },
  BarPointer: {
    pointerEvents: 'none'
  },
  p0: {
    padding: "0px !important"
  },
  lgButton: {
    display: "none !important",
    [theme.breakpoints.up("sm")]: {
      display: "block !important",
    },

  },
  SlgButton: {
    display: "none !important",
    [theme.breakpoints.up("sm")]: {
      display: "flex !important",
      alignItems: "center !important",

    },

  },
  smButton: {
    display: "block !important",
    [theme.breakpoints.up("sm")]: {
      display: "none !important",
    },
  },
  SsmButton: {
    display: "flex !important",
    width: "100% !important",
    alignItems: "center !important",
    [theme.breakpoints.up("sm")]: {
      display: "none !important",
    },
  },


  //  outerWrapper: {
  //   marginTop: 20,
  //   display: "flex", 
  //   justifyContent: "space-between",
  //   marginBottom: 20,
  //   width: "calc(100% + 0%)" 
  // },


  //  outerItem: {
  //   position: "relative",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   flex: 1,
  //     "&:before": {
  //     position: "absolute",
  //     content: "",
  //     borderBottom: "2px solid #ccc",
  //     width: "100%",
  //     top: "20px",
  //     left: "-50%",
  //     zIndex: 2
  //     },

  //     "&:after": {
  //     position: "absolute",
  //     content: "",
  //     borderBottom: "2px solid #ccc",
  //     width: "100%",
  //     top: "20px",
  //     left: "50%",
  //     zIndex: 2
  //     },

  //     "& Counter": {
  //       position: "relative",
  //       zIndex: "5",
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //       width: "40px",
  //       height: "40px",
  //       borderRadius: "50%",
  //       background: "#ccc",
  //       marginBottom: "6px",
  //       cursor: "pointer",
  //       fontSize: "12px"
  //     },

  //       "& Completed": {
  //       "&:before": {
  //         backgroundColor: "#4bb543",
  //         color: "white",
  //        },
  //        "&:after": {
  //         position: "absolute",
  //         content: "",
  //         borderBottom: "2px solid #4bb543",
  //         width: "100%",
  //         top: 20,
  //         left: "50%",
  //         zIndex: 3
  //        }
  //     },
  // },




  // outerCounter : {
  //   cursor: "pointer",
  //   fontSize: 12
  // },
  // outerItemActive: {
  //   fontWeight: "bold"
  // },
  // outerItemCompletedCounter: {
  //   backgroundColor: "#4bb543",
  //   color: "white",
  // },
  // completed:{
  //   "&:before": {
  //     backgroundColor: "#4bb543",
  //     color: "white",
  //    },
  //    "&:after": {
  //     position: "absolute",
  //     content: "",
  //     borderBottom: "2px solid #4bb543",
  //     width: "100%",
  //     top: 20,
  //     left: "50%",
  //     zIndex: 3
  //    }
  // },
  //  outerItemDisableCounter: {
  //   backgroundColor: "#aeae",
  //   color: "white",
  //   "&:after": {
  //     position: "absolute",
  //     content: "",
  //     borderBottom: "2px solid #aeae",
  //     width: "100%",
  //     top: "20px",
  //     left: "50%",
  //     zIndex: 3
  //   }
  // }, 
  // outerItemCreditCounter:  {
  //  backgroundColor: "red",
  //  color: "white"
  // },
  // outerItemCancelCounter: {
  //   backgroundColor: "red",
  //   color: "white"
  // },
  // outerItemCredit: { 
  //   "&:after": {
  //     position: "absolute",
  //   content: "",
  //   borderBottom: "2px solid red",
  //   width: "100%",
  //   top: "20px",
  //   left: "50%",
  //   zIndex: 3
  //   }
  // },
  //  outerItemCancel: {
  //   "&:after": { 
  //     position: "absolute",
  //     content: "",
  //     borderBottom: "2px solid red",
  //     width: "100%",
  //     top: "20px",
  //     left: "50%",
  //     zIndex: 3 
  // }
  // },



  // StepName: {
  //   textAlign: "center"
  // },

  emergencyBg: {
    backgroundImage: 'url(' + emergency_image + ')',
  },

  buttonBlock: {
    display: "block"
  },


  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  dateSelect: {
    display: "flex",
    flexDirection: "row",
    gap: "5px",
    justifyContent: "center",
    marginTop: "5px"
  },
  selectDrop: {
    border: "1px solid #ced4da",
    width: "100%",
    padding: "8px",
  },
  planbackground: {
    backgroundColor: "whitesmoke",
    textAlign: "center",
    color: "#fff",
    padding: "20px",
    boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3)",
    borderRadius: "10px",
    width: "fit-content",
    maxWidth: "300px",
    [theme.breakpoints.down("md")]: {
      maxWidth: "200px",
    },
  },
  hiddenItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: '10px',
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  StatusViews: {
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },

  Boxblue: {
    backgroundColor: blue[500],
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
    padding: "10px 20px ",
    borderRadius: "10px",
    color: "#fff",
    minHeight: "130px",
    cursor: "pointer",
    width: "max-content"
  },


  searchBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // margin: "0px 60px 0px 0px",  
    backgroundColor: "#f0f5f9",
    borderRadius: "100px",
    padding: "0px 10px",
    width: "505px",

    "@media (min-width: 700px) and (max-width: 850px)": {
      maxWidth: "400px",
    },
    "@media (min-width: 600px) and (max-width: 800px)": {
      maxWidth: "300px",
    },
  },

  searchBar1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100px",
    // padding: "0px 40px",  
  },
  searchBar2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100px",
    // padding: "0px 60px 0px 0px",  
  },

  grid_title: {
    fontSize: "max(0.9em, 0.9em)",
    [theme.breakpoints.only("sm")]: {
      fontSize: "13px !important",
    },
  },

  visitsNumberContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: theme.spacing(1),
  },

  count: {
    fontSize: "20px !important",
  },

  mtp56: {
    marginTop: "5px !important",
    padding: "6px !important"
  },


  scrollContainer: {
    height: "79vh",
    overflowY: "scroll",
    marginBottom: "35px",
    [theme.breakpoints.down("md")]: {
      height: "100vh",
      marginBottom: "20px",
    },

  },


  scrollContainermd: {
    height: "50vh",
    overflowY: "scroll",
    marginBottom: "230px",
    [theme.breakpoints.down("md")]: {
      height: "76vh",
      marginBottom: "40px",
    },
  },

  scrollContainerlg: {
    height: "81vh",
    overflowY: "scroll",
    marginBottom: "10px"
  },

  scrollContainerfooter: {
    padding: "10px",
    background: "white",
    borderTop: "1px solid rgba(0, 0, 0, 0.1) !important",
    justifyContent: "center !important",
    gap: "10px"
  },

  a: {
    textDecoration: "none",
    color: "white"
  },

  messagearea: {
    height: "max-content",
    display: "contents"
  },
  message: {
    width: "50%",
    padding: "0 0 10px 50px",
    clear: "both",

    "&:after": {
      background: "#00a884",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  messageAvatar: {
    float: "left",
    marginLeft: "-38px",
    borderRadius: "50%",
    width: "30px",
    marginTop: "0px",
    height: "30px",
    color: "#d9fdd3"
  },
  messageRightAvatar: {
    float: "right",
    marginLeft: "0",
    marginRight: "-38px",
    height: "30px",
    color: "white"
  },
  paperContainer: {
    padding: '10px',
    marginTop: '5px'
  },

  messageRight: {
    padding: "0 50px 10px 0",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: "0 40px 50px 0",

    }
  },
  messageRightBubble: {
    background: '#d9fdd3',
    fontSize: '13px',
    fontWeight: '600',
    padding: '12px 13px',
    borderRadius: '15px 0px 15px 15px',
    color: 'black',
    position: 'relative',
    float: 'right',
    width: '30%',
    lineBreak: "anywhere",
    [theme.breakpoints.down("md")]: {
      padding: "12px 13px",
      float: "right",
      borderRadius: "15px 0px 15px 15px",
      background: "#d9fdd3",
      width: "85%"
    },
  },
  messageRightBubble1: {
    padding: '12px 13px',
    float: 'right',
    borderRadius: '15px 0px 15px 15px',
    background: '#d9fdd3',
    color: 'black',
    width: '50%',
    lineBreak: "anywhere",
    [theme.breakpoints.down("md")]: {
      padding: "12px 13px",
      float: "right",
      borderRadius: "15px 0px 15px 15px",
      background: "#d9fdd3",
      width: "90% "
    }
  },
  messageRightImage: {
    background: '#d9fdd3',
    fontSize: '13px',
    fontWeight: '600',
    padding: '12px 13px',
    borderRadius: '15px 0px 15px 15px',
    color: 'black',
    position: 'relative',
    float: 'right',
    width: "53%",
    [theme.breakpoints.down("md")]: {
      padding: "12px 13px",
      float: "right",
      borderRadius: "15px 0px 15px 15px",
      background: "#d9fdd3",
      width: "100%",
    },

  },
  messageRightFile: {
    background: '#d9fdd3',
    fontSize: '13px',
    fontWeight: '600',
    padding: '12px 13px',
    borderRadius: '15px 0px 15px 15px',
    color: 'black',
    position: 'relative',
    float: 'right',
    width: "60%",
    [theme.breakpoints.down("md")]: {
      padding: "12px 13px",
      float: "right",
      borderRadius: "15px 0px 15px 15px",
      background: "#d9fdd3",
      width: "100%",
    },
  },

  messagebubble: {
    background: "white",
    fontSize: "13px",
    fontWeight: 500,
    padding: "12px 13px",
    borderRadius: "0px 15px 15px 15px",
    color: "black",
    position: "relative",
    float: "left",
    width: "100%",
    lineBreak: "anywhere",
    [theme.breakpoints.down("md")]: {
      background: "white",
      fontSize: "13px",
      fontWeight: 600,
      padding: "12px 13px",
      borderRadius: "0px 15px 15px 15px",
      color: "black",
      position: "relative",
      float: "left",
      width: "100% "
    },
  },

  alignItemsEnd: {
    alignItems: "self-end"

  },

  bubbleSpan: { color: "#aab8c2", fontSize: "11px" },
  "::-webkit-scrollbar": { width: "6px" },
  "::-webkit-scrollbar-thumb": { backgroundColor: "#bab4b4" },




  lineBreak: {
    paddingTop: "5px",
    lineBreak: "anywhere",
    textWrap: "wrap"
  },

  buttonBreak: {
    gap: "10px",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  },

  actions: {
    // left:"-18px", 
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      right: "10px"
    }
  },


  buttonBtn: {
    color: "#fff",
    backgroundColor: "#064be2",
    padding: "4px 10px",
    fontSize: "0.8125rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: "10px",
    whiteSpace: "nowrap",
    boxShadow: "0 3px 9px 0 rgba(0,0,0,0.3) !important"
  },


  ptb10: {
    padding: "10px 0px !important"
  },


  ptb025: {
    display: "flex",
    textAlign: "center",
    padding: "0% 25%"

  },

  appBarBg: {
    height: "5rem",
    width: "100% !important",
    background: "#243763 !important",
    // backgroundImage: "radial-gradient( circle farthest-corner at 74.4% 21.7%, rgba(4,189,228,1) 0%, rgba(2,83,185,1) 100.2% )",
    // boxShadow:"rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
  },
  toolbarLP: {
    marginTop: "8px",

  },
  refoTitle: {
    padding: "0px !important",
    margin: "0px 0px 9px -16px !important",
    backgroundColor: "#fff",
    height: "82px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  refoTitleMobile: {
    padding: "18px !important",
    margin: "0px 0px 17px -24px !important",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "20px",
  },
  btnLogin: {
    width: "80px !important",
    padding: "6px 22px",
    textAlign: 'center',
    border: "2px solid #fff",
    borderRadius: "10px",
    textDecoration: "none",
    color: "#fff",
    '&:hover': {
      background: "#fff",
      color: "#243763 ",
    },
  },
  blinkIcon: {
    width: "80px !important",
    padding: "6px 22px",
    textAlign: 'center',
    textDecoration: "none",
    color: "#000",
    '&:hover': {
      background: "#fff",
      color: "#243763 ",
    },
  },
  formFields: {
    // display:"flex",
    // justifyContent:"center",
    padding: "25px",
    margin: "7rem 0rem",
    // width: "1000px"
  },
  regiterFields: {
    marginTop: "2rem",
    padding: "22px",
    border: "2px solid rgb(211 211 211)",
    background: "rgb(211 211 211 / 17%)",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    [theme.breakpoints.up('md')]: {
      width: "50%",
    },
  },
  closeTestBtn: {
    cursor: "pointer",
    position: "relative",
  },
  colorRed: {
    color: "red"
  },
  colorWhite: {
    color: "white"
  },

  chipMessageSpan: {
    padding: "0px 10px 0px 0px", color: "white", fontWeight: "bold"
  },

  chipMessageText: {
    margin: '10px 0px', width: "240px"
  },

  p1020p: {
    padding: "10px 20%",
    [theme.breakpoints.down("xs")]: {
      padding: "10px 25px",
    }
  },

  profileHeader: {
    color: "white",
    backgroundColor: blue[500],
    //marginTop: "-20px",
    gap: "8px"
  },

  dropdown: {
    outline: 0,
    position: "absolute",
    overflowX: "hidden",
    overflowY: "auto",
    right: "10px",
    top: "100%",
    minWidth: "22rem",
    zIndex: "999",
    backgroundColor: "white",
    boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
    [theme.breakpoints.down("sm")]: {
      minWidth: "15rem",
      position: "fixed",
      top: 'unset',
      right: '20px'
    },
  },

  actiondrop: {
    cursor: "pointer",
    outline: 0,
    position: "absolute",
    overflowX: "hidden",
    overflowY: "auto",
    // left: "125px", 
    zIndex: "999",
    backgroundColor: "white",
    boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
  },

  w15: {
    width: "15px"
  },

  IconButton: {
    //backgroundColor:"#f50057 !important", 
    color: "#ffffff !important",
    fontSize: "x-large"
  },

  h34: {
    height: "34px !important",
  },
  externalIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
    width: "160px",
    position: 'relative',
    "& div": {
      overflow: 'hidden'
    },
    "&:hover::before": {
      content: "attr(data-candidatename)",
      position: "absolute",
      top: "40px",
      padding: "3px 9px",
      background: "#000",
      color: "#fff",
      fontSize: "11px",
      whiteSpace: "nowrap",
      borderRadius: '4px',
    },
    "&:hover::after": {
      content: '""',
      position: "absolute",
      top: "26px",
      left: "6px",
      border: "8px solid transparent",
      borderBottomColor: '#000',
      borderRadius: "4px"
    }
  },
  externalIcon: {
    width: "30px !important",
    height: "30px !important",
    padding: "4px",
    mixBlendMode: "multiply",
    borderRadius: "unset !important"
  },
  aLink: {
    fontSize: 16,
    "&:hover": {
      cursor: "pointer",
      color: blue[600],
    },
  },
  barWrapper: {
    margin: "20px 0px",
    display: "flex",
    justifyContent: "space-between",
    width: "calc(100% + 0%)",
    gap: "50px",
    overflowX: "auto",
    "@media (min-width: 0px) and (max-width: 400px)": {
      maxWidth: "300px",
    },
    "@media (min-width: 400px) and (max-width: 500px)": {
      maxWidth: "395px",
    },
    "@media (min-width: 500px) and (max-width: 599.95px)": {
      maxWidth: "470px",
    },
  },

  barItem: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "1",
    paddingRight: "10px",
    "&:first-child::before": {
      content: "none !important",
    },
    "&:last-child::after": {
      content: "none !important",
    },
    "&:before": {
      position: "absolute",
      content: '""',
      borderBottom: "2px solid #ccc",
      width: "140%",
      top: "20px",
      right: "60px",
      // left: "-68%",
      zIndex: "2",
      [theme.breakpoints.only("sm")]: {
        left: "-65px !important",
        width: "100px !important",
      },

    },
    "&:after": {
      position: "absolute",
      content: '""',
      borderBottom: "2px solid #ccc",
      width: "140%",
      top: "20px",
      left: "60%",
      zIndex: "2",
      [theme.breakpoints.only("sm")]: {
        left: "-100% !important",
      },
    },
    "& $barCounter": {
      position: "relative",
      zIndex: 5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "#ccc",
      marginBottom: "6px",
      cursor: "pointer",
      fontSize: "12px"
    },
    "&$completed": {
      "&:after": {
        position: "absolute",
        content: '""',
        borderBottom: "2px solid #cccccc",
        top: "20px",
        // left: "40px",
        [theme.breakpoints.only("xs")]: {
          // left: "20px !important",
          borderBottom: "2px solid #4bb543",
        },
        [theme.breakpoints.only("sm")]: {
          // left: "40px !important",
          borderBottom: "2px solid #4bb543",
        },
        [theme.breakpoints.only("md")]: {
          // left: "28px !important",
          borderBottom: "2px solid #4bb543",
        },
      },
      "&:before": {
        backgroundColor: "#4bb543",
        color: "white",
        width: companyType === "COMPANY" ? "140%" : "110px",
        [theme.breakpoints.up("xl")]: {
          width: "150%"
        },
      },
      "& $barCounter": {
        backgroundColor: "#4bb543",
        color: "white"
      },

    },
    // "&$disable":{
    //   "&:after":{
    //     position: "absolute",
    //     content:'""',
    //     borderBottom: "2px solid #aeae",
    //     width: "100%",
    //     top: "20px",
    //     left: "50%",
    //     zIndex: 3
    //   },
    //   "&:before":{
    //     backgroundColor: "#aeae",
    //     color: "white"
    //   },
    //   "& barCounter":{
    //     backgroundColor: "#aeae",
    //     color: "white"
    //    }, 
    // },  
    "&$cancel": {
      "&:after": {
        position: "absolute",
        content: '""',
        borderBottom: "2px solid #f44336",
        width: "140%",
        top: "20px",
        left: "50%",
        zIndex: 3
      },
      "&:before": {
        backgroundColor: "#f44336",
        width: "140%",
        color: "white"
      },
      "& $barCounter": {
        backgroundColor: "#f44336",
        color: "white"
      },

    }
  },


  completed: {
    "&::before": {
      borderBottom: "2px solid #4bb543"
    },
  },

  cancel: {
    "&::before": {
      borderBottom: "2px solid #f44336"
    },
  },

  credit: {
    "&::before": {
      borderBottom: "2px solid #f44336"
    },
  },

  barCounter: {
    cursor: "pointer",
    fontSize: "12px"
  },

  source: {
    backgroundColor: "#1406da !important",
    color: "white  !important"
  },


  customTooltip: {
    backgroundColor: "white",
    border: "1px solid gray",
    padding: "0px 10px",
    position: "fixed",
    zIndex: "1"
  },



  headerTop: {
    display: "flex",
    width: "100%",
    //paddingTop: "8px !important",   
  },

  headerTopOpen: {
    display: "flex",
    width: `calc(100vw - ${150}px)`,
    //   paddingTop:"8px !important",   
  },

  barGraph: {
    marginTop: "10px",
    marginBottom: "10px",
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 4px 4px 4px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center"
  },


  barBlur: {
    marginTop: "10px",
    marginBottom: "10px",
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 4px 4px 4px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    borderRadius: "5px",
    "&:before": {
      display: "flex",
      content: '"No data Found"',
      position: "absolute",
      justifyContent: "center",
      paddingTop: "4%",
      [theme.breakpoints.only("xs")]: {
        paddingTop: "10% !important",
        left: "40%",
      },
      left: "50%"
      // width: "100%"
    }
  },


  formBox: {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
    padding: "10px",
    borderRadius: "20px",
    backgroundColor: "white"
  },

  registerFields: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    gap: "10px",
  },

  registerFieldsDiv: {
    textAlign: "end",
    width: '5%'

  },
  backgroundColor: {
    backgroundColor: "#F6F7FF"
  },

  appBar: {
    left: "70px",
    right: "unset",
    boxShadow: "none",
    color: "#000",
    backgroundColor: "white",
    borderBottom: "1px solid #f4f4f4",
    width: `calc(100vw - ${80 + theme.spacing(1)}px)`,

    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

    [theme.breakpoints.only("xs")]: {
      left: "0px",
      width: "calc(100vw - 10px)",
      paddingTop: "5px",
      top: "-5px"
    },

  },
  appBar1: {
    left: "230px",
    right: "unset",
    boxShadow: "none",
    color: "#000",
    backgroundColor: "white",
    borderBottom: "1px solid #f4f4f4",
    width: `calc(100vw - ${230 + theme.spacing(2.5)}px)`,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

  },

  headerWidth: {
    width: "100%",
    gap: "10px",
    display: "flex",

  },

  headerWidth1: {
    width: "100%",
    gap: "10px",
    display: "flex",

  },


  customTooltipBlack: {
    pointerEvents: 'none',


  },


  customTooltipText: {
    color: "white",
    backgroundColor: "black",
    padding: "5px",
  },



  lgQuickButton: {
    display: "flex !important",
    gap: "10px",
    [theme.breakpoints.only("xs")]: {
      display: "none !important",
    },

  },

  smQuickButton: {
    display: "none !important",
    gap: "10px",
    marginTop: "60px",
    [theme.breakpoints.only("xs")]: {
      display: "grid !important",
    },
  },

  smQuickHeaderButton: {
    display: "none !important",
    gap: "10px",
    // marginTop: "60px",
    [theme.breakpoints.only("xs")]: {
      display: "grid !important",
    },
  },
  quickAccessArrow: {
    fontSize: "30px",
    background: "blue",
    color: "#fff",
    borderRadius: "22px",
  },
  quickAccessContainer: {
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    "& button": {
      padding: "0px !important",
      "&:hover": {
        backgroundColor: "unset !important",
      },
      "& span": {
        display: "grid !important",
        justifyItems: "center !important",
        "& img": {
          width: "32px !important",

        }
      },
      "& p": {
        fontSize: "12px",
        [theme.breakpoints.only("xs")]: {
          fontSize: "10px"
        },
        [theme.breakpoints.only("sm")]: {
          fontSize: "8px"
        },
        padding: "0px !important",
        margin: "0px !important"
      }
    }

  },


  customTagsInput: {
    marginTop: "5px !important",
    "& div": {
      width: "100% !important"
    }
  },

  iframeLogo: {
    width: "125px",
    height: "56px",
    position: "absolute",
    right: "13px",
    top: "53px",
    background: "url(" + iFrameLogo + ") !important",
    backgroundSize: "116px !important",
  },

  // assessmentDialog: {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   gap: '10px',
  //   padding: "8px",
  //   paddingTop: "15px !important",
  // },  

  iframediv: {
    width: "100%",
    // height: "430px"
  },


  modal: {
    width: "100%",
    height: "390px",

  },

  modalImg: {
    height: "390px",
    paddingBottom: "10px",

  },


  CPVHeading: {
    fontSize: "1.3rem",
    textAlign: "center",
  },
  Candidateform: {
    height: "440px",
    margin: "0px 100px",
    overflow: "auto",
    width: "84%",
    border: "1px solid #f4f4f4",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      margin: "0px 10px",
    },
  },
  shareCVContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  quickAccessMobile: {
    display: "flex",
    gap: "5px",
    overflowX: "scroll",
    padding: "10px"
  },
  quickAccessPopover: {
    position: "fixed",
    margin: "-50px 35px",
    left: "196px !important",
    zIndex: 1300,
    background: "#fff",
    "& div": {
      boxShadow: "none",
      padding: "5px 0px",
    }
  },


  quickAccessPopoverOpen: {
    position: "fixed",
    margin: "-45px 35px",
    left: "366px !important",
    [theme.breakpoints.down("sm")]: {
      left: "246px !important",
    },
    zIndex: 1300,
    background: "#fff",
    "& div": {
      boxShadow: "none",
      padding: "5px 0px",
    }
  },

  quickAccessMobilePopover: {
    willChange: "unset !important",
    transform: "unset !important",
    position: "fixed !important",
    top: "60px !important",
    background: "#fff",
    padding: "6px",
    width: "100%",
    overflowX: "scroll"
  },

  filterGapFlex: {
    display: "flex",
    gap: "10px",
    padding: "8px 50px",
    "& $filterWidth": {
      width: "145px",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      }
    },
    [theme.breakpoints.down("md")]: {
      padding: "8px",
    }
  },

  buttonFullWidth: {
    width: "0px",
    [theme.breakpoints.down("md")]: {
      width: "100px !important",
    },

  },
  drawerViewHeader: {
    width: "100% !important",
    position: "fixed",
    display: "flex",
    padding: "10px 0px !important",
    marginLeft: "0",
    alignItems: "center",
    borderBottom: "1px solid rgb(0 0 0 / 10%)",
    justifyContent: "space-between",
    top: "0px",
    background: "#fff",
    zIndex: 1,

  },

  drawerViewContent: {
    marginTop: "25px",
    paddingBottom: "60px"
  },

  drawerViewContents: {
    marginTop: "25px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "45px !important",
      marginTop: "40px",
    },
  },

  drawerViewClose: {
    position: "fixed",
    right: "20px"
  },
  greenColor: {
    color: "green",
  },
  whatsappSend: {
    backgroundColor: "#4caf50",
    color: "white",
    margin: "0px 20px 20px 0px",
    textTransform: "Capitalize",
    "&:hover": {
      backgroundColor: "#4caf50",
      color: "white",
    }
  },
  sendBackUpContainer: {
    maxWidth: "400px",
    gap: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  storeLocal: {
    backgroundColor: "#4caf50",
    color: "white",
  },
  removeCloud: {
    backgroundColor: "#db544a",
    color: "white",
  },
  digCenter: {
    width: "100%",
    textAlign: "center"
  },
  digContentSize: {
    fontSize: "16px",
  },
  ticketForm: {
    display: "flex",
    width: "100%",
  },
  chatListContainerTicket: {
    display: "flex",
    gap: "10px",
  },
  gridCenter: {
    placeItems: "center",
  },
  planContainer: {
    display: "grid"
  },
  beta: {
    display: "flex",
    justifyContent: "flex-end"
  },
  betaMobile: {
    position: "absolute",
    top: "-15%",
    right: "5%",
  },
  regMenuBtn: {
    position: "absolute",
    color: "#fff",
    right: "5%",
  },
  regLoginContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "50px",
  },
  regBtn: {
    textAlign: "center"
  },
  mT10: {
    marginTop: "10px",
  },
  mB10: {
    marginBottom: "10px",
  },
  dialogDCBtn: {
    backgroundColor: "#ff9800",
    color: "white",
    width: 'inherit',
    "&:hover": {
      backgroundColor: "#ff9800",
      color: "white",
    }
  },
  dialogFISBtn: {
    backgroundColor: "#009688",
    color: "white",
    width: 'inherit',
    "&:hover": {
      backgroundColor: "#009688",
      color: "white",
    }
  },
  dialogSIBtn: {
    backgroundColor: "#ff1744",
    color: "white",
    width: 'inherit',
    "&:hover": {
      backgroundColor: "#ff1744",
      color: "white",
    }
  },
  sendInterviewContainer: {
    maxWidth: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "15px",
  },
  PY20: {
    padding: "20px 0px",
  },
  probingTitle: {
    width: "58%",
  },
  assessmentImgContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  actionBtnPosition: {
    position: "absolute",
  },
  actionBtnZIndex: {
    zIndex: "999",
  },
  headerGap: {
    justifyContent: "space-between",
    display: "flex",
    width: "100%",
  },
  uploadBtnImage: {
    width: '300px',
    [theme.breakpoints.only("lg")]: {
      width: '380px'
    },
  },
  resumeUploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px'
  },
  resumeUploadParent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabRoot: {
    width: '100%',
    backgroundColor: '#fff'
  },
  matchJdCloseIcon: {
    fontSize: "18px",
    color: '#f54848',
    "&:hover": {
      backgroundColor: "#fff",
      color: "red",
      borderRadius: '100px'
    }
  },
  ApproveMailContainer: {
    [theme.breakpoints.up("lg")]: {
      padding: "20px 100px"
    },
    padding: "10px 40px"
  },
  MultiSelectRec: {
    "& label": {
      fontSize: '16px'
    },
    "& div": {
      "& div": {
        height: "24px",
        "& span": {
          fontSize: '12px'
        },
        "& >svg": {
          width: "16px",
        }
      }
    }
  },
  ProfileLogoContainer: {
    "& div": {
      width: '100px',
      height: '100px'
    }
  },
  acknowledgementCheckBox: {
    display: "flex",
    alignItems: "flex-start",
    "& span:last-child": {
      padding: '9px 0px'
    },
  },
  EditRecUserChip: {
    '& >div': {
      width: '25px',
      height: '25px',
    },
  },
  documentViewBtn: {
    display: "flex",
    flexDirection: "row",
    border: "none",
    outline:'none',
    background: "linear-gradient(0deg, #08264a 0%, #08264a 100%)", 
    color: "#fff",
    width: "fit-content",
    padding: "2px 8px",
    borderRadius: "4px",
    alignItems: "center",
    gap: '5px',
    cursor:'pointer',
    boxShadow:'inset 1px 1px 2px 0px rgba(255, 255, 255, .5), 4px 4px 20px 0px rgba(0, 0, 0, .1), 4px 4px 5px 0px rgba(0, 0, 0, .1)',
    "&:hover":{
      background: "linear-gradient(0deg, #092647 0%, #3968a0 100%)", 
    }
  },
  photoViewbtn: {
    display: "flex",
    flexDirection: "row",
    border: "none",
    outline:'none',
    background: "linear-gradient(0deg, #e91874 0%, #e91874 100%)",
    color: "#fff",
    width: "fit-content",
    padding: "2px 8px",
    borderRadius: "4px",
    alignItems: "center",
    gap: '5px',
    cursor:'pointer',
    boxShadow:'inset 1px 1px 2px 0px rgba(255, 255, 255, .5), 4px 4px 20px 0px rgba(0, 0, 0, .1), 4px 4px 5px 0px rgba(0, 0, 0, .1)',
    "&:hover":{
      background: "linear-gradient(0deg, #c2095b 0%, #de488a 100%)", 
    }
  }
}));

