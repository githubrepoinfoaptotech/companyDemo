import { Button } from "@material-ui/core";


import { Grid, } from "@material-ui/core";

import useStyles from "../../themes/style.js";
import { jwtDecode } from 'jwt-decode';

const Status = (props) => {

  const classes = useStyles();
  const token = localStorage.getItem("token")
  const decode = jwtDecode(token)

  return (
    <>

      <Grid className={classes.button}>

        {props.list.statusCode === 302 || props.list.statusCode === 309 || props.list.statusCode === 310 || props.list.statusCode === 311 || props.list.statusCode === 312 || props.list.statusCode === 313 ? <>
          <Button variant="contained" size="small" className={props.list.statusCode === 309 ? classes.green : props.list.statusCode === 312 ? classes.green : classes.red}   >
            {props.list.statusCode === 309 ? "Joined" :
              props.list.statusCode === 310 ? "Offer Declined" :
                props.list.statusCode === 311 ? "Not Joined" :
                  props.list.statusCode === 312 ? "Invoiced" :
                    props.list.statusCode === 313 ? "Credit Note" :
                      props.list.statusCode === 302 ? "Dropped" :
                        "Joined"}   </Button></> : ""}


        {props.list.statusCode !== 302 && props.list.statusCode !== 308 && props.list.statusCode !== 309 && props.list.statusCode !== 310 && props.list.statusCode !== 311 && props.list.statusCode !== 312 && props.list.statusCode !== 313 ? <>
          <Button variant="contained" size="small" className={classes.blue}

            onClick={(e) => {
              props.setShortList({
                ...props.shortList,
                "id": props.list.id,
                "cand_name": props.list.candidateDetail.firstName + " " + props.list.candidateDetail.lastName,
                "job_id": props.list.requirement.uniqueId,
                "job_name": props.list.requirement?.requirementName,
                "rec_name": props.list.recruiter.firstName + " " + props.list.recruiter.lastName,
                "rec_mobile_no": props.list.recruiter.mobile,
                "cand_mobile": props.list.candidateDetail.mobile,
                "free": props.list.isAnswered,
                "statusCode": props.list.statusCode,
              })

              props.setValidation(false);
              props.handleStatusOpen();
              props.setView("undefined");

            }} >
            {props.list.statusCode === 301 ? "Pending Validation" :
              props.list.statusCode === 303 ? decode.companyType === "COMPANY" ? "Submitted to HM" : "Submitted to Client" :
                props.list.statusCode === 3031 ? "Schedule Interview" :
                  props.list.statusCode === 304 ? "Interview Scheduled" :
                    props.list.statusCode === 3041 ? "Final Interview Scheduled" :
                      props.list.statusCode === 305 ? "Collect Documents" :
                        props.list.statusCode === 307 ? "Salary Breakup Shared" :
                          props.list.statusCode === 3081 ? "Yet to Join" :
                            ""}
          </Button>
        </> : ""}

        {props.list.statusCode === 308 ?
          <>
            <Button variant="contained"
              className={classes.blue}
              size="small"
              onClick={(e) => {
                props.setShortList({
                  ...props.shortList,
                  "id": props.list.id,
                  "cand_name": props.list.candidateDetail.firstName + " " + props.list.candidateDetail.lastName,
                  "job_id": props.list.requirement.uniqueId,
                  "job_name": props.list.requirement?.requirementName,
                  "rec_name": props.list.recruiter.firstName + " " + props.list.recruiter.lastName,
                  "rec_mobile_no": props.list.recruiter.mobile,
                  "cand_mobile": props.list.candidateDetail.mobile,
                  "free": props.list.isAnswered,
                  "statusCode": props.list.statusCode,
                })

                props.setValidation(false);
                props.handleStatusNewOpen();
                props.setView("Joining Confirmation");
              }} >
              Joining Confirmation
            </Button>

            <Button variant="contained"
              className={classes.red}
              size="small"

              onClick={(e) => {
                props.setShortList({
                  ...props.shortList,
                  "id": props.list.id,
                  "cand_name": props.list.candidateDetail.firstName + " " + props.list.candidateDetail.lastName,
                  "job_id": props.list.requirement.uniqueId,
                  "job_name": props.list.requirement?.requirementName,
                  "rec_name": props.list.recruiter.firstName + " " + props.list.recruiter.lastName,
                  "rec_mobile_no": props.list.recruiter.mobile,
                  "cand_mobile": props.list.candidateDetail.mobile,
                  "free": props.list.isAnswered,
                  "statusCode": props.list.statusCode,
                })

                props.setValidation(false);
                props.handleStatusNewOpen();

                props.setView("Offer Declined");

              }} >
              Offer Decline
            </Button>



          </> : ""}

        {props.list.statusCode === 3081 ?

          <Button variant="contained"
            className={classes.red}
            size="small"
            onClick={(e) => {
              props.setShortList({
                ...props.shortList,
                "id": props.list.id,
                "cand_name": props.list.candidateDetail.firstName + " " + props.list.candidateDetail.lastName,
                "job_id": props.list.requirement.uniqueId,
                "job_name": props.list.requirement?.requirementName,
                "rec_name": props.list.recruiter.firstName + " " + props.list.recruiter.lastName,
                "rec_mobile_no": props.list.recruiter.mobile,
                "cand_mobile": props.list.candidateDetail.mobile,
                "free": props.list.isAnswered,
                "statusCode": props.list.statusCode,
              })

              props.setValidation(false);
              props.handleStatusNewOpen();
              props.setView("Ditch");
            }} >
            Ditch
          </Button> : ""}


      </Grid>
    </>
  );
}

export default Status;