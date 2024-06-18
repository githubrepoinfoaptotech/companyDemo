import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  Switch,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import useStyles from "../../themes/style.js";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import DescriptionIcon from "@material-ui/icons/Description";

// data
import Tooltip from "@material-ui/core/Tooltip";
import JoditEditor from "jodit-react";
import {jwtDecode} from "jwt-decode";

function AddRequirements(props) {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  useEffect(() => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}CC/getClientList`,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        props.setClientList(response.data.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
                <Typography variant="subtitle1">Add New Requirement</Typography>
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
          <form onSubmit={props.handleSubmit(props.handleAdd)}>
            <CardContent>
              <Grid container direction="row" spacing={2} style={{height: "79vh",overflow: "scroll"}}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl className={classes.margin}>
                    <InputLabel shrink htmlFor="clientId">
                      {decode.companyType === "COMPANY"
                        ? "Select Project Name"
                        : "Select Clients Name"}
                    </InputLabel>

                    <Autocomplete
                      options={props.clientList}
                      disableClearable
                      getOptionLabel={(option) =>
                        option.clientName + " (" + option.uniqueId + ")"
                      }
                      getOptionvalue={(option) => option.id}
                      onChange={(event, value) => {
                        props.handleChange(value.id);
                      }}
                      classes={{
                        popupIndicator: classes.autocompleteIndicator,
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...props.register("clientId")}
                          error={props.errors.clientId ? true : false}
                          {...params}
                          variant="filled"
                          name="clientId"
                        />
                      )}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.clientId?.message}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl className={classes.margin}>
                    <InputLabel shrink htmlFor="levelHrDataId">
                      Select Level Name
                    </InputLabel>

                    <Autocomplete
                      options={props.levelHrData}
                      disableClearable
                      getOptionLabel={(option) => option.name}
                      onChange={(event, value) => {
                        props.setReqLevelHrDataId(value.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...props.register("levelHrDataId")}
                          error={props.errors.levelHrDataId ? true : false}
                          {...params}
                          variant="filled"
                          name="levelHrDataId"
                        />
                      )}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.levelHrDataId?.message}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {/* <InputLabel shrink htmlFor="orgRecruiterId">
                      Select Organization Recruiter
                    </InputLabel> */}
                    {/* <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={top100Films}
                      getOptionLabel={(option) => option.title}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="filterSelectedOptions"
                          placeholder="Favorites"
                        />
                      )}
                    /> */}
                    <Autocomplete
                      multiple
                      options={props.recUser}
                      disableClearable
                      filterSelectedOptions
                      getOptionLabel={(option) => option.name}
                      onChange={(event, value) => {
                        const selectedIds =  value.map(option => option.recruiterId);
                        props.setValue("assignRecruitersList",selectedIds)
                        props.setReqOrgRecId(selectedIds);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          {...props.register("assignRecruitersList")}
                          variant="outlined"
                          name="assignRecruitersList"
                          label="Org Recruiter"
                          className={classes.MultiSelectRec}
                          error={props.errors.assignRecruitersList ? true : false}
                        />
                      )}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.assignRecruitersList?.message}
                    </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <InputLabel shrink htmlFor="requirementName">
                    Requirement Name
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      size="small"
                      InputProps={{ disableUnderline: true }}
                      classes={{ root: classes.customTextField }}
                      placeholder="Enter Requirement Name"
                      id="requirementName"
                      name="requirementName"
                      {...props.register("requirementName")}
                      error={props.errors.requirementName ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.requirementName?.message}
                    </Typography>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <InputLabel shrink htmlFor="jobLocation">
                    Job Location
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      size="small"
                      InputProps={{ disableUnderline: true }}
                      classes={{ root: classes.customTextField }}
                      placeholder="Enter Job Location"
                      id="jobLocation"
                      name="jobLocation"
                      {...props.register("jobLocation")}
                      error={props.errors.jobLocation ? true : false}
                    />
                    <Typography variant="inherit" color="error">
                      {props.errors.jobLocation?.message}
                    </Typography>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <InputLabel shrink htmlFor="skills">
                    Skill
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      size="small"
                      InputProps={{ disableUnderline: true }}
                      classes={{ root: classes.customTextField }}
                      placeholder="Enter Skill"
                      id="skills"
                      name="skills"
                      {...props.register("skills")}
                      error={props.errors.skills ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.skills?.message}
                    </Typography>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <InputLabel shrink htmlFor="experience">
                    Experience
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      size="small"
                      InputProps={{ disableUnderline: true }}
                      classes={{ root: classes.customTextField }}
                      placeholder="Enter Experience"
                      id="experience"
                      name="experience"
                      {...props.register("experience")}
                      error={props.errors.experience ? true : false}
                    />
                    <Typography variant="inherit" color="error">
                      {props.errors.experience?.message}
                    </Typography>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl className={classes.margin}>
                    <InputLabel shrink htmlFor="work">
                      Mode of work
                    </InputLabel>

                    <Select
                      name="work"
                      defaultValue={props.modeofWork}
                      classes={{
                        root: classes.customSelectField,
                        icon: classes.customSelectIcon,
                      }}
                      {...props.register("work", {
                        onChange: (e) => {
                          props.setModeofWork(e.target.value);
                        },
                      })}
                      error={props.errors.work ? true : false}
                      disableUnderline
                    >
                      <MenuItem value="Work from Office">
                        Work from Office
                      </MenuItem>
                      <MenuItem value="Work from Home">Work from Home</MenuItem>
                      <MenuItem value="Hybrid"> Hybrid </MenuItem>
                      <MenuItem value="Onsite"> Onsite </MenuItem>
                    </Select>

                    <Typography variant="inherit" color="error">
                      {props.errors.work?.message}
                    </Typography>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl className={classes.margin}>
                    <InputLabel shrink htmlFor="hiring">
                      Special hiring
                    </InputLabel>

                    <Select
                      name="hiring"
                      defaultValue={props.specialHiring}
                      classes={{
                        root: classes.customSelectField,
                        icon: classes.customSelectIcon,
                      }}
                      {...props.register("hiring", {
                        onChange: (e) => {
                          props.setSpecialHiring(e.target.value);
                        },
                      })}
                      error={props.errors.work ? true : false}
                      disableUnderline
                    >
                      <MenuItem value="Diversity">Diversity</MenuItem>
                      <MenuItem value="Returnership">Returnership</MenuItem>
                      <MenuItem value="Vetrans"> Vetrans </MenuItem>
                      <MenuItem value="PWD (Person With Disability)">
                        PWD (Person With Disability)
                      </MenuItem>
                      <MenuItem value="LGBTQ"> LGBTQ </MenuItem>
                    </Select>

                    <Typography variant="inherit" color="error">
                      {props.errors.hiring?.message}
                    </Typography>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={3} md={6} lg={6}>
                  <InputLabel shrink htmlFor="hideFromInternal">
                    Hide to Internal
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <Switch
                      checked={props.hideFromInternal}
                      color="primary"
                      id="hideFromInternal"
                      name="hideFromInternal"
                      {...props.register("hideFromInternal", {
                        onChange: (e) => {
                          props.setHideFromInternal(e.target.checked);
                        },
                      })}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <Typography variant="inherit" color="error">
                      {props.errors.hideFromInternal?.message}
                    </Typography>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={3} md={6} lg={6}>
                  <InputLabel shrink htmlFor="jd">
                    Upload JD
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <div
                      className={classes.space + " " + classes.alignItemsEnd}
                    >
                      <div className={classes.marginTop}>
                        <input
                          accept=".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className={classes.input}
                          id="icon-button-jd"
                          type="file"
                          style={{ display: "none" }}
                          onChange={props.handleUploadChange}
                        />
                        <label htmlFor="icon-button-jd">
                          <Button
                            variant="contained"
                            className={classes.button}
                            color="primary"
                            startIcon={<DescriptionIcon />}
                            aria-label="upload JD"
                            component="span"
                          >
                            Upload JD
                          </Button>
                        </label>
                      </div>

                      {props.file?.name ? (
                        <Tooltip
                          title="Delete JD"
                          placement="bottom"
                          aria-label="delete"
                        >
                          <DeleteIcon
                            className={classes.toolIconDelete}
                            onClick={(e) => {
                              props.setFile([]);
                            }}
                          />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                    </div>
                  </FormControl>
                  <Grid
                    container
                    direction="row"
                    className={classes.left + " " + classes.button}
                  >
                    <Typography variant="inherit" className={classes.lineBreak}>
                      {props.file?.name}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <InputLabel shrink htmlFor="gist">
                    Requirement Gist
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    {/* <TextField
                         multiline
                          size="small"
                          rows={5}
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          placeholder="Enter Requirement Gist"
                          id="gist"
                          name="gist"
                          {...register("gist")}
                          error={errors.gist ? true : false}
                        /> */}

                    <JoditEditor
                      tabIndex={1} // tabIndex of textarea
                      ref={props.ContentRef}
                      value={props.ContentRef.current ? props.ContentRef.current.value : ''}
                      onChange={newContent => {
                        props.setValue("gist", newContent); // For updating the value on every change
                      }}
                    />

                    <Typography variant="inherit" color="error">
                      {props.errors.gist?.message}
                    </Typography>
                  </FormControl>
                </Grid>
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
  );
}

export default AddRequirements;
