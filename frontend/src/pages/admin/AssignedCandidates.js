import React, { useState, useEffect, useReducer, useRef } from "react";
import MUIDataTable from "mui-datatables";
import {
  Grid,
  Button,
  TextField,
  SwipeableDrawer,
  TablePagination,
  Backdrop,
  CircularProgress,
  Avatar
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import { toast } from "react-toastify";
//import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
//import classNames from "classnames";
import { useHistory } from "react-router-dom";
import external from "../../images/external.png";
// import { saveAs } from "file-saver";
// import XlsxPopulate from "xlsx-populate";
import ViewIcon from "@material-ui/icons/Visibility";
import DescriptionIcon from '@material-ui/icons/Description';
//import GetAppIcon from "@material-ui/icons/GetApp";

import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";

import { useForm } from "react-hook-form";
import Notification from "../../components/Notification";

import Status from "../../components/Admin/Status";
import Dialogs from "../../components/Admin/Dialogs";
import ResumeDialog from "../../components/Candidates/Dialogs";
import Drop from "../../components/Candidates/Drop";
import Reverse from "../../components/Admin/Reverse";
import Actions from "../../components/Candidates/Actions";

import Add from "../../components/Candidates/Add";
import Edit from "../../components/Candidates/Edit";
import View from "../../components/Candidates/View";
import Note from "../../components/Candidates/Note";
import Bar from "../../components/Candidates/Bar";
import Message from "../../components/Candidates/Message";
import ExpandButton from "../../components/Candidates/ExpandButton";
import useStyles from "../../themes/style.js";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import "react-toastify/dist/ReactToastify.css";

const positions = [toast.POSITION.TOP_RIGHT];

export default function Candidates(props) {

  var classes = useStyles();
  const messageRef = useRef()
  const candidate_search = props.location.search;
  const history = useHistory();
  const mobileQuery = useMediaQuery('(max-width:600px)');
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);


  const filterRef = useRef(null);
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [candidateList, setCandidateList] = useState({
    id: "",
    name: "",
    mobile: "",
    message: "",
    rec_name: "",
    rec_mobile_no: "",
  });
  const [state, setState] = useState({
    bottom: false,
    right: false,
  });

  const [candidatesData, setCandidatesData] = useState([]);
  const [search, setSearch] = useState(new URLSearchParams(candidate_search).get('search'));

  //Action Button Popper
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const handleMenuClick = (index, event) => {
    if (activeIndex === index) {
      setAnchorEl(null);
      setActiveIndex(null);
    } else {
      setAnchorEl(event.currentTarget);
      setActiveIndex(index);
    }
  };

  const [date, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

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


  function handleUse(mobile) {
    history.push("admin_candidates");
    sessionStorage.setItem('use', mobile);

    setState({ ...state, right: true });
    setDataList("ADD");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/checkCandidateDetailExist`,
      data: {
        mobile: mobile.substring(2)
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {

        // reset({
        //   requirementId:recruitmentId, 
        //   mobile: mobile.substring(2),
        //   email: response.data.data?.email,
        //   firstName: response.data.data?.firstName,
        //   lastName: response.data.data?.lastName,
        //   skills: response.data.data?.skills,  
        //   experience: response.data.data?.experience, 
        //   location: response.data.data?.currentLocation, 
        //    candidateProcessed:  response.data.data?.candidateProcessed,
        //   native:  response.data.data?.nativeLocation,
        //   preferredLocation:  response.data.data?.preferredLocation,
        //   relevantExperience: response.data.data?.relevantExperience,
        //   educationalQualification:  response.data.data?.educationalQualification,
        //   gender: response.data.data?.gender,
        //   differentlyAbled: response.data.data?.differentlyAbled,
        //   currentCtc: response.data.data?.currentCtc,
        //   expectedCtc:  response.data.data?.expectedCtc,
        //   noticePeriod: response.data.data?.noticePeriod,
        //   reasonForJobChange: response.data.data?.reasonForJobChange,
        //   reason: response.data.data?.reason,
        //   currentCompanyName: response.data.data?.currentCompanyName,
        //   })

        setCandidate({
          ...candidate,
          mobile: mobile.substring(2),
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
          candidateRecruiterDiscussionRecording: response.data.data?.candidateRecruiterDiscussionRecording,
          candidateSkillExplanationRecording: response.data.data?.candidateSkillExplanationRecording,
          candidateMindsetAssessmentLink: response.data.data?.candidateMindsetAssessmentLink,
          candidateAndTechPannelDiscussionRecording: response.data.data?.candidateAndTechPannelDiscussionRecording,
          currentCompanyName: response.data.data?.currentCompanyName,
          freeValue: decode.isEnableFree === true ? "YES" : decode.isEnablePaid === true ? "NO" : "YES",
        });
      }
    });

  }


  const [candidatesNote, setCandidatesNote] = useState([]);
  const [candidatesEdit, setCandidatesEdit] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    skills: "",
    requirementName: "",
    source: "",
    invoicedDate: "",
    joinedDate: "",
    invoiceValue: "",
    location: "",
    experience: null,
    resume: "",
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
    recruiterId: "",
    currentCompanyName: "",
    hideContactDetails: false,
    panNumber: "",
    linkedInProfile: "",
  });

  const [candidateView, setCandidateView] = useState({
    id: "",
    chatId: "",
    email: "",
    firstName: "",
    lastName: "",
    cc: "",
    mobile: "",
    skills: "",
    clientName: "",
    requirementName: "",
    statusCode: "",
    source: "",
    invoiceValue: "",
    requiremenUniqueId: "",
    candidateUniqueId: "",
    location: "",
    experience: null,
    document: "",
    photo: "",
    resume: "",
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

  const [page, setPage] = useState(0);
  const [currerntPage, setCurrerntPage] = useState(1);
  const [rowsPerPage] = useState(50);

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const joiningRef = useRef();
  const invoiceRef = useRef();
  const [file, setFile] = useState([]);
  const [assessment, setAssessment] = useState([]);
  const [hideContactDetails, setHideContactDetails] = useState(false);

  const [dataList, setDataList] = useState("ADD");
  const [requirement, setRequirement] = useState([]);
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

  const [shortList, setShortList] = useState({
    id: "",
    cand_name: "",
    job_id: "",
    job_name: "",
    rec_name: "",
    rec_mobile_no: "",
    cand_mobile: "",
    statusCode: "",
    free: "",
  });

  const [recruitmentList, setRecruitmentList] = useState([]);

  const [validation, setValidation] = useState(false);

  const [addList, setAddList] = useState([]);
  const [source, setSource] = useState([]);
  const [saveOnly, setSaveOnly] = useState("YES");


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
    candidateRecruiterDiscussionRecording: Yup.string().nullable().notRequired(),
    candidateSkillExplanationRecording: Yup.string().nullable().notRequired(),
    candidateMindsetAssessmentLink: Yup.string().nullable().notRequired(),
    candidateAndTechPannelDiscussionRecording: Yup.string().nullable().notRequired(),
    preferredLocation: Yup.string().nullable().notRequired(),
    relevantExperience: Yup.number().nullable(true).transform((_, val) => val ? Number(val) : null),
    currentCompanyName: Yup.string().nullable().notRequired(),
    panNumber: Yup.string(),
    linkedInProfile: Yup.string(),
  });

  const editSchema = Yup.object().shape({
    email: candidatesEdit.recruiterId === decode.recruiterId ? Yup.string().email("Email must be a Valid Email Address").required('Email is required') : Yup.string().email("Email must be a Valid Email Address"),
    firstName: Yup.string()
      .max(255)
      .required("First Name is required")
      .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: "First Name be Alphanumeric",
      }),
    lastName: Yup.string()
      .max(255)
      .required("Last Name is required")
      .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: "Last Name be Alphanumeric",
      }),
    skills: Yup.string().required("Skill is required"),
    source: Yup.string().required("Source is required"),
    experience: Yup.number().nullable(true).transform((_, val) => val ? Number(val) : null),
    location: Yup.string().nullable().notRequired(),
    alternateMobile: phoneValidation === true ? Yup.string().required('Alternate Contact Number is required').min(10, "Must be exactly 10 digits").max(10, "Must be exactly 10 digits") : Yup.string(),
    native: Yup.string().nullable().notRequired(),
    preferredLocation: Yup.string().nullable(),
    relevantExperience: Yup.number().nullable(true).transform((_, val) => val ? Number(val) : null),
    educationalQualification: Yup.string().nullable().notRequired(),
    day: Yup.string().nullable().notRequired(),
    month: Yup.string().nullable().notRequired(),
    year: Yup.string().nullable().notRequired(),
    gender: Yup.string().nullable().required('Gender is required'),
    differentlyAbled: Yup.string().nullable().notRequired(),
    currentCtc: Yup.number().nullable(true).transform((_, val) => val ? Number(val) : null),
    expectedCtc: Yup.number().nullable(true).transform((_, val) => val ? Number(val) : null),
    noticePeriod: Yup.string().nullable().notRequired(),
    reasonForJobChange: Yup.string().nullable().notRequired(),
    candidateProcessed: Yup.string().nullable().notRequired(),
    reason: Yup.string().nullable().notRequired(),
    candidateRecruiterDiscussionRecording: Yup.string().nullable().notRequired(),
    candidateSkillExplanationRecording: Yup.string().nullable().notRequired(),
    candidateMindsetAssessmentLink: Yup.string().nullable().notRequired(),
    candidateAndTechPannelDiscussionRecording: Yup.string().nullable().notRequired(),
    invoiceDate: Yup.string(),
    invoicedValue: Yup.string(),
    joinedDate: Yup.string(),
    currentCompanyName: Yup.string().nullable().notRequired(),
    panNumber: Yup.string(),
    linkedInProfile: Yup.string(),
  });

  const invoiceSchema = Yup.object().shape({
    invoice: Yup.number().test('len', 'Must be exactly 15 digits', val => Math.ceil(Math.log10(val + 1)) <= 15).required("Invoice Value is required").nullable(true).transform((_, val) => val ? Number(val) : null),
  });

  const noteSchema = Yup.object().shape({
    message: Yup.string().required("Message is required"),
  });

  const dropSchema = Yup.object().shape({
    reason: Yup.string().required("Reason is required"),
  });


  const {
    register: dropCandidates,
    formState: { errors: dropErrors },
    handleSubmit: dropSubmit,
    reset: dropReset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(dropSchema),
  });

  const {
    register: noteCandidates,
    formState: { errors: noteErrors },
    handleSubmit: noteSubmit,
    reset: noteReset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(noteSchema),
  });

  const {
    register: invoiceCandidates,
    formState: { errors: invoiceErrors },
    handleSubmit: invoiceSubmit,
    reset: invoicereset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(invoiceSchema),
  });

  const {
    register: editCandidates,
    formState: { errors: editErrors, isSubmitting: editIsSubmitting },
    handleSubmit: editSubmit,
    reset: editreset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(editSchema),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });



  useEffect(() => {


    setLoader(true);


    const fetchData = async () => {
      setCurrerntPage(1);
      setPage(0);

      const form = filterRef.current;


      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/viewRequirementCandidates`,
        data: {
          page: "1",
          search: `${form["search"].value}`,
          requirementId: sessionStorage.getItem("recruitmentId") !== null ? sessionStorage.getItem("recruitmentId") : ""

        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          setLoader(false);

          setCandidatesData(response.data.data);
          setCount(response.data.count);
        }
      });
    };




    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducerValue, token, new URLSearchParams(candidate_search).get('search'), sessionStorage.getItem("use")]);




  function updateData(id) {


    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/getAllCandidateStatus`,
      data: {
        id: id,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {

        if (response.data.status === true) {

          var myCandidateStatuses = response.data.data;

          axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER}admin/viewCandidate`,
            data: {
              id: id,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          })
            .then(function (result) {

              if (result.data.status === true) {

                const updateState = candidatesData.map(item => {

                  if (item.id === id) {
                    return {
                      ...item,
                      candidateDetail: result.data.data.candidateDetail,
                      invoiceValue: result.data.data.invoiceValue,
                      invoicedDate: result.data.data.invoicedDate,
                      joinedDate: result.data.data.joinedDate,
                      statusCode: result.data.data.statusList.statusCode,
                      statusList: result.data.data.statusList,
                      myCandidateStatuses: myCandidateStatuses,
                      droppedReason: result.data.data.droppedReason,
                      ditchReason: result.data.data.ditchReason,
                      creditNoteReason: result.data.data.creditNoteReason,
                    };

                  }
                  return item;
                });

                setCandidatesData(updateState);
              }
              setLoader(false);
            });

        }
      })
      .catch(function (error) {
        console.log(error);
      });


  }


  function handleAddNotes(values) {
    return new Promise((resolve) => {
      setLoader(true);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}recruiter/addCandidateNotes`,
        data: {
          candidateId: candidatesEdit.id,
          message: values.message,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        resolve();
        if (response.data.status === true) {
          handleNotificationCall("success", response.data.message);
          forceUpdate();
          setState({ ...state, right: false });
        } else {
          handleNotificationCall("error", response.data.message);
        }
        setLoader(false);
      });
    });
  }

  const handleFromDateChange = (event) => {
    setFromDate(filterRef.current.fromDate.value);
  };

  const handleToDateChange = (event) => {
    setToDate(filterRef.current.toDate.value);
  };

  const resetForm = (e) => {
    filterRef.current.reset();
    //  setRecruiterId(null); 
    setSearch("");
    history.push("/app/admin_candidates?search=");
    sessionStorage.removeItem('recruitmentId');
    forceUpdate();
  };

  useEffect(() => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/requirementList`,
      data: {
        page: "1",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setRequirement(response.data.data);
      }
    });
  }, [token]);

  useEffect(() => {
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
  }, [token]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setCurrerntPage(newPage + 1);
    setLoader(true);

    const form = filterRef.current;
    var data = JSON.stringify({
      page: newPage + 1,
      search: `${form["search"].value}`,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
      requirementId: sessionStorage.getItem("recruitmentId") !== null ? sessionStorage.getItem("recruitmentId") : ""
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/viewRequirementCandidates`,
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
    const form = filterRef.current;
    var data = JSON.stringify({
      page: 1,
      search: `${form["search"].value}`,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
      requirementId: sessionStorage.getItem("recruitmentId") !== null ? sessionStorage.getItem("recruitmentId") : ""
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/viewRequirementCandidates`,
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

  const [listCanditate, setListCanditate] = useState([]);


  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const [open, setOpen] = React.useState(false);
  const [stausOpen, setStatusOpen] = React.useState(false);
  const [stausNewOpen, setStatusNewOpen] = React.useState(false);
  const [dropOpen, setDropOpen] = React.useState(false);
  const [reverseOpen, setReverseOpen] = React.useState(false);
  const [messageOpen, setMessageOpen] = React.useState(false);

  const [resumeOpen, setResumeOpen] = React.useState(false);

  const handleResumeClose = () => {
    setResumeOpen(false);
  };

  const handleResumeOpen = () => {
    setResumeOpen(true);
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
    candidateRecruiterDiscussionRecording: "",
    candidateSkillExplanationRecording: "",
    candidateMindsetAssessmentLink: "",
    candidateAndTechPannelDiscussionRecording: "",
    freeValue: decode.isEnableFree === true ? "YES" : decode.isEnablePaid === true ? "NO" : "YES",

  });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusOpen = () => {
    setStatusOpen(true);
  };

  const handleStatusClose = () => {
    setStatusOpen(false);
  };

  const handleStatusNewOpen = () => {
    setStatusNewOpen(true);
  };

  const handleStatusNewClose = () => {
    setStatusNewOpen(false);

  };

  const handleMessageOpen = () => {
    setMessageOpen(true);
  };

  const handleMessageClose = () => {
    setMessageOpen(false);
  };

  const handleDropOpen = () => {
    setDropOpen(true);
  };

  const handleDropClose = () => {
    setDropOpen(false);
  };

  const handleReverseOpen = () => {
    setReverseOpen(true);
  };

  const handleReverseClose = () => {
    setReverseOpen(false);
  };

  const [dropReasonOpen, setDropReasonOpen] = useState(false);

  const handleDropReasonOpen = () => {

    setDropReasonOpen(true);
    setStatusOpen(false);
  };

  const handleDropReasonClose = () => {
    setDropReasonOpen(false);
  };


  const reasonRef = useRef()

  const [reasonOpen, setReasonOpen] = useState(false);

  const handleReasonOpen = () => {
    setStatusOpen(false);
    setStatusNewOpen(false);
    setReasonOpen(true);
  };

  const handleReasonClose = () => {
    setReasonOpen(false);
  };

  const [changeMessageOpen, setChangeMessageOpen] = useState(false);


  const handleChangeMessageOpen = () => {
    setChangeMessageOpen(true);
    handleStatusClose();
  };

  const handleChangeMessageClose = () => {
    setChangeMessageOpen(false);
  };


  const [view, setView] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");



  const [recruitmentId, setRecruitmentId] = useState("");


  function handleAdd(values) {

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
        candidateRecruiterDiscussionRecording: addList.candidateRecruiterDiscussionRecording,
        candidateSkillExplanationRecording: addList.candidateSkillExplanationRecording,
        candidateMindsetAssessmentLink: addList.candidateMindsetAssessmentLink,
        candidateAndTechPannelDiscussionRecording: addList.candidateAndTechPannelDiscussionRecording,
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

  function handleEdit(values) {

    return new Promise((resolve) => {
      if (!values.day || !values.month || !values.year) {
        handleNotificationCall("error", "Please select the date of birth properly.");
        return;
      }

      setLoader(true);
      var dob = values.day + "-" + values.month + "-" + values.year;
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/adminEditCandidate`,
        data: {
          id: candidatesEdit.id,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          mobile: values.mobile,
          skills: values.skills,
          experience: values.experience,
          currentLocation: values.location,
          sourceId: values.source,
          invoiceValue: values.invoicedValue,
          invoicedDate: values.invoicedDate,
          joinedDate: values.joinedDate,
          alternateMobile: values.alternateMobile,
          preferredLocation: values.preferredLocation,
          nativeLocation: values.native,
          relevantExperience: values.relevantExperience,
          currentCtc: values.currentCtc,
          expectedCtc: values.expectedCtc,
          dob: values.day === undefined ? candidatesEdit.dob : dob !== "--" ? dob : candidatesEdit.dob,
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
          hideContactDetails: candidatesEdit.hideContactDetails,
          currentCompanyName: values.currentCompanyName,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {

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

            setLoader(false);
            setState({ ...state, right: false });
            handleNotificationCall("success", response.data.message);

            updateData(candidatesEdit.id);

          } else {
            setLoader(false);
            handleNotificationCall("error", response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
        currentCompanyName: addList.currentCompanyName,
        sendMessage: send,
        panNumber: addList.panNumber,
        linkedInProfile: addList.linkedInProfile,
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
        currentCompanyName: addList.currentCompanyName,
        sendMessage: send,
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

        forceUpdate();
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

      handleStatusClose();
      handleStatusNewClose();
      setLoader(false);
    });
  }


  function changeStatus(send, message, status, candidateId) {
    setLoader(true);
    const template_name =
      shortList.statusCode === 303
        ? "1st_interview_round"
        : shortList.statusCode === 3031
          ? "initial_interview_rounds"
          : shortList.statusCode === 304
            ? status === "Schedule Another Interview"
              ? "initial_interview_rounds"
              : status === "Schedule Final Interview"
                ? "final_interview_round"
                : status === "Send Document"
                  ? "document_collect"
                  : ""
            : shortList.statusCode === 3041
              ? "document_collect"
              : shortList.statusCode === 305
                ? "salary_breakup_shared_confirmation"
                : shortList.statusCode === 307
                  ? "offer_released_confirmation"
                  : shortList.statusCode === 308
                    ? status === "Joining Confirmation"
                      ? "joining_confirmation"
                      : ""
                    : "";

    const vars =
      shortList.statusCode === 308
        ? [
          shortList.cand_name,
          shortList.job_id,
          shortList.rec_name,
          shortList.rec_mobile_no,
          localStorage.getItem('companyName'),
        ]
        : [
          shortList.cand_name,
          shortList.job_id,
          shortList.rec_name,
          shortList.rec_mobile_no,
          localStorage.getItem('companyName'),
        ];

    var url = "";
    if (shortList.free === "YES") {
      url = `${process.env.REACT_APP_SERVER}recruiter/changeYesCadidateStatus`;
    } else {
      url = `${process.env.REACT_APP_SERVER}chat/sendTemplateMessage`;
    }

    axios({
      method: "post",
      url: url,
      data: {
        sendMessage: send,
        candidateId: candidateId,
        phone_number: shortList.cand_mobile,
        template_name: template_name,
        vars: vars,
        message: message,
        candidate_name: shortList.cand_name,
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

        if (shortList.free === "YES" && send === true) {

          window.open(
            "https://api.whatsapp.com/send?phone=" +
            shortList.cand_mobile +
            "&text=" +
            message +
            "",
          );
        }

        setLoader(false);
        updateData(candidateId);
        handleNotificationCall("success", response.data.message);
        setState({ ...state, right: false });
      } else {
        setLoader(false);
        handleNotificationCall("error", response.data.message);
      }

      handleStatusClose();
      handleStatusNewClose();


    });


  }

  function joinedStatus() {
    setLoader(true);
    var url = `${process.env.REACT_APP_SERVER}recruiter/updateJoinedStatus`;

    axios({
      method: "post",
      url: url,
      data: {
        candidateId: shortList.id,
        joinedDate: joiningRef.current.value,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        handleStatusClose();
        handleStatusNewClose();
        updateData(shortList.id);
        handleNotificationCall("success", response.data.message);
      } else {
        handleNotificationCall("error", response.data.message);
        setLoader(false);
      }
    });


  }

  function creditNoteStatus() {
    setLoader(true);
    var url = `${process.env.REACT_APP_SERVER}admin/updateCrediNoteStatus`;

    axios({
      method: "post",
      url: url,
      data: {
        candidateId: shortList.id,
        creditNoteReason: reasonRef.current.value
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        handleStatusClose();
        handleReasonClose();
        updateData(shortList.id);
        handleNotificationCall("success", response.data.message);

      } else {
        handleNotificationCall("error", response.data.message);
        setLoader(false);
      }
    });
  }

  function updateJoiningDitchedStatus() {
    setLoader(true);
    var url = `${process.env.REACT_APP_SERVER}recruiter/updateJoiningDitchedStatus`;

    axios({
      method: "post",
      url: url,
      data: {
        candidateId: shortList.id,
        ditchReason: reasonRef.current.value
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        handleStatusClose();
        handleReasonClose();
        updateData(shortList.id);
        handleNotificationCall("success", response.data.message);
      } else {
        handleNotificationCall("error", response.data.message);
        setLoader(false);
      }
    });
  }

  function InvoicedStatus(values) {
    setLoader(true);
    var url = `${process.env.REACT_APP_SERVER}recruiter/updateInvoicedStatus`;

    return new Promise((resolve) => {
      axios({
        method: "post",
        url: url,
        data: {
          candidateId: shortList.id,
          invoice: values.invoice,
          invoicedDate: invoiceRef.current.value,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          updateData(shortList.id);
          handleStatusClose();
          resolve();
          handleNotificationCall("success", response.data.message);
        } else {
          handleNotificationCall("error", response.data.message);
          setLoader(false);
        }
      });
    });
  }


  function DropStatus(values) {
    setLoader(true);
    var url = `${process.env.REACT_APP_SERVER}recruiter/DropCandidate`;

    return new Promise((resolve) => {
      axios({
        method: "post",
        url: url,
        data: {
          id: shortList.id,
          droppedReason: values.reason
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {

          updateData(shortList.id);
          handleDropReasonClose();
          resolve();
          handleNotificationCall("success", response.data.message);
        } else {
          handleNotificationCall("error", response.data.message);
          setLoader(false);
        }
      });
    });
  }


  function changeStcStatus() {
    setLoader(true);

    var url = `${process.env.REACT_APP_SERVER}recruiter/updateStcStatus`;

    axios({
      method: "post",
      url: url,
      data: {
        id: shortList.id,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {

        updateData(shortList.id);
        handleChangeMessageClose();
        handleNotificationCall("success", response.data.message);
      } else {
        handleNotificationCall("error", response.data.message);
        setLoader(false);
      }
    });

  }

  function OfferDeclineStatus(values) {
    var url = `${process.env.REACT_APP_SERVER}recruiter/updateOfferDeclineStatus`;
    setLoader(true);
    return new Promise((resolve) => {
      axios({
        method: "post",
        url: url,
        data: {
          candidateId: shortList.id,
          offerDeclinedReason: reasonRef.current.value
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          updateData(shortList.id);
          handleReasonClose();
          resolve();
          handleNotificationCall("success", response.data.message);
        } else {
          handleNotificationCall("error", response.data.message);
          setLoader(false);
        }
      });
    });
  }


  const ExistCheck = (e) => {

    if (recruitmentId !== "") {

      CheckExitAlready(recruitmentId, e);

    } else {
      handleNotificationCall("error", "Select Requirement");
    }


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


  function handleShow(values, name) {
    setLoader(true);
    if (name === "EDIT") {
      setDataList("EDIT");
    } else if (name === "VIEW") {
      setDataList("VIEW");
    } else {
      setDataList("NOTES");
    }

    if (name !== "NOTES") {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/viewCandidate`,
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
              gender: response.data.data.candidateDetail?.gender,
              alternateMobile: response.data.data.candidateDetail?.alternateMobile,
              resume: response.data.data.candidateDetail?.resume,
              document: response.data.data.candidateDetail?.document,
              photo: response.data.data.candidateDetail?.photo,
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


            setCandidatesEdit({
              ...candidatesEdit,
              id: response.data.data.id,
              requirementName: response.data.data.requirement?.requirementName,
              email: response.data.data.candidateDetail?.email,
              mobile: response.data.data.candidateDetail?.mobile?.substring(2),
              firstName: response.data.data.candidateDetail?.firstName,
              lastName: response.data.data.candidateDetail?.lastName,
              skills: response.data.data.candidateDetail?.skills,
              source: response.data.data.source?.id,
              invoicedDate: response.data.data.invoicedDate,
              joinedDate: response.data.data.joinedDate,
              invoiceValue: response.data.data.invoiceValue,
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
              alternateMobile: response.data.data.candidateDetail?.alternateMobile?.substring(2),
              resume: response.data.data.candidateDetail?.resume,
              gender: response.data.data.candidateDetail?.gender,
              candidateRecruiterDiscussionRecording: response.data.data.candidateRecruiterDiscussionRecording,
              candidateSkillExplanationRecording: response.data.data.candidateSkillExplanationRecording,
              candidateMindsetAssessmentLink: response.data.data.candidateMindsetAssessmentLink,
              candidateAndTechPannelDiscussionRecording: response.data.data.candidateAndTechPannelDiscussionRecording,
              mainId: response.data.data.mainId,
              recruiterId: response.data.data.recruiterId,
              hideContactDetails: response.data.data.hideContactDetails,
              currentCompanyName: response.data.data.candidateDetail?.currentCompanyName,
              panNumber: response.data.data.candidateDetail?.panNumber,
              linkedInProfile: response.data.data.candidateDetail?.linkedInProfile,
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



      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}recruiter/getAllCandidateStatus`,
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


    } else {
      setCandidatesEdit({
        ...candidatesEdit,
        id: values,
      });

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}recruiter/viewCandidateNotes`,
        data: {
          candidateId: values,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          setCandidatesNote(response.data.data);
          setState({ ...state, right: true });
          setLoader(false);
        }
      });
    }
  }

  function dropConfirmation(id) {
    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/DropCandidate`,
      data: {
        id: id,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setDropOpen(false);
        updateData(id);
      } else {
        handleNotificationCall("error", response.data.message);
        setLoader(false);
      }
    });
  }

  function reverseConfirmation(id) {
    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/resetStatus`,
      data: {
        id: id,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setReverseOpen(false);
        setLoader(false);
        updateData(id);
        handleNotificationCall("success", response.data.message);
      } else {
        handleNotificationCall("error", response.data.message);
        setLoader(false);
      }
    });
  }

  function sendMessage(candidateId, mobile, message, candidate_name, list) {
    setLoader(true);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}chat/sendTemplateMessage`,
      data: {
        candidateId: candidateId,
        phone_number: mobile,
        template_name: "general_message",
        vars: [
          candidate_name,
          list.rec_name,
          list.rec_mobile_no,
          localStorage.getItem('companyName'),
        ],
        message: message,
        candidate_name: candidate_name,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          if (response.data.isNew === true) {
            getmessageIni();
          }

          setLoader(false);
          handleMessageClose();
          handleNotificationCall("success", response.data.message);
        } else {
          setLoader(false);
          handleNotificationCall("error", response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
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

  const list = (anchor) =>
    dataList === "EDIT" ? (
      <>
        <Edit
          setValidation={setValidation}
          validation={validation}
          editSubmit={editSubmit}
          handleEdit={handleEdit}
          setCandidatesEdit={setCandidatesEdit}
          candidatesEdit={candidatesEdit}
          editCandidates={editCandidates}
          editIsSubmitting={editIsSubmitting}
          editErrors={editErrors}
          toggleDrawer={toggleDrawer}
          source={source}
          setFile={setFile}
          file={file}
          setAssessment={setAssessment}
          assessment={assessment}
          days={days}
          months={months}
          years={years}
          setDay={setDay}
          setMonth={setMonth}
          setYear={setYear}
          date={date}
          month={month}
          year={year}
          setPhoneValidation={setPhoneValidation}
          show={candidatesEdit.recruiterId === decode.recruiterId ? true : false}
        />
      </>
    ) : dataList === "ADD" ? (
      <>
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
          requirementId={"true"}
        />
      </>
    ) : dataList === "VIEW" ? (
      <>
        <View
          candidateView={candidateView}
          toggleDrawer={toggleDrawer}
          listCanditate={listCanditate}
          candidatesEdit={candidatesEdit}
          setCandidateView={setCandidateView}

        />
      </>
    ) : (
      <>
        <Note
          toggleDrawer={toggleDrawer}
          candidatesNote={candidatesNote}
          noteCandidates={noteCandidates}
          noteErrors={noteErrors}
          handleAddNotes={handleAddNotes}
          noteSubmit={noteSubmit}
        />
      </>
    );

  const HeaderElements = () => (
    <>
      <Grid className={classes.HeaderElements}>
        {/* <Tooltip title="Dowmload" placement="bottom" aria-label="download">
          {count !== 0 ? (
            <CloudDownloadIcon
              className={classNames(classes.toolIcon)}
              onClick={(e) => {
                downloadExel();
              }}
            />
          ) : (
            <CloudDownloadIcon className={classes.downloadIcon} />
          )}
        </Tooltip> */}
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


  const components = {
    ExpandButton: function (props) {
      return <ExpandButton {...props} />;
    },
  };


  // function getSheetData(data, header) {
  //   var fields = Object.keys(data[0]);
  //   var sheetData = data.map(function (row) {
  //     return fields.map(function (fieldName) {
  //       return row[fieldName] ? row[fieldName] : "";
  //     });
  //   });
  //   sheetData.unshift(header);
  //   return sheetData;
  // }

  // async function saveAsExcel(data) {
  //   let header = [
  //   "S.No", 
  //   "Requirement Name",
  //   "Client Coordinator",
  //   "Recruiter",
  //   "Candidate Name",
  //   "Email",
  //   "Mobile",
  //   "Gender",
  //   "Current Location",
  //   "Preferred Location",
  //   "Native Location",
  //   "Total Years of Experience",
  //   "Relevant Experience",
  //   "Current CTC",
  //   "Expected CTC",
  //   "DOB",  
  //   "Notice Period",
  //   "Reason for Job Change",
  //   "Candidate Attended",
  //   "Differently Abled",
  //   "Educational Qualification", 
  //   "Posted Date",  
  //   ];

  //   XlsxPopulate.fromBlankAsync().then(async (workbook) => {
  //     const sheet1 = workbook.sheet(0);
  //     const sheetData = getSheetData(data, header);
  //     const totalColumns = sheetData[0].length;

  //     sheet1.cell("A1").value(sheetData);
  //     const range = sheet1.usedRange();
  //     const endColumn = String.fromCharCode(64 + totalColumns);
  //     sheet1.row(1).style("bold", true);
  //     sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
  //     range.style("border", true);
  //     return workbook.outputAsync().then((res) => {
  //       saveAs(
  //         res,
  //         `Candidates_${moment(new Date()).format("DD_MM_YYYY_HH_mm")}.xlsx`,
  //       );
  //     });
  //   });
  // }

  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.heading}>
        <Grid item xs={9} sm={7} md={8} lg={6}>

          <PageTitle title="Candidates" />
        </Grid>

        <Grid item xs={3} sm={5} md={4} lg={6} className={classes.drawerClose}>


          <SwipeableDrawer
            anchor="right"
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
            classes={{ paper: dataList === "VIEW" || dataList === "NOTES" ? classes.drawer : classes.clientDrawer }}
          >
            {list("right")}
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

          <TextField
            label="Search"
            type="text"
            name="search"
            placeholder="Enter Candidate Unique ID/Name/Email/Mobile (eg: 91XXXXXXXXXX)"
            InputLabelProps={{ shrink: true }}
            value={search !== null ? search : ""}

            onChange={(e) => {
              setSearch(e.target.value);
            }}


            className={classes.searchWidth}
          />


          <TextField
            name="fromDate"
            label="From"
            InputLabelProps={{ shrink: true }}
            className={classes.filterWidth}
            type="date"
            defaultValue={fromDate}

            onChange={handleFromDateChange}
          />

          <TextField
            name="toDate"
            label="To"
            InputLabelProps={{ shrink: true }}
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
            options={table_options}
            components={components}
            columns={[
              {
                name: "S.No",
              },
              {
                name: "Actions",
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
                name: "Resume",
              },
              {
                name: "View Candidate",
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
                <Actions
                  index={index}
                  item={item}
                  activeIndex={activeIndex}
                  handleMenuClick={handleMenuClick}
                  anchorEl={anchorEl}
                  reset={reset}
                  editreset={editreset}
                  noteReset={noteReset}
                  setCandidateList={setCandidateList}
                  handleMessageOpen={handleMessageOpen}
                  candidateList={candidateList}
                  handleDropOpen={handleDropOpen}
                  handleReverseOpen={handleReverseOpen}
                  handleShow={handleShow}
                  setFile={setFile}
                  setAssessment={setAssessment}
                  setPhoneValidation={setPhoneValidation}
                  handleUse={handleUse}
                />,
                item.statusCode ? (
                  <Grid >
                    <Status
                      list={item}
                      handleStatusOpen={handleStatusOpen}
                      handleStatusNewOpen={handleStatusNewOpen}
                      setValidation={setValidation}
                      setShortList={setShortList}
                      shortList={shortList}
                      setView={setView}
                      view={view}
                      invoicereset={invoicereset}
                    />



                  </Grid>
                ) : (
                  ""
                ),

                <Grid container row spacing={2} className={classes.externalIconContainer}>
                  {item.candidateDetail?.isExternal === "YES" ?
                    <Tooltip title="SUBVENDOR" placement="bottom" aria-label="title">
                      <Avatar alt="Profile" src={external} className={classes.externalIcon} />
                    </Tooltip> : ""}
                  <div>
                    {item.candidateDetail?.firstName + " " + item.candidateDetail?.lastName} <br /> {" (" + item.uniqueId + ")"}
                  </div>

                </Grid>,
                <>
                  {item.mainId === decode.mainId ?
                    <>  {item.candidateDetail?.email + " /"} <br />{"91 " + item.candidateDetail?.mobile.slice(2)}  </>
                    : item.hideContactDetails !== true ?
                      <>  {item.candidateDetail?.email + " /"} <br />{"91 " + item.candidateDetail?.mobile.slice(2)}  </>
                      : ""} </>,
                <>{item.requirement?.requirementName} <br /> {" (" + item.requirement?.uniqueId + ")"} </>,
                item.requirement?.recruiter?.firstName + " " + item.requirement?.recruiter?.lastName,
                item.recruiter?.firstName + " " + item.recruiter?.lastName,
                <>{item.candidateDetail?.resume !== "https://liverefo.s3.amazonaws.com/" ? (<>   <Grid container className={classes.space}>     <Grid item xs className={classes.toolAlign}>
                  <Tooltip title="View Resume" placement="bottom" aria-label="view"       >
                    <DescriptionIcon className={classes.toolIcon} onClick={() => {
                      handleResumeOpen(); setFile([
                        {
                          url: item.candidateDetail?.resume
                        }
                      ])
                    }} />
                  </Tooltip>
                  {/* <Tooltip         title="Downlaod Resume"         placement="bottom"         aria-label="downlaod"       > 
  <a href={item.candidateDetail?.resume} download>  <GetAppIcon className={classes.toolIcon} />    </a>      
</Tooltip>      */}
                </Grid>   </Grid> </>) : ("No Resume Found")}</>,
                <Tooltip title="View Candidate" placement="bottom" aria-label="view"       >
                  <ViewIcon onClick={(e) => {
                    handleShow(item.id, "VIEW");
                  }}
                    className={classes.toolIcon}

                  />
                </Tooltip>,

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

      <Message
        setState={setState}
        state={state}
        candidateList={candidateList}
        decode={decode}
        sendMessage={sendMessage}
        handleMessageOpen={handleMessageOpen}
        messageOpen={messageOpen}
        handleMessageClose={handleMessageClose}
      />

      <Dialogs
        handleStatusClose={handleStatusClose}
        handleStatusNewClose={handleStatusNewClose}
        validation={validation}
        stausOpen={stausOpen}
        stausNewOpen={stausNewOpen}
        changeStatus={changeStatus}
        shortList={shortList}
        view={view}
        setView={setView}
        invoiceCandidates={invoiceCandidates}
        invoiceErrors={invoiceErrors}
        invoiceSubmit={invoiceSubmit}
        InvoicedStatus={InvoicedStatus}
        joinedStatus={joinedStatus}
        creditNoteStatus={creditNoteStatus}
        updateJoiningDitchedStatus={updateJoiningDitchedStatus}
        OfferDeclineStatus={OfferDeclineStatus}
        joiningRef={joiningRef}
        invoiceRef={invoiceRef}
        saveOnly={saveOnly}
        setSaveOnly={setSaveOnly}

        dropCandidates={dropCandidates}
        dropErrors={dropErrors}
        dropSubmit={dropSubmit}
        dropReset={dropReset}
        DropStatus={DropStatus}
        handleDropReasonClose={handleDropReasonClose}
        dropReasonOpen={dropReasonOpen}
        handleDropReasonOpen={handleDropReasonOpen}
        changeMessageOpen={changeMessageOpen}
        handleChangeMessageClose={handleChangeMessageClose}
        changeStcStatus={changeStcStatus}
        handleChangeMessageOpen={handleChangeMessageOpen}
        reasonRef={reasonRef}
        handleReasonOpen={handleReasonOpen}
        reasonOpen={reasonOpen}
        handleReasonClose={handleReasonClose}
      />


      <ResumeDialog
        resume={file}
        resumeOpen={resumeOpen}
        handleResumeClose={handleResumeClose}
      />

      <Drop
        handleDropClose={handleDropClose}
        dropOpen={dropOpen}
        dropConfirmation={dropConfirmation}
        candidateList={candidateList}
      />


      <Reverse
        handleReverseClose={handleReverseClose}
        reverseOpen={reverseOpen}
        reverseConfirmation={reverseConfirmation}
        candidateList={candidateList}
      />


      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}



