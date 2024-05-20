import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  SwipeableDrawer,
  TablePagination,
  TextField,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useReducer, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";

import { toast,  } from "react-toastify";
import { Autocomplete } from "@material-ui/lab";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import jwt_decode from "jwt-decode";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom"; 
import AddCircleIcon from "@material-ui/icons/AddCircle"; 
import DescriptionIcon from '@material-ui/icons/Description';
import ViewIcon from "@material-ui/icons/Visibility";
//import GetAppIcon from "@material-ui/icons/GetApp";
import Tooltip from "@material-ui/core/Tooltip"; 
import Notification from "../../components/Notification/Notification";
import Add from "../../components/Candidates/Add";
import Edit from "../../components/Candidates/Edit";
import View from "../../components/Candidates/View";
import Note from "../../components/Candidates/Note";
import Bar from "../../components/Candidates/Bar";
import Message from "../../components/Candidates/Message"; 
import Dialogs from "../../components/Recruiter/Dialogs";
import Status from "../../components/Recruiter/Status";
import Drop from "../../components/Candidates/Drop";
import Actions from "../../components/Candidates/Actions"; 
import ExpandButton from "../../components/Candidates/ExpandButton"; 
import Reverse from "../../components/Recruiter/Reverse";
import ResumeDialog from "../../components/Candidates/Dialogs"; 

import useStyles from "../../themes/style.js";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MatchJDDialog from "../../components/Candidates/MatchJDDialog.js";
import { useResumeDataContext } from "../../context/CandidateDataContext.js";

const positions = [toast.POSITION.TOP_RIGHT];

