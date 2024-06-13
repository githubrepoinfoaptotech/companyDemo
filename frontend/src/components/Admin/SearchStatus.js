import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import useStyles from "../../themes/style.js";
import {jwtDecode} from 'jwt-decode';
const Status = (props) => {
   
  const classes = useStyles();
  const token = localStorage.getItem("token")
  const decode = jwtDecode(token)
  return (
    <>
      <Grid className={classes.button}>  
        {props.list.statusCode === 302 ||   props.list.statusCode === 310 ||  props.list.statusCode === 311 ||    props.list.statusCode === 313 ? (
          <>
            <Button variant="contained" size="small" className={classes.red}>
              {props.list.statusCode === 310
                ? "Offer Declined"
                : props.list.statusCode === 311
                ? "Not Joined"
                : props.list.statusCode === 302
                ? "Dropped"
                : "Credit Note"}    </Button>
          </>
        ) : ""}

        {decode.companyType !== "COMPANy" && props.list.statusCode === 312 ? (
          <>
            <Button
              variant="contained"
              size="small"
              className={classes.green}
             
            >
              Invoiced
            </Button>
          </>
        ) : (
          ""
        )}

        {props.list.statusCode !== 302 &&
        props.list.statusCode !== 308 &&
        props.list.statusCode !== 310 &&
        props.list.statusCode !== 311 &&
        props.list.statusCode !== 312 &&
        props.list.statusCode !== 313 ? (
          <>
            <Button
              variant="contained"
              size="small"
              className={ classes.blue  }
              
            >
              {props.list.statusCode === 301
                ? "Pending Validation"
                : props.list.statusCode === 303
                ?  (decode.companyType === "COMPANY" ? "Submitted to HM" :"Submitted to Client")
                : props.list.statusCode === 3031
                ? "Schedule Interview"
                : props.list.statusCode === 304
                ? "Interview Scheduled"
                : props.list.statusCode === 3041
                ? "Final Interview Scheduled"
                : props.list.statusCode === 305
                ? "Collect Documents"
                : props.list.statusCode === 307
                ? "Salary Breakup Shared"
                : props.list.statusCode === 3081
                ? "Yet to Join"
                : props.list.statusCode === 309
                ? "Invoice"
                : ""}
            </Button>
          </>
        ) : (
          ""
        )}

        {props.list.statusCode === 308 ? (
          <>
        

            <Button
              variant="contained"
              className={classes.blue}
              size="small"
            
            >
              Joining Confirmation
            </Button>

            <Button
              variant="contained"
              className={classes.red}
              size="small"
              
            >
              Offer Decline
            </Button>
          </>
        ) : (
          ""
        )}

        {decode.companyType !== "COMPANY" &&
         (props.list.statusCode === 309 || props.list.statusCode) === 3081 ? (
          <Button
            variant="contained"
            className={classes.red}
            size="small"
             
          >
            Ditch
          </Button>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
};

export default Status;
