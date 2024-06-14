import React, { useState, useEffect, useRef } from "react";
import { Grid, SwipeableDrawer, Backdrop, CircularProgress, Tooltip, TablePagination
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import ViewIcon from "@material-ui/icons/Visibility";
//import DescriptionIcon from '@material-ui/icons/Description';
import DeleteIcon from "@material-ui/icons/Delete"; 
import {jwtDecode} from "jwt-decode";
import { yupResolver } from '@hookform/resolvers/yup';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import View from "../../components/Candidates/View";
//import Status from "../../components/Admin/Status";
//import ResumeDialog from "../../components/Candidates/Dialogs";  
import Dialogs from "../../components/Recruiter/Dialogs";
import Drop from "../../components/Candidates/Drop";
import Bar from "../../components/Candidates/Bar";
import * as Yup from 'yup';
import { withRouter } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useStyles from "../../themes/style.js";
import { ToastContainer, toast } from 'react-toastify';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification/Notification";
import 'react-toastify/dist/ReactToastify.css';



function Layouts(props) {

  
  var classes = useStyles();
   const mobileQuery = useMediaQuery('(max-width:600px)'); 

  const positions = [toast.POSITION.TOP_RIGHT];

  const invoiceRef = useRef();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const candidate_search = props.location.search;  
 
     const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  

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
  const [listCanditate, setListCanditate] = useState([]);

  
  // const [resumeOpen, setResumeOpen] = React.useState(false); 

  // const handleResumeClose = () => {
  //   setResumeOpen(false);
  // };

  // const handleResumeOpen = () => {
  //   setResumeOpen(true);
  // };

  const [candidateList, setCandidateList] = useState({
    id: "",
    name: "",
    mobile: "",
    message: "",
    rec_name: "",
    rec_mobile_no: "",
  });

  const [candidateView, setCandidateView] = useState({
    id:"",
    chatId: "",
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    skills: "",
    location:"",
    experience:null,
    resume:"",
    document: "",
    photo: "",
    clientName: "",
    requirementName: "",
    statusCode: "",
    source: "",
    requiremenUniqueId: "",
    candidateUniqueId: "",
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
   
 
  const [shortList] = useState({
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


 
  const [validation] = useState(false);
  const [saveOnly,setSaveOnly]=useState("YES");



   const joiningRef = useRef();

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

  const invoiceSchema = Yup.object().shape({
    invoice: Yup.number().test('len', 'Must be exactly 15 digits', val => Math.ceil(Math.log10(val + 1)) <= 15).required("Invoice Value is required").nullable(true).transform((_, val) => val ? Number(val) : null),
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
    register: invoiceCandidates,
    formState: { errors: invoiceErrors },
    handleSubmit: invoiceSubmit,
   // reset: invoicereset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(invoiceSchema),
  });
 
 
  useEffect(() => {
    setLoader(true);
    

    const fetchData = async () => {
      setCurrerntPage(1);
      setPage(0);

     
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}auth/externalViewRequirementsCandidate`,
        data: {
          page: "1", 
          requirementId: new URLSearchParams(candidate_search).get('requirementId')
        },
        headers: {
          "Content-Type": "application/json", 
        },
      }).then(function (response) {
        if (response.data.status === true) {
          setLoader(false);
 
          setCandidatesData(response.data.data);
 
          localStorage.setItem('token', response.data.token);
          const decoded = jwtDecode(response.data.token);

        localStorage.setItem('firstName', decoded.firstName);
        localStorage.setItem('email', decoded.email);
        localStorage.setItem('mobile', decoded.mobile);  
        localStorage.setItem('companyName', decoded.companyName);    
        localStorage.setItem('recruiterId', decoded.recruiterId);  
          setCount(response.data.count);
        }
      });
    };

    fetchData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    

    function InvoicedStatus(values) {
      setLoader(true);
      var url = `${process.env.REACT_APP_SERVER}auth/updateInvoicedStatusOpen`;
  
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
          },
        }).then(function (response) {
          if (response.data.status === true) {
            updateData(shortList.id); 
            handleStatusClose();
            resolve();
            handleNotificationCall("success", response.data.message);
          } else{
            handleNotificationCall("error", response.data.message);
            setLoader(false);
          }
        });
      });
    }

    
    function updateData(id){
 
    
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}auth/getAllCandidateStatusOpen`,
        data: {
          id: id,
        },
        headers: {
          "Content-Type": "application/json", 
        },
      })
        .then(function (response) {
    
          if (response.data.status === true) { 
    
            var myCandidateStatuses= response.data.data;
    
            axios({
              method: "post",
              url: `${process.env.REACT_APP_SERVER}auth/viewCandidateOpen`,
              data: {
                id: id,
              },
              headers: {
                "Content-Type": "application/json", 
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

 
 
 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setCurrerntPage(newPage + 1);
    setLoader(true);

 
    var data = JSON.stringify({
      page: newPage + 1,
      requirementId: new URLSearchParams(candidate_search).get('requirementId')
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}auth/externalViewRequirementsCandidate`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setCandidatesData(response.data.data);
        setCount(response.data.count);
      }

      setLoader(false);
    });
  };
 
 
  
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
      url = `${process.env.REACT_APP_SERVER}auth/changeYesCadidateStatusOpen`;
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
       
      },
    }).then(function (response) {
      if (response.data.status === true) {
        

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
      url: `${process.env.REACT_APP_SERVER}auth/updateJoinedStatusOpen`,
      data: {
        candidateId: shortList.id,
        joinedDate: joiningRef.current.value,
      },
      headers: {
        "Content-Type": "application/json",
     
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
    var url = `${process.env.REACT_APP_SERVER}auth/updateCrediNoteStatusOpen`;

    axios({
      method: "post",
      url: url,
      data: {
        candidateId: shortList.id,
        creditNoteReason: reasonRef.current.value
      },
      headers: {
        "Content-Type": "application/json",
       },
    }).then(function (response) {
      if (response.data.status === true) {
        handleStatusClose();
        handleReasonClose();
        updateData(shortList.id); 
        handleNotificationCall("success", response.data.message);

      } else{
        handleNotificationCall("error", response.data.message);
        setLoader(false);
      }
    });
  }

  function updateJoiningDitchedStatus() {
    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}auth/updateJoiningDitchedStatusOpen`,
      data: {
        candidateId: shortList.id,
      },
      headers: {
        "Content-Type": "application/json",
       
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
    var url = `${process.env.REACT_APP_SERVER}auth/dropCandidateOpen`;

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
    var url = `${process.env.REACT_APP_SERVER}auth/updateStcStatusOpen`;
 
      axios({
        method: "post",
        url: url,
        data: {
          id:  shortList.id, 
        },
        headers: {
          "Content-Type": "application/json",
         
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
    var url = `${process.env.REACT_APP_SERVER}auth/updateOfferDeclineStatusOpen`;
    setLoader(true);
    return new Promise((resolve) => {
      axios({
        method: "post",
        url: url,
        data: {
          candidateId: shortList.id,
        },
        headers: {
          "Content-Type": "application/json",
        
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
  
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}auth/viewCandidateOpen`,
        data: {
          id: values,
        },
        headers: {
          "Content-Type": "application/json",
          
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
              cc: response.data.data.requirement?.recruiter?.firstName +  " " + response.data.data.requirement?.recruiter?.lastName,
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
              document: response.data.data.candidateDetail?.document,
              photo: response.data.data.candidateDetail?.photo,
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
              alternateMobile: response.data.data.candidateDetail?.alternateMobile.substring(2),
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
          url: `${process.env.REACT_APP_SERVER}auth/getAllCandidateStatusOpen`,
          data: {
            id: values,
          },
          headers: {
            "Content-Type": "application/json",
            
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
    onFilterChange: (changedColumn, filterList) => {},
    filterType: "dropdown",
    search: false,
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

 
   const [stausOpen, setStatusOpen] = React.useState(false);
  const [stausNewOpen, setStatusNewOpen] = React.useState(false);
  const [dropOpen, setDropOpen] = React.useState(false);
 
   
 
  // const handleStatusOpen = () => {
  //   setStatusOpen(true);
  // };

  const handleStatusClose = () => {
    setStatusOpen(false);
  };

  // const handleStatusNewOpen = () => {
  //   setStatusNewOpen(true);
  // };

  const handleStatusNewClose = () => {
    setStatusNewOpen(false);
  };
 
 
  const [view, setView] = useState("");
 
 

  function dropConfirmation(id) {
    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}auth/dropCandidateOpen`,
      data: {
        id: id,
      },
      headers: {
        "Content-Type": "application/json",
        
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


  const list = (anchor) =>
    (
      <View
      candidateView={candidateView}
      toggleDrawer={toggleDrawer}
      listCanditate={listCanditate}
      candidatesEdit={candidatesEdit}
      setCandidateView={setCandidateView}
      CPV = {false}
      Source = {false}
    />
    );

      
  return (
  <>
    
  <>
         
            <Grid container direction="row" spacing={2} className={classes.heading}>
        <Grid item xs={9} sm={7} md={8} lg={6}>
          {candidatesData?.[0]?.requirement?.requirementName !== undefined? 
          <PageTitle title={"Candidates ("+ candidatesData?.[0]?.requirement?.requirementName+")"} />
          :
          <PageTitle title={"Candidates"} />
          }
        </Grid>

        <Grid item xs={3} sm={5} md={4} lg={6} className={classes.drawerClose}>
        
         
          <SwipeableDrawer
            anchor="right"
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
            classes={{ paper: classes.drawer }}
          >
            {list("right")}
          </SwipeableDrawer>
        </Grid>
      </Grid>

    
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MUIDataTable
          //  components={components}
            options={table_options}
            columns={[
              {
                name: "S.No",
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
                name: "View Candidate",
              }, 
              {
                name: "Actions",
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
               
          
          <> {item.candidateDetail?.firstName + " " +  item.candidateDetail?.lastName}   <br/>   {" (" +  item.uniqueId +   ")"}  </>,
          item.recruiterId === localStorage.getItem('recruiterId')? 
          <>  { item.candidateDetail?.email + " /"} <br/>{"91 " + item.candidateDetail?.mobile.slice(2)}  </> 
          : item.hideContactDetails !== true?
          <>  { item.candidateDetail?.email + " /"} <br/>{"91 " + item.candidateDetail?.mobile.slice(2)}  </>  
          :"",

                <> {item.requirement?.requirementName} <br/>{  "(" +  item.requirement?.uniqueId +    ")"}</>,
                item.recruiter?.firstName + " " + item.recruiter?.lastName, 
             <Tooltip         title="View Candidate"         placement="bottom"         aria-label="view"       > 
                <ViewIcon
                onClick={(e) => {
                    handleShow(item.id, "VIEW");
                  }}
                    className={classes.toolIcon}
                  
                  />
             </Tooltip>,
               
               item.statusList.statusCode === 301 ||
               item.statusList.statusCode === 303 ||
               item.statusList.statusCode === 3031 ||
               item.statusList.statusCode === 304 ||
               item.statusList.statusCode === 3041 ||
               item.statusList.statusCode === 305 ||
               item.statusList.statusCode === 306 ||
               item.statusList.statusCode === 307 ? ( 
                   <Tooltip
                     title="Drop Candidate"
                     placement="right"
                     aria-label="Drop Candidate"
                     onClick={(e) => {
                       
                        handleDropOpen();
                        setCandidateList({
                         ...candidateList,
                 
                         id: item.id,
                       });
                     }}
                   >
                     <DeleteIcon
                       className={classes.toolIconDelete}
                      
                     />
                   </Tooltip>
                
                   ) : (
                     ""
                   ),
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

      
      {loader === false && localStorage.getItem('token') ?  
      <>
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
 
 
      {/* <ResumeDialog
       resume={file}
       resumeOpen={resumeOpen}
       handleResumeClose={handleResumeClose}
      /> */}
     
      <Drop
        handleDropClose={handleDropClose}
        dropOpen={dropOpen}
        dropConfirmation={dropConfirmation}
        candidateList={candidateList}
      />

 
      </>
:""}

      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
       
      <ToastContainer
        closeButton={
          <CloseButton className={classes.notificationCloseButton} />
        }
        closeOnClick={false}
        hideProgressBar={true}
      />
  </> 
 
</>
  );
}

export default withRouter(Layouts);
 
function CloseButton({ closeToast, className }) {
  return <CloseIcon className={className} onClick={closeToast} />;
}