import React, { useState } from "react";
import {
  Grid,
  Button,
  List,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Typography,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
} from "@material-ui/core";
import useStyles from "../../themes/style.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CloseIcon from "@material-ui/icons/Close";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { jwtDecode } from "jwt-decode";

function AddUser(props) {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  return (
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

                <Typography variant="subtitle1"> Add User </Typography>
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
          <form onSubmit={props.handleSubmit(props.handleAdd)} autoComplete="off" noValidate>
            <CardContent>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl className={classes.margin}>
                    <InputLabel shrink htmlFor="roleName">
                      Select User Category
                    </InputLabel>

                    <Select
                      label="Role"
                      name="roleName"
                      defaultValue={""}
                      classes={{
                        root: classes.customSelectField,
                        icon: classes.customSelectIcon,
                      }}

                      {...props.register("roleName", {
                        onChange: (e) => {
                          props.setRoleName(e.target.value);
                        }
                      })}

                      error={props.errors.roleName ? true : false}
                      disableUnderline
                    >
                    {[
                      <MenuItem key="recruiter" value="RECRUITER">Recruiter</MenuItem>,
                      <MenuItem key="clientCoordinator" value="CLIENTCOORDINATOR">{decode.companyType === "COMPANY" ? "Hiring Manager" : "Client Coordinator"} </MenuItem>,
                      <MenuItem key="subvendor" value="SUBVENDOR"> {decode.companyType === "COMPANY" ? "Vendor" : "Sub Vendor"} </MenuItem>,
                      decode.companyType === "COMPANY" ? null :(
                        <MenuItem key="freelancer" value="FREELANCER">  Freelancer </MenuItem>
                      )
                    ]}
                    </Select>

                    <Typography variant="inherit" color="error">
                      {props.errors.roleName?.message}
                    </Typography>
                  </FormControl>
                </Grid>

                {props.roleName === "SUBVENDOR" && (
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <InputLabel shrink htmlFor="companyName">   Company Name  </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        size="small"
                        classes={{ root: classes.customTextField }}
                        InputProps={{ disableUnderline: true }}
                        placeholder="Enter Company Name"
                        id="companyName"
                        name="companyName"
                        {...props.register("companyName")}
                        error={props.errors.companyName ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {props.errors.companyName?.message}
                      </Typography>
                    </FormControl>
                  </Grid>
                )}
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <InputLabel shrink htmlFor="firstName">

                    First Name
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      size="small"
                      classes={{ root: classes.customTextField }}
                      InputProps={{ disableUnderline: true }}
                      placeholder="Enter First Name"
                      id="firstName"
                      name="firstName"
                      {...props.register("firstName")}
                      error={props.errors.firstName ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.firstName?.message}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <InputLabel shrink htmlFor="lastName">

                    Last Name
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      classes={{ root: classes.customTextField }}
                      InputProps={{ disableUnderline: true }}
                      size="small"
                      placeholder="Enter Last Name"
                      id="lastName"
                      name="lastName"
                      {...props.register("lastName")}
                      error={props.errors.lastName ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.lastName?.message}
                    </Typography>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <InputLabel shrink htmlFor="email">
                    Email
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      classes={{ root: classes.customTextField }}
                      InputProps={{ disableUnderline: true }}
                      size="small"
                      placeholder="Enter Email"
                      id="email"
                      name="email"
                      {...props.register("email")}
                      error={props.errors.email ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.email?.message}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <InputLabel shrink htmlFor="password">
                    Password
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      classes={{ root: classes.customTextField }}
                      type={values.showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      id="password"
                      InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                            >
                              {values.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      {...props.register("password")}
                      error={props.errors.password ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.password?.message}
                    </Typography>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <InputLabel shrink htmlFor="mobile">
                    Mobile
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      classes={{ root: classes.customTextField }}
                      InputProps={{ disableUnderline: true }}
                      size="small"
                      type="number"
                      placeholder="Enter Mobile Number"
                      id="mobile"
                      name="mobile"
                      {...props.register("mobile")}
                      error={props.errors.mobile ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.mobile?.message}
                    </Typography>
                  </FormControl>
                </Grid>


                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <InputLabel shrink htmlFor="employeeId">

                    Employee ID
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      classes={{ root: classes.customTextField }}
                      InputProps={{ disableUnderline: true }}
                      size="small"
                      type="number"
                      placeholder="Enter Employee Id"
                      id="employeeId"
                      name="employeeId"
                      {...props.register("employeeId")}
                      error={props.errors.employeeId ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.employeeId?.message}
                    </Typography>
                  </FormControl>
                </Grid>
                {decode.companyType === "COMPANY" && props.roleName === "SUBVENDOR" ? (
                  <>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="companyAddress">
                        Company Address
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter Company Address"
                          id="companyAddress"
                          name="companyAddress"
                          {...props.register("companyAddress")}
                          error={props.errors.companyAddress ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {props.errors.companyAddress?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="headOfficeLocation">
                        Head Office Location
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter Head Office Location"
                          id="headOfficeLocation"
                          name="headOfficeLocation"
                          {...props.register("headOfficeLocation")}
                          error={props.errors.headOfficeLocation ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {props.errors.headOfficeLocation?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="branchOfficeLocation">
                        Branch Office Location
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter Branch Office Location"
                          id="branchOfficeLocation"
                          name="branchOfficeLocation"
                          {...props.register("branchOfficeLocation")}
                          error={props.errors.branchOfficeLocation ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {props.errors.branchOfficeLocation?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="capabilities">
                        Hiring Support
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="IT/Non-IT/NICHE/SUPER NICHE/Leadership"
                          id="capabilities"
                          name="capabilities"
                          {...props.register("capabilities")}
                          error={props.errors.capabilities ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {props.errors.capabilities?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="recruiterCapacity">
                        Recruiter Capacity
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          classes={{ root: classes.customTextField }}
                          InputProps={{ disableUnderline: true }}
                          placeholder="Enter Recruiter Capacity"
                          id="recruiterCapacity"
                          name="recruiterCapacity"
                          {...props.register("recruiterCapacity")}
                          error={props.errors.recruiterCapacity ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {props.errors.recruiterCapacity?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
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
                  color="primary"
                  size="small"
                  disabled={props.isSubmitting}
                  type="submit"
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
          </form>
        </Card>
      </List>
    </Box>
  )
}

export default AddUser