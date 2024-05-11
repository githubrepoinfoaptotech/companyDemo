import { makeStyles } from "@material-ui/styles";


export default makeStyles(theme => ({

    tableOverflow: {
        overflow: 'auto'
      },
    
      subtitle2: {
        fontWeight: "500",
       fontFamily: '"Satoshi" !important',
        textAlign: "center",
        padding: "10px",
        fontSize: "20px"
      },
    
      heading: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      },
      customTextField: {
        "& input::placeholder": {
          fontSize: "13px"
        },
        marginTop: "5px !important",
        border: "1px solid #ced4da",
      },
      button: {
        justifyContent: "space-between",
        display: "flex",
        padding: "10px",
        width: '30%'
      },
      space: {
        display: "flex",
        justifyContent: "center",
        whiteSpace: "nowrap",
      },
      gap: {
        marginRight: "10px",
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
      green: {
        backgroundColor: green[500],
        color: "white",
        fontSize: "12px",
        "&:hover": {
          backgroundColor: green[500],
          color: "white",
        }
      },
      blue: {
        backgroundColor: blue[500],
        color: "white",
        fontSize: "12px",
        "&:hover": {
          backgroundColor: blue[500],
          color: "white",
        }
      },
    
    
      purple: {
        backgroundColor: purple[500],
        color: "white",
        fontSize: "12px",
        "&:hover": {
          backgroundColor: purple[500],
          color: "white",
        }
      },
    
      orange: {
        backgroundColor: orange[500],
        color: "white",
        fontSize: "12px",
        "&:hover": {
          backgroundColor: orange[500],
          color: "white",
        }
      },
    
      yellow: {
        backgroundColor: yellow[500],
        color: "black",
        fontSize: "12px",
        "&:hover": {
          backgroundColor: yellow[500],
          color: "black",
        }
      },
      teal: {
        backgroundColor: teal[500],
        color: "white",
        fontSize: "12px",
        "&:hover": {
          backgroundColor: teal[500],
          color: "white",
        }
      },
    
      cyan: {
        backgroundColor: cyan[500],
        color: "white",
        fontSize: "12px",
        "&:hover": {
          backgroundColor: cyan[500],
          color: "white",
        }
      },
    
    
      drawer: {
        width: "50%",
        padding: "10px",
        [theme.breakpoints.down("md")]: {
          width: "80%",
        }
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
      popupIndicator: {
        marginRight: "-24px !important",
      },
      backdrop: {
        zIndex: 1500,
        color: '#fff',
      },
      filterGap:{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: "20px",
        padding:"35px 0px"
      },
      pagination:{
        justifyContent: "end",
      }
}))