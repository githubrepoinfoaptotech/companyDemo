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
  Avatar,
  Typography
} from "@material-ui/core";
import PageTitle from "../PageTitle";
import { Autocomplete } from "@material-ui/lab";
import { toast } from "react-toastify";
// import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import ViewIcon from "@material-ui/icons/Visibility";
import Drop from "../Candidates/Drop";
import Reverse from "../Admin/Reverse";
import Edit from "../Candidates/Edit";
import View from "../Candidates/View";
import Note from "../Candidates/Note";
import Bar from "../Candidates/Bar";
import Message from "../Candidates/Message";
import Notification from "../Notification";
// import XlsxPopulate from "xlsx-populate";
// import { saveAs } from "file-saver";
import useStyles from "../../themes/style.js";
import Status from "../Admin/Status";
import Dialogs from "../Admin/Dialogs";
import Actions from "../Candidates/Actions";
import ExpandButton from "../Candidates/ExpandButton";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import external from "../../images/external.png";
import "react-toastify/dist/ReactToastify.css";

const positions = [toast.POSITION.TOP_RIGHT];

export default function Candidates(props) {
  var classes = useStyles();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const mobileQuery = useMediaQuery('(max-width:600px)');

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

  const filterRef = useRef(null);
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

  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [user, setUserName] = useState([]);

  const [candidateList, setCandidateList] = useState({
    id: "",
    name: "",
    mobile: "",
    message: "",
    rec_name: "",
    rec_mobile_no: "",
  });

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
    currentCompanyName: "",
    mainId: "",
    recruiterId: "",
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
  const [docFile, setDocFile] = useState([]);
  const [profile, setProfile] = useState([]);
  const [assessment, setAssessment] = useState([]);

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



  useEffect(() => {
    setLoader(true);

    const fetchData = async () => {
      setCurrerntPage(1);
      setPage(0);

      axios({
        method: "post",
        url: props.candidateData,
        data: {
          page: "1",
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
    const getUserName = async () => {
      axios({
        method: "post",
        url: props.userList,
        data: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {
            setLoader(false);
            setUserName(response.data.data);
          }
        })

        .catch(function (error) {
          console.log(error);
        });
    };
    fetchData();
    getUserName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducerValue, token]);



  function updateData(id) {
    axios({
      method: "post",
      url: props.updateData,
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
            url: props.viewCandidate,
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
        url: props.addCandidateNotes,
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
  const [recruiterId, setRecruiterId] = useState(null);

  const handleFromDateChange = (event) => {
    setFromDate(filterRef.current.fromDate.value);
  };

  const handleToDateChange = (event) => {
    setToDate(filterRef.current.toDate.value);
  };

  const resetForm = (e) => {
    filterRef.current.reset();
    setRecruiterId(null);
    forceUpdate();
  };


  function getFilterData() {
    const form = filterRef.current;

    if (form["fromDate"].value > form["toDate"].value) {
      handleNotificationCall("error", "Check your selected dates")
      return
    }

    setLoader(true);
    setCurrerntPage(1);
    setPage(0);
    var data = JSON.stringify({
      page: 1,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
      recruiterId: recruiterId?.id,
    });

    axios({
      method: "post",
      url: props.candidateData,
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



  useEffect(() => {
    axios({
      method: "post",
      url: props.viewSourcesList,
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
      recruiterId: recruiterId?.id,
    });

    axios({
      method: "post",
      url: props.candidateData,
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

  function InvoicedStatus(values) {
    setLoader(true);
    return new Promise((resolve) => {
      axios({
        method: "post",
        url: props.updateInvoicedStatus,
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

  function changeStcStatus() {
    setLoader(true);
    var url = props.updateStcStatus;

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

  function DropStatus(values) {

    var url = props.DropCandidate;
    setLoader(true);
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


  function OfferDeclineStatus(values) {
    setLoader(true);
    return new Promise((resolve) => {
      axios({
        method: "post",
        url: props.updateOfferDeclineStatus,
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
        url: props.adminEditCandidate,
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
          panNumber: values?.panNumber,
          linkedInProfile: values?.linkedInProfile,
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
      url: props.updateCandidateResume,
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
    if (shortList.free === "NO") {
      url = props.sendTemplateMessage;
    } else {
      url = props.changeYesCadidateStatus;
    }

    axios({
      method: "post",
      url: url,
      data: {
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

        updateData(candidateId);
        setState({ ...state, right: false });
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
      url: props.updateJoinedStatus,
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
    axios({
      method: "post",
      url: props.updateCrediNoteStatus,
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
        setLoader(false);
        handleNotificationCall("error", response.data.message);
      }
    });
  }


  function updateJoiningDitchedStatus() {
    setLoader(true);
    axios({
      method: "post",
      url: props.updateJoiningDitchedStatus,
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
        setLoader(false);
        handleNotificationCall("error", response.data.message);
      }
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
        url: props.viewCandidate,
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
              gender: response.data.data.candidateDetail?.gender,
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
        url: props.updateData,
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
        url: props.viewCandidateNotes,
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
      url: props.DropCandidate,
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
      url: props.resetStatus,
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

  const [listCanditate, setListCanditate] = useState([]);

  const [state, setState] = useState({
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
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
  //     "S.No",
  //     "Requirement Name",
  //     "Client Coordinator",
  //     "Recruiter",
  //     "Candidate Name",
  //     "Email",
  //     "Mobile",
  //     "Status",
  //     "Posted Date",
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

  // function downloadExel() {
  //   setLoader(true);
  //   const form = filterRef.current;
  //   var data = JSON.stringify({
  //     fromDate: `${form["fromDate"].value}`,
  //     toDate: `${form["toDate"].value}`,
  //     recruiterId: recruiterId?.id,
  //     fileDownload: "yes",
  //   });

  //   axios({
  //     method: "post",
  //     url: props.candidateData,
  //     data: data,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //   }).then(function (response) {
  //     if (response.data.status === true) {
  //       setLoader(false);
  //       saveAsExcel(response.data.data);
  //     }
  //   });
  // }

  const HeaderElements = () => (
    <>
      <Grid className={classes.HeaderElements}>
        {/* <Tooltip title="Dowmload" placement="bottom" aria-label="download">
          {count !== 0 ? (
            <CloudDownloadIcon
              className={classes.toolIcon}
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


  const [stausOpen, setStatusOpen] = React.useState(false);

  const [stausNewOpen, setStatusNewOpen] = React.useState(false);
  const [dropOpen, setDropOpen] = React.useState(false);
  const [reverseOpen, setReverseOpen] = React.useState(false);
  const [messageOpen, setMessageOpen] = React.useState(false);


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

  function sendMessage(candidateId, mobile, message, candidate_name, list) {
    setLoader(true);

    axios({
      method: "post",
      url: props.sendTemplateMessage,
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
      url: props.getMyWallet,
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
          setDocFile={setDocFile}
          setProfile={setProfile}
          file={file}
          docFile={docFile}
          profile={profile}
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
          <Autocomplete
            className={classes.filterFullWidth}
            options={user}
            getOptionLabel={(option) => {
              const roleName = option.user?.role?.roleName;
              const firstName = option.firstName;
              const lastName = option.lastName;
              let label = `${firstName} ${lastName}`;
              if (roleName) {
                label += ` (${roleName})`;

                if (roleName === 'SUBVENDOR') {
                  label = label.replace('(SUBVENDOR)', `(${option?.companyName})`);
                } else if (roleName === 'CLIENTCOORDINATOR') {
                  label = label.replace('(CLIENTCOORDINATOR)', '(Hiring Manager)');
                }
              }

              return label;
            }}
            value={recruiterId}
            onChange={(event, value) => setRecruiterId(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="recruiterId"
                label="Recruiter"
                InputLabelProps={{ shrink: true }}
                type="text"
              />
            )}
          />

          <TextField
            className={classes.filterWidth}
            name="fromDate"
            label="From"
            InputLabelProps={{ shrink: true }}
            type="date"
            defaultValue={fromDate}

            onChange={handleFromDateChange}
          />

          <TextField
            className={classes.filterWidth}
            name="toDate"
            label="To"
            InputLabelProps={{ shrink: true }}
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
                  setPhoneValidation={setPhoneValidation}
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
                      invoicereset={invoicereset}
                    />
                  </>
                ) : (
                  ""
                ),
                <Grid container row spacing={2} className={classes.externalIconContainer} data-candidatename={item.candidateDetail?.firstName +" " +item.candidateDetail?.lastName}>
                  {item.candidateDetail?.isExternal === "YES" ? (
                    <Tooltip
                      title="VENDOR"
                      placement="bottom"
                      aria-label="title"
                    >
                      <Avatar
                        alt="Profile"
                        src={external}
                        className={classes.externalIcon}
                      />
                    </Tooltip>
                  ) : (
                    ""
                  )}
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

                <> {item.requirement?.requirementName} <br /> {"(" + item.requirement?.uniqueId + ")"}</>,
                item.requirement?.recruiter?.firstName + " " + item.requirement?.recruiter?.lastName,
                item.requirement?.client?.handler?.firstName + " " + item.requirement?.client?.handler?.lastName,
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