export default function Tables(props) {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const messageRef=useRef()
  const mobileQuery = useMediaQuery('(max-width:600px)');  

  const history = useHistory();

  const candidate_search = props.location.search;  

  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);

  const [source, setSource] = useState([]);
  const [candidatesData, setCandidatesData] = useState([]);
  const [candidatesNote, setCandidatesNote] = useState([]);
 

  const filterRef = useRef(null);
  const joiningRef = useRef();

  const [listCanditate, setListCanditate] = useState([]);

  const [candidateList, setCandidateList] = useState({
    id: "",
    name: "",
    mobile: "",
    message: "",
    rec_name: "",
    rec_mobile_no: "",
  });
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
    location:"",
    experience:null,
    resume:"",       
    gender:"",
    differentlyAbled:"", 
    candidateProcessed:"", 
    
    currentLocation: "",
    preferredLocation:"",
    nativeLocation:"",
    relevantExperience:null,
    currentCtc:null,
    expectedCtc:null,
    dob:"",
    noticePeriod:"",
    reasonForJobChange:"",
    reason:"",
    educationalQualification:"",
    alternateMobile: "",
    candidateRecruiterDiscussionRecording:"",
    candidateSkillExplanationRecording:"",
    candidateMindsetAssessmentLink:"",
    candidateAndTechPannelDiscussionRecording:"",
    mainId:"",
    recruiterId:"",
    currentCompanyName: "",
    hideContactDetails: false
  });

  const [candidateView, setCandidateView] = useState({
    id:"",
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
    location:"",
    experience:null, 
    resume: "",

    gender:"",
    differentlyAbled:"", 
    candidateProcessed:"",  
    currentLocation: "",
    preferredLocation:"",
    nativeLocation:"",
    relevantExperience:null,
    currentCtc:null,
    expectedCtc:null,
    dob:"",
    noticePeriod:"",
    reasonForJobChange:"",
    reason:"",
    educationalQualification:"",
    alternateMobile: "",
    candidateRecruiterDiscussionRecording:"",
    candidateSkillExplanationRecording:"",
    candidateMindsetAssessmentLink:"",
    candidateAndTechPannelDiscussionRecording:"",
    mainId:"",
    isCandidateCpv:"",
    currentCompanyName:"",
  });
  const [page, setPage] = useState(0);
  const [currerntPage, setCurrerntPage] = useState(1);

  const [rowsPerPage] = useState(50);
  const [setCandidatesChange] = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [file, setFile] = useState([]);
  const [assessment,setAssessment] = useState([]);
  const [hideContactDetails,setHideContactDetails] = useState(false);

  const [search, setSearch] = useState(new URLSearchParams(candidate_search).get('search'));
  const [requirementName, setRequirementName] = useState([]);
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

  const { setResumeParsedData } = useResumeDataContext();


  const [resumeOpen, setResumeOpen] = React.useState(false); 
  const [matchJDOpen, setMatchJDOpen] = React.useState(false);

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
  const [saveOnly,setSaveOnly]=useState("YES");
  const [addList, setAddList] = useState([]);

  var [errorToastId, setErrorToastId] = useState(null);
  const [ resumePercentage , setResumePercentage]= useState([])
  const [ matchLoading, setMatchLoading] = useState(false)
  const [candidMatchId, setCandidMatchId] = useState("");

  function handleUse(mobile){ 

    history.push("/app/cc_candidates"); 
    sessionStorage.setItem('use', mobile);

    setState({ ...state, right: true }); 
    setDataList("ADD");
    
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/checkCandidateDetailExist`,
      data: {
        mobile:mobile.substring(2)
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
          //   currentCompanyName: response.data.data?.currentCompanyName,
          //   reason: response.data.data?.reason,
          //   })

          setCandidate({
            ...candidate,
            mobile:mobile.substring(2),
          email: response.data.data?.email,
          firstName: response.data.data?.firstName,
          lastName: response.data.data?.lastName,
          skills: response.data.data?.skills,  
          experience: response.data.data?.experience, 
          location: response.data.data?.currentLocation,
          dob: response.data.data?.dob,
           gender: response.data.data?.gender,
          differentlyAbled:  response.data.data?.differentlyAbled, 
          candidateProcessed:  response.data.data?.candidateProcessed,
          native:  response.data.data?.nativeLocation,
          preferredLocation:  response.data.data?.preferredLocation,
          relevantExperience: response.data.data?.relevantExperience,
          educationalQualification:  response.data.data?.educationalQualification,
           currentCtc: response.data.data?.currentCtc,
          expectedCtc:  response.data.data?.expectedCtc,
          noticePeriod: response.data.data?.noticePeriod,
          reasonForJobChange: response.data.data?.reasonForJobChange,
          reason: response.data.data?.reason,
          candidateRecruiterDiscussionRecording:response.data.data?.candidateRecruiterDiscussionRecording, 
          candidateSkillExplanationRecording:response.data.data?.candidateSkillExplanationRecording,
          candidateMindsetAssessmentLink:response.data.data?.candidateMindsetAssessmentLink,
         candidateAndTechPannelDiscussionRecording:response.data.data?.candidateAndTechPannelDiscussionRecording,
         currentCompanyName: response.data.data?.currentCompanyName,
          freeValue:  decode.isEnableFree === true? "YES" : decode.isEnablePaid === true? "NO": "YES",
         });
      }
    });
  } 

  const handleDropOpen = () => {
    setDropOpen(true);
  };

  const handleDropClose = () => {
    setDropOpen(false);
  };

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
    source: Yup.string().required("Source is required"),
    free: Yup.string().nullable().notRequired(),
    experience: Yup.number().nullable(true).transform((_, val) => val ? Number(val) : null), 
    location: Yup.string().nullable().notRequired(),  
    alternateMobile: phoneValidation === true? Yup.string().required('Alternate Contact Number is required').min(10, "Must be exactly 10 digits").max(10, "Must be exactly 10 digits"): Yup.string(),
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
  });

  const editSchema = Yup.object().shape({
    email: candidatesEdit.recruiterId === decode.recruiterId? Yup.string().email("Email must be a Valid Email Address").required('Email is required') : Yup.string().email("Email must be a Valid Email Address"),
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
       alternateMobile: phoneValidation === true? Yup.string().required('Alternate Contact Number is required').min(10, "Must be exactly 10 digits").max(10, "Must be exactly 10 digits"): Yup.string(),
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  
  useEffect(() => {

    
    setLoader(true);
    setSearch(new URLSearchParams(candidate_search).get('search'));

    var mobile = sessionStorage.getItem("use");

    if(mobile !== "" && mobile !== null){

      setState({ ...state, right: true }); 
      setDataList("ADD");
      
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}recruiter/checkCandidateDetailExist`,
        data: {
          mobile:mobile.substring(2)
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) { 
          if (response.data.status === true) {
            sessionStorage.removeItem('use');
            reset({
              requirementId:recruitmentId, 
              mobile: mobile.substring(2),
              email: response.data.data?.email,
              firstName: response.data.data?.firstName,
              lastName: response.data.data?.lastName,
              skills: response.data.data?.skills,  
              experience: response.data.data?.experience, 
              location: response.data.data?.currentLocation,
                     
               gender: response.data.data?.gender,
              differentlyAbled:  response.data.data?.differentlyAbled, 
              candidateProcessed:  response.data.data?.candidateProcessed,
              native:  response.data.data?.nativeLocation,
              preferredLocation:  response.data.data?.preferredLocation,
              relevantExperience: response.data.data?.relevantExperience,
              educationalQualification:  response.data.data?.educationalQualification,
             
              currentCtc: response.data.data?.currentCtc,
              expectedCtc:  response.data.data?.expectedCtc,
              noticePeriod: response.data.data?.noticePeriod,
              reasonForJobChange: response.data.data?.reasonForJobChange,
              reason: response.data.data?.reason,
              currentCompanyName: response.data.data?.currentCompanyName
              })
  
            setCandidate({
              ...candidate,
              mobile:mobile.substring(2),
            email: response.data.data?.email,
            firstName: response.data.data?.firstName,
            lastName: response.data.data?.lastName,
            skills: response.data.data?.skills,  
            experience: response.data.data?.experience, 
            location: response.data.data?.currentLocation,
            dob: response.data.data?.dob,
             gender: response.data.data?.gender,
            differentlyAbled:  response.data.data?.differentlyAbled, 
            candidateProcessed:  response.data.data?.candidateProcessed,
            native:  response.data.data?.nativeLocation,
            preferredLocation:  response.data.data?.preferredLocation,
            relevantExperience: response.data.data?.relevantExperience,
            educationalQualification:  response.data.data?.educationalQualification, 
             currentCtc: response.data.data?.currentCtc,
            expectedCtc:  response.data.data?.expectedCtc,
            noticePeriod: response.data.data?.noticePeriod,
            reasonForJobChange: response.data.data?.reasonForJobChange,
            reason: response.data.data?.reason,
            candidateRecruiterDiscussionRecording:response.data.data?.candidateRecruiterDiscussionRecording, 
            candidateSkillExplanationRecording:response.data.data?.candidateSkillExplanationRecording,
            candidateMindsetAssessmentLink:response.data.data?.candidateMindsetAssessmentLink,
           candidateAndTechPannelDiscussionRecording:response.data.data?.candidateAndTechPannelDiscussionRecording,
           currentCompanyName: response.data.data?.currentCompanyName,
            freeValue:  decode.isEnableFree === true? "YES" : decode.isEnablePaid === true? "NO": "YES",
           });
        }
      });

    }
    const fetchData = async () => {
      setCurrerntPage(1);
      setPage(0);
     
      const form = filterRef.current; 
      if(new URLSearchParams(candidate_search).get('search')){
        form["search"].value= new URLSearchParams(candidate_search).get('search');
      }
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}recruiter/myCandidates`,
        data: {
          page: "1",
          search: `${form["search"].value}`,
          requirementId: sessionStorage.getItem("recruitmentId")!==null? sessionStorage.getItem("recruitmentId") : requirementId?.id
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

    const getRequirementName = async () => {
     
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}CC/myRequirements`,
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

    fetchData();
    getRequirementName();
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reducerValue, token, new URLSearchParams(candidate_search).get('search'), sessionStorage.getItem("use")]);




    function updateData(id){
 
    
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
    
            var myCandidateStatuses= response.data.data;
    
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
                return { ...item,  
                    candidateDetail: result.data.data.candidateDetail,  
                    invoiceValue: result.data.data.invoiceValue,  
                    invoicedDate: result.data.data.invoicedDate,  
                    joinedDate: result.data.data.joinedDate, 
                    statusCode: result.data.data.statusList.statusCode,
                    statusList: result.data.data.statusList,  
                    myCandidateStatuses: myCandidateStatuses,
                    
                
                    
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

  const [requirementId, setRequirementId] = useState(null);
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
    setRequirementId(null);
    setSearch("");
    history.push("/app/cc_candidates?search=");
     sessionStorage.removeItem('recruitmentId');
    forceUpdate();
  };

  const [dropReasonOpen, setDropReasonOpen] = useState(false);

  const handleDropReasonOpen = () => {
    
    setDropReasonOpen(true);
    setStatusOpen(false); 
  };

  const handleDropReasonClose = () => {
    setDropReasonOpen(false);
  };

  const reasonRef =useRef()

  const [reasonOpen, setReasonOpen] = useState(false);

  const handleReasonOpen = () => {  
    setStatusOpen(false);
    setStatusNewOpen(false);
    setReasonOpen(true); 
  };

  const handleReasonClose = () => {
    setReasonOpen(false);
  };

  const [ changeMessageOpen, setChangeMessageOpen] = useState(false);
 
  const handleChangeMessageOpen = () => {
    setChangeMessageOpen(true);
    handleStatusClose();
  };

  const handleChangeMessageClose = () => {
    setChangeMessageOpen(false);
  };

  function getFilterData() {
    sessionStorage.removeItem('recruitmentId');
    setLoader(true);
    setCurrerntPage(1);
    setPage(0);
    const form = filterRef.current;

    var data = JSON.stringify({
      page: 1,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
      search: `${form["search"].value}`,
      requirementId: sessionStorage.getItem("recruitmentId")!==null? sessionStorage.getItem("recruitmentId") : requirementId?.id

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
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
      search: `${form["search"].value}`,
      requirementId: sessionStorage.getItem("recruitmentId")!==null? sessionStorage.getItem("recruitmentId") : `${form["recruitmentId"].value}`
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

  function DropStatus(values) {
     
    var url = `${process.env.REACT_APP_SERVER}recruiter/DropCandidate`;
    setLoader(true);

    return new Promise((resolve) => {
      axios({
        method: "post",
        url: url,
        data: {
          id:  shortList.id,
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
          setLoader(false);
          handleNotificationCall("error", response.data.message);
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
          id:  shortList.id, 
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
    return new Promise((resolve) => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}recruiter/updateOfferDeclineStatus`,
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

  
  const [recruitmentId, setRecruitmentId]  = useState("");


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


  
function CheckAlreadyExit(addList){
 
  var dob = addList.day+"-"+addList.month+"-"+addList.year;

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
      experience:addList.experience,
      currentLocation: addList.location,
      alternateMobile:addList.alternateMobile,
      preferredLocation:addList.preferredLocation,
      nativeLocation:addList.native,
       relevantExperience:addList.relevantExperience,
      currentCtc:addList.currentCtc,
      expectedCtc:addList.expectedCtc,
      dob: addList.day===undefined? "" : dob!== "--"?  addList.day+"-"+addList.month+"-"+addList.year:"",
      noticePeriod:addList.noticePeriod,
      reasonForJobChange:addList.reasonForJobChange,
      candidateProcessed:addList.candidateProcessed,
      differentlyAbled:addList.differentlyAbled,
      educationalQualification:addList.educationalQualification,
      gender:addList.gender,
      reason: addList.reason, 
      candidateRecruiterDiscussionRecording:addList.candidateRecruiterDiscussionRecording, 
      candidateSkillExplanationRecording:addList.candidateSkillExplanationRecording,
      candidateMindsetAssessmentLink:addList.candidateMindsetAssessmentLink,
      candidateAndTechPannelDiscussionRecording:addList.candidateAndTechPannelDiscussionRecording,
      sendMessage: ""  
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).then(function (response) {
    
    if (response.data.status === true) { 
  
      handleClickOpen();

} 
// else{
//   handleNotificationCall("error", response.data.message);

// }
});
}

  function handleEdit(values) {
    return new Promise((resolve) => {
      setLoader(true);

      var dob = values.day+"-"+values.month+"-"+values.year;
      
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
          experience:values.experience, 
          currentLocation: values.location, 
          sourceId: values.source,
          invoiceValue: values.invoicedValue,
          invoicedDate: values.invoicedDate,
          joinedDate: values.joinedDate,
          alternateMobile:values.alternateMobile,
          preferredLocation:values.preferredLocation,
          nativeLocation:values.native,
           relevantExperience:values.relevantExperience,
          currentCtc:values.currentCtc,
          expectedCtc:values.expectedCtc,
          dob: values.day===undefined? candidatesEdit.dob : dob!== "--"?  dob: candidatesEdit.dob,
          noticePeriod:values.noticePeriod,
          reasonForJobChange:values.reasonForJobChange,
          candidateProcessed:values.candidateProcessed,
          differentlyAbled:values.differentlyAbled,
          educationalQualification:values.educationalQualification,
          gender:values.gender,
          reason: values.reason, 
          candidateRecruiterDiscussionRecording:values.candidateRecruiterDiscussionRecording, 
          candidateSkillExplanationRecording:values.candidateSkillExplanationRecording,
          candidateMindsetAssessmentLink:values.candidateMindsetAssessmentLink,
          candidateAndTechPannelDiscussionRecording:values.candidateAndTechPannelDiscussionRecording,
          hideContactDetails: candidatesEdit.hideContactDetails,
          currentCompanyName:values.currentCompanyName,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }) 
        .then(function (response) {
          if (response.data.status === true) {
 
 
            if(file !== undefined ){
              if(file?.length !== 0){
              uploadResume(file, response.data.candidateDetailsId); 
            }}

            if(assessment !== undefined ){
              if(assessment?.length !== 0){
                uploadAssessment(assessment, response.data.candidateId);
              }
             } 

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
 
  function handleAddList(send) {
    setLoader(true);
    var url = "";
    var data = {};
    var dob = addList.day+"-"+addList.month+"-"+addList.year; 

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
        experience:addList.experience,
        currentLocation: addList.location,
        alternateMobile:addList.alternateMobile,
        preferredLocation:addList.preferredLocation,
        nativeLocation:addList.native,
         relevantExperience:addList.relevantExperience,
        currentCtc:addList.currentCtc,
        expectedCtc:addList.expectedCtc,
        dob: addList.day===undefined? "" : dob!== "--"?  addList.day+"-"+addList.month+"-"+addList.year:"",
        noticePeriod:addList.noticePeriod,
        reasonForJobChange:addList.reasonForJobChange,
        candidateProcessed:addList.candidateProcessed,
        differentlyAbled:addList.differentlyAbled,
        educationalQualification:addList.educationalQualification,
        gender:addList.gender,
        reason: addList.reason, 
        candidateRecruiterDiscussionRecording:addList.candidateRecruiterDiscussionRecording, 
        candidateSkillExplanationRecording:addList.candidateSkillExplanationRecording,
        candidateMindsetAssessmentLink:addList.candidateMindsetAssessmentLink,
        candidateAndTechPannelDiscussionRecording:addList.candidateAndTechPannelDiscussionRecording,
        currentCompanyName:addList.currentCompanyName,
        sendMessage: send  
        
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
        experience:addList.experience,
         currentLocation: addList.location,
         alternateMobile:addList.alternateMobile,
         preferredLocation:addList.preferredLocation,
         nativeLocation:addList.native,
          relevantExperience:addList.relevantExperience,
         currentCtc:addList.currentCtc,
         expectedCtc:addList.expectedCtc,
         dob: addList.day===undefined? "" : dob!== "--"?  addList.day+"-"+addList.month+"-"+addList.year:"",
         noticePeriod:addList.noticePeriod,
         reasonForJobChange:addList.reasonForJobChange,
         candidateProcessed:addList.candidateProcessed,
         differentlyAbled:addList.differentlyAbled,
         educationalQualification:addList.educationalQualification,
         gender:addList.gender,
         reason: addList.reason, 
         candidateRecruiterDiscussionRecording:addList.candidateRecruiterDiscussionRecording, 
         candidateSkillExplanationRecording:addList.candidateSkillExplanationRecording,
         candidateMindsetAssessmentLink:addList.candidateMindsetAssessmentLink,
         candidateAndTechPannelDiscussionRecording:addList.candidateAndTechPannelDiscussionRecording,
         currentCompanyName:addList.currentCompanyName,
        sendMessage: send
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

         var message ="";

        if(file !== undefined ){
          if(file?.length !== 0){
          uploadResume(file, response.data.candidateDetailsId); 
        }
      }

      if(assessment !== undefined ){
        if(assessment?.length !== 0){
          uploadAssessment(assessment, response.data.candidateId);
      }}

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
          message =  "Hi " +   requirementList.cand1_name + ", Can we chat today about a job opening " +  localStorage.getItem('firstName') +
          ", " +   localStorage.getItem('mobile') +  ", " +  localStorage.getItem('companyName') +   ". Always reply by clicking back arrow button/right swipe only.";

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

  function getCanididateResumeInfo(candidateData,candidateDetail) {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}AI/getCanididateResumeInfo`,
      data: {
        id:candidateData
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setResumeParsedData({
          data:response.data?.data,
          candidateName: candidateDetail?.firstName + " "+ candidateDetail?.lastName,
        })
        const responsedData = JSON.stringify(response.data?.data)
const candidateFullName = candidateDetail?.firstName + " "+ candidateDetail?.lastName
        sessionStorage.setItem('candidateResume',responsedData)
sessionStorage.setItem('candidateName',candidateFullName)
        window.open(`/v1#/app/parsed_resume`,'_blank')
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

        updateData(candidateId); 
        setState({ ...state, right: false });
        handleNotificationCall("success", response.data.message);
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
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/updateJoinedStatus`,
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
      url: `${process.env.REACT_APP_SERVER}recruiter/updateJoiningDitchedStatus`,
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


  const ExistCheck=(e)=>{

    if(recruitmentId!==""){

      CheckExitAlready(recruitmentId, e);

    } else{
      handleNotificationCall("error", "Select Requirement");
    }


  };


  function CheckExitAlready(recruitmentId, e) {
  var data = {}; 
  var url="";

  if(e.target.name === "email"){
    data =  { 
      requirementId: recruitmentId,
      email: e.target.value
    } 
    url = `${process.env.REACT_APP_SERVER}recruiter/checkEmailExist`
  } else {
    data =  { 
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

  function cvMatchingPercentage(id,requirementId) {

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
    } else if (name === "VIEW") {
      setDataList("VIEW");
    } else {
      setDataList("NOTES");
    }
    if (name !== "NOTES") {
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
              cc: response.data.data.requirement?.recruiter?.firstName + " " +  response.data.data.requirement?.recruiter?.lastName,
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
              preferredLocation:response.data.data.candidateDetail?.preferredLocation,
              nativeLocation:response.data.data.candidateDetail?.nativeLocation,
              experience:response.data.data.candidateDetail?.experience,
              relevantExperience:response.data.data.candidateDetail?.relevantExperience,
              currentCtc:response.data.data.candidateDetail?.currentCtc,
              expectedCtc:response.data.data.candidateDetail?.expectedCtc,
              dob:response.data.data.candidateDetail?.dob,
              noticePeriod:response.data.data.candidateDetail?.noticePeriod,
              reasonForJobChange:response.data.data.candidateDetail?.reasonForJobChange,
              reason:response.data.data.candidateDetail?.reason,
              candidateProcessed:response.data.data.candidateDetail?.candidateProcessed,
              differentlyAbled:response.data.data.candidateDetail?.differentlyAbled,
              educationalQualification:response.data.data.candidateDetail?.educationalQualification,
              gender:response.data.data.candidateDetail?.gender,
              resume:response.data.data.candidateDetail?.resume, 
              alternateMobile: response.data.data.candidateDetail?.alternateMobile,
              candidateRecruiterDiscussionRecording:response.data.data.candidateRecruiterDiscussionRecording,
              candidateSkillExplanationRecording:response.data.data.candidateSkillExplanationRecording,
              candidateMindsetAssessmentLink:response.data.data.candidateMindsetAssessmentLink,
              candidateAndTechPannelDiscussionRecording:response.data.data.candidateAndTechPannelDiscussionRecording,
              mainId: response.data.data.mainId, 
              isCandidateCpv: response.data.data.isCandidateCpv,
              currentCompanyName:response.data.data.candidateDetail?.currentCompanyName,
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
              preferredLocation:response.data.data.candidateDetail?.preferredLocation,
              nativeLocation:response.data.data.candidateDetail?.nativeLocation,
              experience:response.data.data.candidateDetail?.experience,
              relevantExperience:response.data.data.candidateDetail?.relevantExperience,
              currentCtc:response.data.data.candidateDetail?.currentCtc,
              expectedCtc:response.data.data.candidateDetail?.expectedCtc,
              dob:response.data.data.candidateDetail?.dob,
              noticePeriod:response.data.data.candidateDetail?.noticePeriod,
              reasonForJobChange:response.data.data.candidateDetail?.reasonForJobChange,
              reason:response.data.data.candidateDetail?.reason,
              candidateProcessed:response.data.data.candidateDetail?.candidateProcessed,
              differentlyAbled:response.data.data.candidateDetail?.differentlyAbled,
              educationalQualification:response.data.data.candidateDetail?.educationalQualification,
              gender:response.data.data.candidateDetail?.gender,
              alternateMobile: response.data.data.candidateDetail?.alternateMobile?.substring(2),
              resume:response.data.data.candidateDetail?.resume,
              candidateRecruiterDiscussionRecording:response.data.data.candidateRecruiterDiscussionRecording,
              candidateSkillExplanationRecording:response.data.data.candidateSkillExplanationRecording,
              candidateMindsetAssessmentLink:response.data.data.candidateMindsetAssessmentLink,
              candidateAndTechPannelDiscussionRecording:response.data.data.candidateAndTechPannelDiscussionRecording,
              mainId: response.data.data.mainId, 
              recruiterId: response.data.data.recruiterId, 
              hideContactDetails: response.data.data.hideContactDetails,
              currentCompanyName:response.data.data.candidateDetail?.currentCompanyName,
             });

            setState({ ...state, right: true });
            setLoader(false);
          }  else{
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

  const table_options = {
    textLabels: {
      body: {
        noMatch: 'Oops! Matching record could not be found',
      }
    },
    pagination: false,
    sort: false,
    selectableRows: "none",
    search: false,
    filter: false,
    print: false,
    download: false,
    customToolbar: () => <HeaderElements />,
    onFilterChange: (changedColumn, filterList) => {},
    filterType: "dropdown",
    rowsPerPage: 50,

    // rowsExpanded: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    responsive: mobileQuery===true? 'vertical' : 'standard',
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
    ExpandButton: function(props) { 
      return <ExpandButton {...props} />;
    },
  };

  const [open, setOpen] = React.useState(false);
  const [stausOpen, setStatusOpen] = React.useState(false);
  const [stausNewOpen, setStatusNewOpen] = React.useState(false);
  const [dropOpen, setDropOpen] = React.useState(false);
  const [messageOpen, setMessageOpen] = React.useState(false);

   
  const [candidate, setCandidate] = useState({
    requirementId:"",
    source:"",
    email:"", 
    firstName:"",
    lastName:"",
    skills:"",  
    location:"", 
    experience:null,    
     candidateProcessed:"",
    native:"",
    preferredLocation:"",
    relevantExperience:null,
    educationalQualification:"",
    gender:"",
    differentlyAbled:"",
    currentCtc:null,
    expectedCtc:null,
    noticePeriod:"",
    reasonForJobChange:"",
    reason:"",
    dob:"", 
    freeValue:  decode.isEnableFree === true? "YES" : decode.isEnablePaid === true? "NO": "YES",

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

  const [view, setView] = useState("");

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
      url: `${process.env.REACT_APP_SERVER}CC/resetStatus`, 
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
          setPhoneValidation={setPhoneValidation }
          show ={candidatesEdit.recruiterId=== decode.recruiterId? true : false}  
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
          setAssessment={setAssessment}
           assessment={assessment}
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
          setRecruitmentId={setRecruitmentId}
          recruitmentId={recruitmentId}
          days={days}
          months={months}
          years={years}
          setDay={setDay}
          setMonth={setMonth}
          setYear={setYear}
          setPhoneValidation={setPhoneValidation }
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
              startIcon={<AddCircleIcon />}
              size="small"
              className={classes.margin}
              color="primary"
              onClick={(e) => {
                setDataList("ADD");
                setCandidate({
                  ...candidate,
                  requirementId:"",
                  source:"",
                  email:"", 
                  firstName:"",
                  lastName:"",
                  skills:"",  
                  location:"", 
                  experience:null,   
                  gender:"",
                  differentlyAbled:"", 
                  candidateProcessed:"",
                  native:"",
                  preferredLocation:"",
                  relevantExperience:null,
                  educationalQualification:"", 
                  currentCtc:null,
                  expectedCtc:null,
                  noticePeriod:"",
                  reasonForJobChange:"",
                  reason:"",
                  dob:"", 
                  candidateRecruiterDiscussionRecording:"", 
                  candidateSkillExplanationRecording:"",
                  candidateMindsetAssessmentLink:"",
                  candidateAndTechPannelDiscussionRecording:"",
                  freeValue:  decode.isEnableFree === true? "YES" : decode.isEnablePaid === true? "NO": "YES",
  
                 });
                 setPhoneValidation(false);
                setValidation(false);
                setRecruitmentId("");
                setFile([]);
                setState({ ...state, right: true });
              }}
            >
              Add New Candidate
            </Button>
          </div>
          <div className={classes.smButton}>
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              size="small"
              className={classes.margin}
              color="primary"
              onClick={(e) => {
                setDataList("ADD");
                reset();
                setValidation(false);
                setState({ ...state, right: true });
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
            classes={{ paper: dataList==="VIEW" || dataList==="NOTES"? classes.drawer: classes.clientDrawer }}
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

          <Autocomplete
            className={classes.filterFullWidth}
            options={requirementName}
            getOptionLabel={(option) =>
              option.requirementName + " (" + option.uniqueId + ")"
            }
            // size="small"
            value={requirementId}
            onChange={(event, value) => 
              {
                setRequirementId(value);
                

              }}
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
                  setCandidatesChange={setCandidatesChange} 
                  setPhoneValidation={setPhoneValidation }
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
                <> {item.candidateDetail?.firstName + " " +  item.candidateDetail?.lastName}   <br/>  {" (" +  item.uniqueId +   ")"}</>,
              
                item.mainId === decode.mainId ? 
                <>  { item.candidateDetail?.email + " /"} <br/>{"91 " + item.candidateDetail?.mobile.slice(2)}  </> 
                : item.hideContactDetails !== true?
                <>  { item.candidateDetail?.email + " /"} <br/>{"91 " + item.candidateDetail?.mobile.slice(2)}  </>  
                :"",
              <> {item.requirement?.requirementName}  <br/> { "(" +   item.requirement?.uniqueId +  ")"} </> ,
                item.recruiter?.firstName + " " + item.recruiter?.lastName,
                item.requirement?.recruiter?.firstName +  " " +  item.requirement?.recruiter?.lastName,
              
              <>{item.candidateDetail?.resume !== "https://liverefo.s3.amazonaws.com/" ? ( <>   <Grid container className={classes.space}>     <Grid item xs className={classes.toolAlign}>      
<Tooltip         title="View Resume"         placement="bottom"         aria-label="view"       >         
  <DescriptionIcon           className={classes.toolIcon}           onClick={()=>{ handleResumeOpen(); setFile([
    {
      url: item.candidateDetail?.resume
    }
  ])}}         />      
</Tooltip>
{/* <Tooltip         title="Downlaod Resume"         placement="bottom"         aria-label="downlaod"       > 
  <a href={item.candidateDetail?.resume} download>  <GetAppIcon className={classes.toolIcon} />    </a>      
</Tooltip>      */}
</Grid>   </Grid> </> ) : ( "No Resume Found" )}</>,
              
                <Tooltip         title="View Candidate"         placement="bottom"         aria-label="view"       > 
                  <ViewIcon
                  onClick={(e) => {
                        handleShow(item.id, "VIEW");
                      }}
                      className={classes.toolIcon}
                    
                    />
                </Tooltip>,
                // <Tooltip
                //   title="Match JD"
                //   placement="bottom"
                //   aria-label="view"
                // >
                //   <div className={classes.toolIcon+" "+classes.resumeUploadParent} 
                //     onClick={(e) => {
                //       handleJDOpen();
                //       cvMatchingPercentage(item.id);
                //       setCandidMatchId(item.id);
                //     }}>
                //     %
                //   </div>
                // </Tooltip>,
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
        
        dropCandidates ={ dropCandidates}
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

<ResumeDialog
       resume={file}
       resumeOpen={resumeOpen}
       handleResumeClose={handleResumeClose}
      />

      {/* <MatchJDDialog
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

