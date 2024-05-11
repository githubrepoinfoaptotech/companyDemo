import React from "react";
import {
  Grid,
  Button,
  List,
  Box,
 TextField, 
  FormControl,
  InputLabel,
  Typography,   
  Switch,
  TablePagination
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import moment from "moment";

 import useStyles from "../../themes/style.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CloseIcon from "@material-ui/icons/Close";
import { Autocomplete } from "@material-ui/lab";
import useMediaQuery from '@material-ui/core/useMediaQuery';


export default function AddClient(props) {
    const classes = useStyles(); 
    const mobileQuery = useMediaQuery('(max-width:600px)'); 

   return (
    <>
<Box sx={{ width: "100%" }} role="presentation">
<List>
<Card className={classes.root}>
              <CardHeader>
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.drawerHeader}
                >
                  <Grid item xs={10} md={6}>
                    
                    <Typography variant="subtitle1"> Assign Requirement to User </Typography>
                  </Grid>

                  <Grid item xs={2} lg={6} className={classes.drawerClose}>
                    <CloseIcon
                      className={classes.closeBtn}
                      size="14px"
                      onClick={props.toggleDrawer("right", false)}
                    />
                  </Grid>
                </Grid>
              </CardHeader>
              <form onSubmit={props.assignSubmit(props.handleAssignRequirements)}>
                <CardContent>
                    
                <Grid container spacing={2}   className={classes.center + " " + classes.filterGapFlex} >

              { props.recruiter !== "false"?      
               <FormControl  className={classes.filterWidth} >
                      <InputLabel shrink htmlFor="recruiterId">  Select User   </InputLabel> 
                      <Autocomplete
                      
                          options={props.externalUser} 
                          name="recruiterId"   
                       
                        disableClearable
                        error={props.assignErrors.recruiterId ? true : false}
                        {...props.assignRequirement("recruiterId")   }
                        getOptionLabel={(option) =>
                          option.firstName  + " " + option.lastName
                      }
                        onChange={(event, value) => {
                          props.setRecruiterId(value); 
                          props.getAssigendRequirements(value.id);
                        }}
 
                          renderInput={(params) => (
                            <TextField   {...params}    name="recruiterId"      variant="filled"  />
                          )}

                         
                        /> 
                           <Typography variant="inherit" color="error">
                          {props.assignErrors.recruiterId?.message}
                        </Typography>
                       </FormControl>
                   :""}
                       <FormControl  className={classes.filterWidth} >
                      <InputLabel shrink htmlFor="requirementId">  Requirement Name   </InputLabel> 
                      <Autocomplete
                     
                          options={props.requirementName} 
                          name="requirementId"   
                       
                        disableClearable
                        error={props.assignErrors.requirementId ? true : false}
                        {...props.assignRequirement("requirementId")   }
                        getOptionLabel={(option) =>
                          option.requirementName  + " (" + option.uniqueId + ")"
                      }
                        onChange={(event, value) => {
                          props.setRequirementId(value); 
                        }}
 
                          renderInput={(params) => (
                            <TextField   {...params}    name="requirementId"      variant="filled"  />
                          )}

                         
                        /> 
                         <Typography variant="inherit" color="error">
                          {props.assignErrors.requirementId?.message}
                        </Typography>
                    </FormControl>
{/*                   
                    <div  className={classes.buttonFullWidth} >
                   
                    <Button
                      variant="contained"
                      color="primary" 
                      size="small"
                      disabled={props.assignIsSubmitting}
                      type="submit"
                    
                     
                    >
                      Assign
                    </Button>
                    </div> */}


<FormControl  className={classes.buttonFullWidth} >
                      <InputLabel shrink htmlFor="requirementId">    </InputLabel> 
                      <Button
                      variant="contained"
                      color="primary" 
                      size="small"
                      disabled={props.assignIsSubmitting}
                      type="submit"
                    
                      className={classes.mt16}
                    >
                      Assign
                    </Button>
                        { props.assignErrors.requirementId?.message || props.assignErrors.recruiterId?.message? <br />  :""}
                    </FormControl>

                   
                 </Grid>

                 
                  
 <Grid container direction="row" spacing={2}>
 <Grid item xs={12}   >
                  <MUIDataTable
            title=""
            options={{
              pagination: false,
              sort: false,
              selectableRows: "none",
              search: false,
              filter: false,
              download: false,
              print: false,
              viewColumns: false,
              responsive: mobileQuery===true? 'vertical' : 'standard',
              textLabels: {
                body: {
                  noMatch: 'Oops! Matching record could not be found',
                }
              },
            }}
            columns={[
              {
                name: "S.No",
              },
              {
                name: "User",
              },
              {
                name: "Requirement Name",
              },
              {
                name: "Status",
              },
              {
                name: "Posted Date",
              },
            ]}
            data={props.assignData.map((item, index) => {
              return [
                <>   {props.assignCurrerntPage !== 0 ? 10 * props.assignCurrerntPage - 10 + index + 1 : index + 1}  </>,
               <>{item.recruiter?.firstName + " " + item.recruiter?.lastName} </>,
               <>   {item.requirement?.requirementName} {"(" + item.requirement?.uniqueId + ")"} </>, 
               <Switch
               checked={item.isActive}
               onChange={(e) => {
                 props.handleAssignStatus(item.id, e.target.checked);
               }}
               color="primary"
               inputProps={{ "aria-label": "primary checkbox" }} />,
                moment(item.createdAt).format("DD-MM-YYYY"),
              ];
            })}
          />  </Grid>
 </Grid>
<Grid container spacing={2} className={classes.pagination}>
            <TablePagination
              rowsPerPageOptions={[50]}
              component="div"
              count={props.assigncount}
              rowsPerPage={50}
              page={props.assignPage}
              onPageChange={props.handlerequirementChangePage}
            />
          </Grid>

                </CardContent>
                <CardActions>
                  <Grid
                    container
                    direction="row"
                    spacing={2}
                    className={classes.drawerFooter}
                  >
                   
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={props.toggleDrawer("right", false)}
                    >
                      
                      Close
                    </Button>
                  </Grid>
                </CardActions>
                </form>
            </Card>
</List>
</Box>
</>
  );
}
