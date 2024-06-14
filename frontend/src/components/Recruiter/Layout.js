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
} from "@material-ui/core";
import PageTitle from "../PageTitle";
import { toast } from "react-toastify";
import useStyles from "../../themes/style";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import ViewIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import Notification from "../Notification";
import Actions from "../Candidates/Actions";
import Edit from "../Candidates/Edit";
import View from "../Candidates/View";
import Note from "../Candidates/Note";
import Bar from "../Candidates/Bar";
import Drop from "../Candidates/Drop";
import Dialogs from "./Dialogs";
import Status from "./Status";
import Message from "../Candidates/Message";
import Reverse from "./Reverse";
import ExpandButton from "../Candidates/ExpandButton";

import useMediaQuery from "@material-ui/core/useMediaQuery";

const positions = [toast.POSITION.TOP_RIGHT];

export default function Tables(props) {
  const mobileQuery = useMediaQuery("(max-width:600px)");

  var classes = useStyles();
  const history = useHistory();

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);

  const [source, setSource] = useState([]);
  const [candidatesData, setCandidatesData] = useState([]);
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
    recruiterId: "",
    currentCompanyName: "",
    hideContactDetails: false,
    panNumber: "",
    linkedInProfile: "",
  });
  const [listCanditate, setListCanditate] = useState([]);

  const [candidateList, setCandidateList] = useState({
    id: "",
    name: "",
    mobile: "",
    message: "",
    rec_name: "",
    rec_mobile_no: "",
  });

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
  const [setCandidatesChange] = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [file, setFile] = useState([]);
  const [docFile, setDocFile] = useState([]);
  const [profile, setProfile] = useState([]);
  const [assessment, setAssessment] = useState([]);

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
  const years = Array.from(
    { length: 60 },
    (_, i) => moment(new Date()).format("YYYY") - i,
  );

  function handleUse(mobile) {
    if (decode.role === "RECRUITER") {
      history.push("/app/recruiter_candidates");
    } else {
      history.push("/app/cc_candidates");
    }
    sessionStorage.setItem("use", mobile);

    setState({ ...state, right: true });
    setDataList("ADD");

    axios({
      method: "post",
      url: props.CandidatesUseUrl,
      data: {
        mobile: mobile.substring(2),
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

        //    gender: response.data.data?.gender,
        //   differentlyAbled:  response.data.data?.differentlyAbled,
        //   candidateProcessed:  response.data.data?.candidateProcessed,
        //   native:  response.data.data?.nativeLocation,
        //   preferredLocation:  response.data.data?.preferredLocation,
        //   relevantExperience: response.data.data?.relevantExperience,
        //   educationalQualification:  response.data.data?.educationalQualification,

        //   currentCtc: response.data.data?.currentCtc,
        //   expectedCtc:  response.data.data?.expectedCtc,
        //   noticePeriod: response.data.data?.noticePeriod,
        //   reasonForJobChange: response.data.data?.reasonForJobChange,
        //   reason: response.data.data?.reason,
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
          gender: response.data.data?.gender,
          differentlyAbled: response.data.data?.differentlyAbled,
          candidateProcessed: response.data.data?.candidateProcessed,
          native: response.data.data?.nativeLocation,
          preferredLocation: response.data.data?.preferredLocation,
          relevantExperience: response.data.data?.relevantExperience,
          educationalQualification:
            response.data.data?.educationalQualification,
          currentCtc: response.data.data?.currentCtc,
          expectedCtc: response.data.data?.expectedCtc,
          noticePeriod: response.data.data?.noticePeriod,
          reasonForJobChange: response.data.data?.reasonForJobChange,
          reason: response.data.data?.reason,
          currentCompanyName: response.data.data?.currentCompanyName,
          freeValue:
            decode.isEnableFree === true
              ? "YES"
              : decode.isEnablePaid === true
                ? "NO"
                : "YES",
          panNumber: response.data.data?.panNumber,
          linkedInProfile: response.data.data?.linkedInProfile,
        });
      }
    });
  }
  const [dataList, setDataList] = useState("ADD");

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

  const [validation, setValidation] = useState(false);
  const [saveOnly, setSaveOnly] = useState("YES");

  const filterRef = useRef(null);
  const joiningRef = useRef();

  var [errorToastId, setErrorToastId] = useState(null);

  const [reverseOpen, setReverseOpen] = React.useState(false);

  const handleReverseOpen = () => {
    setReverseOpen(true);
  };

  const handleReverseClose = () => {
    setReverseOpen(false);
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

  const [phoneValidation, setPhoneValidation] = useState(false);

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
    experience: Yup.number().nullable(true).transform((_, val) => (val ? Number(val) : null)),
    location: Yup.string().nullable().notRequired(),
    alternateMobile:
      phoneValidation === true
        ? Yup.string()
          .required("Alternate Contact Number is required")
          .min(10, "Must be exactly 10 digits")
          .max(10, "Must be exactly 10 digits")
        : Yup.string(),
    native: Yup.string().nullable().notRequired(),
    preferredLocation: Yup.string().nullable().notRequired(),
    relevantExperience: Yup.number().nullable(true).transform((_, val) => val ? Number(val) : null),
    educationalQualification: Yup.string().nullable().notRequired(),
    day: Yup.string().nullable().notRequired(),
    month: Yup.string().nullable().notRequired(),
    year: Yup.string().nullable().notRequired(),
    gender: Yup.string().required("Gender is required").notRequired(),
    differentlyAbled: Yup.string().nullable().notRequired(),
    currentCtc: Yup.number().nullable(true).transform((_, val) => (val ? Number(val) : null)),
    expectedCtc: Yup.number().nullable(true).transform((_, val) => (val ? Number(val) : null)),
    noticePeriod: Yup.string().nullable().notRequired(),
    reasonForJobChange: Yup.string().nullable().notRequired(),
    candidateProcessed: Yup.string().nullable().notRequired(),
    reason: Yup.string().nullable().notRequired(),
    invoiceDate: Yup.string(),
    invoicedValue: Yup.string(),
    joinedDate: Yup.string(),
    currentCompanyName: Yup.string().nullable().notRequired(),
    panNumber: Yup.string(),
    linkedInProfile: Yup.string(),
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
    register: editCandidates,
    formState: { errors: editErrors, isSubmitting: editIsSubmitting },
    handleSubmit: editSubmit,
    reset: editreset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(editSchema),
  });

  useEffect(() => {
    setLoader(true);

    var mobile = sessionStorage.getItem("use");

    if (mobile !== "" && mobile !== null) {
      setState({ ...state, right: true });
      setDataList("ADD");

      axios({
        method: "post",
        url: props.CandidatesUseUrl,
        data: {
          mobile: mobile.substring(2),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          sessionStorage.setItem("use", "");
          // reset({
          //   requirementId:recruitmentId,
          //   mobile: mobile.substring(2),
          //   email: response.data.data?.email,
          //   firstName: response.data.data?.firstName,
          //   lastName: response.data.data?.lastName,
          //   skills: response.data.data?.skills,
          //   experience: response.data.data?.experience,
          //   location: response.data.data?.currentLocation,

          //    gender: response.data.data?.gender,
          //   differentlyAbled:  response.data.data?.differentlyAbled,
          //   candidateProcessed:  response.data.data?.candidateProcessed,
          //   native:  response.data.data?.nativeLocation,
          //   preferredLocation:  response.data.data?.preferredLocation,
          //   relevantExperience: response.data.data?.relevantExperience,
          //   educationalQualification:  response.data.data?.educationalQualification,

          //   currentCtc: response.data.data?.currentCtc,
          //   expectedCtc:  response.data.data?.expectedCtc,
          //   noticePeriod: response.data.data?.noticePeriod,
          //   reasonForJobChange: response.data.data?.reasonForJobChange,
          //   reason: response.data.data?.reason,
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
            gender: response.data.data?.gender,
            differentlyAbled: response.data.data?.differentlyAbled,
            candidateProcessed: response.data.data?.candidateProcessed,
            native: response.data.data?.nativeLocation,
            preferredLocation: response.data.data?.preferredLocation,
            relevantExperience: response.data.data?.relevantExperience,
            educationalQualification:
              response.data.data?.educationalQualification,
            currentCtc: response.data.data?.currentCtc,
            expectedCtc: response.data.data?.expectedCtc,
            noticePeriod: response.data.data?.noticePeriod,
            reasonForJobChange: response.data.data?.reasonForJobChange,
            reason: response.data.data?.reason,
            currentCompanyName: response.data.data?.currentCompanyName,
            freeValue:
              decode.isEnableFree === true
                ? "YES"
                : decode.isEnablePaid === true
                  ? "NO"
                  : "YES",
            panNumber: response.data.data?.panNumber,
            linkedInProfile: response.data.data?.linkedInProfile,
          });
        }
      });
    }

    const fetchData = async () => {
      setCurrerntPage(1);
      setPage(0);

      axios({
        method: "post",
        url: props.CandidatesDataUrl,
        data: {
          "page": "1",
          "recruiter": "YES"
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
  }, [reducerValue, token, sessionStorage.getItem("use")]);

  function updateData(id) {
    axios({
      method: "post",
      url: props.UpdateDataUrl,
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
            url: props.UpdateCandidates,
            data: {
              id: id,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }).then(function (result) {
            if (result.data.status === true) {
              const updateState = candidatesData.map((item) => {
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
        url: props.AddNotesUrl,
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
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFromDateChange = (event) => {
    setFromDate(filterRef.current.fromDate.value);
  };

  const handleToDateChange = (event) => {
    setToDate(filterRef.current.toDate.value);
  };

  const resetForm = (e) => {
    filterRef.current.reset();
    forceUpdate();
  };

  const handleDropOpen = () => {
    setDropOpen(true);
  };

  const handleDropClose = () => {
    setDropOpen(false);
  };

  const [dropReasonOpen, setDropReasonOpen] = useState(false);

  const handleDropReasonOpen = () => {
    setDropReasonOpen(true);
    setStatusOpen(false);
  };

  const handleDropReasonClose = () => {
    setDropReasonOpen(false);
  };

  const reasonRef = useRef();

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

  function getFilterData() {
    const form = filterRef.current;
    if (form["fromDate"].value > form["toDate"].value) {
      handleNotificationCall("error", "Check your selected dates");
      return
    }
    setLoader(true);
    setCurrerntPage(1);
    setPage(0);
    var data = JSON.stringify({
      page: 1,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
      recruiter: "YES",
    });

    axios({
      method: "post",
      url: props.CandidatesDataUrl,
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

  // useEffect(() => {
  //   axios({
  //     method: "post",
  //     url: props.requirementListUrl,
  //     data: {
  //       page: "1",
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //   }).then(function (response) {
  //     if (response.data.status === true) {
  //       setRequirement(response.data.data);
  //     }
  //   });
  // }, [token]);

  useEffect(() => {
    axios({
      method: "post",
      url: props.SourceUrl,
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

    const form = filterRef.current;

    var data = JSON.stringify({
      page: newPage + 1,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
      recruiter: "YES"
    });

    axios({
      method: "post",
      url: props.CandidatesDataUrl,
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

  // function CheckAlreadyExit(addList){

  //   var dob = addList.day+"-"+addList.month+"-"+addList.year;

  //   axios({
  //     method: "post",
  //     url: props.CheckAlreadyExitUrl,
  //     data: {
  //       email: addList.email,
  //       firstName: addList.firstName,
  //       lastName: addList.lastName,
  //       mobile: addList.mobile,
  //       requirementId: recruitmentId,
  //       skills: addList.skills,
  //       sourceId: addList.source,
  //       isAnswered: candidate.freeValue,
  //       message: "",
  //       experience:addList.experience,
  //       currentLocation: addList.location,
  //       alternateMobile:addList.alternateMobile,
  //       preferredLocation:addList.preferredLocation,
  //       nativeLocation:addList.native,
  //        relevantExperience:addList.relevantExperience,
  //       currentCtc:addList.currentCtc,
  //       expectedCtc:addList.expectedCtc,
  //       dob: addList.day===undefined? "" : dob!== "--"?  addList.day+"-"+addList.month+"-"+addList.year:"",
  //       noticePeriod:addList.noticePeriod,
  //       reasonForJobChange:addList.reasonForJobChange,
  //       candidateProcessed:addList.candidateProcessed,
  //       differentlyAbled:addList.differentlyAbled,
  //       educationalQualification:addList.educationalQualification,
  //       gender:addList.gender,
  //       reason: addList.reason,
  //       sendMessage: ""
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //   }).then(function (response) {

  //     if (response.data.status === true) {

  //       handleClickOpen();

  // } else{
  //   handleNotificationCall("error", response.data.message);

  // }
  // });
  // }

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
        url: props.EditUrl,
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
          dob:
            values.day === undefined
              ? ""
              : dob !== "--"
                ? values.day + "-" + values.month + "-" + values.year
                : "",
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
          panNumber: values.panNumber,
          linkedInProfile: values.linkedInProfile,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {
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
            updateData(candidatesEdit.id);
            setState({ ...state, right: false });
            handleNotificationCall("success", response.data.message);
          } else {
            handleNotificationCall("error", response.data.message);
            setLoader(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
    if (File && File?.size >= 25000000) {
      handleNotificationCall("error", "Maximum File Size Limit 25mb");
      return
    }
    var FormData = require("form-data");
    var data = new FormData();
    data.append("resume", File);
    data.append("id", Id);
    axios({
      method: "post",
      url: props.UpdateResumeUrl,
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
      return
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
          localStorage.getItem("companyName"),
        ]
        : [
          shortList.cand_name,
          shortList.job_id,
          shortList.rec_name,
          shortList.rec_mobile_no,
          localStorage.getItem("companyName"),
        ];

    var url = "";
    if (shortList.free === "YES") {
      url = props.YesCadidateStatusUrl;
    } else {
      url = props.SendMessageUrl;
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

        setState({ ...state, right: false });
        updateData(candidateId);
        handleNotificationCall("success", response.data.message);
      } else {
        handleNotificationCall("error", response.data.message);
        setLoader(false);
      }

      handleStatusClose();
      handleStatusNewClose();
    });
  }

  function joinedStatus() {
    setLoader(true);
    axios({
      method: "post",
      url: props.JoinedStatusUrl,
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

  function updateJoiningDitchedStatus() {
    setLoader(true);
    axios({
      method: "post",
      url: props.JoiningDitchedStatusUrl,
      data: {
        candidateId: shortList.id,
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

  function DropStatus(values) {
    setLoader(true);
    var url = props.DropStatusUrl;
    return new Promise((resolve) => {

      axios({
        method: "post",
        url: url,
        data: {
          id: shortList.id,
          droppedReason: values.reason,
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
    var url = props.StcStatusUrl;
    setLoader(true);

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
    setLoader(true);
    var url = props.OfferDeclineStatusUrl;

    return new Promise((resolve) => {

      axios({
        method: "post",
        url: url,
        data: {
          candidateId: shortList.id,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          updateData(shortList.id);
          handleStatusNewClose();
          resolve();
          handleNotificationCall("success", response.data.message);
        } else {
          handleNotificationCall("error", response.data.message);
          setLoader(false);
        }
      });
    });
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
        url: props.UpdateCandidates,
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
              resume: response.data.data.candidateDetail?.resume,
              alternateMobile: response.data.data.candidateDetail?.alternateMobile,
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
              gender: response.data.data.candidateDetail?.gender,
              alternateMobile: response.data.data.candidateDetail?.alternateMobile.substring(2),
              resume: response.data.data.candidateDetail?.resume,
              document: response.data.data.candidateDetail?.document,
              photo: response.data.data.candidateDetail?.photo,
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
        url: props.UpdateDataUrl,
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
        url: props.CandidatesNoteUrl,
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

  const [state, setState] = useState({
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const HeaderElements = () => (
    <>
      <Grid className={classes.HeaderElements}>Total : {count}</Grid>
    </>
  );

  // const CustomExpandIcon = ({ isRowExpanded }) => {
  //   if (isRowExpanded) {
  //     return (
  //       <Tooltip title="List of Invoiced Candidates" placement="right">
  //         <ExpandLessIcon />
  //       </Tooltip>
  //     );
  //   } else {
  //     return (
  //       <Tooltip title="List of Invoiced Candidates" placement="right">
  //         <ExpandMoreIcon/>
  //       </Tooltip>
  //     );
  //   }
  // };

  const table_options = {
    textLabels: {
      body: {
        noMatch: "Oops! Matching record could not be found",
      },
    },
    pagination: false,
    sort: false,
    selectableRows: "none",
    filter: false,
    print: false,
    download: false,
    customToolbar: () => <HeaderElements />,
    onFilterChange: (changedColumn, filterList) => { },
    filterType: "dropdown",
    search: false,
    rowsPerPage: 50,
    // rowsExpanded: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    responsive: mobileQuery === true ? "vertical" : "standard",
    renderExpandableRow: (rowData, rowMeta) => {
      const list = candidatesData[rowMeta.rowIndex];

      return (
        <React.Fragment>
          <tr>
            <td colSpan={16}>
              <Bar title="Candidates" list={list} />
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

  const [stausOpen, setStatusOpen] = React.useState(false);
  const [stausNewOpen, setStatusNewOpen] = React.useState(false);
  const [dropOpen, setDropOpen] = React.useState(false);
  const [messageOpen, setMessageOpen] = React.useState(false);

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
    freeValue:
      decode.isEnableFree === true
        ? "YES"
        : decode.isEnablePaid === true
          ? "NO"
          : "YES",
    panNumber: "",
    linkedInProfile: "",
  });

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
  const [view, setView] = useState("");

  function sendMessage(candidateId, mobile, message, candidate_name, list) {
    setLoader(true);

    axios({
      method: "post",
      url: props.SendMessageUrl,
      data: {
        candidateId: candidateId,
        phone_number: mobile,
        template_name: "general_message",
        vars: [
          candidate_name,
          list.rec_name,
          list.rec_mobile_no,
          localStorage.getItem("companyName"),
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

  function dropConfirmation(id) {
    setLoader(true);
    axios({
      method: "post",
      url: props.DropStatusUrl,
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
        handleNotificationCall("success", response.data.message);
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
      url: props.reverseUrl,
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

  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.heading}>
        <Grid item xs={9} sm={7} md={8} lg={6}>
          <PageTitle title={props.title} />
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
            required
            name="fromDate"
            label="From"
            InputLabelProps={{ shrink: true }}
            className={classes.filterWidth}
            type="date"
            defaultValue={fromDate}
            onChange={handleFromDateChange}
          />

          <TextField
            required
            name="toDate"
            label="To"
            InputLabelProps={{ shrink: true }}
            className={classes.filterWidth}
            type="date"
            defaultValue={toDate}
            onChange={handleToDateChange}
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
                name: "Recruiter Name",
              },
              {
                name: decode.companyType === "COMPANY" ? "Hiring Manager" : "Client Coordinator",
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
                  reset={editreset}
                  editreset={editreset}
                  noteReset={noteReset}
                  setCandidateList={setCandidateList}
                  handleMessageOpen={handleMessageOpen}
                  candidateList={candidateList}
                  handleDropOpen={handleDropOpen}
                  handleReverseOpen={handleReverseOpen}
                  handleShow={handleShow}
                  setFile={setFile}
                  setDocFile={setDocFile}
                  setProfile={setProfile}
                  setAssessment={setAssessment}
                  setCandidatesChange={setCandidatesChange}
                  setPhoneValidation={setPhoneValidation}
                  handleUse={handleUse}
                />,
                item.statusCode ? (
                  <>
                    <Status
                      list={item}
                      handleStatusOpen={handleStatusOpen}
                      handleStatusNewOpen={handleStatusNewOpen}
                      setValidation={setValidation}
                      setShortList={setShortList}
                      shortList={shortList}
                      setView={setView}
                      view={view}
                    />
                  </>
                ) : (
                  ""
                ),
                <Grid container row spacing={2} className={classes.externalIconContainer} data-candidatename={item.candidateDetail?.firstName + " " + item.candidateDetail?.lastName}>
                  <div>
                    {item.candidateDetail?.firstName +
                      " " +
                      item.candidateDetail?.lastName}
                    <br /> {" (" + item.uniqueId + ")"}
                  </div>
                </Grid>,
                item.mainId === decode.mainId ?
                  <>  {item.candidateDetail?.email + " /"} <br />{"91 " + item.candidateDetail?.mobile.slice(2)}  </>
                  : item.hideContactDetails !== true ?
                    <>  {item.candidateDetail?.email + " /"} <br />{"91 " + item.candidateDetail?.mobile.slice(2)}  </>
                    : "",
                <>

                  {item.requirement?.requirementName} <br />
                  {"(" + item.requirement?.uniqueId + ")"}
                </>,
                item.recruiter?.firstName + " " + item.recruiter?.lastName,
                item.requirement?.recruiter?.firstName +
                " " +
                item.requirement?.recruiter?.lastName,
                <Tooltip title="View Candidate" placement="bottom" aria-label="view">
                  <ViewIcon
                    className={classes.toolIcon}
                    onClick={(e) => {
                      handleShow(item.id, "VIEW");
                    }}
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
        joinedStatus={joinedStatus}
        updateJoiningDitchedStatus={updateJoiningDitchedStatus}
        OfferDeclineStatus={OfferDeclineStatus}
        joiningRef={joiningRef}
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

      <Drop
        handleDropClose={handleDropClose}
        dropOpen={dropOpen}
        dropConfirmation={dropConfirmation}
        candidateList={candidateList}
      />

      {decode.role === "CLIENTCOORDINATOR" ? (
        <Reverse
          handleReverseClose={handleReverseClose}
          reverseOpen={reverseOpen}
          reverseConfirmation={reverseConfirmation}
          candidateList={candidateList}
        />
      ) : (
        ""
      )}
      <SwipeableDrawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
        classes={{
          paper:
            dataList === "VIEW" || dataList === "NOTES"
              ? classes.drawer
              : classes.clientDrawer,
        }}
      >
        {list("right")}
      </SwipeableDrawer>

      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
