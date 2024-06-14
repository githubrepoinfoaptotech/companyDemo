import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  List,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  Switch
} from "@material-ui/core";
import useStyles from "../../themes/style.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import Tooltip from "@material-ui/core/Tooltip";
// import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
// import GetAppIcon from "@material-ui/icons/GetApp";
import DescriptionIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageIcon from '@material-ui/icons/Image';
import CustomPdfView from "../pdfViewer/CustomPdfView.js";
import { getFileExtension } from "../../utils/getextension.js";

export default function Edit(props) {

  const maxDate = moment().format("YYYY-MM-DD");
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const [sourceEdit, setEditSource] = useState([]);
  const [display, setDisplay] = useState(false);
  const [fileName, setFileName] = useState();
  const [assessmentFile, setAssessmentFile] = useState();
  const [docFileName, setDocFileName] = useState();
  const [profileFileName, setProfileFileName] = useState();

  const dob = props.candidatesEdit?.dob != null || undefined ? props.candidatesEdit?.dob?.split("-") : ["00", "00", "00"];
  const days = dob[0];
  const months = dob[1];
  const years = dob[2];

  function handleChange(event) {
    setFileName(event.target.name);
    props.setFile(event.target.files[0]);
  }

  function handleDocUploadChange(event) {
    setDocFileName(event.target.name);
    props.setDocFile(event.target.files[0]);
  }

  function handleProfileChange(event) {
    setProfileFileName(event.target.name);
    props.setProfile(event.target.files[0]);
  }

  function handleAssesment(event) {
    setAssessmentFile(event.target.name);
    props.setAssessment(event.target.files[0]);
  }

  const [assessmentOpen, setAssessmentOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalContentType, setModalContentType] = React.useState(null);

  const resumeExtension = props.candidatesEdit?.resume ? getFileExtension(props.candidatesEdit.resume) : null;
  const documentExtension = props.candidatesEdit?.document ? getFileExtension(props.candidatesEdit.document) : null;

  const handleAssessmentClose = () => {
    setAssessmentOpen(false);
  };

  const handleAssessmentOpen = () => {
    setAssessmentOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = (contentType, contentUrl) => {
    setModalContentType(contentType);
    setModalOpen(true);
  };

  useEffect(() => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}source/viewSourcesEditList`,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setEditSource(response.data.data);
      }
    });

  }, [token]);

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
                <Typography variant="subtitle1"> Edit Candidate </Typography>

                <Grid className={classes.drawerClose}>
                  <CloseIcon
                    className={classes.closeBtn}
                    size="14px"
                    onClick={props.toggleDrawer("right", false)}
                  />
                </Grid>
              </Grid>
            </CardHeader>

            <form onSubmit={props.editSubmit(props.handleEdit)}>
              <CardContent>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  className={
                    display === false
                      ? classes.scrollContainermd
                      : classes.scrollContainerlg
                  }
                >
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <InputLabel shrink htmlFor="requirementName">
                      Requirement Name
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        disabled
                        InputProps={{ disableUnderline: true }}
                        classes={{ root: classes.customTextField }}
                        size="small"
                        placeholder="Enter Requirement Name"
                        readOnly
                        id="requirementName"
                        name="requirementName"
                        defaultValue={props.candidatesEdit.requirementName}
                        {...props.editCandidates("requirementName")}
                        error={props.editErrors.requirementName ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {props.editErrors.requirementName?.message}
                      </Typography>
                    </FormControl>
                  </Grid>


                  {decode.role !== "SUBVENDOR" && decode.role !== "FREELANCER" ?

                    <Grid item xs={12} sm={6} md={3} lg={3}>
                      <InputLabel shrink htmlFor="source">
                        Source
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <Select
                          name="source"
                          defaultValue={props.candidatesEdit.source}
                          onChange={(e) => {
                            props.setCandidatesEdit({
                              ...props.candidatesEdit,
                              source: e.target.value,
                            });
                          }}
                          {...props.editCandidates("source")}
                          error={props.editErrors.source ? true : false}
                          classes={{
                            root: classes.customSelectField,
                            icon: classes.customSelectIcon,
                          }}
                          disableUnderline
                        >
                          {sourceEdit.map((item, index) => {
                            return [
                              <MenuItem value={item.id}>{item.name}</MenuItem>,
                            ];
                          })}
                        </Select>

                        <Typography variant="inherit" color="error">
                          {props.editErrors.source?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                    : ""}

                  {props.show === true ?
                    <>
                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="mobile">
                          Contact Number
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            disabled
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Contact Number"
                            readOnly="true"
                            id="mobile"
                            name="mobile"
                            defaultValue={props.candidatesEdit.mobile}
                            {...props.editCandidates("mobile")}
                            error={props.editErrors.mobile ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.mobile?.message}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="alternateMobile">
                          Alternate Contact Number
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Alternate Contact Number"
                            readOnly="true"
                            id="alternateMobile"
                            name="alternateMobile"
                            defaultValue={props.candidatesEdit.alternateMobile}
                            {...props.editCandidates("alternateMobile", {
                              onChange: (e) => {
                                if (e.target.value.length > 0) {
                                  props.setPhoneValidation(true);
                                } else {
                                  props.setPhoneValidation(false);
                                }

                              }
                            }
                            )}
                            error={props.editErrors.alternateMobile ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.alternateMobile?.message}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="email">
                          Email ID
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Email ID"
                            readOnly="true"
                            id="email"
                            name="email"
                            defaultValue={props.candidatesEdit.email}
                            {...props.editCandidates("email")}
                            error={props.editErrors.email ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.email?.message}
                          </Typography>
                        </FormControl>
                      </Grid>

                    </>
                    : ""}


                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <InputLabel shrink htmlFor="firstName">
                      First Name
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        InputProps={{ disableUnderline: true }}
                        classes={{ root: classes.customTextField }}
                        size="small"
                        placeholder="Enter First Name"
                        id="firstName"
                        name="fisrtName"
                        defaultValue={props.candidatesEdit.firstName}
                        {...props.editCandidates("firstName")}
                        error={props.editErrors.firstName ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {props.editErrors.firstName?.message}
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <InputLabel shrink htmlFor="lastName">
                      Last Name
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        InputProps={{ disableUnderline: true }}
                        classes={{ root: classes.customTextField }}
                        size="small"
                        placeholder="Enter Last Name"
                        id="lastName"
                        name="lastName"
                        defaultValue={props.candidatesEdit.lastName}
                        {...props.editCandidates("lastName")}
                        error={props.editErrors.lastName ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {props.editErrors.lastName?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <InputLabel shrink htmlFor="skills">
                      Skill
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        InputProps={{ disableUnderline: true }}
                        classes={{ root: classes.customTextField }}
                        size="small"
                        placeholder="Enter Skill"
                        id="skills"
                        name="skills"
                        defaultValue={props.candidatesEdit.skills}
                        {...props.editCandidates("skills")}
                        error={props.editErrors.skills ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {props.editErrors.skills?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <InputLabel shrink htmlFor="gender">
                      Gender
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <Select
                        name="gender"
                        defaultValue={props.candidatesEdit.gender}
                        onChange={(e) => {
                          props.setCandidatesEdit({
                            ...props.candidatesEdit,
                            gender: e.target.value,
                          });
                        }}
                        {...props.editCandidates("gender")}
                        error={props.editErrors.gender ? true : false}
                        classes={{
                          root: classes.customSelectField,
                          icon: classes.customSelectIcon,
                        }}
                        disableUnderline
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Transgender">Transgender</MenuItem>
                        <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>

                      </Select>

                      <Typography variant="inherit" color="error">
                        {props.editErrors.gender?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <InputLabel shrink htmlFor="dob">
                      DOB
                    </InputLabel>
                    <FormControl
                      className={classes.dateSelect}
                    >
                      <select
                        defaultValue={days}
                        {...props.editCandidates("day")}
                        onChange={(e) => { props.setDay(e.target.value); }}
                        className={classes.selectDrop}
                      >
                        <option value="">DD</option>
                        {props.days.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <select
                        defaultValue={months}
                        {...props.editCandidates("month")}
                        onChange={(e) => { props.setMonth(e.target.value); }}
                        className={classes.selectDrop}
                      >
                        <option value="">MM</option>
                        {props.months.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <select
                        defaultValue={years}
                        {...props.editCandidates("year")}
                        onChange={(e) => { props.setYear(e.target.value); }}
                        className={classes.selectDrop}
                      >
                        <option value="">YYYY</option>
                        {props.years.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>


                    </FormControl>
                    <Typography variant="inherit" color="error">
                      {props.editErrors.date?.message &&
                        props.editErrors.month?.message &&
                        props.editErrors.year?.message}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} sm={6} md={3} lg={3}>
                    <InputLabel shrink htmlFor="resume">
                      Upload Resume
                    </InputLabel>
                    <FormControl className={classes.margin}>

                      <div className={classes.space + " " + classes.alignItemsEnd} style={{ flexWrap: 'wrap' }}>

                        <div className={classes.marginTop}>
                          <input
                            accept=".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            className={classes.input}
                            id="icon-button-file"
                            type="file"
                            style={{ display: "none" }}
                            value={fileName}
                            onChange={handleChange}
                          />
                          <label htmlFor="icon-button-file">
                            <Button
                              variant="contained"
                              className={classes.button}
                              color="primary"
                              startIcon={<DescriptionIcon />}
                              aria-label="upload picture"
                              component="span"
                            >
                              Upload Resume
                            </Button>
                          </label>
                        </div>
                        {props.candidatesEdit?.resume !== "https://liverefo.s3.amazonaws.com/" && props.candidatesEdit?.resume !== "" ?
                          <div style={{ display: 'flex', gap: "5px" }}>
                            <Tooltip
                              title="View Resume"
                              placement="bottom"
                              aria-label="view"
                            >
                              <DescriptionIcon
                                className={classes.toolIcon}
                                onClick={() => handleModalOpen('resume', props.candidatesEdit?.resume)}
                              />
                            </Tooltip>
                            {props.file?.name || props.candidatesEdit?.resume ?
                              <Tooltip title="Delete Resume" placement="bottom" aria-label="delete" >
                                <DeleteIcon className={classes.toolIconDelete} onClick={(e) => {
                                  props.setFile([]); setFileName();
                                  props.setCandidatesEdit({
                                    ...props.candidatesEdit,
                                    resume: "",
                                  });
                                }} />
                              </Tooltip>
                              : ""}

                          </div> : ""}
                      </div>
                    </FormControl>
                    <Grid container direction="row" className={classes.left + " " + classes.button} >
                      {props.file?.name &&
                        <Typography variant="inherit" className={classes.lineBreak}>  {props.file?.name?.substring(0, 15) + "..."}   </Typography>
                      }
                    </Grid>
                  </Grid>

                  {decode.companyType === "COMPANY" ?
                    <>
                      <Grid item xs={6} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="document">
                          Upload Document
                        </InputLabel>
                        <FormControl className={classes.margin}>

                          <div className={classes.space + " " + classes.alignItemsEnd} style={{ flexWrap: 'wrap' }}>
                            <div className={classes.marginTop}>
                              <input
                                accept=".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                className={classes.input}
                                id="icon-button-doc-file"
                                type="file"
                                value={docFileName}
                                style={{ display: "none" }}
                                onChange={handleDocUploadChange}
                              />
                              <label htmlFor="icon-button-doc-file">
                                <Button

                                  variant="contained"
                                  className={classes.button}
                                  color="primary"
                                  startIcon={<DescriptionIcon />}
                                  aria-label="upload picture"
                                  component="span"
                                >
                                  Upload Document
                                </Button>
                              </label>
                            </div>
                            {props.candidatesEdit?.document !== "https://liverefo.s3.amazonaws.com/" && props.candidatesEdit?.document !== "" ?
                              <div style={{ display: 'flex', gap: "5px" }}>
                                <Tooltip
                                  title="View document"
                                  placement="bottom"
                                  aria-label="view"
                                >
                                  <DescriptionIcon
                                    className={classes.toolIcon}
                                    onClick={() => handleModalOpen('document', props.candidatesEdit?.document)}
                                  />
                                </Tooltip>
                                {props.docFile?.name || props.candidatesEdit?.document ?
                                  <Tooltip title="Delete document" placement="bottom" aria-label="delete" >
                                    <DeleteIcon className={classes.toolIconDelete} onClick={(e) => {
                                      props.setDocFile([]); setDocFileName();
                                      props.setCandidatesEdit({
                                        ...props.candidatesEdit,
                                        document: "",
                                      });
                                    }} />
                                  </Tooltip>

                                  : ""}

                              </div> : ""}
                          </div>
                        </FormControl>
                        <Grid container direction="row" className={classes.left + " " + classes.button} >
                          {props.docFile?.name &&
                            <Typography variant="inherit" className={classes.lineBreak}   > {props.docFile?.name.substring(0, 15) + "..."}  </Typography>
                          }
                        </Grid>
                      </Grid>
                      <Grid item xs={6} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="photo">
                          Upload Photograph
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <div className={classes.space + " " + classes.alignItemsEnd} style={{ flexWrap: 'wrap' }}>
                            <div className={classes.marginTop}>
                              <input
                                accept=".jpg,.jpeg,.png"
                                className={classes.input}
                                id="icon-button-profile"
                                type="file"
                                value={profileFileName}
                                style={{ display: "none" }}
                                onChange={handleProfileChange}

                              />
                              <label htmlFor="icon-button-profile">
                                <Button
                                  variant="contained"
                                  className={classes.button}
                                  color="primary"
                                  startIcon={<ImageIcon />}
                                  aria-label="upload picture"
                                  component="span"
                                >
                                  Upload Photograph
                                </Button>
                              </label>
                            </div>
                            {props.candidatesEdit?.photo !== "https://liverefo.s3.amazonaws.com/" && props.candidatesEdit?.photo !== "" ?
                              <div style={{ display: 'flex', gap: "5px" }}>
                                <Tooltip
                                  title="View Profile"
                                  placement="bottom"
                                  aria-label="view"
                                >
                                  <ImageIcon
                                    className={classes.toolIcon}
                                    onClick={() => handleModalOpen('photo', props.candidatesEdit?.photo)}
                                  />
                                </Tooltip>
                                {props.profile?.name || props.candidatesEdit?.photo ?
                                  <Tooltip title="Delete Profile" placement="bottom" aria-label="delete" >
                                    <DeleteIcon className={classes.toolIconDelete} onClick={(e) => {
                                      props.setProfile([]); setProfileFileName();
                                      props.setCandidatesEdit({
                                        ...props.candidatesEdit,
                                        photo: "",
                                      });
                                    }} />
                                  </Tooltip>

                                  : ""}

                              </div> : ""}
                          </div>
                        </FormControl>
                        <Grid container direction="row" className={classes.left + " " + classes.button}>
                          {props.profile?.name &&
                            <Typography variant="inherit" className={classes.lineBreak}   > {props.profile?.name.substring(0, 15) + "..."}  </Typography>
                          }
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="panNumber">
                          PAN Card
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter PAN Card Details"
                            id="panNumber"
                            name="panNumber"
                            defaultValue={props.candidatesEdit.panNumber}
                            {...props.editCandidates("panNumber")}
                            error={props.editErrors.panNumber ? true : false}
                          />
                          <Typography variant="inherit" color="error">
                            {props.editErrors.panNumber?.message}
                          </Typography>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="linkedInProfile">
                          LinkedIn Profile URL
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Your LinkedIn Profile URL"
                            id="linkedInProfile"
                            name="linkedInProfile"
                            defaultValue={props.candidatesEdit.linkedInProfile}
                            {...props.editCandidates("linkedInProfile")}
                            error={props.editErrors.linkedInProfile ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.linkedInProfile?.message}
                          </Typography>
                        </FormControl>
                      </Grid>
                    </>
                    :
                    props.show === true ?
                      <>
                        <Grid item xs={6} sm={6} md={3} lg={3}>
                          <InputLabel shrink htmlFor="skills">
                            Hide Contact Detail
                          </InputLabel>
                          <FormControl className={classes.margin}>

                            <Switch
                              checked={props.candidatesEdit.hideContactDetails}
                              onChange={(e) => {
                                props.setCandidatesEdit({
                                  ...props.candidatesEdit,
                                  hideContactDetails: e.target.checked,
                                });

                              }}
                              color="primary"
                              inputProps={{ "aria-label": "primary checkbox" }}
                            />

                          </FormControl>
                        </Grid>
                      </> : ""
                  }

                  {props.candidatesEdit.joinedDate !== null && decode.role !== "SUBVENDOR" && decode.role !== "FREELANCER" ? (
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                      <InputLabel shrink htmlFor="joinedDate">
                        Joined Date
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          type="date"
                          inputProps={{ max: maxDate }}
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          id="joinedDate"
                          name="joinedDate"
                          defaultValue={moment(
                            props.candidatesEdit.joinedDate,
                          ).format("YYYY-MM-DD")}

                          {...props.editCandidates("joinedDate")}
                          error={props.editErrors.joinedDate ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {props.editErrors.joinedDate?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                  ) : (
                    ""
                  )}

                  {decode.role === "ADMIN" ? (
                    props.candidatesEdit.invoiceValue !== 0 ? (
                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="invoicedDate">
                          Invoice Date
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            type="date"
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            id="invoicedDate"
                            name="invoicedDate"
                            defaultValue={moment(
                              props.candidatesEdit.invoicedDate,
                            ).format("YYYY-MM-DD")}
                            {...props.editCandidates("invoicedDate")}
                            error={props.editErrors.invoicedDate ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.invoicedDate?.message}
                          </Typography>
                        </FormControl>
                      </Grid>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}

                  {decode.role === "ADMIN" ? (
                    props.candidatesEdit.invoiceValue !== 0 ? (
                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="invoicedValue">
                          Invoice Value
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Invoice Value"
                            id="invoicedValue"
                            name="invoicedValue"
                            defaultValue={props.candidatesEdit.invoiceValue}
                            {...props.editCandidates("invoicedValue")}
                            error={
                              props.editErrors.invoicedValue ? true : false
                            }
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.invoicedValue?.message}
                          </Typography>
                        </FormControl>
                      </Grid>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}

                  <Grid item xs={12} className={classes.drawerClose}>

                    {display === false ? (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={(e) => {
                          setDisplay(true);
                        }}
                        className={classes.margin + " " + classes.addUser}
                        color="primary"
                        startIcon={<AddCircleIcon />}
                      >
                        More
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={(e) => {
                          setDisplay(false);
                        }}
                        className={classes.margin}
                        startIcon={<IndeterminateCheckBoxIcon />}
                      >
                        Less
                      </Button>
                    )}
                  </Grid>

                  {display === true ? (
                    <>
                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="currentCompanyName">
                          Current Company Name
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Current Company Name"
                            id="currentCompanyName"
                            name="currentCompanyName"
                            defaultValue={props.candidatesEdit.currentCompanyName}
                            {...props.editCandidates("currentCompanyName")}
                            error={props.editErrors.currentCompanyName ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.currentCompanyName?.message}
                          </Typography>
                        </FormControl>
                      </Grid>


                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="native">
                          Native Location
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Native Location"
                            id="native"
                            name="native"
                            defaultValue={props.candidatesEdit.nativeLocation}
                            {...props.editCandidates("native")}
                            error={props.editErrors.native ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.native?.message}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="location">
                          Current Location
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Current Location"
                            id="location"
                            name="location"
                            defaultValue={props.candidatesEdit.currentLocation}
                            {...props.editCandidates("location")}
                            error={props.editErrors.location ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.location?.message}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="preferredLocation">
                          Preferred Location
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Preferred Location"
                            id="preferredLocation"
                            name="preferredLocation"
                            defaultValue={
                              props.candidatesEdit.preferredLocation
                            }
                            {...props.editCandidates("preferredLocation")}
                            error={props.editErrors.location ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.preferredLocation?.message}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="experience">
                          Total Years of Experience
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            type="number"
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Total Years of Experience"
                            id="experience"
                            name="experience"
                            defaultValue={props.candidatesEdit.experience}
                            {...props.editCandidates("experience")}
                            error={props.editErrors.experience ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.experience?.message}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="relevantExperience">
                          Relevant Experience
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            type="number"
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Relevant Experience"
                            id="relevantExperience"
                            name="relevantExperience"
                            defaultValue={props.candidatesEdit.relevantExperience}
                            {...props.editCandidates("relevantExperience")}
                            error={props.editErrors.relevantExperience ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.relevantExperience?.message}
                          </Typography>
                        </FormControl>
                      </Grid>


                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="educationalQualification">

                          Educational Qualification
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Education"
                            id="educationalQualification"
                            name="educationalQualification"
                            defaultValue={
                              props.candidatesEdit.educationalQualification
                            }
                            {...props.editCandidates(
                              "educationalQualification",
                            )}
                            error={
                              props.editErrors.educationalQualification
                                ? true
                                : false
                            }
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.educationalQualification?.message}
                          </Typography>
                        </FormControl>
                      </Grid>



                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="differentlyAbled">

                          Differently Abled
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <Select
                            name="differentlyAbled"
                            defaultValue={props.candidatesEdit.differentlyAbled}
                            onChange={(e) => {
                              props.setCandidatesEdit({
                                ...props.candidatesEdit,
                                differentlyAbled: e.target.value,
                              });
                            }}
                            {...props.editCandidates("differentlyAbled")}
                            error={
                              props.editErrors.differentlyAbled ? true : false
                            }
                            classes={{
                              root: classes.customSelectField,
                              icon: classes.customSelectIcon,
                            }}
                            disableUnderline
                          >
                            <MenuItem value="YES">Yes</MenuItem>
                            <MenuItem value="NO">No</MenuItem>
                          </Select>

                          <Typography variant="inherit" color="error">
                            {props.editErrors.differentlyAbled?.message}
                          </Typography>
                        </FormControl>
                      </Grid>

                      {decode.companyType !== "COMPANY" &&
                        <>
                          <Grid item xs={12} sm={6} md={5} lg={5}>
                            <InputLabel shrink htmlFor="candidateRecruiterDiscussionRecording">

                              Candidate Recruiter discussion recording
                            </InputLabel>
                            <FormControl className={classes.margin}>
                              <TextField

                                InputProps={{ disableUnderline: true }}
                                classes={{ root: classes.customTextField }}
                                size="small"
                                placeholder="Enter Candidate Recruiter discussion recording"
                                id="candidateRecruiterDiscussionRecording"
                                name="candidateRecruiterDiscussionRecording"
                                defaultValue={props.candidatesEdit.candidateRecruiterDiscussionRecording}
                                {...props.editCandidates("candidateRecruiterDiscussionRecording")}
                                error={props.editErrors.candidateRecruiterDiscussionRecording ? true : false}
                              />

                              <Typography variant="inherit" color="error">
                                {props.editErrors.candidateRecruiterDiscussionRecording?.message}
                              </Typography>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel shrink htmlFor="candidateSkillExplanationRecording">

                              Candidate Skill Explanation Recording
                            </InputLabel>
                            <FormControl className={classes.margin}>
                              <TextField

                                InputProps={{ disableUnderline: true }}
                                classes={{ root: classes.customTextField }}
                                size="small"
                                placeholder="Enter Candidate Skill Explanation Recording"
                                id="candidateSkillExplanationRecording"
                                name="candidateSkillExplanationRecording"
                                defaultValue={props.candidatesEdit.candidateSkillExplanationRecording}
                                {...props.editCandidates("candidateSkillExplanationRecording")}
                                error={props.editErrors.candidateSkillExplanationRecording ? true : false}
                              />

                              <Typography variant="inherit" color="error">
                                {props.editErrors.candidateSkillExplanationRecording?.message}
                              </Typography>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={4}>
                            <InputLabel shrink htmlFor="candidateMindsetAssessmentLink">
                              Candidate MindSet Assessment
                            </InputLabel>
                            <FormControl className={classes.margin}>

                              <div className={classes.space + " " + classes.alignItemsEnd}  >

                                <div className={classes.marginTop}>
                                  <input
                                    accept=".png,.jpg,.jpeg"
                                    className={classes.input}
                                    id="icon-button-assessment"
                                    type="file"
                                    value={assessmentFile}
                                    style={{ display: "none" }}
                                    onChange={handleAssesment}

                                  />
                                  <label htmlFor="icon-button-assessment">


                                    <Button
                                      variant="contained"
                                      className={classes.button}
                                      color="primary"
                                      startIcon={<ImageIcon />}
                                      aria-label="upload assessment"
                                      component="span"
                                    >
                                      Candidate MindSet Assessment
                                    </Button>

                                  </label>
                                </div>


                                {props.candidatesEdit?.candidateMindsetAssessmentLink !== "https://liverefo.s3.amazonaws.com/" && props.candidatesEdit?.candidateMindsetAssessmentLink !== "" ? <>
                                  <Tooltip
                                    title="View Candidate MindSet Assessment"
                                    placement="bottom"
                                    aria-label="view"
                                  >
                                    <ImageIcon
                                      className={classes.toolIcon}
                                      onClick={handleAssessmentOpen}
                                    />
                                  </Tooltip>
                                  {/* <Tooltip
                                title="Downlaod Resume"
                                placement="bottom"
                                aria-label="downlaod"
                              >
                                <a  className={classes.messageContent} href={props.candidatesEdit?.resume} download>
                                  
                                  <GetAppIcon className={classes.toolIcon} />
                                </a>
                              </Tooltip> */}

                                  {props.assessment?.name || props.candidatesEdit?.candidateMindsetAssessmentLink ?
                                    <Tooltip title="Delete Resume" placement="bottom" aria-label="delete" >
                                      <DeleteIcon className={classes.toolIconDelete} onClick={(e) => {
                                        props.setAssessment([]); setAssessmentFile();
                                        props.setCandidatesEdit({
                                          ...props.candidatesEdit,
                                          candidateMindsetAssessmentLink: "",
                                        });
                                      }} />
                                    </Tooltip>

                                    : ""}

                                </> : ""}
                              </div>
                            </FormControl>
                            <Grid container direction="row" className={classes.left + " " + classes.button} >
                              <Typography variant="inherit" className={classes.lineBreak}   > {props.assessment?.name}  </Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={8}>
                            <InputLabel shrink htmlFor="candidateAndTechPannelDiscussionRecording">

                              Candidate & Tech Panel discussion recording
                            </InputLabel>
                            <FormControl className={classes.margin}>
                              <TextField

                                InputProps={{ disableUnderline: true }}
                                classes={{ root: classes.customTextField }}
                                size="small"
                                placeholder="Enter Candidate & Tech Panel discussion recording"
                                id="candidateAndTechPannelDiscussionRecording"
                                name="candidateAndTechPannelDiscussionRecording"
                                defaultValue={props.candidatesEdit.candidateAndTechPannelDiscussionRecording}
                                {...props.editCandidates("candidateAndTechPannelDiscussionRecording")}
                                error={props.editErrors.candidateAndTechPannelDiscussionRecording ? true : false}
                              />

                              <Typography variant="inherit" color="error">
                                {props.editErrors.candidateAndTechPannelDiscussionRecording?.message}
                              </Typography>
                            </FormControl>
                          </Grid>
                        </>
                      }

                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="currentCtc">

                          Current CTC
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            type="number"
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Current CTC"
                            id="currentCtc"
                            name="currentCtc"
                            defaultValue={props.candidatesEdit.currentCtc}
                            {...props.editCandidates("currentCtc")}
                            error={props.editErrors.currentCtc ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.currentCtc?.message}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="expectedCtc">

                          Expected CTC
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            type="number"
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Educational Qualification"
                            id="expectedCtc"
                            name="expectedCtc"
                            defaultValue={props.candidatesEdit.expectedCtc}
                            {...props.editCandidates("expectedCtc")}
                            error={props.editErrors.expectedCtc ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.expectedCtc?.message}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="noticePeriod">

                          Notice Period
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Notice Period"
                            id="noticePeriod"
                            name="noticePeriod"
                            defaultValue={props.candidatesEdit.noticePeriod}
                            {...props.editCandidates("noticePeriod")}
                            error={props.editErrors.noticePeriod ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.noticePeriod?.message}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="candidateProcessed">

                          Candidate Attended (Call)
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <Select
                            name="candidateProcessed"
                            defaultValue={
                              props.candidatesEdit.candidateProcessed
                            }

                            {...props.editCandidates("candidateProcessed", {
                              onChange: (e) => {
                                props.setCandidatesEdit({
                                  ...props.candidatesEdit,
                                  candidateProcessed: e.target.value,
                                });
                              }
                            })}
                            error={
                              props.editErrors.candidateProcessed ? true : false
                            }
                            classes={{
                              root: classes.customSelectField,
                              icon: classes.customSelectIcon,
                            }}
                            disableUnderline
                          >
                            <MenuItem value="YES">Yes</MenuItem>
                            <MenuItem value="NO">No</MenuItem>
                          </Select>

                          <Typography variant="inherit" color="error">
                            {props.editErrors.candidateProcessed?.message}
                          </Typography>
                        </FormControl>
                      </Grid>


                      <Grid item xs={12} lg={6}>
                        <InputLabel shrink htmlFor="reasonForJobChange">

                          Reason for Job Change
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            multiline
                            rows={3}
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Reason for Job Change"
                            id="reasonForJobChange"
                            name="reasonForJobChange"
                            defaultValue={
                              props.candidatesEdit.reasonForJobChange
                            }
                            {...props.editCandidates("reasonForJobChange")}
                            error={
                              props.editErrors.reasonForJobChange ? true : false
                            }
                          />

                          <Typography variant="inherit" color="error">
                            {props.editErrors.reasonForJobChange?.message}
                          </Typography>
                        </FormControl>
                      </Grid>


                      {props.candidatesEdit.candidateProcessed === "NO" ?
                        <Grid item xs={12} lg={6}>
                          <InputLabel shrink htmlFor="reason">

                            Specify
                          </InputLabel>
                          <FormControl className={classes.margin}>
                            <TextField
                              multiline
                              rows={3}
                              InputProps={{ disableUnderline: true }}
                              classes={{ root: classes.customTextField }}
                              size="small"
                              placeholder="Enter Specify"
                              id="reason"
                              name="reason"
                              defaultValue={props.candidatesEdit.reason}
                              {...props.editCandidates("reason")}
                              error={props.editErrors.reason ? true : false}
                            />

                            <Typography variant="inherit" color="error">
                              {props.editErrors.reasonForJobChange?.message}
                            </Typography>
                          </FormControl>
                        </Grid>
                        : (
                          ""
                        )}
                    </>
                  ) : (
                    ""
                  )}


                </Grid>
              </CardContent>
              <CardActions>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  className={classes.scrollContainerfooter}
                >


                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    type="submit"
                  >
                    Update
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




          <Dialog
            aria-labelledby="dialog-title"
            onClose={handleModalClose}
            open={modalOpen}
            fullWidth={true}
            maxWidth="md"
            PaperProps={{
              style: {
                width: "100%",
              },
            }}
          >
            <DialogContent>
              <Grid container direction="row" spacing={2}>
                <div className={classes.heading + " " + classes.inputRoot} style={{ position: "absolute", zIndex: 1, background: '#fff', top: 0, padding: "6px 30px" }}>
                  <Typography variant="subtitle2" className={classes.inputRoot}>
                    {modalContentType === "resume" ? "Resume" : modalContentType === "document" ? "Document" : modalContentType === "photo" ? "Photograph" : ""}
                  </Typography>
                  <div className={classes.drawerClose}>
                    <CloseIcon className={classes.closeBtn} onClick={handleModalClose} />
                  </div>
                </div>
                <Grid item xs={12}>
                  {modalContentType === "resume" ?
                    (resumeExtension === "pdf" ?
                      <CustomPdfView resumeUrl={props.candidatesEdit?.resume} />
                      :
                      <div className={classes.iframediv}>
                        <iframe
                          src={
                            "https://docs.google.com/a/umd.edu/viewer?url=" +
                            props.candidatesEdit?.resume +
                            "&embedded=true"
                          }
                          title="File"
                          width="100%" height="500" sandbox="allow-scripts allow-same-origin"
                        >
                        </iframe>
                        <div className={classes.iframeLogo} >
                        </div>
                      </div>
                    )
                    : modalContentType === "document" ?
                      (documentExtension === "pdf" ?
                        <CustomPdfView resumeUrl={props.candidatesEdit?.document} />
                        :
                        <div className={classes.iframediv}>
                          <iframe
                            src={
                              "https://docs.google.com/a/umd.edu/viewer?url=" +
                              props.candidatesEdit?.document +
                              "&embedded=true"
                            }
                            title="File"
                            width="100%" height="500" sandbox="allow-scripts allow-same-origin"
                          >
                          </iframe>
                          <div className={classes.iframeLogo} >
                          </div>
                        </div>
                      )
                      : modalContentType === "photo" ?
                        <div className={classes.iframediv}>
                          <img style={{ width: "100%", height: "70vh", objectFit: "contain" }} src={props.candidatesEdit?.photo} width="100%" alt="photo-profile-url" />
                        </div>
                        :
                        <></>
                  }
                </Grid>
                <div className={classes.sendWhatsapp + " " + classes.inputRoot}>
                  <Button variant="contained" size="small" color="secondary" onClick={handleModalClose}>
                    Close
                  </Button>
                </div>
              </Grid>
            </DialogContent>
          </Dialog>


          <Dialog
            aria-labelledby="dialog-title"
            onClose={handleAssessmentClose}
            open={assessmentOpen}
            width="lg"
            maxWidth="lg"
            PaperProps={{
              style: {
                width: "100%",
              },
            }}
          >
            <DialogContent className={classes.center}>
              <Grid container direction="row" spacing={2}>
                <div className={classes.heading + " " + classes.inputRoot}>
                  <Typography variant="subtitle2" className={classes.inputRoot}>

                    Candidate MindSet Assessment
                  </Typography>
                  <div className={classes.drawerClose}>
                    <CloseIcon className={classes.closeBtn} onClick={handleAssessmentClose} />
                  </div>
                </div>
                <div className={classes.assessmentImgContainer}>
                  <img
                    className={classes.modalImg}
                    src={
                      props.candidatesEdit?.candidateMindsetAssessmentLink
                    }
                    alt="img"
                  />
                </div>
                <div className={classes.sendWhatsapp + " " + classes.inputRoot}>
                  <Button variant="contained" size="small" color="secondary" onClick={handleAssessmentClose}>
                    Close
                  </Button>
                </div>
              </Grid>
            </DialogContent>
          </Dialog>

        </List>
      </Box>
    </>
  );
}
