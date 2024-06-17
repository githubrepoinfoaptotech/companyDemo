import { makeStyles } from "@material-ui/styles";

const drawerWidth = 220;
// const drawerWidth = 270;

export default makeStyles(theme => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  Icon1:{
    width:"32px"
  },
  Icon2:{
    width:"32px"
  },
  Icon3:{
    width:"32px"
  },
  Icon4:{
    width:"32px"
  },
  Icon5:{
    color: "#8f8ada",
    
  },
  Icon6:{
    color: "#4dabf5",
  },
  
  Icon9:{
    color: "#179385",
    padding:"2px 5px"
  },
  Icon10:{
    color: "#179385",
    width:"30px",
    height:"30px",
    marginRight:"0px"
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    
  },
  settingMenuBar:{
    marginLeft: "50px",
    boxShadow:'6px 4px 5px 0px rgba(100,138,137,1)',
  },
  LinkColor:{
    color:"black"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7),
    [theme.breakpoints.down("xs")]: {
      width: drawerWidth,
    },
  },
    
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  /* sidebarList: {
    marginTop: theme.spacing(6),
  }, */
  mobileBackButton: {
    marginTop: theme.spacing(0.5),
    marginLeft: 8,
    // [theme.breakpoints.only("sm")]: {
    //   marginTop: theme.spacing(0.625),
    // },
    // [theme.breakpoints.up("md")]: {
    //   display: "none",
    // },
    display: "none",

    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(0.625),
      display: "block",
    },
     
  },
   
}));
