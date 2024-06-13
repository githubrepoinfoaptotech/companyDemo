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
  MenuItem,
  Switch,
} from "@material-ui/core";
import useStyles from "../../themes/style.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import classNames from "classnames";
import {jwtDecode} from "jwt-decode";

export default function AddProject(props) {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
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
                  <Typography variant="subtitle1">Add New Project </Typography>
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
            <CardContent className={classes.scrollCard}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <InputLabel shrink htmlFor="clientName">
                    Project Name
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      InputProps={{ disableUnderline: true }}
                      classes={{ root: classes.customTextField }}
                      size="small"
                      placeholder="Enter Project Name"
                      id="clientName"
                      {...props.register("clientName")}
                      error={props.errors.clientName ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.clientName?.message}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <InputLabel shrink htmlFor="clientIndustry">
                    Project Division
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      InputProps={{ disableUnderline: true }}
                      classes={{ root: classes.customTextField }}
                      size="small"
                      placeholder="Enter Project Division"
                      id="clientIndustry"
                      {...props.register("clientIndustry")}
                      error={props.errors.clientIndustry ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.clientIndustry?.message}
                    </Typography>
                  </FormControl>
                </Grid>
                {decode.role ==="CLIENTCOORDINATOR" ?
                <>
                <Grid item xs={12} sm={4} md={4} lg={4} style={{display:'none'}}>
                  <InputLabel shrink htmlFor="clientIndustry">
                    Hiring Manager
                  </InputLabel>
                  <TextField
                    name="recruiterId"
                    label={
                      props?.clientsName === "" ? "Select Hiring Manager" : ""
                    }
                    classes={{ root: classes.customSelectTextField }}
                    size="small"
                    {...props.register("recruiterId")}
                    InputLabelProps={{ shrink: false }}
                    margin="normal"
                    variant="outlined"
                    hidden="true"
                    value={decode.recruiterId}
                  >

                  </TextField>
                  <Typography variant="inherit" color="error">
                    {props.errors.recruiterId?.message}
                  </Typography>
                </Grid>
                </>
                :
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <InputLabel shrink htmlFor="clientIndustry">
                    Hiring Manager
                  </InputLabel>
                  <TextField
                    select
                    name="recruiterId"
                    label={
                      props?.clientsName === "" ? "Select Hiring Manager" : ""
                    }
                    classes={{ root: classes.customSelectTextField }}
                    size="small"
                    defaultValue=""
                    {...props.register("recruiterId")}
                    InputLabelProps={{ shrink: false }}
                    margin="normal"
                    variant="outlined"
                    onChange={(e) =>
                      props.setValue("recruiterId", e.target.value)
                    }
                  >
                    {props?.clientsName?.map((option) => (
                      <MenuItem key={option.user.id} value={option.id}>
                        {decode.user_id === option.user.id
                          ? `${option.firstName} ${option.lastName} (You)`
                          : option.employeeId === ""
                          ? `${option.firstName} ${option.lastName}`
                          : `${option.firstName} ${option.lastName} (${option.employeeId})`}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Typography variant="inherit" color="error">
                    {props.errors.recruiterId?.message}
                  </Typography>
                </Grid>
                }
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <InputLabel shrink htmlFor="hrbpCode">
                    HR Business Unit Code
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      InputProps={{ disableUnderline: true }}
                      classes={{ root: classes.customTextField }}
                      size="small"
                      placeholder="Enter HRBU Code"
                      id="hrbpCode"
                      {...props.register("hrbpCode")}
                      error={props.errors.hrbpCode ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.hrbpCode?.message}
                    </Typography>
                  </FormControl>
                </Grid>
             
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <InputLabel shrink htmlFor="projectRegion">
                     Project Region
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      InputProps={{ disableUnderline: true }}
                      classes={{ root: classes.customTextField }}
                      size="small"
                      placeholder="Enter Project Region"
                      id="projectRegion"
                      {...props.register("projectRegion")}
                      error={props.errors.projectRegion ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.projectRegion?.message}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <InputLabel shrink htmlFor="projectLocation">
                    Project Location
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      InputProps={{ disableUnderline: true }}
                      classes={{ root: classes.customTextField }}
                      size="small"
                      placeholder="Enter Project Location"
                      id="projectLocation"
                      {...props.register("projectLocation")}
                      error={props.errors.projectLocation ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.projectLocation?.message}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={8} md={8} lg={8}>
                  <InputLabel shrink htmlFor="reasonForHiring">
                    Reason For Hiring
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      InputProps={{ disableUnderline: true }}
                      classes={{ root: classes.customTextField }}
                      size="small"
                      multiline
                      rows={3}
                      maxRows={4}
                      placeholder="Backfill/ New Hire/ Rehire/ Special Hire"
                      id="reasonForHiring"
                      {...props.register("reasonForHiring")}
                      error={props.errors.reasonForHiring ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.reasonForHiring?.message}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <InputLabel shrink htmlFor="billable">
                   Billable
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <Switch
                      checked={props.billable}
                      color="primary"
                      id="billable"
                      name="billable"
                      {...props.register("billable", {
                        onChange: (e) => {
                          props.setBillable(e.target.checked);
                        },
                      })}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <Typography variant="inherit" color="error">
                      {props.errors.billable?.message}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <InputLabel shrink htmlFor="aggStartDate">
                    Hiring Start Date
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      InputProps={{ disableUnderline: true }}
                      classes={{ root: classes.customTextField }}
                      size="small"
                      type="date"
                      placeholder="Select Hiring Start Date"
                      id="aggStartDate"
                      {...props.register("aggStartDate")}
                      error={props.errors.aggStartDate ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.aggStartDate?.message}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <InputLabel shrink htmlFor="aggEndDate">
                    Hiring End Date
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      InputProps={{ disableUnderline: true }}
                      classes={{ root: classes.customTextField }}
                      size="small"
                      type="date"
                      placeholder="Select Hiring End Date"
                      id="aggEndDate"
                      {...props.register("aggEndDate")}
                      error={props.errors.aggEndDate ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.aggEndDate?.message}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs lg={3}></Grid>
                  {props.levelOfHiringFields.map((user, index) => (
                    <div key={index} className={classNames(classes.fields)}>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        lg={3}
                        className={classNames(classes.fieldsInput)}
                      >
                        <InputLabel shrink>
                          Hiring Level
                        </InputLabel>

                        <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter the Level Name"
                            id="name"
                            value={user.name}
                            name="name"
                            onChange={(event) =>
                              props.levelOfHiringChange(event, index)
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={4}
                        lg={4}
                        className={classNames(classes.fieldsInput)}
                      >
                        <InputLabel shrink>
                        Number to be hired
                        </InputLabel>

                        <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            type="number"
                            placeholder="Enter Number to be hired"
                            id="noOfHires"
                            value={user.noOfHires}
                            name="noOfHires"
                            onChange={(event) =>
                              props.levelOfHiringChange(event, index)
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={2}
                        className={classNames([classes.fieldsInput])}
                      >
                        <AddCircleIcon
                          color="primary"
                          size="small"
                          onClick={props.LevelOfHireAdd}
                          className={classes.closeAddBtn}
                        />
                        {index + 1 !== 1 ? (
                          <RemoveCircle
                            color="secondary"
                            size="small"
                            onClick={props.LevelOfHireRemove}
                            className={classes.closeMinBtn}
                          />
                        ) : (
                          ""
                        )}
                      </Grid>
                    </div>
                  ))}
                <div id="section-level-of-hire"> </div>
                <Grid item xs lg={3}></Grid>
                  {props.recruiterFields.map((user, index) =>{
                    return(
                    <div key={index} className={classNames(classes.fields)}>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        lg={3}
                        className={classNames(classes.fieldsInput)}
                      >
                        <InputLabel shrink>
                          Recruiter Point of Contact(POC) Name
                        </InputLabel>
                        <TextField
                          select
                          name={`recruiterId`}
                          label={props?.recruiterName === "" ? "Select Recruiter Name" : ""}
                          style={{ textAlign: "left" }}
                          classes={{ root: classes.customSelectTextField }}
                          value={user.recruiterId}
                          onChange={(e) => props.recruiterChange(e, index)}
                          size="small"
                          InputLabelProps={{ shrink: false }}
                          margin="normal"
                          variant="outlined"
                        >
                          {props?.recruiterName?.map((option) => {
                            const roleName = option.user?.roleName;
                            const firstName = option.firstName;
                            const lastName = option.lastName;
                            let label = `${firstName} ${lastName}`;
                            if (roleName) {
                              label += ` (${roleName})`;

                              if (roleName === "SUBVENDOR") {
                                label = label.replace("(SUBVENDOR)", "(Vendor)");
                              } else if (roleName === "CLIENTCOORDINATOR") {
                                label = label.replace("(CLIENTCOORDINATOR)", "(Hiring Manager)");
                              }
                              return (
                                <MenuItem key={option.id} value={option.id}>
                                  {label}
                                </MenuItem>
                              );
                            }
                          })}
                        </TextField>
                        {/* <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Project Point of Contact(POC) Name"
                            id="name"
                            value={user.name}
                            name="name"
                            onChange={(event) =>
                              props.recruiterChange(event, index)
                            }
                          />
                        </FormControl> */}
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={4}
                        lg={3}
                        className={classNames(classes.fieldsInput)}
                      >
                        <InputLabel shrink>
                          Recruiter Email-Id
                        </InputLabel>

                        <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Recruiter Email-Id"
                            id="email"
                            value={user.email}
                            name="email"
                            // onChange={(event) =>
                            //   props.recruiterChange(event, index)
                            // }
                          />
                        </FormControl>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={4}
                        lg={4}
                        className={classNames(classes.fieldsInput)}
                      >
                        <InputLabel shrink>
                          Recruiter Mobile No
                        </InputLabel>

                        <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Recruiter Mobile No"
                            id="mobile"
                            value={user.mobile}
                            name="mobile"
                            // onChange={(event) =>
                            //   props.recruiterChange(event, index)
                            // }
                          />
                        </FormControl>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={2}
                        className={classNames([classes.fieldsInput])}
                      >
                        <AddCircleIcon
                          color="primary"
                          size="small"
                          onClick={props.recruiterAdd}
                          className={classes.closeAddBtn}
                        />
                        {index + 1 !== 1 ? (
                          <RemoveCircle
                            color="secondary"
                            size="small"
                            onClick={props.recruiterRemove}
                            className={classes.closeMinBtn}
                          />
                        ) : (
                          ""
                        )}
                      </Grid>
                    </div>
                  )})}
                <div id="section"> </div>
                </Grid>
            </CardContent>
            <CardActions>
              <Grid
                container
                direction="row"
                spacing={2}
                className={classes.clientDrawerFooter}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={props.handleSubmit(props.handleAdd)}
                  disabled={props.isSubmitting}
                >
                  Save
                </Button>

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
          </Card>
        </List>
      </Box>
    </>
  );
}
