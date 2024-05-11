import React from "react";
import { Grid, Button, List, Box, TextField, FormControl, InputLabel, Typography, } from "@material-ui/core";
import useStyles from "../../themes/style.js";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';

export default function Add(props) {
  const classes = useStyles();

  return (
    <>
      <Box sx={{ width: '100%' }} role="presentation"  >

        <List>
          <Card className={classes.root} >

            <CardHeader >




            <Grid container direction="row" spacing={1} className={classes.drawerHeader }>

<Typography variant="subtitle1"> Notes </Typography> 

<Grid  className={classes.drawerClose}>
    
<CloseIcon className={classes.closeBtn} size="14px" onClick={props.toggleDrawer("right", false)} /> 

  </Grid>


</Grid> 

 
            </CardHeader >
            <form onSubmit={props.noteSubmit(props.handleAddNotes)} >

              <CardContent >

                <Grid className={classes.noteMsgContainer}>
                  {props.candidatesNote.map((item, index) => {

                    return [
                      <Box bgcolor={index % 2 === 0 ? "#AED6F1" : "#ABEBC6"} className={classes.notemsgBox}>
                        <Grid>
                          <Typography > {item.message}  </Typography>
                          <Grid className={classes.drawerClose + " " + classes.noteName} > <span> {item.recruiter?.firstName + " " + item.recruiter?.lastName} </span>  <span> {moment(item.createdAt).format('DD-MM-YYYY')}</span></Grid>
                        </Grid>
                      </Box>

                    ]
                  })}
                </Grid>

                <Grid container direction="row" spacing={1} className={classes.drawerClose}  >
                  <Grid item xs={12} className={classes.NoteTop}>
                    <InputLabel shrink htmlFor="email"> Messaage </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField multiline rows={4} InputProps={{ disableUnderline: true }} classes={{ root: classes.customTextField }} size="small" placeholder='Enter Message' readOnly="true" name="message"
                        {...props.noteCandidates('message')} error={props.noteErrors.message ? true : false} />
                      <Typography variant="inherit" color="error">
                        {props.noteErrors.email?.message}
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className={classes.drawerClose} >

                  </Grid>
                </Grid>

              </CardContent>

              <CardActions>

                <Grid container direction="row" spacing={2} className={classes.drawerFooter} >

                   <Button variant="contained" size="small" color="primary" type='submit' >  Add  </Button>
                   <Button variant="contained" size="small"  color="secondary" onClick={props.toggleDrawer("right", false)}   >  Close  </Button>
                
                </Grid>

              </CardActions>
            </form>

          </Card>

        </List>

      </Box > </>
  );
}
