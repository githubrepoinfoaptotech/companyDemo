import React, { useState, useRef, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid, Button, TablePagination, Backdrop, CircularProgress, Avatar, SwipeableDrawer } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import moment from "moment";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";
import Tooltip from "@material-ui/core/Tooltip";
import Add from "../../components/Candidates/Add";
import View from "../../components/Candidates/View";
import Status from "../../components/Admin/SearchStatus";
import Bar from "../../components/Candidates/Bar";
import useStyles from "../../themes/style.js";
import ExpandButton from "../../components/Candidates/ExpandButton";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import external from "../../images/external.png";
import ViewIcon from "@material-ui/icons/Visibility";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import "react-toastify/dist/ReactToastify.css";

const positions = [toast.POSITION.TOP_RIGHT];

export default function Search(props) {
  var classes = useStyles();
  const messageRef = useRef();
  const mobileQuery = useMediaQuery('(max-width:600px)');
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const filterRef = useRef(null);
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [candidatesData, setCandidatesData] = useState([]);
  const [page, setPage] = useState(0);
  const [currerntPage, setCurrerntPage] = useState(1);
  const [rowsPerPage] = useState(50);
  const [validation, setValidation] = useState(false);
  const [recruitmentId, setRecruitmentId] = useState("");
  const [state, setState] = useState({
    bottom: false,
    right: false,
  });
  const [source, setSource] = useState([]);
  const [file, setFile] = useState([]);
  const [docFile, setDocFile] = useState([]);
  const [profile, setProfile] = useState([]);
  const [assessment, setAssessment] = useState([]);

  const [addList, setAddList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [requirement, setRequirement] = useState([]);
  const [setDay] = useState("");
  const [setMonth] = useState("");
  const [setYear] = useState("");
  const [dataList, setDataList] = useState("ADD");

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
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 60 }, (_, i) => moment(new Date()).format("YYYY") - i);
  const [recruitmentList, setRecruitmentList] = useState([]);


  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };


  const [skillSearch, setSkillSearch] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


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
    panNumber: "",
    linkedInProfile: "",
  });

  const [listCanditate, setListCanditate] = useState([]);

  const [candidateView, setCandidateView] = useState({
    id: "",
    chatId: "",
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    skills: "",
    location: "",
    experience: null,
    resume: "",
    clientName: "",
    requirementName: "",
    statusCode: "",
    source: "",
    requiremenUniqueId: "",
    candidateUniqueId: "",
    document: "",
    photo: "",
    gender: "",
    differentlyAbled: "",
    candidateProcessed: "",
    currentLocation: "",
    preferredLocation: "",
    nativeLocation: "",
    relevantExperience: null,
    currentCtc: null,
    expectedCtc: null,
    dob: "",
    noticePeriod: "",
    reasonForJobChange: "",
    reason: "",
    educationalQualification: "",
    alternateMobile: "",
    candidateRecruiterDiscussionRecording: "",
    candidateSkillExplanationRecording: "",
    candidateMindsetAssessmentLink: "",
    candidateAndTechPannelDiscussionRecording: "",
    mainId: "",
    isCandidateCpv: "",
    currentCompanyName: "",
    panNumber: "",
    linkedInProfile: "",
  });



  var [errorToastId, setErrorToastId] = useState(null);

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


  const [phoneValidation, setPhoneValidation] = useState(false);



  const validationSchema = Yup.object().shape({
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
    requirementId: Yup.string().required("Requirement Name is required"),
    skills: Yup.string().required('Skill is required'),
    source: decode.role === "FREELANCER" || decode.role === "SUBVENDOR" ? Yup.string() : Yup.string().required("Source is required"),
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
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  function handleUse(id) {

    setCandidate({
      ...candidate,
      requirementId: "",
      source: "",
      email: "",
      firstName: "",
      lastName: "",
      skills: "",
      location: "",
      experience: null,
      gender: "",
      differentlyAbled: "",
      candidateProcessed: "",
      native: "",
      preferredLocation: "",
      relevantExperience: null,
      educationalQualification: "",
      currentCtc: null,
      expectedCtc: null,
      noticePeriod: "",
      reasonForJobChange: "",
      reason: "",
      dob: "",
      candidateRecruiterDiscussionRecording: "",
      candidateSkillExplanationRecording: "",
      candidateMindsetAssessmentLink: "",
      candidateAndTechPannelDiscussionRecording: "",
      freeValue: decode.isEnableFree === true ? "YES" : decode.isEnablePaid === true ? "NO" : "YES",
      panNumber: "",
      linkedInProfile: "",
    });

    setPhoneValidation(false);
    setRecruitmentId("");
    setState({ ...state, right: true });
    setValidation(false);
    setFile([]);
    setDocFile([]);
    setProfile([]);
    setAssessment([]);
    setDataList("ADD");

    axios({
      method: "post",
      url: props.CandidateDetailExistUrl,
      data: {
        id: id
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {

        reset({
          requirementId: recruitmentId,
          mobile: response.data.data?.mobile.substring(2),
          email: response.data.data?.email,
          firstName: response.data.data?.firstName,
          lastName: response.data.data?.lastName,
          skills: response.data.data?.skills,
          experience: response.data.data?.experience,
          location: response.data.data?.currentLocation,
          candidateProcessed: response.data.data?.candidateProcessed,
          native: response.data.data?.nativeLocation,
          preferredLocation: response.data.data?.preferredLocation,
          relevantExperience: response.data.data?.relevantExperience,
          educationalQualification: response.data.data?.educationalQualification,
          gender: response.data.data?.gender,
          differentlyAbled: response.data.data?.differentlyAbled,
          currentCtc: response.data.data?.currentCtc,
          expectedCtc: response.data.data?.expectedCtc,
          noticePeriod: response.data.data?.noticePeriod,
          reasonForJobChange: response.data.data?.reasonForJobChange,
          reason: response.data.data?.reason,
          currentCompanyName: response.data.data?.currentCompanyName,
        })

        setCandidate({
          ...candidate,
          mobile: response.data.data?.mobile.substring(2),
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
          educationalQualification: response.data.data?.educationalQualification,
          gender: response.data.data?.gender,
          differentlyAbled: response.data.data?.differentlyAbled,
          currentCtc: response.data.data?.currentCtc,
          expectedCtc: response.data.data?.expectedCtc,
          noticePeriod: response.data.data?.noticePeriod,
          reasonForJobChange: response.data.data?.reasonForJobChange,
          reason: response.data.data?.reason,
          currentCompanyName: response.data.data?.currentCompanyName,
          freeValue: decode.isEnableFree === true ? "YES" : decode.isEnablePaid === true ? "NO" : "YES",
          panNumber: response.data.data?.panNumber,
          linkedInProfile: response.data.data?.linkedInProfile,
        });
      }
    });

  }

  useEffect(() => {
    axios({
      method: "post",
      url: props.RequirementListUrl,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setRequirement(response.data.data);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    axios({
      method: "post",
      url: props.SourcesListUrl,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [token]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setCurrerntPage(newPage + 1);
    setLoader(true);
    var data = JSON.stringify({
      page: newPage + 1,
      skills: skillSearch.join(", ")
    });

    axios({
      method: "post",
      url: props.CandidateSearchUrl,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setCandidatesData(response.data.data);
        setCount(response.data.count);
      }

      setLoader(false);
    });
  };

  function getFilterData() {
    setLoader(true);
    setCurrerntPage(1);
    setPage(0);

    var data = JSON.stringify({
      page: 1,
      skills: skillSearch.join(", ")
    });

    axios({
      method: "post",
      url: props.CandidateSearchUrl,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {

        if (response.data.status === true) {
          setLoader(false);
          setCandidatesData(response.data.data);
          setCount(response.data.count);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  }



  function handleShow(values, name) {
    setLoader(true);

    axios({
      method: "post",
      url: props.CandidateViewUrl,
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

          setCandidateView({
            ...candidateView,
            id: response.data.data.id,
            chatId: response.data.chatUser?.id,
            email: response.data.data.candidateDetail?.email,
            mobile: response.data.data.candidateDetail?.mobile,
            cc: response.data.data.requirement?.recruiter?.firstName + " " + response.data.data.requirement?.recruiter?.lastName,
            firstName: response.data.data.candidateDetail?.firstName,
            lastName: response.data.data.candidateDetail?.lastName,
            skills: response.data.data.candidateDetail?.skills,
            clientName: response.data.data.requirement?.client?.clientName,
            requirementName: response.data.data.requirement?.requirementName,
            statusCode: response.data.data.statusList?.statusCode,
            source: response.data.data.source?.name,
            invoiceValue: response.data.data.invoiceValue,
            requiremenUniqueId: response.data.data.requirement?.uniqueId,
            candidateUniqueId: response.data.data.uniqueId,
            isAnswered: response.data.data.isAnswered,
            currentLocation: response.data.data.candidateDetail?.currentLocation,
            preferredLocation: response.data.data.candidateDetail?.preferredLocation,
            nativeLocation: response.data.data.candidateDetail?.nativeLocation,
            experience: response.data.data.candidateDetail?.experience,
            relevantExperience: response.data.data.candidateDetail?.relevantExperience,
            currentCtc: response.data.data.candidateDetail?.currentCtc,
            expectedCtc: response.data.data.candidateDetail?.expectedCtc,
            dob: response.data.data.candidateDetail?.dob,
            noticePeriod: response.data.data.candidateDetail?.noticePeriod,
            reasonForJobChange: response.data.data.candidateDetail?.reasonForJobChange,
            reason: response.data.data.candidateDetail?.reason,
            candidateProcessed: response.data.data.candidateDetail?.candidateProcessed,
            differentlyAbled: response.data.data.candidateDetail?.differentlyAbled,
            educationalQualification: response.data.data.candidateDetail?.educationalQualification,
            document: response.data.data.candidateDetail?.document,
              photo: response.data.data.candidateDetail?.photo,
            gender: response.data.data.candidateDetail?.gender,
            alternateMobile: response.data.data.candidateDetail?.alternateMobile,
            resume: response.data.data.candidateDetail?.resume,
            candidateRecruiterDiscussionRecording: response.data.data.candidateRecruiterDiscussionRecording,
            candidateSkillExplanationRecording: response.data.data.candidateSkillExplanationRecording,
            candidateMindsetAssessmentLink: response.data.data.candidateMindsetAssessmentLink,
            candidateAndTechPannelDiscussionRecording: response.data.data.candidateAndTechPannelDiscussionRecording,
            mainId: response.data.data.mainId,
            isCandidateCpv: response.data.data.isCandidateCpv,
            currentCompanyName: response.data.data.candidateDetail?.currentCompanyName,
            panNumber: response.data.data.candidateDetail?.panNumber,
            linkedInProfile: response.data.data.candidateDetail?.linkedInProfile,
          });
          setDataList("VIEW");
          setState({ ...state, right: true });

          setLoader(false);
        } else {
          setLoader(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    axios({
      method: "post",
      url: props.AllCandidateStatus,
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

          setListCanditate(response.data.data);


        }
      })
      .catch(function (error) {
        console.log(error);
      });


  }



  function handleAdd(values) {

    if (decode.role !== "FREELANCER" && decode.role !== "SUBVENDOR") {

      return new Promise((resolve) => {
        if (validation === true) {


        } else {
          setAddList(values);


          axios({
            method: "post",
            url: props.RequirementUrl,
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


    } else {

      setLoader(true);

      return new Promise((resolve) => {
        if (validation === true) {
        } else {

          axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER}recruiter/getRequirement`,
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

  }

  function CheckAlreadyExit(values) {
    var dob = values.day + "-" + values.month + "-" + values.year;


    if (decode.role !== "FREELANCER" && decode.role !== "SUBVENDOR") {


      axios({
        method: "post",
        url: props.CandidateExistUrl,
        data: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          mobile: values.mobile,
          requirementId: recruitmentId,
          skills: values.skills,
          sourceId: values.source,
          isAnswered: values.freeValue,
          message: "",
          experience: values.experience,
          currentLocation: values.location,
          alternateMobile: values.alternateMobile,
          preferredLocation: values.preferredLocation,
          nativeLocation: values.native,
          relevantExperience: values.relevantExperience,
          currentCtc: values.currentCtc,
          expectedCtc: values.expectedCtc,
          dob: values.day === undefined ? dob : dob !== "--" ? dob : dob,
          noticePeriod: values.noticePeriod,
          reasonForJobChange: values.reasonForJobChange,
          candidateProcessed: values.candidateProcessed,
          differentlyAbled: values.differentlyAbled,
          educationalQualification: values.educationalQualification,
          gender: values.gender,
          reason: values.reason,
          candidateRecruiterDiscussionRecording: values.candidateRecruiterDiscussionRecording,
          candidateSkillExplanationRecording: values.candidateSkillExplanationRecording,
          candidateMindsetAssessmentLink: values.candidateMindsetAssessmentLink,
          candidateAndTechPannelDiscussionRecording: values.candidateAndTechPannelDiscussionRecording,
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

    } else {


      setLoader(true);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}recruiter/candidateExist`,
        data: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          mobile: values.mobile,
          requirementId: recruitmentId,
          skills: values.skills,
          sourceId: values.source,
          isAnswered: candidate.freeValue,
          message: "",
          experience: values.experience,
          currentLocation: values.location,
          alternateMobile: values.alternateMobile,
          preferredLocation: values.preferredLocation,
          nativeLocation: values.native,
          relevantExperience: values.relevantExperience,
          currentCtc: values.currentCtc,
          expectedCtc: values.expectedCtc,
          dob: values.day === undefined ? dob : dob !== "--" ? dob : dob,
          noticePeriod: values.noticePeriod,
          reasonForJobChange: values.reasonForJobChange,
          candidateProcessed: values.candidateProcessed,
          differentlyAbled: values.differentlyAbled,
          educationalQualification: values.educationalQualification,
          gender: values.gender,
          reason: values.reason,
          sendMessage: ""
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {

        if (response.data.status === true) {


          handleAddLists(false, values);

        } else {
          handleNotificationCall("error", response.data.message);

        }
        setLoader(false);
      });

    }


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
      url = props.FreeCandidateUrl;
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
        sendMessage: send,
        candidateRecruiterDiscussionRecording: addList.candidateRecruiterDiscussionRecording,
        candidateSkillExplanationRecording: addList.candidateSkillExplanationRecording,
        candidateMindsetAssessmentLink: addList.candidateMindsetAssessmentLink,
        candidateAndTechPannelDiscussionRecording: addList.candidateAndTechPannelDiscussionRecording,
        currentCompanyName: addList.currentCompanyName,
        panNumber: addList.panNumber,
        linkedInProfile: addList.linkedInProfile,
      }
    } else {
      url = props.CandidateUrl;
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
        sendMessage: send,
        candidateRecruiterDiscussionRecording: addList.candidateRecruiterDiscussionRecording,
        candidateSkillExplanationRecording: addList.candidateSkillExplanationRecording,
        candidateMindsetAssessmentLink: addList.candidateMindsetAssessmentLink,
        candidateAndTechPannelDiscussionRecording: addList.candidateAndTechPannelDiscussionRecording,
        currentCompanyName: addList.currentCompanyName,
        panNumber: addList.panNumber,
        linkedInProfile: addList.linkedInProfile,
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
        const fileUploadTasks = [
          { file: file, uploadFunction: uploadResume },
          { file: docFile, uploadFunction: updateCandidateDocument },
          { file: profile, uploadFunction: updateCandidatePhoto },
          { file: assessment, uploadFunction: uploadAssessment }
        ];

        fileUploadTasks.forEach(({ file, uploadFunction }) => {
          if (file !== undefined && file.length !== 0) {
            uploadFunction(file, response.data.candidateDetailsId);
          }
        });

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

        setState({ ...state, right: false });
        reset();


      } else {

        handleNotificationCall("error", response.data.message);
      }

      setValidation(false);
      setLoader(false);
    });



  }

  function handleAddLists(send, addList) {
    setLoader(true);

    var dob = addList.day + "-" + addList.month + "-" + addList.year;
    var message = "Hi " + requirementList.cand1_name + ", Can we chat today about a job opening " + localStorage.getItem('firstName') +
      ", " + localStorage.getItem('mobile') + ", " + localStorage.getItem('companyName') + ". Always reply by clicking back arrow button/right swipe only.";

    var data = {
      email: addList.email,
      firstName: addList.firstName,
      lastName: addList.lastName,
      mobile: addList.mobile,
      requirementId: recruitmentId,
      skills: addList.skills,
      sourceId: addList.source,
      isAnswered: candidate.freeValue,
      message: message,
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
      sendMessage: send,
      candidateRecruiterDiscussionRecording: addList.candidateRecruiterDiscussionRecording,
      candidateSkillExplanationRecording: addList.candidateSkillExplanationRecording,
      candidateMindsetAssessmentLink: addList.candidateMindsetAssessmentLink,
      candidateAndTechPannelDiscussionRecording: addList.candidateAndTechPannelDiscussionRecording,
      panNumber: addList?.panNumber,
      linkedInProfile: addList?.linkedInProfile,
    }

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/addFreeCandidate`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {


      if (response.data.status === true) {
        handleClose();
        const fileUploadTasks = [
          { file: file, uploadFunction: uploadResume },
          { file: docFile, uploadFunction: updateCandidateDocument },
          { file: profile, uploadFunction: updateCandidatePhoto },
          { file: assessment, uploadFunction: uploadAssessment }
        ];

        fileUploadTasks.forEach(({ file, uploadFunction }) => {
          if (file !== undefined && file.length !== 0) {
            uploadFunction(file, response.data.candidateDetailsId);
          }
        });

        handleNotificationCall("success", response.data.message);


        setState({ ...state, right: false });
        reset();
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
      url: props.CandidateResumeUrl,
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

  function updateCandidateDocument(File, Id) {
    if (File && File?.size >= 25000000) {
      handleNotificationCall("error", "Maximum File Size Limit 25mb");
      return;
    }

    var FormData = require("form-data");
    var data = new FormData();
    data.append("document", File);
    data.append("id", Id);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/updateCandidateDocument`,
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

  function updateCandidatePhoto(File, Id) {
    if (File && File?.size >= 10485760) {
      handleNotificationCall("error", "Maximum File Size Limit 10mb");
      return;
    }

    var FormData = require("form-data");
    var data = new FormData();
    data.append("image", File);
    data.append("id", Id);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/updateCandidatePhoto`,
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
      url = props.YesCadidateStatusUrl;
    } else {
      url = props.TemplateMessageUrl;
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

      setLoader(false);
    });
  }

  function getmessageIni() {
    axios({
      method: "post",
      url: props.MyWalletUrl,
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

  const handle = (e) => {
    const value = [];
    e.map((name) => (name !== " " ? value.push(name) : ""));
    setSkillSearch(value);
  };

  const resetForm = (e) => {
    filterRef.current.reset();
    setSkillSearch([]);
    setCandidatesData([]);
  };


  const components = {
    ExpandButton: function (props) {
      return <ExpandButton {...props} />;
    },
  };

  const HeaderElements = () => (
    <>
      <Grid className={classes.HeaderElements}>

        Total : {count}
      </Grid>
    </>
  );

  const table_options = {
    textLabels: {
      body: {
        noMatch: 'Oops! Matching record could not be found',
      }
    },
    search: false,
    pagination: false,
    sort: false,
    selectableRows: "none",
    filter: false,
    print: false,
    download: false,
    customToolbar: () => <HeaderElements />,
    onFilterChange: (changedColumn, filterList) => { },
    filterType: "dropdown",
    rowsPerPage: 50,
    // rowsExpanded: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    responsive: mobileQuery === true ? 'vertical' : 'standard',
    renderExpandableRow: (rowData, rowMeta) => {
      const list = candidatesData[rowMeta.rowIndex];

      return (
        <React.Fragment>
          <tr>
            <td colSpan={16}>
              <Bar
                title="Candidates"
                list={list}

              />
            </td>
          </tr>
        </React.Fragment>
      );
    },
    page: page,
  };


  const list = (anchor) =>
    dataList === "ADD" ? (
      <Add
        setValidation={setValidation}
        validation={validation}
        handleAddList={handleAddList}
        register={register}
        source={source}
        recruitmentList={recruitmentList}
        handleClose={handleClose}
        errors={errors}
        setLoader={setLoader}
        toggleDrawer={toggleDrawer}
        setRecruitmentList={setRecruitmentList}
        requirementList={requirementList}
        handleSubmit={handleSubmit}
        handleAdd={handleAdd}
        requirement={requirement}
        isSubmitting={isSubmitting}
        open={open}
        messageRef={messageRef}
        reset={reset}
        setCandidate={setCandidate}
        candidate={candidate}
        setFile={setFile}
        setDocFile={setDocFile}
        setProfile={setProfile}
        file={file}
        docFile={docFile}
        profile={profile}
        assessment={assessment}
        setAssessment={setAssessment}
        setRecruitmentId={setRecruitmentId}
        recruitmentId={recruitmentId}
        days={days}
        months={months}
        years={years}
        setDay={setDay}
        setMonth={setMonth}
        setYear={setYear}
        setPhoneValidation={setPhoneValidation}
        requirementId={"true"}
      />

    ) : (
      <>
        <View
          candidateView={candidateView}
          toggleDrawer={toggleDrawer}
          listCanditate={listCanditate}
          candidatesEdit={candidateView}
          setCandidateView={setCandidateView}
        />
      </>
    );

  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.heading}>
        <Grid item xs={9} sm={7} md={8} lg={6}>

          <PageTitle title="Search Candidates" />
        </Grid>

        <Grid item xs={3} sm={5} md={4} lg={6} className={classes.drawerClose}>

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




          <TagsInput value={skillSearch}
            onChange={handle}
            separators={["Enter", ","]}
            className={classes.fullWidth}
            id="skills"
            name="skills"
            placeHolder="Press Enter or Comma to Add a New Skills"
            classes={{ root: classes.customTextField }}
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
            components={components}
            options={table_options}
            columns={[
              {
                name: "S.No",
              },
              {
                name: "Action",
              },
              {
                name: "Status",
              },
              {
                name: "Candidate Name",
              },
              {
                name: "Email ID / Mobile",
              },
              {
                name: "Requirement Name",
              },
              {
                name: decode.companyType === "COMPANY" ? "Hiring Manager" : "Client Coordinator",
              },
              {
                name: "Recruiter Name",
              },
              {
                name: "Posted Date",
              },
            ]}
            data={candidatesData.map((item, index) => {

              return [
                <>
                  {currerntPage !== 0
                    ? 10 * currerntPage - 10 + index + 1
                    : index + 1}
                </>,

                <Grid container className={classes.space}>
                  <Tooltip title="View Candidate" placement="right" aria-label="view">
                    <ViewIcon
                      className={classes.toolIcon}
                      onClick={(e) => { handleShow(item.id, "VIEW") }}
                    />
                  </Tooltip>
                  {decode.role !== "FREELANCER" && decode.role !== "SUBVENDOR" ?

                    <Tooltip
                      title="Reuse Candidate"
                      placement="right"
                      aria-label="Reuse Candidate"
                      onClick={(e) => { handleUse(item.candidateDetailId) }}
                    >
                      <PersonAddIcon
                        className={classes.toolIcon}

                      />
                    </Tooltip>

                    : ""} </Grid>,

                item.statusCode ? (
                  <>
                    <Status
                      list={item}


                    />
                  </>
                ) : (
                  ""
                ),

                <Grid container row spacing={2} className={classes.externalIconContainer}>

                  {item.candidateDetail?.isExternal === "YES" ?
                    <Tooltip title="SUBVENDOR" placement="bottom" aria-label="title">
                      <Avatar alt="Profile" src={external} className={classes.externalIcon} />
                    </Tooltip> : ""}
                  <div>
                    {item.candidateDetail?.firstName + " " + item.candidateDetail?.lastName}    <br />  {"(" + item.uniqueId + ")"}
                  </div>

                </Grid>,
                item.mainId === decode.mainId ?
                  <>  {item.candidateDetail?.email + " /"} <br />{"91 " + item.candidateDetail?.mobile.slice(2)}  </>
                  : item.hideContactDetails !== true ?
                    <>  {item.candidateDetail?.email + " /"} <br />{"91 " + item.candidateDetail?.mobile.slice(2)}  </>
                    : "",
                item.requirement?.requirementName + " (" + item.requirement?.uniqueId + ")",
                item.requirement?.client?.handler?.firstName + " " + item.requirement?.client?.handler?.lastName,
                item.recruiter?.firstName + " " + item.recruiter?.lastName,
                moment(item.createdAt).format("DD-MM-YYYY"),
              ];
            })}
          />

          <Grid container spacing={2} className={classes.pagination}>
            <TablePagination
              rowsPerPageOptions={[50]}
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </Grid>

      <SwipeableDrawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
        classes={{ paper: dataList === "VIEW" ? classes.drawer : classes.clientDrawer }}
      >
        {list("right")}
      </SwipeableDrawer>


      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

