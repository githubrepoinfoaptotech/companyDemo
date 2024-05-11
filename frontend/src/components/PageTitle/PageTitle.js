import React from "react";
// styles
import useStyles from "./styles";
// components
import { Typography } from "../Wrappers";

export default function PageTitle(props) {
  var classes = useStyles();

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.text} variant="h5" color="black" size="sm">
        {props.title}
      </Typography>
      {props.button && props.button}
    </div>
  );
}
