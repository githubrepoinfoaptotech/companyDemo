import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  List,
  Box,
  Tooltip,
  TextField,
  Dialog,
  DialogContent,
  RadioGroup,
  Radio,
  FormControlLabel,
  IconButton,
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  DialogTitle,
  Popover,
  Switch,
} from "@material-ui/core";
import { jwtDecode } from "jwt-decode";
import useStyles from "../../themes/style.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CloseIcon from "@material-ui/icons/Close";
import { Autocomplete } from "@material-ui/lab";
import WhatsappIcon from "@material-ui/icons/WhatsApp";
import axios from "axios";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import DescriptionIcon from '@material-ui/icons/Description';
import ImageIcon from '@material-ui/icons/Image';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Add(props) {

  const classes = useStyles();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const [display, setDisplay] = useState(false);
  const [fileName, setFileName] = useState();

  const [docFileName, setDocFileName] = useState();
  const [profileFileName, setProfileFileName] = useState();

  const [assessmentFile, setAssessmentFile] = useState();
  // const [extractCandDetail, setExtractDetail]= useState({
  //   candidate_email: "",
  //   candidate_mobile: ""
  // })
  function handleAssesment(event) {
    setAssessmentFile(event.target.name);
    props.setAssessment(event.target.files[0]);
  }


  function handleChange(event) {
    setFileName(event.target.name);
    props.setFile(event.target.files[0]);
    extractEmail(event.target.files[0])
  }

  function handleDocUploadChange(event) {
    setDocFileName(event.target.name);
    props.setDocFile(event.target.files[0]);
  }

  function handleProfileChange(event) {
    setProfileFileName(event.target.name);
    props.setProfile(event.target.files[0]);
  }
  const dob = props.candidate?.dob != null || undefined ? props.candidate?.dob?.split("-") : ["00", "00", "00"];
  const days = dob[0];
  const months = dob[1];
  const years = dob[2];
  const [disabled, setDisabled] = useState(props.requirementId !== "false" ? decode.role !== "SUBVENDOR" && decode.role !== "FREELANCER" ? true : false : false);

  const [hoverText, setHoverText] = React.useState({
    mobile: null,
    email: null
  });

  function extractEmail(resumeFile) {
    const formData = new FormData();
    formData.append('resume', resumeFile);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/extractInfo`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        const candidateExtractEmail = response.data.data.candidate_email
        const candidateExtractMobile = response.data.data.candidate_mobile
        props.setCandidate({
          ...props.candidate,
          email: candidateExtractEmail,
          mobile: candidateExtractMobile
        });
        props.setValue('email', candidateExtractEmail);
        props.setValue('mobile', candidateExtractMobile);
      }
    });
  }

  const handleHoverTextOpen = (event) => {
    setHoverText({
      ...hoverText,
      [event.target.name]: event.target
    });
  };

  const handleHoverTextClose = (event) => {
    setHoverText({
      ...hoverText,
      [event.target.name]: null
    });
  };


  const CheckEmail = (e) => {
    if (decode.role !== "SUBVENDOR" && decode.role !== "FREELANCER") {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}recruiter/checkCandidateDetailExist`,
        data: {
          mobile: e.target.value,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          props.setCandidate({
            email: response.data.data?.email,
            firstName: response.data.data?.firstName,
            lastName: response.data.data?.lastName,
            skills: response.data.data?.skills,
            experience: response.data.data?.experience,
            location: response.data.data?.currentLocation,
            dob: response.data.data?.dob,
            candidateProcessed: response.data.data?.candidateProcessed,
            native: response.data.data?.nativeLocation,
            preferredLocation: response.data.data?.preferredLocation,
            relevantExperience: response.data.data?.relevantExperience,
            educationalQualification:
              response.data.data?.educationalQualification,
            gender: response.data.data?.gender,
            differentlyAbled: response.data.data?.differentlyAbled,
            currentCtc: response.data.data?.currentCtc,
            expectedCtc: response.data.data?.expectedCtc,
            noticePeriod: response.data.data?.noticePeriod,
            reasonForJobChange: response.data.data?.reasonForJobChange,
            currentCompanyName: response.data.data?.currentCompanyName,
            reason: response.data.data?.reason,
            freeValue: decode.isEnableFree === true ? "YES" : decode.isEnablePaid === true ? "NO" : "YES",
          });


          var birth = response.data.data?.dob != null || undefined ? response.data.data?.dob?.split("-") : ["00", "00", "00"];
          var day = birth[0];
          var month = birth[1];
          var year = birth[2];


          props.reset({
            requirementId: props.recruitmentId,
            email: response.data.data?.email,
            firstName: response.data.data?.firstName,
            lastName: response.data.data?.lastName,
            skills: response.data.data?.skills,
            experience: response.data.data?.experience,
            location: response.data.data?.currentLocation,
            day: day,
            month: month,
            year: year,
            candidateProcessed: response.data.data?.candidateProcessed,
            native: response.data.data?.nativeLocation,
            preferredLocation: response.data.data?.preferredLocation,
            relevantExperience: response.data.data?.relevantExperience,
            educationalQualification:
              response.data.data?.educationalQualification,
            gender: response.data.data?.gender,
            differentlyAbled: response.data.data?.differentlyAbled,
            currentCtc: response.data.data?.currentCtc,
            expectedCtc: response.data.data?.expectedCtc,
            noticePeriod: response.data.data?.noticePeriod,
            reasonForJobChange: response.data.data?.reasonForJobChange,
            currentCompanyName: response.data.data?.currentCompanyName,
            reason: response.data.data?.reason,
            freeValue: decode.isEnableFree === true ? "YES" : decode.isEnablePaid === true ? "NO" : "YES",
          });
        }
      });
    }

  };

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
                <Typography variant="subtitle1"> Add New Candidate </Typography>

                <Grid className={classes.drawerClose}>
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
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  className={
                    display === false
                      ? props.recruitmentId !== ""
                        ? classes.scrollContainer
                        : classes.scrollContainermd
                      : classes.scrollContainerlg
                  }
                >

                  {props.requirementId !== "false" ?
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                      <FormControl className={classes.margin}>
                        <InputLabel shrink htmlFor="requirementId">
                          Select Requirement
                        </InputLabel>

                        {decode.companyType === "COMPANY" && decode.role === "CLIENTCOORDINATOR"
                          ?
                          <Autocomplete
                            options={props.requirement}
                            onChange={(e, value) => {
                              setDisabled(false);
                              props.setRecruitmentId(decode.role === "SUBVENDOR" || decode.role === "FREELANCER" ? value.requirementId : value.id);

                              props.reset({
                                requirementId: decode.role === "SUBVENDOR" || decode.role === "FREELANCER" ? value.requirementId : value.id,
                              });
                              props.setLoader(true);
                              var url = "";
                              if (decode.role === "SUBVENDOR" || decode.role === "FREELANCER") {
                                url = `${process.env.REACT_APP_SERVER}recruiter/getRequirement`;
                              } else {
                                url = `${process.env.REACT_APP_SERVER}CC/getRequirement`;
                              }
                              axios({
                                method: "post",
                                url: url,
                                data: {
                                  id: decode.role === "SUBVENDOR" || decode.role === "FREELANCER" ? value.requirementId : value.id,
                                },
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization: token,
                                },
                              }).then(function (response) {
                                if (response.data.status === true) {

                                  props.setLoader(false);
                                  props.setRecruitmentList({
                                    ...props.requirementList,
                                    id: response.data.data.id,
                                    requirementName: response.data.data.requirementName,
                                    clientId: response.data.data.clientId,
                                    skills: response.data.data.skills,
                                    orgRecruiterId: decode.companyType === "COMPANY" ? "" : response.data.data.orgRecruiter.id,
                                    orgRecruiterName: decode.companyType === "COMPANY" ? "" : response.data.data.orgRecruiter.name,
                                    jobLocation: response.data.data.jobLocation,
                                    experience: response.data.data.experience,
                                    clientUniqueId: response.data.data.client?.uniqueId,
                                    clientName: response.data.data.client?.clientName,
                                    status: response.data.data.statusList?.statusName,
                                    uniqueId: response.data.data.uniqueId,
                                  });
                                }
                              });
                            }}
                            getOptionLabel={(option) => decode.role === "SUBVENDOR" || decode.role === "FREELANCER" ? option.requirement?.requirementName + " (" + option.requirement?.uniqueId + ")" : option.requirementName + " (" + option.uniqueId + ")"}
                            disableClearable={true}
                            error={props.errors.requirementId ? true : false}
                            classes={{
                              popupIndicator: classes.autocompleteIndicator,
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="filled"
                                placeholder="Select Requirement"
                                name="requirementId"
                                className="requirement"
                              />
                            )}
                          />
                          :
                          <Autocomplete
                            options={props.requirement}
                            onChange={(e, value) => {
                              setDisabled(false);
                              props.setRecruitmentId(decode.role === "SUBVENDOR" || decode.role === "FREELANCER" ? value.requirementId : value.id);

                              props.reset({
                                requirementId: decode.role === "SUBVENDOR" || decode.role === "FREELANCER" ? value.requirementId : value.id,
                              });
                              props.setLoader(true);
                              var url = "";
                              if (decode.role === "SUBVENDOR" || decode.role === "FREELANCER") {
                                url = `${process.env.REACT_APP_SERVER}recruiter/getRequirement`;
                              } else {
                                url = `${process.env.REACT_APP_SERVER}CC/getRequirement`;
                              }
                              axios({
                                method: "post",
                                url: url,
                                data: {
                                  id: decode.role === "SUBVENDOR" || decode.role === "FREELANCER" ? value.requirementId : value.id,
                                },
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization: token,
                                },
                              }).then(function (response) {
                                if (response.data.status === true) {

                                  props.setLoader(false);
                                  props.setRecruitmentList({
                                    ...props.requirementList,
                                    id: response.data.data.id,
                                    requirementName: response.data.data.requirementName,
                                    clientId: response.data.data.clientId,
                                    skills: response.data.data.skills,
                                    orgRecruiterId: decode.companyType === "COMPANY" ? "" : response.data.data.orgRecruiter.id,
                                    orgRecruiterName: decode.companyType === "COMPANY" ? "" : response.data.data.orgRecruiter.name,
                                    jobLocation: response.data.data.jobLocation,
                                    experience: response.data.data.experience,
                                    clientUniqueId: response.data.data.client?.uniqueId,
                                    clientName: response.data.data.client?.clientName,
                                    status: response.data.data.statusList?.statusName,
                                    uniqueId: response.data.data.uniqueId,
                                  });
                                }
                              });
                            }}
                            getOptionLabel={(option) => decode.role === "SUBVENDOR" || decode.role === "FREELANCER" ? option.requirement?.requirementName + " (" + option.requirement?.uniqueId + ")" : option.requirementName + " (" + option.uniqueId + ")"}
                            disableClearable={true}
                            error={props.errors.requirementId ? true : false}
                            classes={{
                              popupIndicator: classes.autocompleteIndicator,
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="filled"
                                placeholder="Select Requirement"
                                name="requirementId"
                                className="requirement"
                              />
                            )}
                          />
                        }

                        <Typography variant="inherit" color="error">
                          {props.errors.requirementId?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                    : ""}


                  {decode.role !== "SUBVENDOR" && decode.role !== "FREELANCER" ?
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                      <InputLabel shrink htmlFor="source">
                        Source
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <Select

                          name="source"
                          defaultValue={props.candidate.source}
                          onChange={(e) => {
                            props.setCandidate({
                              ...props.candidate,
                              source: e.target.value,
                            });
                          }}
                          {...props.register("source")}
                          error={props.errors.source ? true : false}
                          classes={{
                            root: classes.customSelectField,
                            icon: classes.customSelectIcon,
                          }}
                          disableUnderline
                        >
                          {props.source.map((item, index) => {
                            return [
                              <MenuItem value={item.id}>{item.name}</MenuItem>,
                            ];
                          })}
                        </Select>

                        <Typography variant="inherit" color="error">
                          {props.errors.source?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                    : ""}

                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <InputLabel shrink htmlFor="mobile">   Contact Number   </InputLabel>

                    <FormControl className={classes.margin}>
                      <TextField
                        onMouseEnter={(e) => handleHoverTextOpen(e)}
                        onMouseLeave={(e) => handleHoverTextClose(e)}
                        type="number"
                        // disabled={disabled}
                        InputProps={{ disableUnderline: true }}
                        classes={{ root: classes.customTextField }}
                        size="small"
                        placeholder="Enter Contact Number"
                        id="mobile"
                        name="mobile"
                        {...props.register("mobile", {
                          onChange: (e) => {
                            props.setCandidate({
                              ...props.candidate,
                              mobile: e.target.value,
                            });
                          },
                          onBlur: (e) => {
                            props.ExistCheck(e);
                            CheckEmail(e);
                          },
                        })}
                        defaultValue={props.candidate.mobile}
                        value={props.candidate.mobile}
                        error={props.errors.mobile ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {props.errors.mobile?.message}
                      </Typography>
                    </FormControl>

                    {disabled === true ?
                      <Popover
                        className={classes.customTooltipBlack}
                        open={Boolean(hoverText.mobile)}
                        anchorEl={hoverText.mobile}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}

                      >
                        <Typography sx={{ p: 1 }} className={classes.customTooltipText}> Select Requirement</Typography>

                      </Popover>
                      : ""}
                  </Grid>

                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <InputLabel shrink htmlFor="alternateMobile">

                      Alternate Contact Number
                    </InputLabel>
                    <FormControl className={classes.margin}>
                      <TextField
                        type="number"

                        InputProps={{ disableUnderline: true }}
                        classes={{ root: classes.customTextField }}
                        size="small"
                        placeholder="Enter Alternate Contact Number"
                        id="alternateMobile"
                        name="alternateMobile"
                        {...props.register("alternateMobile", {
                          onChange: (e) => {
                            if (e.target.value.length > 0) {
                              props.setPhoneValidation(true);
                            } else {
                              props.setPhoneValidation(false);
                            }

                          }
                        })}
                        error={props.errors.alternateMobile ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {props.errors.alternateMobile?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <InputLabel shrink htmlFor="email">
                      Email ID
                    </InputLabel>
                    <FormControl className={classes.margin}>

                      <TextField
                        // disabled={disabled}
                        onMouseEnter={(e) => handleHoverTextOpen(e)}
                        onMouseLeave={(e) => handleHoverTextClose(e)}
                        InputProps={{ disableUnderline: true }}
                        classes={{ root: classes.customTextField }}
                        size="small"
                        placeholder="Enter Email ID"
                        id="email"
                        defaultValue={props.candidate.email}
                        value={props.candidate.email}
                        {...props.register("email", {

                          onChange: (e) => {
                            props.setCandidate({
                              ...props.candidate,
                              email: e.target.value,
                            });
                            props.ExistCheck(e);
                          },

                        })}
                        error={props.errors.email ? true : false}
                      />


                      {disabled === true ?
                        <Popover
                          className={classes.customTooltipBlack}
                          open={Boolean(hoverText.email)}
                          anchorEl={hoverText.email}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}

                        >
                          <Typography sx={{ p: 1 }} className={classes.customTooltipText}> Select Requirement</Typography>

                        </Popover>
                        : ""}

                      <Typography variant="inherit" color="error">
                        {props.errors.email?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

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
                        // value={props.candidate.firstName}
                        defaultValue={props.candidate.firstName}
                        {...props.register("firstName", {
                          onChange: (e) => {
                            props.setCandidate({
                              ...props.candidate,
                              firstName: e.target.value,
                            });
                          },
                        })}
                        error={props.errors.firstName ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {props.errors.firstName?.message}
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
                        value={props.candidate.lastName}
                        defaultValue={props.candidate.lastName}
                        {...props.register("lastName", {
                          onChange: (e) => {
                            props.setCandidate({
                              ...props.candidate,
                              lastName: e.target.value,
                            });
                          },
                        })}
                        error={props.errors.lastName ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {props.errors.lastName?.message}
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
                        value={props.candidate.skills}
                        defaultValue={props.candidate.skills}
                        {...props.register("skills", {
                          onChange: (e) => {
                            props.setCandidate({
                              ...props.candidate,
                              skills: e.target.value,
                            });
                          },
                        })}
                        error={props.errors.skills ? true : false}
                      />

                      <Typography variant="inherit" color="error">
                        {props.errors.skills?.message}
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
                        value={props.candidate.gender}
                        defaultValue={props.candidate.gender}
                        {...props.register("gender", {
                          onChange: (e) => {
                            props.setCandidate({
                              ...props.candidate,
                              gender: e.target.value,
                            });
                          },
                        })}
                        error={props.errors.gender ? true : false}
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
                        {props.errors.gender?.message}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <InputLabel shrink htmlFor="dob">
                      DOB
                    </InputLabel>
                    <FormControl
                      className={classes.margin + " " + classes.dateSelect}
                    >
                      <select
                        defaultValue={days}
                        onChange={(e) => {
                          props.setDay(e.target.value);
                        }}
                        {...props.register("day")}
                        className={classes.selectDrop}
                        required
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
                        onChange={(e) => {
                          props.setMonth(e.target.value);
                        }}
                        {...props.register("month")}
                        className={classes.selectDrop}
                        required
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
                        onChange={(e) => {
                          props.setYear(e.target.value);
                        }}
                        {...props.register("year")}
                        className={classes.selectDrop}
                        required
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
                      {props.errors.day?.message &&
                        props.errors.month?.message &&
                        props.errors.year?.message}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} sm={6} md={3} lg={3}>
                    <InputLabel shrink htmlFor="resume">

                      Upload Resume
                    </InputLabel>
                    <FormControl className={classes.margin}>

                      <div className={classes.space + " " + classes.alignItemsEnd}  >
                        <div className={classes.marginTop}>
                          <input
                            accept=".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            className={classes.input}
                            id="icon-button-file"
                            type="file"
                            value={fileName}
                            style={{ display: "none" }}
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

                        {props.file?.name ?
                          <Tooltip title="Delete Resume" placement="bottom" aria-label="delete" >
                            <DeleteIcon className={classes.toolIconDelete} onClick={(e) => { props.setFile([]); setFileName(); }} />
                          </Tooltip>

                          : ""}
                      </div>
                    </FormControl>


                    <Grid container direction="row" className={classes.left + " " + classes.button} >
                      <Typography variant="inherit" className={classes.lineBreak}   > {props.file?.name}  </Typography>
                    </Grid>
                  </Grid>

                  {decode.companyType === "COMPANY" ?
                    <>
                      <Grid item xs={6} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="resume">
                          Upload Document
                        </InputLabel>
                        <FormControl className={classes.margin}>

                          <div className={classes.space + " " + classes.alignItemsEnd}  >
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

                            {props.docFile?.name ?
                              <Tooltip title="Delete Document" placement="bottom" aria-label="delete" >
                                <DeleteIcon className={classes.toolIconDelete} onClick={(e) => { props.setDocFile([]); setDocFileName(); }} />
                              </Tooltip>

                              : ""}
                          </div>
                        </FormControl>
                        <Grid container direction="row" className={classes.left + " " + classes.button} >
                          <Typography variant="inherit" className={classes.lineBreak}   > {props.docFile?.name}  </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={6} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="resume">
                          Upload Photograph
                        </InputLabel>
                        <FormControl className={classes.margin}>

                          <div className={classes.space + " " + classes.alignItemsEnd}  >
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

                            {props.profile?.name ?
                              <Tooltip title="Delete Profile" placement="bottom" aria-label="delete" >
                                <DeleteIcon className={classes.toolIconDelete} onClick={(e) => { props.setProfile([]); setProfileFileName(); }} />
                              </Tooltip>

                              : ""}
                          </div>
                        </FormControl>
                        <Grid container direction="row" className={classes.left + " " + classes.button} >
                          <Typography variant="inherit" className={classes.lineBreak}   > {props.profile?.name}  </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="panNumber">
                          Pan Card Details
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField

                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Pan Card Number"
                            id="panNumber"
                            value={props.candidate.panNumber}
                            defaultValue={props.candidate.panNumber}
                            {...props.register("panNumber", {
                              onChange: (e) => {
                                props.setCandidate({
                                  ...props.candidate,
                                  panNumber: e.target.value,
                                });
                              },
                            })}
                            error={props.errors.panNumber ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.errors.panNumber?.message}
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
                            value={props.candidate.linkedInProfile}
                            defaultValue={props.candidate.linkedInProfile}
                            {...props.register("linkedInProfile", {
                              onChange: (e) => {
                                props.setCandidate({
                                  ...props.candidate,
                                  linkedInProfile: e.target.value,
                                });
                              },
                            })}
                            error={props.errors.linkedInProfile ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.errors.linkedInProfile?.message}
                          </Typography>
                        </FormControl>
                      </Grid>
                    </>
                    :
                    <Grid item xs={6} sm={5} md={2} lg={2}>
                      <InputLabel shrink htmlFor="resume">
                        Hide Contact Detail
                      </InputLabel>

                      <FormControl className={classes.margin}>

                        <Switch
                          checked={props.hideContactDetails}
                          onChange={(e) => {

                            props.setHideContactDetails(e.target.checked);

                          }}
                          color="primary"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />

                      </FormControl>
                    </Grid>
                  }

                  {decode.role !== "SUBVENDOR" && decode.role !== "FREELANCER" ? <>
                    <Grid item xs={12} sm={7} md={4} lg={4}>
                      <InputLabel shrink htmlFor="free">
                        Candidate Follow-up
                      </InputLabel>

                      <FormControl component="fieldset">
                        <RadioGroup

                          aria-label="free"
                          name="free"
                          defaultValue={props.candidate.freeValue}
                          onChange={(e) => {
                            props.candidate.freeValue(e.target.value);
                          }}
                          row
                        >
                          {decode.isEnableFree === true ? (
                            <FormControlLabel

                              value="YES"
                              control={<Radio />}
                              label={
                                <Typography className={classes.heading}>
                                  {"Free "}
                                  <Tooltip title="WhatsApp" placement="right">
                                    <IconButton>
                                      <WhatsappIcon
                                        className={classes.whatsapp_green}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </Typography>
                              }
                            />
                          ) : (
                            ""
                          )}
                          {decode.isEnablePaid === true ? (
                            <FormControlLabel

                              value="NO"
                              control={<Radio />}
                              label={
                                <Typography className={classes.heading}>
                                  {"Paid "}
                                  <Tooltip title="WhatsApp" placement="right">
                                    <IconButton>
                                      <WhatsappIcon
                                        className={classes.whatsapp_green}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </Typography>
                              }
                            />
                          ) : (
                            ""
                          )}
                        </RadioGroup>
                      </FormControl>
                    </Grid> </> : ""}

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
                            value={props.candidate.currentCompanyName}
                            defaultValue={props.candidate.currentCompanyName}
                            {...props.register("currentCompanyName", {
                              onChange: (e) => {
                                props.setCandidate({
                                  ...props.candidate,
                                  currentCompanyName: e.target.value,
                                });
                              },
                            })}
                            error={props.errors.currentCompanyName ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.errors.currentCompanyName?.message}
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
                            value={props.candidate.native}
                            defaultValue={props.candidate.native}
                            {...props.register("native", {
                              onChange: (e) => {
                                props.setCandidate({
                                  ...props.candidate,
                                  native: e.target.value,
                                });
                              },
                            })}
                            error={props.errors.native ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.errors.native?.message}
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
                            value={props.candidate.location}
                            defaultValue={props.candidate.location}
                            {...props.register("location", {
                              onChange: (e) => {
                                props.setCandidate({
                                  ...props.candidate,
                                  location: e.target.value,
                                });
                              },
                            })}
                            error={props.errors.location ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.errors.location?.message}
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
                            value={props.candidate.preferredLocation}
                            defaultValue={props.candidate.preferredLocation}
                            {...props.register("preferredLocation", {
                              onChange: (e) => {
                                props.setCandidate({
                                  ...props.candidate,
                                  preferredLocation: e.target.value,
                                });
                              },
                            })}
                            error={
                              props.errors.preferredLocation ? true : false
                            }
                          />

                          <Typography variant="inherit" color="error">
                            {props.errors.preferredLocation?.message}
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
                            value={props.candidate.experience}
                            defaultValue={props.candidate.experience}
                            {...props.register("experience", {
                              onChange: (e) => {
                                props.setCandidate({
                                  ...props.candidate,
                                  experience: e.target.value,
                                });
                              },
                            })}
                            error={props.errors.experience ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.errors.experience?.message}
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
                            value={props.candidate.relevantExperience}
                            defaultValue={props.candidate.relevantExperience}
                            {...props.register("relevantExperience", {
                              onChange: (e) => {
                                props.setCandidate({
                                  ...props.candidate,
                                  relevantExperience: e.target.value,
                                });
                              },
                            })}
                            error={
                              props.errors.relevantExperience ? true : false
                            }
                          />

                          <Typography variant="inherit" color="error">
                            {props.errors.relevantExperience?.message}
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
                            value={props.candidate.educationalQualification}
                            defaultValue={
                              props.candidate.educationalQualification
                            }
                            {...props.register("educationalQualification", {
                              onChange: (e) => {
                                props.setCandidate({
                                  ...props.candidate,
                                  educationalQualification: e.target.value,
                                });
                              },
                            })}
                            error={
                              props.errors.educationalQualification
                                ? true
                                : false
                            }
                          />

                          <Typography variant="inherit" color="error">
                            {props.errors.educationalQualification?.message}
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
                            value={
                              props.candidate.differentlyAbled !== null
                                ? props.candidate.differentlyAbled
                                : "NO"
                            }
                            defaultValue={
                              props.candidate.differentlyAbled !== null
                                ? props.candidate.differentlyAbled
                                : "NO"
                            }
                            {...props.register("differentlyAbled", {
                              onChange: (e) => {
                                props.setCandidate({
                                  ...props.candidate,
                                  differentlyAbled: e.target.value,
                                });
                              },
                            })}
                            error={props.errors.differentlyAbled ? true : false}
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
                            {props.errors.differentlyAbled?.message}
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
                                placeholder="Enter Candidate Recruiter Discussion Recording"
                                id="candidateRecruiterDiscussionRecording"
                                value={props.candidate.candidateRecruiterDiscussionRecording}
                                defaultValue={props.candidate.candidateRecruiterDiscussionRecording}
                                {...props.register("candidateRecruiterDiscussionRecording", {
                                  onChange: (e) => {
                                    props.setCandidate({
                                      ...props.candidate,
                                      candidateRecruiterDiscussionRecording: e.target.value,
                                    });
                                  },
                                })}
                                error={props.errors.candidateRecruiterDiscussionRecording ? true : false}
                              />

                              <Typography variant="inherit" color="error">
                                {props.errors.candidateRecruiterDiscussionRecording?.message}
                              </Typography>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel shrink htmlFor="candidateSkillExplanationRecording">
                              Candidate Skill explanation recording
                            </InputLabel>
                            <FormControl className={classes.margin}>
                              <TextField

                                InputProps={{ disableUnderline: true }}
                                classes={{ root: classes.customTextField }}
                                size="small"
                                placeholder="Enter Candidate Skill Explanation Recording "
                                id="candidateSkillExplanationRecording"
                                value={props.candidate.candidateSkillExplanationRecording}
                                defaultValue={props.candidate.candidateSkillExplanationRecording}
                                {...props.register("candidateSkillExplanationRecording", {
                                  onChange: (e) => {
                                    props.setCandidate({
                                      ...props.candidate,
                                      candidateSkillExplanationRecording: e.target.value,
                                    });
                                  },
                                })}
                                error={props.errors.candidateSkillExplanationRecording ? true : false}
                              />

                              <Typography variant="inherit" color="error">
                                {props.errors.candidateSkillExplanationRecording?.message}
                              </Typography>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel shrink htmlFor="candidateMindsetAssessmentLink">
                              Candidate MindSet Assessment                         </InputLabel>
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
                                {props.assessment?.name ?
                                  <Tooltip title="Delete Assessment" placement="bottom" aria-label="delete" >
                                    <DeleteIcon className={classes.toolIconDelete} onClick={(e) => { props.setAssessment([]); setAssessmentFile(); }} />
                                  </Tooltip>

                                  : ""}
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
                                value={props.candidate.candidateAndTechPannelDiscussionRecording}
                                defaultValue={props.candidate.candidateAndTechPannelDiscussionRecording}
                                {...props.register("candidateAndTechPannelDiscussionRecording", {
                                  onChange: (e) => {
                                    props.setCandidate({
                                      ...props.candidate,
                                      candidateAndTechPannelDiscussionRecording: e.target.value,
                                    });
                                  },
                                })}
                                error={props.errors.candidateAndTechPannelDiscussionRecording ? true : false}
                              />

                              <Typography variant="inherit" color="error">
                                {props.errors.candidateAndTechPannelDiscussionRecording?.message}
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
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            type="number"
                            placeholder="Enter Current CTC"
                            id="currentCtc"
                            value={props.candidate.currentCtc}
                            defaultValue={props.candidate.currentCtc}
                            {...props.register("currentCtc", {
                              onChange: (e) => {
                                props.setCandidate({
                                  ...props.candidate,
                                  currentCtc: e.target.value,
                                });
                              },
                            })}
                            error={props.errors.currentCtc ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.errors.currentCtc?.message}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InputLabel shrink htmlFor="expectedCtc">

                          Expected CTC
                        </InputLabel>
                        <FormControl className={classes.margin}>
                          <TextField
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            type="number"
                            placeholder="Enter Expected CTC  "
                            id="expectedCtc"
                            value={props.candidate.expectedCtc}
                            defaultValue={props.candidate.expectedCtc}
                            {...props.register("expectedCtc", {
                              onChange: (e) => {
                                props.setCandidate({
                                  ...props.candidate,
                                  expectedCtc: e.target.value,
                                });
                              },
                            })}
                            error={props.errors.expectedCtc ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.errors.expectedCtc?.message}
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
                            value={props.candidate.noticePeriod}
                            defaultValue={props.candidate.noticePeriod}
                            {...props.register("noticePeriod", {
                              onChange: (e) => {
                                props.setCandidate({
                                  ...props.candidate,
                                  noticePeriod: e.target.value,
                                });
                              },
                            })}
                            error={props.errors.noticePeriod ? true : false}
                          />

                          <Typography variant="inherit" color="error">
                            {props.errors.noticePeriod?.message}
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
                            defaultValue={props.candidate.candidateProcessed}
                            {...props.register("candidateProcessed", {
                              onChange: (e) => {
                                props.setCandidate({
                                  ...props.candidate,
                                  candidateProcessed: e.target.value,
                                });
                              },
                            })}
                            error={
                              props.errors.candidateProcessed ? true : false
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
                            {props.errors.candidateProcessed?.message}
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

                            maxRows={3}
                            InputProps={{ disableUnderline: true }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            placeholder="Enter Reason for Job Change"
                            id="reasonForJobChange"
                            value={props.candidate.reasonForJobChange}
                            defaultValue={props.candidate.reasonForJobChange}
                            {...props.register("reasonForJobChange", {
                              onChange: (e) => {
                                props.setCandidate({
                                  ...props.candidate,
                                  reasonForJobChange: e.target.value,
                                });
                              },
                            })}
                            error={
                              props.errors.reasonForJobChange ? true : false
                            }
                          />

                          <Typography variant="inherit" color="error">
                            {props.errors.reasonForJobChange?.message}
                          </Typography>
                        </FormControl>
                      </Grid>

                      {props.candidate.candidateProcessed === "NO" ? (
                        <Grid item xs={12} lg={6}>
                          <InputLabel shrink htmlFor="reason">  Specify   </InputLabel>
                          <FormControl className={classes.margin}>
                            <TextField
                              multiline

                              maxRows={3}
                              InputProps={{ disableUnderline: true }}
                              classes={{ root: classes.customTextField }}
                              size="small"
                              placeholder="Enter Specify"
                              id="reason"
                              value={props.candidate.reason}
                              defaultValue={props.candidate.reason}
                              {...props.register("reason", {
                                onChange: (e) => {
                                  props.setCandidate({
                                    ...props.candidate,
                                    reason: e.target.value,
                                  });
                                },
                              })}
                              error={props.errors.reason ? true : false}
                            />

                            <Typography variant="inherit" color="error">
                              {props.errors.reason?.message}
                            </Typography>
                          </FormControl>
                        </Grid>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}

                  {props.recruitmentId !== "" ? (
                    <>
                      <CardContent>
                        <Grid container direction="row" spacing={2}>
                          <Grid item xs={6} lg={6}>
                            <Typography>
                              <b>Requirement Name:</b>
                            </Typography>
                          </Grid>
                          <Grid item xs={6} lg={6}>
                            <Typography>
                              {props.recruitmentList.requirementName} {"(" + props.recruitmentList.uniqueId + ")"}
                            </Typography>
                          </Grid>

                          <Grid item xs={6} lg={6}>
                            <Typography>
                              <b> {decode.companyType === "COMPANY" ? "Project Name:" : "Client Name:"}</b>
                            </Typography>
                          </Grid>
                          <Grid item xs={6} lg={6}>
                            <Typography>
                              {props.recruitmentList.clientName} {"(" + props.recruitmentList.clientUniqueId + ")"}
                            </Typography>
                          </Grid>

                          <Grid item xs={6} lg={6}>
                            <Typography>
                              <b>Organization Recruiter Name:</b>
                            </Typography>
                          </Grid>
                          <Grid item xs={6} lg={6}>
                            <Typography>
                              {props.recruitmentList.orgRecruiterName}
                            </Typography>
                          </Grid>

                          <Grid item xs={6} lg={6}>
                            <Typography>
                              <b>Experience:</b>
                            </Typography>
                          </Grid>
                          <Grid item xs={6} lg={6}>
                            <Typography>
                              {props.recruitmentList.experience}
                            </Typography>
                          </Grid>

                          <Grid item xs={6} lg={6}>
                            <Typography>
                              <b>Skills:</b>
                            </Typography>
                          </Grid>
                          <Grid item xs={6} lg={6}>
                            <Typography>
                              {props.recruitmentList?.skills}
                            </Typography>
                          </Grid>

                          <Grid item xs={6} lg={6}>
                            <Typography>
                              <b>Location:</b>
                            </Typography>
                          </Grid>
                          <Grid item xs={6} lg={6}>
                            <Typography>
                              {props.recruitmentList.jobLocation}
                            </Typography>
                          </Grid>

                          <Grid item xs={6} lg={6}>
                            <Typography>
                              <b>Status:</b>
                            </Typography>
                          </Grid>
                          <Grid item xs={6} lg={6}>
                            {props.recruitmentList.status === "ACTIVE" ? (
                              <>
                                <Button
                                  variant="contained"
                                  size="small"
                                  className={classes.green + " " + classes.noPointer}
                                >
                                  ACTIVE
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  variant="contained"
                                  size="small"
                                  className={classes.red + " " + classes.noPointer}
                                >
                                  INACTIVE
                                </Button>
                              </>
                            )}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </>
                  ) : (
                    ""
                  )}
                </Grid>

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

                    <Dialog
                      onClose={props.handleClose}
                      aria-labelledby="dialog-title"
                      open={props.open}
                      width="md"
                      PaperProps={{
                        style: {
                          width: "100%",
                        },
                      }}
                    >
                      <DialogTitle className={classes.digTitle}>
                        <div className={classes.center}>
                          <Typography variant="subtitle2" className={classes.digColor + " " + classes.digCenter}>
                            Send WhatsApp message
                          </Typography>
                          <div className={classes.drawerClose} >
                            <CloseIcon
                              className={classes.digClose}
                              size="14px"
                              onClick={props.handleClose}
                            />
                          </div>
                        </div>
                      </DialogTitle>
                      <DialogContent className={classes.chatListBackGround}>

                        {props.candidate.freeValue === "YES" ? (
                          <TextField
                            size="small"
                            classes={{ root: classes.customTextField }}
                            InputProps={{ disableUnderline: true }}
                            multiline
                            rows={4}
                            inputRef={props.messageRef}
                            defaultValue={`Dear ${props.requirementList.cand1_name},\n\nWe sincerely appreciate the time you took to discuss the job opening for Job ID ${props.requirementList.req_id} (${props.requirementList.job1_title}). We kindly request you to refer potential candidates for this role. \n \nThank you and best regards,\n${localStorage.getItem('firstName') + "" + decode.lastName} \n${localStorage.getItem('mobile') ? "+91 " + localStorage.getItem('mobile') : ""} \nRecruiter \n${localStorage.getItem('companyName')}`}
                            variant="outlined"
                          />
                        ) : (
                          <Typography>
                            Hi  <b>  {props.requirementList.cand1_name}, </b>
                            <br />
                            <br />
                            Can we chat today about a job opening
                            <b> {localStorage.getItem('firstName')} </b>,
                            <b> {localStorage.getItem('mobile')} </b>,
                            <b> {localStorage.getItem('companyName')} </b>. Always reply by
                            clicking back arrow button/right swipe only.
                          </Typography>

                          // <Typography> 
                          // Dear <b>{props.requirementList.cand1_name},</b>
                          // <br />
                          // <br />     
                          // We sincerely appreciate the time you took to discuss the job opening for Job ID {props.requirementList.req_id} ({props.requirementList.job1_title}). We kindly request you to refer potential candidates for this role. 
                          // <br />
                          // <br />   
                          // Thank you and best regards,  <br />   

                          // {localStorage.getItem('firstName') +" "+ decode.lastName}  <br />   

                          // {localStorage.getItem('mobile')? "+91 "+localStorage.getItem('mobile'):"" } <br />   

                          // Recruiter<br />     

                          // {localStorage.getItem('companyName')}.  
                          // </Typography>

                        )}




                        <div className={classes.sendWhatsapp}>

                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={props.validation}
                            type="submit"
                            onClick={(e) => {
                              props.setValidation(true);
                              props.handleAddList(false);
                            }}
                          >
                            Save Only
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={props.validation}
                            type="submit"
                            onClick={(e) => {
                              props.setValidation(true);
                              props.handleAddList(true);
                            }}
                          >
                            Save & Send
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={props.handleClose}
                          >
                            Close
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </Grid>
                </CardActions>
              </CardContent>
            </form>
          </Card>
        </List>
      </Box>
    </>
  );
}
