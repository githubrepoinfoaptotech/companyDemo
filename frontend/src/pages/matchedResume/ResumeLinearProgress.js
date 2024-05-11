import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography,Box, CircularProgress } from '@material-ui/core';


const getColorBasedOnPercentage = (percentage) => {
  switch (true) {
    case percentage >= 80 && percentage <= 100:
      return '#28a745'; // Green
    case percentage >= 60 && percentage < 80:
      return '#1a90ff'; // Blue
    case percentage >= 30 && percentage < 60:
      return '#ffc107'; // Yellow
    case percentage >= 10 && percentage < 30:
      return '#dc3545'; // Red
    default:
      return '#1a90ff'; // Blue
  }
};

const BorderCircularProgress = withStyles((theme)=>({
  root:{
    color: (props) => getColorBasedOnPercentage(Math.round(props.percentage)),
  },
  circle: {
    strokeLinecap: 'round',
  },
  bottom: {
    color: '#333',
  },
}))(CircularProgress);

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    position:'relative',
  },
});

export default function ResumeLinearProgress({resumePercentage}) {
  const classes = useStyles();
  const percentage = resumePercentage?.percentage
  return (
    <div className={classes.root}>
      <BorderCircularProgress variant='determinate' value={Math.round(percentage)} percentage={percentage}/>
      <BorderCircularProgress variant='determinate' value={100} percentage={100} style={{position:'absolute',color:'rgb(120 120 120 / 16%)'}}/>
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography style={{fontSize:'0.62rem'}} variant="caption" component="div" color="textSecondary">
          {`${Math.round(percentage)}%`}
        </Typography>
      </Box>
    </div>
  );
}
