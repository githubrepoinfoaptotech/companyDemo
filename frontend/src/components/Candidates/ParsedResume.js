import React from "react";
import { Grid } from "@material-ui/core";
import PageTitle from "../PageTitle/PageTitle.js";
import useStyles from "../../themes/style.js";
import "react-toastify/dist/ReactToastify.css";
import { useResumeDataContext } from "../../context/CandidateDataContext.js";
import Resume from "./Resume.js";

export default function ParsedResume() {
  const classes = useStyles();
  const { resumeParsedData } = useResumeDataContext();

  const resdata = window.sessionStorage.getItem("candidateResume");
  const candidateName = window.sessionStorage.getItem("candidateName");
  const parsedResumeData = JSON.parse(resdata);

  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.heading}>
        <Grid item xs={7} style={{ textTransform: "capitalize" }}>
          <PageTitle title={candidateName} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Resume candidateData={parsedResumeData} />
        </Grid>
      </Grid>
    </>
  );
}
