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
import PageTitle from "../../components/PageTitle";
import { toast } from "react-toastify";
import useStyles from "../../themes/style.js";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";
import DescriptionIcon from '@material-ui/icons/Description';
//import GetAppIcon from "@material-ui/icons/GetApp";
import Notification from "../../components/Notification";
import Add from "../../components/Candidates/Add";
import Edit from "../../components/Candidates/Edit";
import View from "../../components/Candidates/View";
import Bar from "../../components/Candidates/Bar";
import ResumeDialog from "../../components/Candidates/Dialogs";
import Status from "../../components/Recruiter/SearchStatus";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandButton from "../../components/Candidates/ExpandButton";
import { jwtDecode } from "jwt-decode";
import { IoMailOpenOutline } from "react-icons/io5";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import MatchJDDialog from "../../components/Candidates/MatchJDDialog.js";
import { useResumeDataContext } from "../../context/CandidateDataContext.js";
import VendorInvoiceRegister from "../../components/Recruiter/VendorInvoiceRegister.js";
import ReactPdfDialog from "../../components/Candidates/ReactPdfDialog.js";
import CPVFormView from "../../components/Candidates/CPVFormView.js";

const positions = [toast.POSITION.TOP_RIGHT];

export default function Tables(props) {
  const mobileQuery = useMediaQuery('(max-width:600px)');

  var classes = useStyles();
  const messageRef = useRef();
  const invoiceRef = useRef();
  const history = useHistory();
  const candidate_search = props.location.search;
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [source, setSource] = useState([]);
  const [candidatesData, setCandidatesData] = useState([]);
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
    document: "",
    photo: "",
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
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [file, setFile] = useState([]);
  const [docFile, setDocFile] = useState([]);
  const [profile, setProfile] = useState([]);
  const [assessment, setAssessment] = useState([]);
  const [hideContactDetails, setHideContactDetails] = useState(false);

  const [search, setSearch] = useState(new URLSearchParams(candidate_search).get('search'));
  const { setResumeParsedData } = useResumeDataContext();
  const [view, setView] = useState("");

  const [date, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");


  const [resumeOpen, setResumeOpen] = React.useState(false);
  const [cpvOpen, setCpvOpen] = React.useState(false);
  const [cpvData, setCpvData] = React.useState([]);
  const [matchJDOpen, setMatchJDOpen] = React.useState(false);

  const invoiceSchema = Yup.object().shape({
    invoice: Yup.number()
      .test(
        "len",
        "Must be exactly 15 digits",
        (val) => Math.ceil(Math.log10(val + 1)) <= 15,
      )
      .required("Invoice Value is required")
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
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

  const handleCPVClose = () => {
    setCpvOpen(false);
  };

  const handleCPVOpen = (item) => {
    setCpvOpen(true);
    setCpvData(item)
  };

  const handleResumeClose = () => {
    setResumeOpen(false);
  };

  const handleResumeOpen = () => {
    setResumeOpen(true);
  };

  const handleJDClose = () => {
    setMatchJDOpen(false);
    setResumePercentage([])
  };

  const handleJDOpen = () => {
    setMatchJDOpen(true);
  };

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

  const [resumePercentage, setResumePercentage] = useState([])
  const [matchLoading, setMatchLoading] = useState(false)
  const [candidMatchId, setCandidMatchId] = useState("");
  const [requirementName, setRequirementName] = useState('');


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



  const [recruitmentList, setRecruitmentList] = useState([]);

  const [validation, setValidation] = useState(false);


  const filterRef = useRef(null);

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
    mobile: Yup.string().required('Mobile is required').min(10, "Must be exactly 10 digits").max(10, "Must be exactly 10 digits"),
    requirementId: Yup.string().required("Requirement Name is required"),
    skills: Yup.string().required('Skill is required'),
    source: Yup.string(),
    free: Yup.string().nullable().notRequired(),
    experience: Yup.number().nullable(true).transform((_, val) => val ? Number(val) : null),
    location: Yup.string().nullable().notRequired(),
    alternateMobile: phoneValidation === true ? Yup.string().required('Alternate Contact Number is required').min(10, "Must be exactly 10 digits").max(10, "Must be exactly 10 digits") : Yup.string(),
    day: Yup.string().nullable().notRequired(),
    month: Yup.string().nullable().notRequired(),
    year: Yup.string().nullable().notRequired(),
    gender: Yup.string().required('Gender is required').notRequired(),
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
    source: Yup.string(),
    experience: Yup.number().nullable(true).transform((_, val) => val ? Number(val) : null),
    location: Yup.string().nullable().notRequired(),
    alternateMobile: phoneValidation === true ? Yup.string().required('Alternate Contact Number is required').min(10, "Must be exactly 10 digits").max(10, "Must be exactly 10 digits") : Yup.string(),
    native: Yup.string().nullable().notRequired(),
    preferredLocation: Yup.string().nullable().notRequired(),
    relevantExperience: Yup.number().nullable(true).transform((_, val) => val ? Number(val) : null),
    educationalQualification: Yup.string().nullable().notRequired(),
    day: Yup.string().nullable().notRequired(),
    month: Yup.string().nullable().notRequired(),
    year: Yup.string().nullable().notRequired(),
    gender: Yup.string().required('Gender is required').notRequired(),
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

  const {
    register: editCandidates,
    formState: { errors: editErrors, isSubmitting: editIsSubmitting },
    handleSubmit: editSubmit,
    reset: editreset
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(editSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema),
  });



  useEffect(() => {
    setLoader(true);
    setSearch(new URLSearchParams(candidate_search).get('search'));

    var mobile = sessionStorage.getItem("use");

    if (mobile !== "" && mobile !== null) {
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

          sessionStorage.setItem('use', "");
          reset({
            requirementId: recruitmentId,
            mobile: mobile.substring(2),
            email: response.data.data?.email,
            firstName: response.data.data?.firstName,
            lastName: response.data.data?.lastName,
            skills: response.data.data?.skills,
            experience: response.data.data?.experience,
            location: response.data.data?.currentLocation,

            gender: response.data.data?.gender,
            differentlyAbled: response.data.data?.differentlyAbled,
            candidateProcessed: response.data.data?.candidateProcessed,
            native: response.data.data?.nativeLocation,
            preferredLocation: response.data.data?.preferredLocation,
            relevantExperience: response.data.data?.relevantExperience,
            educationalQualification: response.data.data?.educationalQualification,

            currentCtc: response.data.data?.currentCtc,
            expectedCtc: response.data.data?.expectedCtc,
            noticePeriod: response.data.data?.noticePeriod,
            reasonForJobChange: response.data.data?.reasonForJobChange,
            reason: response.data.data?.reason,
            currentCompanyName: response.data.data?.currentCompanyName,
            panNumber: response.data.data?.panNumber,
            linkedInProfile: response.data.data?.linkedInProfile,
          })

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
            educationalQualification: response.data.data?.educationalQualification,
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
            freeValue: "YES",
            panNumber: response.data.data?.panNumber,
            linkedInProfile: response.data.data?.linkedInProfile,
          });
        }
      });

    }

    const fetchData = async () => {
      setCurrerntPage(1);
      setPage(0);

      const form = filterRef.current;
      if (new URLSearchParams(candidate_search).get('search')) {
        form["search"].value = new URLSearchParams(candidate_search).get('search');
      }
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}recruiter/myCandidates`,
        data: {
          page: "1",
          search: `${form["search"].value}`,
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


  function InvoicedStatus(values) {
    setLoader(true);
    var url = `${process.env.REACT_APP_SERVER}recruiter/updateInvoicedStatus`;

    return new Promise((resolve) => {
      axios({
        method: "post",
        url: url,
        data: {
          candidateId: candId,
          invoice: values.invoice,
          invoicedDate: invoiceRef.current.value,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          updateData(candId);
          setLoader(false);
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
            url: `${process.env.REACT_APP_SERVER}recruiter/candidate`,
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

            });



        }
      })
      .catch(function (error) {
        console.log(error);
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
    setSearch("");
    history.push("/app/others_candidates?search=");
    forceUpdate();
  };

  function getFilterData() {
    setLoader(true);
    setCurrerntPage(1);
    setPage(0);
    const form = filterRef.current;

    var data = JSON.stringify({
      page: 1,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
      search: `${form["search"].value}`,
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/myCandidates`,
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
      url: `${process.env.REACT_APP_SERVER}recruiter/getAssignedRequierments`,
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
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
      search: `${form["search"].value}`,
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/myCandidates`,
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





  const [recruitmentId, setRecruitmentId] = useState("");

  function handleAdd(values) {
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



  function CheckAlreadyExit(values) {
    var dob = values.day + "-" + values.month + "-" + values.year;
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
        sendMessage: ""
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {

      if (response.data.status === true) {


        handleAddList(false, values);

      }
      // else{
      //   handleNotificationCall("error", response.data.message);

      // }
      setLoader(false);
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
        url: `${process.env.REACT_APP_SERVER}recruiter/editCandidate`,
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
          }

          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  function handleAddList(send, addList) {
    if (!addList.day || !addList.month || !addList.year) {
      handleNotificationCall("error", "Please select the date of birth properly.");
      return;
    }
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
      currentCompanyName: addList.currentCompanyName,
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

  function getCanididateResumeInfo(candidateData, candidateDetail) {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}AI/getCanididateResumeInfo`,
      data: {
        id: candidateData
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setResumeParsedData({
          data: response.data?.data,
          candidateName: candidateDetail?.firstName + " " + candidateDetail?.lastName,
        })
        const responsedData = JSON.stringify(response.data?.data)
        const candidateFullName = candidateDetail?.firstName + " " + candidateDetail?.lastName
        sessionStorage.setItem('candidateResume', responsedData)
        sessionStorage.setItem('candidateName', candidateFullName)
        window.open(`/v1#/app/parsed_resume`, '_blank')
      } else {
        handleNotificationCall("error", response.data.message);
      }
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
    data.append("fiel", File);
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

  const ExistCheck = (e) => {

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
  function cvMatchingPercentage(id, requirementId) {

    setMatchLoading(true)
    const isRequirementIdExist = resumePercentage.some(item => item.requirementId === requirementId);
    if (isRequirementIdExist) {
      setMatchLoading(false)
      handleNotificationCall("error", "Requirement already exists in the match list.");
      return;
    }

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}AI/jdMatcher`,
      data: {
        id: id,
        requirementId: requirementId
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((response) => {
      if (response.data.status === true) {

        const previousPercentage = [...resumePercentage];

        const newPercentageItem = {
          description: response.data?.data,
          requirementName: response.data?.requirementName,
          requirementId: response.data?.requirementId
        };

        previousPercentage.push(newPercentageItem);

        setResumePercentage(previousPercentage);
      } else if (response.data.status === false) {
        handleNotificationCall("error", response.data.message);
      }
      setMatchLoading(false)
    });
  }

  const removePercentage = (requirementIdToRemove) => {
    const updatedPercentage = resumePercentage.filter(item => item.requirementId !== requirementIdToRemove);
    setResumePercentage(updatedPercentage);
  };

  function handleShow(values, name) {
    setLoader(true);
    if (name === "EDIT") {
      setDataList("EDIT");
    } else {
      setDataList("VIEW");
    }
    editreset();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/candidate`,
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
            document: response.data.data.candidateDetail?.document,
            photo: response.data.data.candidateDetail?.photo,
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
      <Grid className={classes.HeaderElements}>

        Total : {count}
      </Grid>
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


  const components = {
    ExpandButton: function (props) {
      return <ExpandButton {...props} />;
    },
  };

  const [open, setOpen] = React.useState(false);
  const [stausOpen, setStatusOpen] = React.useState(false);
  const [candId, setCandId] = React.useState("");
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
    freeValue: "YES",
    panNumber: "",
    linkedInProfile: "",
  });


  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusOpen = (candId) => {
    setStatusOpen(true);
    setCandId(candId)
  };

  const handleStatusClose = () => {
    setStatusOpen(false);
  };

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
          setValue={setValue}
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
          setAssessment={setAssessment}
          assessment={assessment}
          setCandidate={setCandidate}
          candidate={candidate}
          setFile={setFile}
          setDocFile={setDocFile}
          setProfile={setProfile}
          file={file}
          docFile={docFile}
          profile={profile}
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
    ) : (
      <>
        <View
          candidateView={candidateView}
          toggleDrawer={toggleDrawer}
          listCanditate={listCanditate}
          candidatesEdit={candidatesEdit}
          setCandidateView={setCandidateView}
        />
      </>
    );

  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.heading}>
        <Grid item xs={9} sm={7} md={8} lg={6}>

          <PageTitle title="Candidates" />
        </Grid>

        <Grid item xs={3} sm={5} md={4} lg={6} className={classes.drawerClose}>
          <div className={classes.lgButton}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddCircleIcon />}
              color="primary"
              className={classes.addUser}
              onClick={(e) => {

                setDataList("ADD");
                reset({});
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
                setState({ ...state, right: true });
                setPhoneValidation(false);
                setRecruitmentId("");
                setValidation(false);
                setFile([]);
                setDocFile([]);
                setProfile([]);
              }}
            >
              Add New Candidate
            </Button>
          </div>
          <div className={classes.smButton}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddCircleIcon />}
              className={classes.addUser}
              color="primary"
              onClick={(e) => {
                setState({ ...state, right: true });
                setDataList("ADD");
                reset();
                setValidation(false);
              }}
            >
              Add
            </Button>
          </div>
          <SwipeableDrawer
            anchor="right"
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
            classes={{ paper: dataList === "VIEW" ? classes.drawer : classes.clientDrawer }}
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
            value={search}
            defaultValue={search}
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
                name: "Resume",
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
                  <Tooltip title="Edit Candidate" placement="bottom" aria-label="edit">
                    <EditIcon
                      className={classes.toolIcon}
                      onClick={(e) => {
                        handleShow(item.id, "EDIT");
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="View Candidate" placement="bottom" aria-label="view">
                    <ViewIcon
                      className={classes.toolIcon}
                      onClick={(e) => {
                        handleShow(item.id, "VIEW");
                      }}
                    />
                  </Tooltip>
                  <Tooltip
                    title="View CPV"
                    placement="bottom"
                    aria-label="view"
                  >
                    <IoMailOpenOutline
                      onClick={(e) => {
                        handleCPVOpen(item);
                      }}
                      className={classes.cpvIcon}
                    />
                  </Tooltip>
                </Grid>,
                item.statusCode ? (
                  <>
                    <Status
                      list={item}
                      handleStatusOpen={handleStatusOpen}
                    />
                  </>
                ) : (
                  ""
                ),
                <> {item.candidateDetail?.firstName + " " + item.candidateDetail?.lastName}   <br />   {" (" + item.uniqueId + ")"}</>,

                item.mainId === decode.mainId ?
                  <>  {item.candidateDetail?.email + " /"} <br />{"91 " + item.candidateDetail?.mobile.slice(2)}  </>
                  : item.hideContactDetails !== true ?
                    <>  {item.candidateDetail?.email + " /"} <br />{"91 " + item.candidateDetail?.mobile.slice(2)}  </>
                    : "",
                <> {item.requirement?.requirementName} <br />{"(" + item.requirement?.uniqueId + ")"}</>,
                item.recruiter?.firstName + " " + item.recruiter?.lastName,
                item.requirement?.recruiter?.firstName + " " + item.requirement?.recruiter?.lastName,

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
                //  <Tooltip
                //       title="Match JD"
                //       placement="bottom"
                //       aria-label="view"
                //     >
                //       <div className={classes.toolIcon+" "+classes.resumeUploadParent} 
                //         onClick={(e) => {
                //           handleJDOpen();
                //           cvMatchingPercentage(item.id);
                //           setCandidMatchId(item.id);
                //           setRequirementName(item.requirementName)
                //         }}>
                //         %
                //       </div>
                //     </Tooltip>,
                // <Tooltip
                //   title="Get Resume Info"
                //   placement="bottom"
                //   aria-label="view"
                // >
                //   <div className={classes.toolIcon+" "+classes.resumeUploadParent} 
                //     onClick={(e) => {
                //       getCanididateResumeInfo(item.candidateDetailId,item.candidateDetail);
                //     }}>
                //     i
                //   </div>
                // </Tooltip>,
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
      <VendorInvoiceRegister
        handleStatusClose={handleStatusClose}
        stausOpen={stausOpen}
        view={view}
        setView={setView}
        invoiceCandidates={invoiceCandidates}
        invoiceErrors={invoiceErrors}
        invoiceSubmit={invoiceSubmit}
        InvoicedStatus={InvoicedStatus}
        invoiceRef={invoiceRef}
        invoicereset={invoicereset}
      />

      <ReactPdfDialog
        resume={file}
        resumeOpen={resumeOpen}
        handleResumeClose={handleResumeClose}
      />
      <CPVFormView
        setLoader={setLoader}
        handleNotificationCall={handleNotificationCall}
        candidateView={candidateView}
        cpvOpen={cpvOpen}
        cpvData={cpvData}
        handleCPVClose={handleCPVClose}
      />
      {/* 
      <MatchJDDialog
        resumePercentage={resumePercentage}
        requirementName={requirementName}
        matchLoading={matchLoading}
        jDOpen={matchJDOpen}
        handleJDClose={handleJDClose}
        candidMatchId={candidMatchId}
        cvMatchingPercentage={cvMatchingPercentage}
        removePercentage={removePercentage}
      /> */}

      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

