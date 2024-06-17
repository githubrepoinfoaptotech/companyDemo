import { makeStyles } from "@material-ui/styles";

const drawerWidth = 220;
// const drawerWidth = 270;

export default makeStyles(theme => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    [theme.breakpoints.down("md")]: { 
      display: "block", 
    }
  },
  content: {
    flexGrow: 1, 
    minHeight: "100vh",
    backgroundColor: "white",
    padding: "0px 20px",
     
  },
  contentShift: {
    width: `calc(100vw - ${270 + theme.spacing(6)}px)`,
    [theme.breakpoints.only("xs")]: { 
      width: "100%", 
    },
    [theme.breakpoints.between("sm", "md")]: { 
       width: "100%", 
      paddingLeft:"80px", 
    },
     
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  contentShift1:{
    width: `calc(100vw - ${270 + theme.spacing(6)}px)`,
    [theme.breakpoints.only("xs")]: { 
      width: "100%", 
    },
    [theme.breakpoints.between("sm", "md")]: { 
      width: "100%", 
      paddingLeft: `${drawerWidth+20}px`, 
    },
     
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }, 
  fakeToolbar: {
    ...theme.mixins.toolbar,
    margin:"10px"
  },
  link: {
    '&:not(:first-child)': {
      paddingLeft: 15
    }
  },

}));
