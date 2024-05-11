import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  link: {
    textDecoration: "none",
    padding: "0%",
    "&:hover, &:focus": {
   
        backgroundColor: 'none',
    },
  },
  externalLink: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none'
  },
  linkActive: {
    backgroundColor: theme.palette.background.light,
      
  },
  linkNested: {
    paddingLeft: 0,
    "&:hover, &:focus": {
   backgroundColor: theme.palette.background.light,

    },
  },
  subMenulinkIcon:{
    minWidth: "39px !important"
  },
  linkIcon: {
   
   //padding: "8% 50%",
  //  marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
    transition: theme.transitions.create("color"),
    width: 24,
    display: "flex",
    justifyContent: "center",
    
  },
  linkIconActive: {
    //backgroundColor: theme.palette.background.light,
    backgroundColor: "#d1e0f5"
  },
  linkText: {
    padding: 0,
    color: theme.palette.text.secondary,
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: 14,
  },
  linkTextActive: {
    color: theme.palette.text.primary,
    backgroundColor: "#d1e0f5",
    lineHeight: "3.6",
    [theme.breakpoints.down("sm")]: {
      lineHeight: "3.9 !important"
  },
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    paddingLeft: theme.spacing(2) + 30,
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    backgroundColor: "#D8D8D880",
  },
  settingMenuBar:{
    marginLeft: "50px",
    boxShadow:'6px 4px 5px 0px rgba(100,138,137,1)'
  },
 
  sidedropdown:{
    cursor: "pointer",
    outline: 0,
    position: "fixed", 
    overflowX: "hidden",
    overflowY: "auto", 
    bottom: "40px",
    left: "75px", 
    zIndex:"999",
    backgroundColor:"white",
    boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)", 
    
    
    [theme.breakpoints.down("xs")]: { 
      bottom: "30px",
  },
 
  [theme.breakpoints.between("sm", "md")]: { 
    bottom: "60px",
  },
  [theme.breakpoints.only("lg")]: { 
    bottom: "20%",
  },
  [theme.breakpoints.between("lg,xl")]: { 
    bottom: "15px",
  },
  },

  sidedropdownList: { 
    margin:"0px 10px 0px 0px",   
    padding:"0px",    
    cursor: "pointer",
    color: "#fff !important",
    
    "&:hover":{ 
      backgroundColor: "#2196f3 !important", 
      boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12) !important",
      "& $subMenulinkIcon":{
        "& button":{
          color: "#fff !important",
        },
       
      },
      "& $linkText":{
        color: "#fff !important",
      },
    },
  },

}));
