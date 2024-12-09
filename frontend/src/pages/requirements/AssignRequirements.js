import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  SwipeableDrawer,
  TablePagination,
  TextField,
  Typography,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import moment from "moment";
import MUIDataTable from "mui-datatables";
// components
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CloseIcon from "@material-ui/icons/Close";
import ViewIcon from "@material-ui/icons/Visibility";
import GetAppIcon from "@material-ui/icons/GetApp";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import { useHistory } from "react-router-dom";
import PeopleIcon from '@material-ui/icons/People';
import { toast } from "react-toastify";
import PageTitle from "../../components/PageTitle";
// data
import { yupResolver } from "@hookform/resolvers/yup";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";

import * as Yup from "yup";
import Notification from "../../components/Notification";
import { Autocomplete } from "@material-ui/lab";
import useStyles from "../../themes/style.js";
import PublishIcon from '@material-ui/icons/Publish';
import Add from "../../components/Candidates/Add";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import "react-toastify/dist/ReactToastify.css";
import "jodit/build/jodit.min.css";
import CustomPdfView from "../../components/pdfViewer/CustomPdfView.js";
import { getFileExtension } from "../../utils/getextension.js";

const positions = [toast.POSITION.TOP_RIGHT];

export default function Tables() {
  const classes = useStyles();
  const history = useHistory();

  const mobileQuery = useMediaQuery('(max-width:600px)');
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const [count, setCount] = useState(0);
  const [file, setFile] = useState([]);
  const [assessment, setAssessment] = useState([]);
  const [hideContactDetails, setHideContactDetails] = useState(false);

  const [loader, setLoader] = useState(false);

  const [requirementsData, setRequirementsData] = useState([]);


  const [requirementsView, setRequirementsView] = useState({
    id: "",
    requirementName: "",
    clientId: "",
    skills: "",
    orgRecruiterId: "",
    orgRecruiterName: "",
    jobLocation: "",
    experience: "",
    uniqueId: "",
    clientUniqueId: "",
    clientName: "",
    gist: "",
    jd: "",
    hideFromInternal: "",
    modeOfWork: "",
    specialHiring: "",
    status: "",
    candidateCount: "",
    createdAt: "",
  });

  const resumeUrl = requirementsView?.jd;
  const fileExtension = resumeUrl ? getFileExtension(resumeUrl) : null;

  const [page, setPage] = useState(0);
  const [currerntPage, setCurrerntPage] = useState(1);

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [dataList, setDataList] = useState("View");
  var [errorToastId, setErrorToastId] = useState(null);

  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };


  function sendNotification(componentProps, options) {
    return toast(
      <Notification
        {...componentProps}
        className={classes.notificationComponent}
      />,
      options,
    );
  }

  function handleNotificationCall(notificationType, message) {
    var componentProps;

    if (errorToastId && notificationType === "error") return;

    switch (notificationType) {
      case "info":
        componentProps = {
          type: "feedback",
          message: message,
          variant: "contained",
          color: "primary",
        };
        break;
      case "error":
        componentProps = {
          type: "message",
          message: message,
          variant: "contained",
          color: "secondary",
        };
        break;
      default:
        componentProps = {
          type: "shipped",
          message: message,
          variant: "contained",
          color: "success",
        };
    }

    var toastId = sendNotification(componentProps, {
      type: notificationType,
      position: positions[2],
      progressClassName: classes.progress,
      onClose: notificationType === "error" && (() => setErrorToastId(null)),
      className: classes.notification,
    });

    if (notificationType === "error") setErrorToastId(toastId);
  }


  useEffect(() => {

    if (decode.role !== "SUPERADMIN") {


      const getRequirementName = async () => {

        axios({
          method: "post",
          url: `${process.env.REACT_APP_SERVER}recruiter/getAssignedRequierments`,
          data: {},
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
          .then(function (response) {
            if (response.data.status === true) {
              setLoader(false);
              setRequirementName(response.data.data);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      getRequirementName();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [token]);





  useEffect(() => {

    const fetchData = async () => {
      setLoader(true);



      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}recruiter/myAssignedRequirements`,
        data: {
          page: 1,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          setLoader(false);

          setRequirementsData(response.data.data);
          setCount(response.data.count);
        }
      });
    };

    const getRequirementName = async () => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/getAllRequirementList`,
        data: {
          page: 1,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {
            setLoader(false);
            setRequirementName(response.data.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    fetchData();
    getRequirementName();
  }, [reducerValue, token]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [requirementName, setRequirementName] = useState([]);
  const [requirementId, setRequirementId] = useState(null);
  const [recruiterId, setRecruiterId] = useState(null);

  const filterRef = useRef(null);



  const handleFromDateChange = (event) => {
    setFromDate(filterRef.current.fromDate.value);
  };

  const handleToDateChange = (event) => {
    setToDate(filterRef.current.toDate.value);
  };

  const resetForm = (e) => {
    filterRef.current.reset();
    setRecruiterId(null);
    setRequirementId(null);
    forceUpdate();
  };

  function getFilterData() {
    setLoader(true);
    setCurrerntPage(1);
    setPage(0);
    const form = filterRef.current;

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/myAssignedRequirements`,
      data: JSON.stringify({
        page: 1,
        fromDate: `${form["fromDate"].value}`,
        toDate: `${form["toDate"].value}`,
        recruiterId: recruiterId?.id,
        requirementId: requirementId?.id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setLoader(false);
          setRequirementsData(response.data.data);
          setCount(response.data.count);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setCurrerntPage(newPage + 1);
    setLoader(true);

    const form = filterRef.current;


    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/myAssignedRequirements`,
      data: JSON.stringify({
        page: newPage + 1,
        fromDate: `${form["fromDate"].value}`,
        toDate: `${form["toDate"].value}`,
        recruiterId: recruiterId?.id,
        requirementId: requirementId?.id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setRequirementsData(response.data.data);
        setCount(response.data.count);

      }
      setLoader(false);
    });
  };

  function handleShow(values, name) {

    setLoader(true);
    setDataList(name);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}CC/getRequirement`,
      data: {
        id: values,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {

        if (response.data.status === true) {


          setRequirementsView({
            ...requirementsView,
            id: response.data.data.id,
            requirementName: response.data.data.requirementName,
            clientId: response.data.data.clientId,
            skills: response.data.data.skills,
            orgRecruiterId: response.data.data.orgRecruiter.id,
            orgRecruiterName: response.data.data.orgRecruiter.name,
            jobLocation: response.data.data.jobLocation,
            experience: response.data.data.experience,
            uniqueId: response.data.data.uniqueId,
            clientUniqueId: response.data.data.client.uniqueId,
            clientName: response.data.data.client.clientName,
            status: response.data.data.statusList,
            gist: response.data.data.gist,
            jd: response.data.data.requirementJd,
            modeOfWork: response.data.data.modeOfWork,
            specialHiring: response.data.data.specialHiring,
            hideFromInternal: response.data.data.hideFromInternal,
            candidateCount: response.data.candidateCount,
            createdAt: response.data.data.createdAt,
          });
          setState({ ...state, right: true });

          setLoader(false);
        } else {
          setLoader(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [state, setState] = useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };




  const HeaderElements = () => (
    <>
      <Grid className={classes.HeaderElements}>


        Total : {count}
      </Grid>
    </>
  );




  /** Start Candidate*/
  const [source, setSource] = useState([]);
  const messageRef = useRef();
  const [recruitmentId, setRecruitmentId] = useState("");
  const [addList, setAddList] = useState([]);
  const [phoneValidation, setPhoneValidation] = useState(false);
  const [recruitmentList, setRecruitmentList] = useState([]);
  const [validation, setValidation] = useState(false);
  const [open, setOpen] = React.useState(false);


  const [setDay] = useState("");
  const [setMonth] = useState("");
  const [setYear] = useState("");

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const years = Array.from({ length: 60 }, (_, i) => moment(new Date()).format("YYYY") - i);


  const candidateSchema = Yup.object().shape({
    email: Yup.string().email("Email must be a Valid Email Address").required('Email is required'),
    firstName: Yup.string().required('First Name is required')
      .max(255)
      .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: "First Name be Alphanumeric",
      }),
    lastName: Yup.string().max(255).required('Last Name is required')
      .max(255)
      .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: "Last Name be Alphanumeric",
      }),
    mobile: Yup.string().required('Contact Number is required').min(10, "Must be exactly 10 digits").max(10, "Must be exactly 10 digits"),
    requirementId: Yup.string(),
    skills: Yup.string().required('Skill is required'),
    source: Yup.string().required("Source is required"),
    free: Yup.string().nullable().notRequired(),
    experience: Yup.number().nullable(true).transform((_, val) => val ? Number(val) : null),
    location: Yup.string().nullable().notRequired(),
    alternateMobile: phoneValidation === true ? Yup.string().required('Alternate Contact Number is required').min(10, "Must be exactly 10 digits").max(10, "Must be exactly 10 digits") : Yup.string(),
    day: Yup.string().nullable().notRequired(),
    month: Yup.string().nullable().notRequired(),
    year: Yup.string().nullable().notRequired(),
    gender: Yup.string().nullable().required('Gender is required'),
    educationalQualification: Yup.string().nullable().notRequired(),
    differentlyAbled: Yup.string().nullable().notRequired(),
    currentCtc: Yup.number().nullable(true).transform((_, val) => val ? Number(val) : null),
    expectedCtc: Yup.number().nullable(true).transform((_, val) => val ? Number(val) : null),
    noticePeriod: Yup.string().nullable().notRequired(),
    reasonForJobChange: Yup.string().nullable().notRequired(),
    candidateProcessed: Yup.string().nullable().notRequired(),
    reason: Yup.string().nullable().notRequired(),
    native: Yup.string().nullable().notRequired(),
    preferredLocation: Yup.string().nullable().notRequired(),
    relevantExperience: Yup.number().nullable(true).transform((_, val) => val ? Number(val) : null),
    currentCompanyName: Yup.string().nullable().notRequired(),
  });

  const {
    register: candidateRegister,
    formState: { errors: candidateErrors, isSubmitting: candidateIsSubmitting },
    handleSubmit: candidateSubmit,
    reset: candidateReset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(candidateSchema),
  });

  const ExistCheck = (e) => {


    //   if ( decode.role === "SUBVENDOR" || decode.role ===  "FREELANCER") {
    //     CheckExitAlready(recruitmentId, e);

    //   } else{ 

    //     if(recruitmentId!==""){


    //       CheckExitAlready(recruitmentId, e);
    //   } else{
    //     handleNotificationCall("error", "Select Requirement");
    //   }

    // }

    CheckExitAlready(recruitmentId, e);

  };


  function CheckExitAlready(recruitmentId, e) {
    var data = {};
    var url = "";

    if (e.target.name === "email") {
      data = {
        requirementId: recruitmentId,
        email: e.target.value
      }
      url = `${process.env.REACT_APP_SERVER}recruiter/checkEmailExist`
    } else {
      data = {
        requirementId: recruitmentId,
        mobile: e.target.value
      }
      url = `${process.env.REACT_APP_SERVER}recruiter/checkMobileExist`
    }

    axios({
      method: "post",
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        handleNotificationCall("error", response.data.message);
      }

    })
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [candidate, setCandidate] = useState({
    requirementId: "",
    source: "",
    email: "",
    firstName: "",
    lastName: "",
    skills: "",
    location: "",
    experience: null,
    candidateProcessed: "",
    native: "",
    preferredLocation: "",
    relevantExperience: null,
    educationalQualification: "",
    gender: "",
    differentlyAbled: "",
    currentCtc: null,
    expectedCtc: null,
    noticePeriod: "",
    reasonForJobChange: "",
    reason: "",
    dob: "",
    freeValue: decode.isEnableFree === true ? "YES" : decode.isEnablePaid === true ? "NO" : "YES",

  });

  const [requirementList, setRequirementList] = useState({
    cand1_name: "",
    job1_location: "",
    client1_name: "",
    job1_title: "",
    cand1_skills: "",
    job1_experience: "",
    rec_name: "",
    rec_mobile_no: "",
    req_id: "",
  });




  function handleAddCandidate(values) {

    return new Promise((resolve) => {
      if (validation === true) {


      } else {
        setAddList(values);


        axios({
          method: "post",
          url: `${process.env.REACT_APP_SERVER}CC/getRequirement`,
          data: {
            id: recruitmentId,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }).then(function (response) {
          if (response.data.status === true) {

            setRequirementList({
              ...requirementList,
              cand1_name: values.firstName + " " + values.lastName,
              job1_location: response.data.data.jobLocation,
              client1_name: response.data.data.client?.clientName,
              job1_title: response.data.data.requirementName,
              cand1_skills: values.skills,
              job1_experience: response.data.data.experience,
              rec_name: localStorage.getItem('firstName'),
              rec_mobile_no: localStorage.getItem('mobile'),
              req_id: response.data.data.uniqueId,
            });

            CheckAlreadyExit(values);
          }
          resolve();
        });
      }
    });
  }

  function CheckAlreadyExit(addList) {

    var dob = addList.day + "-" + addList.month + "-" + addList.year;

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/candidateExist`,
      data: {
        email: addList.email,
        firstName: addList.firstName,
        lastName: addList.lastName,
        mobile: addList.mobile,
        requirementId: recruitmentId,
        skills: addList.skills,
        sourceId: addList.source,
        isAnswered: candidate.freeValue,
        message: "",
        experience: addList.experience,
        currentLocation: addList.location,
        alternateMobile: addList.alternateMobile,
        preferredLocation: addList.preferredLocation,
        nativeLocation: addList.native,
        relevantExperience: addList.relevantExperience,
        currentCtc: addList.currentCtc,
        expectedCtc: addList.expectedCtc,
        dob: addList.day === undefined ? "" : dob !== "--" ? addList.day + "-" + addList.month + "-" + addList.year : "",
        noticePeriod: addList.noticePeriod,
        reasonForJobChange: addList.reasonForJobChange,
        candidateProcessed: addList.candidateProcessed,
        differentlyAbled: addList.differentlyAbled,
        educationalQualification: addList.educationalQualification,
        gender: addList.gender,
        reason: addList.reason,
        sendMessage: ""
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {

      if (response.data.status === true) {

        handleClickOpen();

      } else {
        handleNotificationCall("error", response.data.message);

      }
    });
  }

  function handleAddList(send) {
    if (!addList.day || !addList.month || !addList.year) {
      handleNotificationCall("error", "Please select the date of birth properly.");
      return;
    }
    setLoader(true);
    var url = "";
    var data = {};
    var dob = addList.day + "-" + addList.month + "-" + addList.year;

    if (candidate.freeValue === "YES") {
      url = `${process.env.REACT_APP_SERVER}recruiter/addFreeCandidate`;
      data = {
        email: addList.email,
        firstName: addList.firstName,
        lastName: addList.lastName,
        mobile: addList.mobile,
        requirementId: recruitmentId,
        skills: addList.skills,
        sourceId: addList.source,
        isAnswered: candidate.freeValue,
        message: messageRef.current.value,
        experience: addList.experience,
        currentLocation: addList.location,
        alternateMobile: addList.alternateMobile,
        preferredLocation: addList.preferredLocation,
        nativeLocation: addList.native,
        relevantExperience: addList.relevantExperience,
        currentCtc: addList.currentCtc,
        expectedCtc: addList.expectedCtc,
        dob: addList.day === undefined ? "" : dob !== "--" ? addList.day + "-" + addList.month + "-" + addList.year : "",
        noticePeriod: addList.noticePeriod,
        reasonForJobChange: addList.reasonForJobChange,
        candidateProcessed: addList.candidateProcessed,
        differentlyAbled: addList.differentlyAbled,
        educationalQualification: addList.educationalQualification,
        gender: addList.gender,
        reason: addList.reason,
        candidateRecruiterDiscussionRecording: addList.candidateRecruiterDiscussionRecording,
        candidateSkillExplanationRecording: addList.candidateSkillExplanationRecording,
        candidateMindsetAssessmentLink: addList.candidateMindsetAssessmentLink,
        candidateAndTechPannelDiscussionRecording: addList.candidateAndTechPannelDiscussionRecording,
        sendMessage: send,
        currentCompanyName: addList.currentCompanyName,

      }
    } else {
      url = `${process.env.REACT_APP_SERVER}recruiter/addCandidate`;
      data = {
        email: addList.email,
        firstName: addList.firstName,
        lastName: addList.lastName,
        mobile: addList.mobile,
        requirementId: recruitmentId,
        skills: addList.skills,
        sourceId: addList.source,
        isAnswered: candidate.freeValue,
        experience: addList.experience,
        currentLocation: addList.location,
        alternateMobile: addList.alternateMobile,
        preferredLocation: addList.preferredLocation,
        nativeLocation: addList.native,
        relevantExperience: addList.relevantExperience,
        currentCtc: addList.currentCtc,
        expectedCtc: addList.expectedCtc,
        dob: addList.day === undefined ? "" : dob !== "--" ? addList.day + "-" + addList.month + "-" + addList.year : "",
        noticePeriod: addList.noticePeriod,
        reasonForJobChange: addList.reasonForJobChange,
        candidateProcessed: addList.candidateProcessed,
        differentlyAbled: addList.differentlyAbled,
        educationalQualification: addList.educationalQualification,
        gender: addList.gender,
        reason: addList.reason,
        candidateRecruiterDiscussionRecording: addList.candidateRecruiterDiscussionRecording,
        candidateSkillExplanationRecording: addList.candidateSkillExplanationRecording,
        candidateMindsetAssessmentLink: addList.candidateMindsetAssessmentLink,
        candidateAndTechPannelDiscussionRecording: addList.candidateAndTechPannelDiscussionRecording,
        sendMessage: send,
        currentCompanyName: addList.currentCompanyName,
      }
    }

    axios({
      method: "post",
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {


      if (response.data.status === true) {
        handleClose();
        var message = "";

        if (file !== undefined) {
          if (file?.length !== 0) {
            uploadResume(file, response.data.candidateDetailsId);
          }
        }

        if (assessment !== undefined) {
          if (assessment?.length !== 0) {
            uploadAssessment(assessment, response.data.candidateId);
          }
        }

        if (send === true) {
          if (candidate.freeValue === "YES") {
            message = messageRef.current.value;

            window.open(
              "https://api.whatsapp.com/send?phone=+91" +
              addList.mobile +
              "&text=" +
              message +
              "",
            );
          } else {
            message = "Hi " + requirementList.cand1_name + ", Can we chat today about a job opening " + localStorage.getItem('firstName') +
              ", " + localStorage.getItem('mobile') + ", " + localStorage.getItem('companyName') + ". Always reply by clicking back arrow button/right swipe only.";

            handleMessage(
              response.data.candidate_mobile,
              message,
              response.data.candidateId,
            );
          }
        }


        handleNotificationCall("success", response.data.message);

        history.push("/app/assign_requirements")
        setState({ ...state, right: false });
        candidateReset();


      } else {

        handleNotificationCall("error", response.data.message);
      }

      setValidation(false);
      setLoader(false);
    });
  }

  function aiResumeUpload(resumeData) {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}AI/resumeUpload`,
      data: resumeData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }).then(function (response) {

      if (response.data.status === true) {
      } else {
        handleNotificationCall("error", response.data.message);
      }
    });
  }


  function uploadResume(File, Id) {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("resume", File);
    data.append("id", Id);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/updateCandidateResume`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }).then(function (response) {

      if (response.data.status === true) {
        // aiResumeUpload(data)
      } else {
        handleNotificationCall("error", response.data.message);
      }
    });
  }


  function uploadAssessment(File, Id) {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("file", File);
    data.append("id", Id);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/updateCandidateMindSetAssessment`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }).then(function (response) {

      if (response.data.status === true) {

      } else {
        handleNotificationCall("error", response.data.message);
      }
    });
  }


  function handleMessage(mobile, message, candidateId) {
    var url = "";

    if (candidate.freeValue === "YES") {
      url = `${process.env.REACT_APP_SERVER}recruiter/changeYesCadidateStatus`;
    } else {
      url = `${process.env.REACT_APP_SERVER}chat/sendTemplateMessage`;
    }

    axios({
      method: "post",
      url: url,
      data: {
        candidateId: candidateId,
        phone_number: mobile,
        template_name: "first_message",
        vars: [
          requirementList.cand1_name,
          requirementList.rec_name,
          requirementList.rec_mobile_no,
          localStorage.getItem('companyName'),
        ],
        message: message,
        candidate_name: requirementList.cand1_name,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        if (response.data.isNew === true) {
          getmessageIni();
        }

        setLoader(false);
      } else {
        handleNotificationCall("error", response.data.message);
      }

      // handleStatusClose();
      // handleStatusNewClose(); 
      setLoader(false);
    });
  }

  function getmessageIni() {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}auth/getMyWallet`,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        localStorage.setItem(
          "WalletValue",
          response.data.data.remainingMessages,
          { sameSite: "strict", secure: true },
        );
        window.dispatchEvent(new Event("storage"));
      }
    });
  }



  useEffect(() => {
    if (decode.role !== "SUPERADMIN") {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}source/viewSourcesList`,
        data: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          setSource(response.data.data);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [token]);


  /** End Candidate */


  const list = (anchor) =>
  (
    <>
      <Box sx={{ width: "100%" }} role="presentation">
        <List>
          <Card className={classes.root}>
            <CardHeader>
              <Grid
                container
                direction="row"
                spacing={1}
                className={classes.drawerViewHeader}
              >
                <Grid item xs={10} md={6}>
                  <Typography variant="subtitle1">
                    View Requirement - {requirementsView.requirementName}
                  </Typography>
                </Grid>

                <Grid item xs={2} lg={6} className={classes.drawerViewClose}>
                  <CloseIcon
                    className={classes.closeBtn}
                    size="14px"
                    onClick={toggleDrawer(anchor, false)}
                  />
                </Grid>
              </Grid>
            </CardHeader>

            <CardContent className={classes.drawerViewContent}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Requirement Name:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  {requirementsView.requirementName +
                    " (" +
                    requirementsView.uniqueId +
                    ") "}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>
                    {decode.companyType === "COMPANY" ? "Project Name:" : "Client Name:"}

                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  {requirementsView.clientName +
                    " (" +
                    requirementsView.clientUniqueId +
                    ") "}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Organization Recruiter Name:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  {requirementsView.orgRecruiterName}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Experience:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  {requirementsView.experience}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Skills:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  {requirementsView.skills}
                </Grid>


                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Location:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>   {requirementsView.jobLocation}
                </Grid>



                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Mode of work:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>   {requirementsView.modeOfWork}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Special hiring:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>   {requirementsView.specialHiring}
                </Grid>


                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Hide to Internal:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  {requirementsView.hideFromInternal === true ? "YES" : "NO"}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    JD :
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <div className={classes.space + " " + classes.alignItemsEnd}  >


                    {requirementsView?.jd !== `${process.env.REACT_APP_AWS_BUCKET_URL}` ? <>
                      <Tooltip
                        title="View JD"
                        placement="bottom"
                        aria-label="view"
                      >
                        <RemoveRedEyeIcon
                          className={classes.toolIcon}
                          onClick={handleModalOpen}
                        />
                      </Tooltip>

                      <Tooltip
                        title="Downlaod JD"
                        placement="bottom"
                        aria-label="downlaod"
                      >
                        <a className={classes.messageContent} href={requirementsView?.jd} download>

                          <GetAppIcon className={classes.toolIcon} />
                        </a>
                      </Tooltip>
                    </> : ""}
                  </div>

                </Grid>


                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Requirement Gist:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>


                  <div dangerouslySetInnerHTML={{ __html: requirementsView.gist }}></div>

                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Posted Candidate:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>




                  <Button
                    variant="contained"
                    size="small"
                    className={classes.blue}
                    onClick={(e) => {

                      sessionStorage.setItem('recruitmentId', requirementsView.id);

                      history.push("/app/admin_candidates");

                    }}
                  >
                    {requirementsView.candidateCount}
                  </Button>

                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Status:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  {requirementsView.status ? (
                    requirementsView.status.statusName === "ACTIVE" ? (
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
                    )
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                  <Typography className={classes.boldtext}>

                    Posted Date:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>

                  {moment(requirementsView.createdAt).format(
                    "DD-MM-YYYY",
                  )}
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
                  size="small"
                  color="secondary"
                  onClick={toggleDrawer(anchor, false)}
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


  const Candidate = (anchor) =>
  (
    <>
      <Add
        setValidation={setValidation}
        validation={validation}
        handleAddList={handleAddList}
        register={candidateRegister}
        source={source}
        recruitmentList={recruitmentList}
        handleClose={handleClose}
        errors={candidateErrors}
        setLoader={setLoader}
        toggleDrawer={toggleDrawer}
        setRecruitmentList={setRecruitmentList}
        requirementList={requirementList}
        handleSubmit={candidateSubmit}
        handleAdd={handleAddCandidate}
        requirement={requirementName}
        isSubmitting={candidateIsSubmitting}
        open={open}
        messageRef={messageRef}
        reset={candidateReset}
        setCandidate={setCandidate}
        candidate={candidate}
        setFile={setFile}
        file={file}
        setAssessment={setAssessment}
        assessment={assessment}
        setRecruitmentId={setRecruitmentId}
        recruitmentId={recruitmentId}
        days={days}
        months={months}
        years={years}
        setDay={setDay}
        setMonth={setMonth}
        setYear={setYear}
        setPhoneValidation={setPhoneValidation}
        setHideContactDetails={setHideContactDetails}
        hideContactDetails={hideContactDetails}
        ExistCheck={ExistCheck}
        requirementId={"false"}
      />
    </>
  );

  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.heading}>
        <Grid item xs={9} sm={7} md={8} lg={6}>
          <PageTitle title="Assigned Requirements" />
        </Grid>

        <Grid item xs={3} sm={5} md={4} lg={6} className={classes.drawerClose}>

          <SwipeableDrawer
            anchor="right"
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
            classes={{ paper: dataList === "Candidate" ? classes.clientDrawer : classes.drawer }}

          >
            {dataList === "View" ?
              list("right")
              : dataList === "Candidate" ?
                Candidate("right")
                : ""}
          </SwipeableDrawer>
        </Grid>
      </Grid>

      <form
        ref={filterRef}
        onSubmit={(e) => {
          e.preventDefault();
          getFilterData();
        }}
      >
        <Grid container spacing={2} className={classes.filterGap}>

          <Autocomplete
            className={classes.filterFullWidth}
            options={requirementName}
            getOptionLabel={(option) =>
              option?.requirementName + " (" + option?.uniqueId + ")"
            }
            // size="small"
            value={requirementId}
            onChange={(event, value) => setRequirementId(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="requirementId"
                label="Requirement"
                size="small"
                InputLabelProps={{ shrink: true }}
                type="text"
              />
            )}
          />

          <TextField
            name="fromDate"
            label="From"
            InputLabelProps={{ shrink: true }}
            size="small"
            type="date"
            defaultValue={fromDate}
            onChange={handleFromDateChange}
            className={classes.filterWidth}

          />

          <TextField
            name="toDate"
            label="To"
            InputLabelProps={{ shrink: true }}
            size="small"
            type="date"
            defaultValue={toDate}
            onChange={handleToDateChange}
            className={classes.filterWidth}

          />

          <div className={classes.buttons}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              type="submit"
            >
              Search
            </Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => resetForm()}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </form>

      <Grid container spacing={2}>
        <Grid item xs={12}>
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
              customToolbar: () => <HeaderElements />,
              responsive: mobileQuery === true ? 'vertical' : 'standard',
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
                name: "Actions",
              },
              {
                name: "Requirement Name",
              },
              {
                name: decode.companyType === "COMPANY" ? "Assigned Recruiter" : "Assigned Company",
              },
              {
                name: decode.companyType === "COMPANY" ? "Hiring Manager" : "Client Coordinator",
              },
              {
                name: decode.companyType === "COMPANY" ? "Project Name" : "Client Name",
              },
              {
                name: "Organization Recruiter Name",
              },

              {
                name: "Experience",
              },
              {
                name: "Skills ",
              },
              {
                name: "Location ",
              },

              {
                name: "Posted Date",
              },
            ]}
            data={requirementsData.map((item, index) => {

              return [
                <>
                  {currerntPage !== 0 ? 10 * currerntPage - 10 + index + 1 : index + 1}
                </>,
                <>
                  <Grid container className={classes.space}>
                    <Grid item xs className={classes.toolAlign}>

                      <Tooltip
                        title="View Requirement"
                        placement="bottom"
                        aria-label="view"
                      >
                        <ViewIcon
                          className={classes.toolIcon}
                          onClick={(e) => {
                            handleShow(item.requirement?.id, "View");
                            setFile([]);
                            setAssessment([]);
                          }}
                        />
                      </Tooltip>

                      <Tooltip
                        title="Add New Candidate"
                        placement="bottom"
                        aria-label="view"
                      >
                        <PublishIcon
                          className={classes.toolIcon}
                          onClick={(e) => {
                            setDataList("Candidate");
                            setState({ ...state, right: true });
                            setRecruitmentId(item.requirementId);
                            candidateReset();
                            setRecruitmentList({
                              ...requirementList,
                              id: item.requirement.id,
                              requirementName: item.requirement.requirementName,
                              clientId: item.requirement.clientId,
                              skills: item.requirement.skills,
                              orgRecruiterId: item.requirement.orgRecruiter.id,
                              orgRecruiterName: item.requirement.orgRecruiter.name,
                              jobLocation: item.requirement.jobLocation,
                              experience: item.requirement.experience,
                              clientUniqueId: item.requirement.client?.uniqueId,
                              clientName: item.requirement.client?.clientName,
                              status: item.requirement.statusList?.statusName,
                              uniqueId: item.requirement.uniqueId,
                            });
                          }}
                        />
                      </Tooltip>



                      <Tooltip
                        title="View Candidate"
                        placement="bottom"
                        aria-label="view"
                      >
                        <PeopleIcon
                          className={classes.toolIcon}
                          onClick={(e) => {
                            sessionStorage.setItem("recruitmentId", item.requirement.id);
                            history.push("/app/assigned_candidates");
                          }}
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </>,
                <>
                  {item.requirement?.requirementName} {"(" + item.requirement?.uniqueId + ")"}
                </>,
                <>
                  {item.requirement?.recruiter?.companyName}
                </>,
                <>{item.recruiter?.firstName + " " + item.recruiter?.lastName} </>,
                <>{item.requirement?.client.clientName + " (" + item.requirement?.client?.uniqueId + ")"} </>,
                item.requirement?.orgRecruiter.name,
                item.requirement?.experience,
                item.requirement?.skills,
                item.requirement?.jobLocation,

                moment(item.createdAt).format("DD-MM-YYYY"),
              ];
            })}
          />

          <Grid container spacing={2} className={classes.pagination}>
            <TablePagination
              rowsPerPageOptions={[50]}
              component="div"
              count={count}
              rowsPerPage={10}
              page={page}
              onPageChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </Grid>

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
            <div className={classes.heading + " " + classes.inputRoot}>
              <Typography variant="subtitle2" className={classes.inputRoot} style={{ position: "absolute", zIndex: 1, background: '#fff', top: 0, padding: "6px 30px" }}>
                Job Description
              </Typography>
              <div className={classes.drawerClose}>
                <CloseIcon className={classes.closeBtn} onClick={handleModalClose} />
              </div>
            </div>
            <Grid item xs={12}>
              {fileExtension === "pdf" ?
                <CustomPdfView resumeUrl={requirementsView?.jd} />
                :
                <div className={classes.iframediv} style={{ marginTop: "40px" }}>
                  <iframe
                    src={
                      "https://docs.google.com/a/umd.edu/viewer?url=" +
                      requirementsView?.jd +
                      "&embedded=true"
                    }
                    title="File"
                    width="100%" height="500" sandbox="allow-scripts allow-same-origin"
                  >
                  </iframe>
                  <div className={classes.iframeLogo} >
                  </div>
                </div>
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


      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

