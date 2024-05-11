import { makeStyles } from "@material-ui/styles";
import teal from '@material-ui/core/colors/teal';
import purple from '@material-ui/core/colors/purple';
import orange from '@material-ui/core/colors/orange';
 import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import blueGrey from '@material-ui/core/colors/blueGrey';
import brown from '@material-ui/core/colors/brown';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';


export default makeStyles(theme => ({
  card: {
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardGrid:{
    cursor:"pointer",
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: '10px',
  },
  Grid:{
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
    padding:"10px 15px",
    borderRadius:"10px",
    color:"#fff",
    
    cursor:"pointer"
},
grid_title:{
  fontSize:"max(14px, 14px)",
},
tertiary:{
  backgroundColor:"#064be2",
  color:"white"
},

tealIcon:{
  color:"#fff",
  backgroundColor:teal[500]
},
teal:{ 
 backgroundColor:"rgb(0 150 136 / 75%)",
 boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
  padding:"10px 15px",
  borderRadius:"10px",
   color:"#fff",
  
  cursor:"pointer",
  "&:hover":{
    backgroundColor:teal[500],
  }
},
purpleIcon:{
  color:"#fff",
  backgroundColor:purple[500],
},
purple:{ 
   backgroundColor: "rgb(156 39 176 / 75%)", 
   boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
   padding:"10px 15px",
   borderRadius:"10px",
    color:"#fff",
   
   cursor:"pointer",
   "&:hover":{
    backgroundColor:purple[500],
  }
},
deepPurple:{
  backgroundColor:deepPurple[500],
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
  padding:"10px 15px",
  borderRadius:"10px",
   color:"#fff",
  
  cursor:"pointer"
},
pinkIcon:{
  color:"#fff",
  backgroundColor:pink[500],
},
pink:{ 
  backgroundColor: "rgb(233 30 99 / 75%)",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
  padding:"10px 15px",
  borderRadius:"10px",
   color:"#fff",
  
  cursor:"pointer",
  "&:hover":{
    backgroundColor:pink[500],
  }
},
orangeIcon:{
  color:"#fff",
  backgroundColor:orange[500],
},
orange:{ 
   backgroundColor: "rgb(255 152 0 / 75%)",
   boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
   padding:"10px 15px",
   borderRadius:"10px",
    color:"#fff",
   
   cursor:"pointer",
   "&:hover":{
    backgroundColor:orange[500],
  }
},
blueIcon:{
  color: "#fff",
  backgroundColor:blue[500],
},
blue:{ 
 backgroundColor: "rgb(33 150 243 / 75%)", 
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
  padding:"10px 15px",
  borderRadius:"10px",
   color:"#fff",
  
  cursor:"pointer",
  "&:hover":{
    backgroundColor:blue[700],
  }
},
greenIcon:{
  color:"#fff",
  backgroundColor:green[500],
},
green:{ 
  backgroundColor:"rgb(76 175 80 / 75%)",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
  padding:"10px 15px",
  borderRadius:"10px",
   color:"#fff",
  
  cursor:"pointer",
  "&:hover":{
    backgroundColor:green[500],
  }
},
indigoIcon:{
  color:"#fff",
  backgroundColor: "#3f51b5",
}, 
indigo:{
  backgroundColor: "rgb(63 81 181 / 75%)", 
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
  padding:"10px 15px",
  borderRadius:"10px",
   color:"#fff",
  
  cursor:"pointer",
  "&:hover":{
    backgroundColor: "#3f51b5",
  }
},

blueGreyIcon:{
  color:"#fff",
  backgroundColor:blueGrey[600],
},
blueGrey:{
 backgroundColor:"rgb(84 110 122 / 75%)",
  
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
  padding:"10px 15px",
  borderRadius:"10px",
   color:"#fff",
  
  cursor:"pointer",
  "&:hover":{
    backgroundColor: blueGrey[600],
  }
},
deepOrangeIcon:{
  color:"#fff",
  backgroundColor:deepOrange[500],
},
deepOrange:{
  backgroundColor:"rgb(255 87 34 / 75%)",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
  padding:"10px 15px",
  borderRadius:"10px",
   color:"#fff",
  
  cursor:"pointer",
  "&:hover":{
    backgroundColor: deepOrange[500],
  }
},
brownIcon:{
  color:"#fff",
  backgroundColor:brown[500],
},
brown:{
  
  backgroundColor:"rgb(121 85 72 / 75%)",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
  padding:"10px 15px",
  borderRadius:"10px",
   color:"#fff",
  
  cursor:"pointer",
  "&:hover":{
    backgroundColor: brown[500],
  }
},

red2Icon:{
  color:"#fff",
  backgroundColor: "#ff1744",
},
red2:{
  backgroundColor: "rgb(255,23,68,75%)",
 
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
  padding:"10px 15px",
  borderRadius:"10px",
   color:"#fff",
  
  cursor:"pointer",
  "&:hover":{
      backgroundColor: "#ff1744",
  }
},

count:{
  fontSize:"21px !important",
},

  visitsNumberContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: theme.spacing(1),
  },
  progressSection: {
    marginBottom: theme.spacing(1),
    backgroundColor:"blue"
  },
  progressTitle: {
    marginBottom: theme.spacing(2),
  },
  progress: {
    marginBottom: theme.spacing(1),
    backgroundColor: 'rgb(236, 236, 236)',
  },
  pieChartLegendWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: theme.spacing(1),
  },
  legendItemContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  fullHeightBody: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tableWidget: {
    overflowX: "auto",
  },
  progressBarPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
  progressBarWarning: {
    backgroundColor: theme.palette.warning.main,
  },
  performanceLegendWrapper: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  legendElement: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  legendElementText: {
    marginLeft: theme.spacing(1),
  },
  serverOverviewElement: {
    display: "flex",
    alignItems: "center",
    maxWidth: "100%",
  },
  serverOverviewElementText: {
    minWidth: 145,
    paddingRight: theme.spacing(2),
  },
  serverOverviewElementChartWrapper: {
    width: "100%",
  },
  mainChartBody: {
    overflowX: "auto",
  },
  mainChartHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.only("xs")]: {
      flexWrap: "wrap",
    },
  },
  mainChartHeaderLabels: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      order: 3,
      width: "100%",
      justifyContent: "center",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  },
  mainChartHeaderLabel: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(3),
  },
  mainChartSelectRoot: {
    borderColor: theme.palette.text.hint + "80 !important",
  },
  mainChartSelect: {
    padding: 10,
    paddingRight: 25,
  },
  mainChartLegentElement: {
    fontSize: "19px !important",
    marginLeft: theme.spacing(1),
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
  },
  backdrop: {
    zIndex: 1500,
    color: '#fff',
  },
  grid:{
    flexGrow: "0",
    maxWidth: "16.666667%",
    flexBasis: "16.666667%"
  },
  w25:{
    width:"25px"
  },
  w26:{
    width: "26px", height: "26px"
  },
  M10:{
    [theme.breakpoints.up('sm')]:{
      marginTop:"20px"
    }
  }

 
}));
