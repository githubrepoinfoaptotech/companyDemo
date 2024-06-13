import React, { useEffect, useState, useReducer, useRef } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  Select,
  TextField,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
  AppBar,
  InputAdornment,
  Dialog,
  DialogTitle,
  Button,
  Typography,
  DialogContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ClickAwayListener,
  Tooltip,
  Popper,
} from "@material-ui/core";
import moment from "moment";

import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import InfoIcon from "@material-ui/icons/Info";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import { Popover } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import CloseIcon from "@material-ui/icons/Close";
import Chip from "@material-ui/core/Chip";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import useStyles from "../../themes/style.js";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import { Menu as MenuIcon } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Notification from "../../components/Notification";
import {
  toggleSidebar,
  useLayoutDispatch,
  useLayoutState,
} from "../../context/LayoutContext";
import Fab from "@mui/material/Fab";
import { signOut, useUserDispatch } from "../../context/UserContext";
import walletBlue from "../../images/WalletBlue.png";
import walletRed from "../../images/WalletRed.png";
import { useHistory } from "react-router-dom";
import SearchBar from "../Candidates/Search.js";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import PublishIcon from "@material-ui/icons/Publish";
import sample_candidates from "../../images/sample_candidates.xlsx";
import AddClient from "../Admin/AddClient";
import AddUser from "../Admin/AddUser";
import Add from "../Candidates/Add";
import AddRequirements from "../Candidates/AddRequirements";
import AssignAdd from "../Admin/AssignAdd.js";
import { Autocomplete } from "@material-ui/lab";

import addRequirements from "../../images/quickAccess/Add_requirements.png";
import addUsers from "../../images/quickAccess/Add_users.png";
import addClients from "../../images/quickAccess/Add_clients.png";
import addCandidates from "../../images/quickAccess/Add_candidates.png";
import assignRequirements from "../../images/quickAccess/Assign_Requirements.png";
import MSMEregistration from "../../images/quickAccess/MSMEregistration.png";
import shareCVImg from "../../images/quickAccess/shareCV.png";
//import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import "react-toastify/dist/ReactToastify.css";

export default function Header(props) {
  var classes = useStyles();
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  var userDispatch = useUserDispatch();
  var layoutDispatch = useLayoutDispatch();
  var layoutState = useLayoutState();
  var [notificationsPosition] = useState(2);
  var [errorToastId, setErrorToastId] = useState(null);
  var [profileMenu, setProfileMenu] = useState(null);
  var token = localStorage.getItem("token");
  var decode = jwtDecode(token);
  var [WalletValue, setWalletValue] = useState(0);
  var [image, setImage] = useState();
  var [view, setView] = useState("");
  var [profile, setProfile] = useState([]);
  var [file, setFile] = useState([]);
  const [assessment, setAssessment] = useState([]);
  const [hideContactDetails, setHideContactDetails] = useState(false);

  //const [isScrollOpen,setIsScrollOpen]=useState(false)
  const [isShareCV, setIsShareCV] = useState(false);

  const history = useHistory();

  var [deleteValue, setDeleteValue] = useState("");
  const [roleName, setRoleName] = useState("");

  var [backupView, setBackupView] = useState({
    view: "",
    link: "",
  });

  const [backupOpen, setBackupOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [uploadConfirmOpen, setUploadConfirmOpen] = React.useState(false);
  const [existingOpen, setExistingOpen] = React.useState(false);
  const [existingConfirmOpen, setExistingConfirmOpen] = React.useState(false);
  const [invitationOpen, setInvitationOpen] = React.useState(false);

  const [cvLink, setCvLink] = React.useState("");

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  function handleCopy() {
    copyTextToClipboard(
      `${process.env.REACT_APP_SITE}/v1/#/companyRegister`,
    ).then(() => {
      handleNotificationCall("success", "Copied successfully");
    });
  }

  function handleCvLinkCopy(text) {
    copyTextToClipboard(text).then(() => {
      handleNotificationCall("success", "Copied successfully");
    });
  }

  function getLink(id) {
    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/candidateCvLink`,
      data: { requirementId: id },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setCvLink(response.data.link);
      } else {
      }
      setLoader(false);
    });
  }

  const handleUploadConfirmClose = () => {
    setUploadConfirmOpen(false);
  };

  // const handleUploadOpen = () => {
  //   setUploadOpen(true);
  // };

  const handleUploadClose = () => {
    setUploadOpen(false);
  };

  const handleExistingOpen = () => {
    setExistingOpen(true);
  };

  const handleExistingClose = () => {
    setExistingOpen(false);
  };

  // const handleBackupOpen = () => {
  //   setBackupOpen(true);
  // };

  const handleBackupClose = () => {
    setBackupOpen(false);
  };

  const handleconfirmOpen = () => {
    setBackupOpen(false);
    setConfirmOpen(true);
  };

  const handleconfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleExistingConfirmClose = () => {
    setExistingConfirmOpen(false);
  };

  const handleInvitationClose = () => {
    setInvitationOpen(false);
  };

  const handleShareCVClose = () => {
    setIsShareCV(false);
  };

  const handleDeleteOpen = () => {
    setConfirmOpen(false);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const toRef = useRef(null);
  const fromRef = useRef(null);

  const monthDropdown = [
    {
      id: "1",
      Month: "JAN",
    },
    {
      id: "2",
      Month: "FEB",
    },
    {
      id: "3",
      Month: "MAR",
    },
    {
      id: "4",
      Month: "APR",
    },

    {
      id: "5",
      Month: "MAY",
    },
    {
      id: "6",
      Month: "JUN",
    },
    {
      id: "7",
      Month: "JUL",
    },
    {
      id: "8",
      Month: "AUG",
    },

    {
      id: "9",
      Month: "SEP",
    },

    {
      id: "10",
      Month: "OCT",
    },

    {
      id: "11",
      Month: "NOV",
    },

    {
      id: "12",
      Month: "DEC",
    },
  ];

  const [loader, setLoader] = useState(false);

  const [state, setState] = useState({
    right: false,
  });

  const [popperOpen, setPopperOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const [quickAccessOpen, setQuickAccessOpen] = useState(false);
  const [quickAccessMobileOpen, setQuickAccessMobileOpen] = useState(false);

  const handleQAClick = (event) => {
    setAnchorEl2(event.currentTarget);
    setQuickAccessOpen((previousOpen) => !previousOpen);
  };

  const handleQAMobileClick = (event) => {
    setAnchorEl2(event.currentTarget);
    setQuickAccessMobileOpen((previousOpen) => !previousOpen);
  };

  const qaOpen = quickAccessOpen && Boolean(anchorEl2);
  const qaMobileOpen = quickAccessMobileOpen && Boolean(anchorEl2);

  const qaId = qaOpen ? "spring" : undefined;
  const qaMobileId = qaMobileOpen ? "spring" : undefined;

  const handlePoperClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPopperOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = popperOpen && Boolean(anchorEl);
  const poperId = canBeOpen ? "spring-popper" : undefined;


  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
    financialData();
  };

  /** Start Client **/

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
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 60 },
    (_, i) => moment(new Date()).format("YYYY") - i,
  );

  const [recruiterFields, setRecruiterFields] = useState([
    {
      name: "",
      mobile: "",
      email: "",
    },
  ]);

  const recruiterChange = (event, index) => {
    const values = [...recruiterFields];
    values[index][event.target.name] = event.target.value;
    setRecruiterFields(values);
  };

  const recruiterAdd = () => {
    setRecruiterFields([
      ...recruiterFields,
      {
        name: "",
        mobile: "",
        email: "",
      },
    ]);

    const timeout = setTimeout(() => {
      const element = document.getElementById("section");

      element.scrollIntoView({ behavior: "smooth" });
    }, 500);

    return () => clearTimeout(timeout);
  };
  const recruiterRemove = (index) => {
    if (recruiterFields.length !== -1) {
      const values = [...recruiterFields];
      values.splice(-1);
      setRecruiterFields(values);
    }
  };

  function handleAddClient(values) {
    return new Promise((resolve) => {
      setLoader(true);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/addClient`,
        data: {
          clientName: values.clientName,
          clientIndustry: values.clientIndustry,
          clientWebsite: values.clientWebsite,
          aggStartDate: values.aggStartDate,
          aggEndDate: values.aggEndDate,
          orgRec: recruiterFields,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        resolve();
        if (response.data.status === true) {
          handleNotificationCall("success", response.data.message);
          history.push("/app/clients");
          setState({ ...state, right: false });
        } else {
          handleNotificationCall("error", response.data.message);
        }
        setLoader(false);
      });
    });
  }

  /** End Client **/

  /** Start User*/
  function handleAddUser(values) {
    return new Promise((resolve) => {
      setLoader(true);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/addUser`,
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          mobile: values.mobile,
          roleName: values.roleName,
          companyName: values.companyName,
          employeeId: values.employeeId,
        },

        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        resolve();
        if (response.data.status === true) {
          handleNotificationCall("success", response.data.message);
          history.push("/app/users");
          setState({ ...state, right: false });
        } else {
          handleNotificationCall("error", response.data.message);
        }
        setLoader(false);
      });
    });
  }

  /** End User */

  /** Start Candidate*/
  const [source, setSource] = useState([]);
  const messageRef = useRef();
  const [recruitmentId, setRecruitmentId] = useState("");
  const [addList, setAddList] = useState([]);
  const [phoneValidation, setPhoneValidation] = useState(false);
  const [recruitmentList, setRecruitmentList] = useState([]);
  const [validation, setValidation] = useState(false);
  const [open, setOpen] = React.useState(false);

  const ExistCheck = (e) => {
    if (decode.role === "SUBVENDOR" || decode.role === "FREELANCER") {
      CheckExitAlready(recruitmentId, e);
    } else {
      if (recruitmentId !== "") {
        CheckExitAlready(recruitmentId, e);
      } else {
        handleNotificationCall("error", "Select Requirement");
      }
    }
  };

  function CheckExitAlready(recruitmentId, e) {
    var data = {};
    var url = "";

    if (e.target.name === "email") {
      data = {
        requirementId: recruitmentId,
        email: e.target.value,
      };
      url = `${process.env.REACT_APP_SERVER}recruiter/checkEmailExist`;
    } else {
      data = {
        requirementId: recruitmentId,
        mobile: e.target.value,
      };
      url = `${process.env.REACT_APP_SERVER}recruiter/checkMobileExist`;
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
    });
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
    freeValue:
      decode.isEnableFree === true
        ? "YES"
        : decode.isEnablePaid === true
          ? "NO"
          : "YES",
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
              rec_name: localStorage.getItem("firstName"),
              rec_mobile_no: localStorage.getItem("mobile"),
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
        dob:
          addList.day === undefined
            ? ""
            : dob !== "--"
              ? addList.day + "-" + addList.month + "-" + addList.year
              : "",
        noticePeriod: addList.noticePeriod,
        reasonForJobChange: addList.reasonForJobChange,
        candidateProcessed: addList.candidateProcessed,
        differentlyAbled: addList.differentlyAbled,
        educationalQualification: addList.educationalQualification,
        gender: addList.gender,
        reason: addList.reason,
        sendMessage: "",
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
        dob:
          addList.day === undefined
            ? ""
            : dob !== "--"
              ? addList.day + "-" + addList.month + "-" + addList.year
              : "",
        noticePeriod: addList.noticePeriod,
        reasonForJobChange: addList.reasonForJobChange,
        candidateProcessed: addList.candidateProcessed,
        differentlyAbled: addList.differentlyAbled,
        educationalQualification: addList.educationalQualification,
        gender: addList.gender,
        reason: addList.reason,
        candidateRecruiterDiscussionRecording:
          addList.candidateRecruiterDiscussionRecording,
        candidateSkillExplanationRecording:
          addList.candidateSkillExplanationRecording,
        candidateMindsetAssessmentLink: addList.candidateMindsetAssessmentLink,
        candidateAndTechPannelDiscussionRecording:
          addList.candidateAndTechPannelDiscussionRecording,
        currentCompanyName: addList.currentCompanyName,
        sendMessage: send,
      };
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
        dob:
          addList.day === undefined
            ? ""
            : dob !== "--"
              ? addList.day + "-" + addList.month + "-" + addList.year
              : "",
        noticePeriod: addList.noticePeriod,
        reasonForJobChange: addList.reasonForJobChange,
        candidateProcessed: addList.candidateProcessed,
        differentlyAbled: addList.differentlyAbled,
        educationalQualification: addList.educationalQualification,
        gender: addList.gender,
        reason: addList.reason,
        candidateRecruiterDiscussionRecording:
          addList.candidateRecruiterDiscussionRecording,
        candidateSkillExplanationRecording:
          addList.candidateSkillExplanationRecording,
        candidateMindsetAssessmentLink: addList.candidateMindsetAssessmentLink,
        candidateAndTechPannelDiscussionRecording:
          addList.candidateAndTechPannelDiscussionRecording,
        currentCompanyName: addList.currentCompanyName,
        sendMessage: send,
      };
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
            message =
              "Hi " +
              requirementList.cand1_name +
              ", Can we chat today about a job opening " +
              localStorage.getItem("firstName") +
              ", " +
              localStorage.getItem("mobile") +
              ", " +
              localStorage.getItem("companyName") +
              ". Always reply by clicking back arrow button/right swipe only.";

            handleMessage(
              response.data.candidate_mobile,
              message,
              response.data.candidateId,
            );
          }
        }

        handleNotificationCall("success", response.data.message);

        decode.role === "ADMIN"
          ? history.push("/app/admin_candidates")
          : decode.role === "RECRUITER"
            ? history.push("/app/recruiter_candidates")
            : decode.role === "CLIENTCOORDINATOR"
              ? history.push("/app/cc_candidates")
              : history.push("/app/others_candidates");
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
          localStorage.getItem("companyName"),
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

  /** Start Requirements */
  const [recUser, setRecUser] = useState([]);

  const ContentRef = React.useRef();
  var [hideFromInternal, setHideFromInternal] = useState(false);
  const [modeofWork, setModeofWork] = React.useState("");
  const [specialHiring, setSpecialHiring] = React.useState("");
  const [clientId, setClientId] = useState("");
  const [requirementsOrgId, setRequirementsOrgId] = useState("");
  const [clientList, setClientList] = useState([]);

  const RequirementsSchema = Yup.object().shape({
    requirementName: Yup.string().required("Requirement Name is required"),
    jobLocation: Yup.string().required("Job Location is required"),
    clientId: Yup.string().required(decode.companyType === "COMPANY" ? "Project Name is required" : "Client Name is required"),
    orgRecruiterId: Yup.string().required("Org Recruiter Name is required"),
    skills: Yup.string().required("Skill is required"),
    gist: Yup.string(),
    hideFromInternal: Yup.string(),
    work: Yup.string().required("Mode of work is required"),
    hiring: Yup.string(),
    experience: Yup.string().required("Experience is required"),
  });

  const {
    register: requirementsRegister,
    formState: {
      errors: requirementsErrors,
      isSubmitting: requirementsIsSubmitting,
    },
    handleSubmit: requirementsSubmit,
    reset: requirementsReset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(RequirementsSchema),
  });

  function handleClientNameChange(value) {
    setClientId(value);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}CC/getOrganisationReciruterList`,
      data: {
        id: value,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setRecUser(response.data.data);
      }
    });
  }

  function handleUploadChange(e) {
    setFile(e.target.files[0]);
  }

  function handleRequirementAdd(values) {
    return new Promise((resolve) => {
      setLoader(true);
      var url = "";
      if (decode.role === "ADMIN") {
        url = `${process.env.REACT_APP_SERVER}admin/addRequirement`;
      } else {
        url = `${process.env.REACT_APP_SERVER}CC/addRequirement`;
      }

      axios({
        method: "post",
        url: url,
        data: {
          requirementName: values.requirementName,
          skills: values.skills,
          clientId: clientId,
          orgRecruiterId: requirementsOrgId,
          jobLocation: values.jobLocation,
          experience: values.experience,
          gist: ContentRef.current.value,
          file: file?.name,
          modeOfWork: values.work,
          specialHiring: values.hiring,
          hideFromInternal: values.hideFromInternal,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          if (file?.name) {
            uploadJD(file, response.data.requirementId);
          }

          handleNotificationCall("success", response.data.message);
          history.push("/app/requirements");
          setState({ ...state, right: false });
        } else {
          handleNotificationCall("error", response.data.message);
        }
        resolve();
        setLoader(false);
      });
    });
  }

  function uploadJD(File, Id) {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("file", File);
    data.append("id", Id);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}cc/updateRequirementJd`,
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

  /** End Requirements */

  /** Start Assign */
  const [requirementName, setRequirementName] = useState([]);

  const [externalUser, setExternalUser] = useState([]);
  const [recruiterId, setRecruiterId] = useState(null);
  const [requirementId, setRequirementId] = useState(null);
  const [assignData, setAssignData] = useState([]);
  const [assignPage, setAssignPage] = useState(0);
  const [assignCurrerntPage, setAssignCurrerntPage] = useState(1);
  const [assigncount, setAssignCount] = useState(0);

  const assignSchema = Yup.object().shape({
    recruiterId: Yup.string().required("User is required"),
    requirementId: Yup.string().required("Requirement Name is required"),
  });

  const {
    register: assignRequirement,
    formState: { errors: assignErrors, isSubmitting: assignIsSubmitting },
    handleSubmit: assignSubmit,
    reset: assignReset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(assignSchema),
  });

  useEffect(() => {
    if (decode.role !== "SUPERADMIN") {
      const fetchData = async () => {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_SERVER}recruiter/externalUserList`,
          data: {},
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }).then(function (response) {
          if (response.data.status === true) {
            setExternalUser(response.data.data);
          }
        });
      };

      const getRequirementName = async () => {
        var url = "";

        if (decode.role === "ADMIN") {
          url = `${process.env.REACT_APP_SERVER}admin/getAllRequirementList`;
        } else if (
          decode.role === "SUBVENDOR" ||
          decode.role === "FREELANCER"
        ) {
          url = `${process.env.REACT_APP_SERVER}recruiter/getAssignedRequierments`;
        } else if (decode.role === "RECRUITER") {
          url = `${process.env.REACT_APP_SERVER}recruiter/requirementList`;
        } else {
          url = `${process.env.REACT_APP_SERVER}CC/getCCRequirementList`;
        }

        axios({
          method: "post",
          url: url,
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducerValue, token]);

  function handleAssignRequirements(values) {
    return new Promise((resolve) => {
      setLoader(true);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/assignRequirements`,
        data: {
          recruiterId: recruiterId?.id,
          requirementId: requirementId?.id,
        },

        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        resolve();
        if (response.data.status === true) {
          handleNotificationCall("success", response.data.message);
          history.push("/app/users");
          assignReset();
          setRecruiterId(null);
          setRequirementId(null);
          forceUpdate();
          setState({ ...state, right: false });
        } else {
          handleNotificationCall("error", response.data.message);
        }
        setLoader(false);
      });
    });
  }

  const handlerequirementChangePage = (event, newPage) => {
    setAssignPage(newPage);
    setLoader(true);
    setAssignCurrerntPage(newPage + 1);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/viewAllAssigendRequirements`,
      data: {
        recruiterId: recruiterId?.id,
        page: newPage + 1,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setAssignData(response.data.data);
        setAssignCount(response.data.count);
      }

      setLoader(false);
    });
  };

  function handleAssignStatus(id, value) {
    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/changeAssignedRequirementStatus`,
      data: {
        id: id,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        const switchState = assignData.map((item) => {
          if (item.id === id) {
            return { ...item, isActive: value };
          }
          return item;
        });
        setAssignData(switchState);
        setLoader(false);
        handleNotificationCall("success", response.data.message);
      }
    });
  }

  function getAssigendRequirements(id) {
    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/viewAllAssigendRequirements`,
      data: {
        recruiterId: id,
        page: "1",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setLoader(false);
          setAssignData(response.data.data);
          setAssignCount(response.data.count);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  /** End Assign */

  const positions = [toast.POSITION.TOP_RIGHT];
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
      position: positions[notificationsPosition],
      progressClassName: classes.progress,
      onClose: notificationType === "error" && (() => setErrorToastId(null)),
      className: classes.notification,
    });

    if (notificationType === "error") setErrorToastId(toastId);
  }

  const [Month, setMonthValue] = useState({
    toMonth: "",
    fromMonth: "",
  });




  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a Valid Email Address"),
    firstName: Yup.string().max(255).required("First Name is required"),
    lastName: Yup.string().max(255).required("Last Name is required"),
    mobile: Yup.string()
      .required("Mobile is required")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    companyName: Yup.string().max(255).required("Company Name is required"),
  });

  const changeSchema = Yup.object().shape({
    old: Yup.string()
      .required("Old Password is required")
      .min(8, "Old Password must be at least 8 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirm: Yup.string()
      .required("Confirm Password is required")
      .min(8, "Confirm Password must be at least 8 characters"),
  });

  const userSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a Valid Email Address"),
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
    mobile: Yup.string()
      .required("Mobile is required")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    roleName: Yup.string().required("User Category is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    employeeId: Yup.string(),
    companyName:
      roleName === "SUBVENDOR"
        ? Yup.string().required("company Name is required")
        : Yup.string(),
  });

  const clientSchema = Yup.object().shape({
    clientName: Yup.string().max(255).required(decode.companyType === "COMPANY" ? "Project Name is required" : "Client Name is required"),
    clientIndustry: Yup.string()
      .max(255)
      .required(decode.companyType === "COMPANY" ? "Project Division is required" : "Client Industry is required"),
    // clientWebsite: Yup.string()
    //   .max(255)
    //   .required("Clients Website is required"),
    aggStartDate: Yup.string().max(255).required("Start Date is required"),
    aggEndDate: Yup.string().max(255).required("End Date is required"),
  });

  const invitationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a Valid Email Address")
      .required("Email is required"),
  });

  const shareCVSchema = Yup.object().shape({
    requirementId: Yup.string().required("Requirement Name is required"),
    email: Yup.string()
      .email("Email must be a Valid Email Address")
      .required("Email is required"),
    mobile: Yup.string()
      .required("Mobile is required")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
  });

  const candidateSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a Valid Email Address")
      .required("Email is required"),
    firstName: Yup.string()
      .required("First Name is required")
      .max(255)
      .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: "First Name be Alphanumeric",
      }),
    lastName: Yup.string()
      .max(255)
      .required("Last Name is required")
      .max(255)
      .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: "Last Name be Alphanumeric",
      }),
    mobile: Yup.string()
      .required("Contact Number is required")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    requirementId: Yup.string().required("Requirement Name is required"),
    skills: Yup.string().required("Skill is required"),
    source: Yup.string().required("Source is required"),
    free: Yup.string().nullable().notRequired(),
    experience: Yup.number()
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
    location: Yup.string().nullable().notRequired(),
    alternateMobile:
      phoneValidation === true
        ? Yup.string()
          .required("Alternate Contact Number is required")
          .min(10, "Must be exactly 10 digits")
          .max(10, "Must be exactly 10 digits")
        : Yup.string(),
    day: Yup.string().nullable().notRequired(),
    month: Yup.string().nullable().notRequired(),
    year: Yup.string().nullable().notRequired(),
    gender: Yup.string().nullable().required("Gender is required"),
    educationalQualification: Yup.string().nullable().notRequired(),
    differentlyAbled: Yup.string().nullable().notRequired(),
    currentCtc: Yup.number()
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
    expectedCtc: Yup.number()
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
    noticePeriod: Yup.string().nullable().notRequired(),
    reasonForJobChange: Yup.string().nullable().notRequired(),
    candidateProcessed: Yup.string().nullable().notRequired(),
    reason: Yup.string().nullable().notRequired(),
    native: Yup.string().nullable().notRequired(),
    preferredLocation: Yup.string().nullable().notRequired(),
    relevantExperience: Yup.number()
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
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

  const {
    register: clientRegister,
    formState: { errors: clientErrors, isSubmitting: clientIsSubmitting },
    handleSubmit: clientSubmit,
    reset: clientReset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(clientSchema),
  });

  const {
    register: userRegister,
    formState: { errors: userErrors, isSubmitting: userIsSubmitting },
    handleSubmit: userSubmit,
    reset: userReset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(userSchema),
  });

  const {
    register: changePassword,
    formState: { errors: changeErrors, isSubmitting: changeIsSubmitting },
    handleSubmit: changeSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(changeSchema),
  });

  const {
    register: invite,
    formState: { errors: inviteErrors, isSubmitting: inviteIsSubmitting },
    handleSubmit: inviteSubmit,
    reset: inviteReset,
  } = useForm({
    resolver: yupResolver(invitationSchema),
  });

  const {
    register: shareCV,
    formState: { errors: shareCVErrors, isSubmitting: shareCVIsSubmitting },
    handleSubmit: shareCVSubmit,
    reset: shareCVReset,
  } = useForm({
    resolver: yupResolver(shareCVSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit: uploadSubmit } = useForm({
    mode: "onBlur",
  });

  const [values, setValues] = React.useState({
    showOldPassword: false,
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleClickOldPassword = () => {
    setValues({ ...values, showOldPassword: !values.showOldPassword });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.confirm });
  };

  function handleChange(event) {
    setImage(URL.createObjectURL(event.target.files[0]));

    var FormData = require("form-data");
    var data = new FormData();
    data.append("image", event.target.files[0]);

    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/setLogo`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setLoader(false);
        handleNotificationCall("success", response.data.message);
        setImage(response.data.image);
      } else {
        setLoader(false);
        handleNotificationCall("error", response.data.message);
      }
    });
  }

  function handleCompanySettings(values) {
    if (fromRef.current.value !== "" && toRef.current.value !== "") {
      handleNotificationCall("error", "Check Financial Year Properly");
      return
    }

    return new Promise((resolve) => {
      setLoader(true);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/editMyCompanySettings`,
        data: {
          fromMonth: fromRef.current.value,
          toMonth: toRef.current.value,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {
            handleNotificationCall("success", response.data.message);
            forceUpdate();
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

  function handleBackupOnly(view) {
    setLoader(true);
    setView("Download");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/resumeBackup`,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          handleResumeBackup(view);
        } else {
          setLoader(false);

          handleNotificationCall("error", response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleResumeBackup(view) {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/backupData`,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          handleArchiveDownload(view);
        } else {
          setLoader(false);

          handleNotificationCall("error", response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleArchiveDownload(view) {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/archiveDownload`,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setLoader(false);
          setBackupView({
            ...backupView,
            view: view,
            link: response.data.link,
          });
        } else {
          setLoader(false);

          handleNotificationCall("error", response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleUploadConfirm() {
    if (file && file.name) {
      setUploadConfirmOpen(true);
      handleUploadClose();
    } else {
      handleNotificationCall("error", "No file uploaded");
    }
  }

  function handleExistingConfirm() {
    if (file && file.name) {
      setExistingConfirmOpen(true);
      handleExistingClose();
    } else {
      handleNotificationCall("error", "No file uploaded");
    }
  }

  function handleUpload() {
    if (file && file.name) {
      var FormData = require("form-data");
      var data = new FormData();
      data.append("backup", file);

      setLoader(true);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/clientRestoreBackup`,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          restore(response.data.foldername);
        } else {
          setLoader(false);
          handleNotificationCall("error", response.data.message);
        }
      });
    } else {
      handleNotificationCall("error", "No file uploaded");
    }
  }

  function restore(foldername) {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/clientrestoreDataBase`,
      data: {
        foldName: foldername,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setLoader(false);
        handleNotificationCall("success", response.data.message);
        handleUploadConfirmClose();
        window.location.reload();
      } else {
        setLoader(false);
        handleNotificationCall("error", response.data.message);
      }
    });
  }

  function handleExistingUpload() {
    if (file && file.name) {
      var FormData = require("form-data");
      var data = new FormData();
      data.append("backup", file);

      setLoader(true);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/uploadExistingCandidates`,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          handleNotificationCall("success", response.data.message);
          handleExistingConfirmClose();
          setLoader(false);
        } else {
          setLoader(false);
          handleNotificationCall("error", response.data.message);
        }
      });
    } else {
      handleNotificationCall("error", "No file uploaded");
    }
  }

  const deleteRef = useRef(null);

  function handleBackupDelete() {
    setLoader(true);
    if (deleteRef.current.value === "DELETE") {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/inactiveBackup`,
        data: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {
            window.location.reload();
            handleDeleteClose();
            handleNotificationCall("success", "Data is deleted permanently");
          } else {
            handleNotificationCall("error", response.data.message);
          }
          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setLoader(false);
      handleNotificationCall("error", "Doesn't match");
    }
  }

  useEffect(() => {
    var decode = jwtDecode(token);
    if (decode.role !== "SUPERADMIN") {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}auth/getLogo`,
        data: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {
            setImage(response.data.image);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      const fetchData = async () => {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_SERVER}recruiter/viewUsers`,
          data: {
            id: decode.user_id,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
          .then(function (response) {
            if (response.data.status === true) {
              setProfile(response.data.data);
            }
            setLoader(false);
          })
          .catch(function (error) {
            console.log(error);

            if (
              error?.response?.status === 401 ||
              error?.response?.status === 403
            ) {
              signOut(userDispatch, props.history);
            }
          });
      };

      if (decode.role === "ADMIN") {
        financialData();
      }
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducerValue, token]);

  const financialData = async () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/myCompanySettings`,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setMonthValue({
          toMonth: response.data.data.toMonth,
          fromMonth: response.data.data.fromMonth,
        });
      }
    });
  };

  function updateProfile(values) {
    return new Promise((resolve) => {
      setLoader(true);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/updateProfile`,
        data: {
          id: decode.user_id,
          firstName: values.firstName,
          lastName: values.lastName,
          companyName: values.companyName,
          mobile: values.mobile,
          email: values.email,
          employeeId: values.employeeId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {
            localStorage.setItem("firstName", values.firstName);
            localStorage.setItem("email", values.email);
            localStorage.setItem("mobile", values.mobile);
            localStorage.setItem("companyName", values.companyName);

            handleNotificationCall("success", response.data.message);
            forceUpdate();

            setState({ ...state, right: false });
          } else {
            handleNotificationCall("error", response.data.message);
          }
          resolve();
          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  async function handleChangePassword(values) {
    if (values.password !== values.confirm) {
      handleNotificationCall("error", "Password is mismatch");
      return
    }
    setLoader(true);
    try {
      var decode = jwtDecode(token);
      var url = decode.role === "SUPERADMIN"
        ? `${process.env.REACT_APP_SERVER}superadmin/changeMyPassword`
        : `${process.env.REACT_APP_SERVER}auth/changeMyPassword`;

      const response = await axios({
        method: "post",
        url: url,
        data: {
          newPassword: values.password,
          oldPassword: values.old,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.data.status === true) {
        handleNotificationCall("success", response.data.message);
        forceUpdate();
        setState({ ...state, right: false });
      } else {
        handleNotificationCall("error", response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  }

  function inviteMSME(values) {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/inviteMsme`,
      data: {
        email: values.email,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        handleNotificationCall("success", response.data.message);
        inviteReset();
        handleInvitationClose();
      } else {
        handleNotificationCall("error", response.data.message);
      }
    });
  }

  function shareCVShortList(values) {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/sendCV`,
      data: {
        email: values.email,
        mobile: values.mobile,
        requirementId: requirementId?.id,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        handleNotificationCall("success", response.data.message);
        shareCVReset();
        handleShareCVClose();
      } else {
        handleNotificationCall("error", response.data.message);
      }
    });
  }

  useEffect(() => {
    var decode = jwtDecode(token);

    if (decode.role !== "SUPERADMIN") {
      const fetchData = async () => {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_SERVER}auth/getMyWallet`,
          data: {},
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }).then(function (response) {
          if (response.data.data !== null) {
            setWalletValue(response.data.data?.remainingMessages);
          } else {
            setWalletValue(0);
          }
        });
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducerValue, token]);

  useEffect(() => {
    const changeWallet = () => {
      forceUpdate();
    };

    window.addEventListener("storage", changeWallet);
    return () => {
      window.removeEventListener("storage", changeWallet);
    };
  }, []);

  const list = (anchor) => (
    <Box sx={{ width: "100%" }} role="presentation">
      <List>
        {view === "Settings" ? (
          <>
            <Card className={classes.root}>
              <CardHeader>
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.drawerHeader}
                >
                  <Grid item xs={10} md={6}>
                    <Typography variant="subtitle1"> Settings </Typography>
                  </Grid>

                  <Grid item xs={2} lg={6} className={classes.drawerClose}>
                    <CloseIcon
                      className={classes.closeBtn}
                      size="14px"
                      onClick={toggleDrawer(anchor, false)}
                    />
                  </Grid>
                </Grid>
              </CardHeader>

              <form onSubmit={uploadSubmit(handleCompanySettings)}>
                <CardContent className={classes.root}>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className={classes.ProfileLogoContainer}
                      >
                        <Avatar
                          alt="Profile"
                          src={image}
                        // className={classes.avatarButton}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} lg={4}></Grid>

                    <Grid item xs={12} lg={4}>
                      <FormControl>
                        <div className={classes.root + " " + classes.center}>
                          <input
                            accept="image/*"
                            className={classes.input}
                            id="icon-button-file"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleChange}
                          />
                          <label htmlFor="icon-button-file">
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              startIcon={<PhotoCamera />}
                              aria-label="upload picture"
                              component="span"
                            >
                              Upload Logo
                            </Button>
                          </label>
                        </div>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4}></Grid>
                    <Grid item xs={12}>
                      <InputLabel shrink htmlFor="fromMonth">
                        Financial Year
                      </InputLabel>

                      <FormControl className={classes.margin}>
                        <div className={classes.space}>
                          <Select
                            labelId="fromMonth"
                            name="fromMonth"
                            defaultValue={Month.fromMonth}
                            classes={{
                              root: classes.customSelectField,
                              icon: classes.customSelectIcon,
                            }}
                            onChange={(e) => {
                              setMonthValue({
                                ...Month,
                                fromMonth: e.target.value,
                              });
                            }}
                            inputRef={fromRef}
                            disableUnderline
                          >
                            {monthDropdown.map((item, index) => {
                              return [
                                <MenuItem value={item.id}>

                                  {item.Month}
                                </MenuItem>,
                              ];
                            })}
                          </Select>

                          <Select
                            labelId="toMonth"
                            name="toMonth"
                            defaultValue={Month.toMonth}
                            onChange={(e) => {
                              setMonthValue({
                                ...Month,
                                toMonth: e.target.value,
                              });
                            }}
                            classes={{
                              root: classes.customSelectField,
                              icon: classes.customSelectIcon,
                            }}
                            inputRef={toRef}
                            disableUnderline
                          >
                            {monthDropdown.map((item, index) => {
                              return [
                                <MenuItem value={item.id}>

                                  {item.Month}
                                </MenuItem>,
                              ];
                            })}
                          </Select>
                        </div>
                      </FormControl>
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
                      color="primary"
                      size="small"
                      type="submit"
                      disabled={loader}
                    >
                      Update
                    </Button>
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
              </form>
            </Card>
          </>
        ) : view === "Change" ? (
          <>
            <Card className={classes.root}>
              <CardHeader>
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.drawerHeader}
                >
                  <Grid item xs={10} md={6}>
                    <Typography variant="subtitle1">
                      Change Password
                    </Typography>
                  </Grid>

                  <Grid item xs={2} lg={6} className={classes.drawerClose}>
                    <CloseIcon
                      className={classes.closeBtn}
                      size="14px"
                      onClick={toggleDrawer(anchor, false)}
                    />
                  </Grid>
                </Grid>
              </CardHeader>

              <form onSubmit={changeSubmit(handleChangePassword)}>
                <CardContent className={classes.root}>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                      <InputLabel shrink htmlFor="old">

                        Old Password
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          classes={{ root: classes.customTextField }}
                          type={values.showOldPassword ? "text" : "password"}
                          placeholder="Enter Password"
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickOldPassword}
                                >
                                  {values.showOldPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          {...changePassword("old")}
                          error={changeErrors.old ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {changeErrors.old?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="password">

                        Password
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          classes={{ root: classes.customTextField }}
                          type={values.showPassword ? "text" : "password"}
                          placeholder="Enter Password"
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                >
                                  {values.showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          {...changePassword("password")}
                          error={changeErrors.password ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {changeErrors.password?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="confirm">

                        Confirm Password
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          classes={{ root: classes.customTextField }}
                          type={
                            values.showConfirmPassword ? "text" : "password"
                          }
                          placeholder="Enter Confirm Password"
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickConfirmPassword}
                                >
                                  {values.showConfirmPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          {...changePassword("confirm")}
                          error={changeErrors.confirm ? true : false}
                        />

                        <Typography variant="inherit" color="error">

                          {changeErrors.confirm?.message}
                        </Typography>
                      </FormControl>
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
                      color="primary"
                      size="small"
                      type="submit"
                      disabled={changeIsSubmitting}
                    >
                      Update
                    </Button>
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
              </form>
            </Card>
          </>
        ) : (
          <>
            <Card className={classes.root}>
              <CardHeader>
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.drawerHeader}
                >
                  <Grid item xs={10} md={6}>
                    <Typography variant="subtitle1">Update Profile</Typography>
                  </Grid>

                  <Grid item xs={2} lg={6} className={classes.drawerClose}>
                    <CloseIcon
                      className={classes.closeBtn}
                      size="14px"
                      onClick={toggleDrawer(anchor, false)}
                    />
                  </Grid>
                </Grid>
              </CardHeader>

              <form onSubmit={handleSubmit(updateProfile)}>
                <CardContent>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={6} lg={6}>
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
                          name="firstName"
                          defaultValue={profile.recruiter?.firstName}
                          {...register("firstName")}
                          error={errors.firstName ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.firstName?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
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
                          defaultValue={profile.recruiter?.lastName}
                          {...register("lastName")}
                          error={errors.lastName ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.lastName?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="email">
                        Email
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          placeholder="Enter Email"
                          id="email"
                          name="email"
                          defaultValue={profile.email}
                          {...register("email")}
                          error={errors.email ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.email?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="mobile">
                        Mobile
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          placeholder="Enter Mobile"
                          id="mobile"
                          name="mobile"
                          defaultValue={profile.recruiter?.mobile}
                          {...register("mobile")}
                          error={errors.mobile ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.mobile?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="companyName">
                        Company Name
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          placeholder="Enter Company Name"
                          id="companyName"
                          name="companyName"
                          defaultValue={profile.recruiter?.companyName}
                          {...register("companyName")}
                          error={errors.companyName ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.companyName?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="employeeId">
                        Employee ID
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          placeholder="Enter Employee ID"
                          id="employeeId"
                          name="employeeId"
                          defaultValue={profile.recruiter?.employeeId}
                          {...register("employeeId")}
                          error={errors.employeeId ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.employeeId?.message}
                        </Typography>
                      </FormControl>
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
                      color="primary"
                      size="small"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Update
                    </Button>

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
              </form>
            </Card>
          </>
        )}
      </List>
    </Box>
  );

  const User = (anchor) => (
    <Box sx={{ width: "100%" }} role="presentation">
      <List>
        <>
          <AddUser
            toggleDrawer={toggleDrawer}
            handleSubmit={userSubmit}
            handleAdd={handleAddUser}
            setRoleName={setRoleName}
            isSubmitting={userIsSubmitting}
            errors={userErrors}
            register={userRegister}
          />
        </>
      </List>
    </Box>
  );

  const Client = (anchor) => (
    <Box sx={{ width: "100%" }} role="presentation">
      <List>
        <>
          <AddClient
            isSubmitting={clientIsSubmitting}
            handleAdd={handleAddClient}
            handleSubmit={clientSubmit}
            toggleDrawer={toggleDrawer}
            recruiterChange={recruiterChange}
            recruiterFields={recruiterFields}
            errors={clientErrors}
            register={clientRegister}
            recruiterAdd={recruiterAdd}
            recruiterRemove={recruiterRemove}
          />
        </>
      </List>
    </Box>
  );

  const Candidate = (anchor) => (
    <Box sx={{ width: "100%" }} role="presentation">
      <List>
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
            requirementId={"true"}
          />
        </>
      </List>
    </Box>
  );

  const Requirements = (anchor) => (
    <Box sx={{ width: "100%" }} role="presentation">
      <List>
        <>
          <AddRequirements
            handleAdd={handleRequirementAdd}
            setClientList={setClientList}
            clientList={clientList}
            handleChange={handleClientNameChange}
            handleSubmit={requirementsSubmit}
            toggleDrawer={toggleDrawer}
            register={requirementsRegister}
            errors={requirementsErrors}
            isSubmitting={requirementsIsSubmitting}
            recUser={recUser}
            modeOfWork={modeofWork}
            setModeofWork={setModeofWork}
            specialHiring={specialHiring}
            setSpecialHiring={setSpecialHiring}
            hideFromInternal={hideFromInternal}
            setHideFromInternal={setHideFromInternal}
            handleUploadChange={handleUploadChange}
            file={file}
            setFile={setFile}
            ContentRef={ContentRef}
            requirement={requirementName}
            setRequirementsOrgId={setRequirementsOrgId}
          />
        </>
      </List>
    </Box>
  );

  const Assign = (anchor) => (
    <Box sx={{ width: "100%" }} role="presentation">
      <List>
        <>
          <AssignAdd
            externalUser={externalUser}
            toggleDrawer={toggleDrawer}
            handleAssignRequirements={handleAssignRequirements}
            assignSubmit={assignSubmit}
            assignRequirement={assignRequirement}
            assignErrors={assignErrors}
            setRequirementId={setRequirementId}
            handlerequirementChangePage={handlerequirementChangePage}
            assigncount={assigncount}
            assignPage={assignPage}
            handleAssignStatus={handleAssignStatus}
            requirementName={requirementName}
            setRecruiterId={setRecruiterId}
            assignIsSubmitting={assignIsSubmitting}
            assignData={assignData}
            assignCurrerntPage={assignCurrerntPage}
            getAssigendRequirements={getAssigendRequirements}
            recruiter={"true"}
          />
        </>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        className={
          layoutState.isSidebarOpened ? classes.appBar1 : classes.appBar
        }
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            onClick={() => toggleSidebar(layoutDispatch)}
            className={classNames(
              classes.headerMenuButtonSandwich,
              classes.headerMenuButtonCollapse,
            )}
          >
            {layoutState.isSidebarOpened ? (
              // <ArrowBackIcon
              //       classes={{
              //         root: classNames(
              //           classes.headerIcon,
              //           classes.headerIconCollapse,
              //         ),
              //       }}
              //     />

              <MenuIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            ) : (
              <MenuIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            )}
          </IconButton>

          <div
            className={
              layoutState.isSidebarOpened
                ? classes.headerTopOpen
                : classes.headerTop
            }
          >
            <div
              className={
                layoutState.isSidebarOpened
                  ? classes.headerWidth
                  : classes.headerWidth1
              }
            >
              <Typography variant="h5" className={classes.title}>
                <span className="refo-font">refo</span>
              </Typography>
              {/* <div className={classes.lgQuickButton}>
                {decode.role !== "SUPERADMIN" ? (
                  <Tooltip title="Quick Access" placement="bottom">
                    <IconButton>
                      <ArrowLeftIcon
                        id={qaId}
                        onClick={handleQAClick}
                        className={classes.quickAccessArrow}
                      />
                      
                    </IconButton>
                  </Tooltip>
                ) : (
                  <></>
                )}
              </div>

              <div className={classes.smQuickHeaderButton}>
                {decode.role !== "SUPERADMIN" ? (
                  <Tooltip title="Quick Access" placement="bottom">
                    <IconButton>
                      <ArrowLeftIcon
                        id={qaMobileId}
                        onClick={handleQAMobileClick}
                        className={classes.quickAccessArrow}
                      />
                      
                    </IconButton>
                  </Tooltip>
                ) : (
                  <></>
                )}
              </div> */}
              {/* {
                  isScrollOpen ?  */}
              <Popper
                id={qaId}
                open={quickAccessOpen}
                anchorEl={anchorEl2}
                onClose={() => {
                  setQuickAccessOpen(false);
                }}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 0, left: 400 }}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                className={
                  layoutState.isSidebarOpened
                    ? classes.quickAccessPopoverOpen
                    : classes.quickAccessPopover
                }
              >
                <ClickAwayListener
                  onClickAway={() => {
                    setQuickAccessOpen(false);
                  }}
                >
                  <div className={classes.lgQuickButton}>
                    {decode.role === "ADMIN" ? (
                      <>
                        <div className={classes.quickAccessContainer}>
                          <IconButton
                            onClick={(e) => {
                              setView("Client");
                              clientReset();
                              setState({ ...state, right: true });
                            }}
                          >
                            <img src={addClients} alt="img" />
                            <p>Add Projects</p>
                          </IconButton>
                        </div>
                        <div className={classes.quickAccessContainer}>
                          <IconButton
                            onClick={(e) => {
                              setView("User");
                              userReset();
                              setState({ ...state, right: true });
                            }}
                          >
                            <img src={addUsers} alt="img" />
                            <p>Add Users</p>
                          </IconButton>
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                    {decode.role === "ADMIN" ||
                      decode.role === "CLIENTCOORDINATOR" ? (
                      <div className={classes.quickAccessContainer}>
                        <IconButton
                          onClick={(e) => {
                            setView("Requirement");
                            requirementsReset();
                            setFile([]);
                            setSpecialHiring("");
                            setState({ ...state, right: true });
                          }}
                        >
                          <img src={addRequirements} alt="img" />
                          <p>Add Requirements</p>
                        </IconButton>
                      </div>
                    ) : (
                      ""
                    )}

                    {decode.role === "ADMIN" ? (
                      <div className={classes.quickAccessContainer}>
                        <IconButton
                          onClick={(e) => {
                            setView("Assign");
                            setAssignData([]);
                            assignReset();
                            setState({ ...state, right: true });
                          }}
                        >
                          <img src={assignRequirements} alt="img" />
                          <p>Assign Requirements</p>
                        </IconButton>
                      </div>
                    ) : (
                      ""
                    )}

                    {decode.role !== "SUPERADMIN" ? (
                      <div className={classes.quickAccessContainer}>
                        <IconButton
                          onClick={(e) => {
                            setView("Candidate");
                            candidateReset();
                            setFile([]);
                            setAssessment([]);
                            setState({ ...state, right: true });
                          }}
                        >
                          <img src={addCandidates} alt="img" />
                          <p>Add Candidates</p>
                        </IconButton>
                      </div>
                    ) : (
                      ""
                    )}

                    {decode.role === "ADMIN" ? (
                      <div className={classes.quickAccessContainer}>
                        <IconButton
                          onClick={(e) => {
                            setInvitationOpen(true);
                          }}
                        >
                          <img src={MSMEregistration} alt="img" />
                          <p>MSME Invitation</p>
                        </IconButton>
                      </div>
                    ) : (
                      ""
                    )}

                    {decode.role === "ADMIN" ? (
                      <div className={classes.quickAccessContainer}>
                        <IconButton
                          onClick={(e) => {
                            setIsShareCV(true);
                          }}
                        >
                          <img src={shareCVImg} alt="img" />
                          <p>Share & CV Shortlist</p>
                        </IconButton>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </ClickAwayListener>
              </Popper>
            </div>

            <div className={classes.grow}>
              {decode.role !== "SUPERADMIN" ? (
                <div className={classes.SlgButton}>
                  <SearchBar
                    WalletValue={WalletValue}
                    search={props.history?.location?.search}
                  />
                </div>
              ) : (
                ""
              )}

              {/* {decode.role === "ADMIN" ? (
                <Tooltip
                  title="Credit is one candidate added to a job"
                  placement="bottom"
                  PopperProps={{ style: { marginTop: -35 } }}
                >
                  <Badge
                    onClick={(e) => {
                      history.push("/app/plans");
                    }}
                    overlap="circular"
                    max={999999999}
                    badgeContent={
                      WalletValue === 0 ? "0 Credits" : WalletValue + " Credits"
                    }
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    className={classes.wallet}
                    color={WalletValue === 0 ? "primary" : "secondary"}
                  >
                    {WalletValue === 0 ? (
                      <Avatar
                        alt="Profile"
                        src={walletRed}
                        className={classes.walletButton}
                      />
                    ) : (
                      <Avatar
                        alt="Profile"
                        src={walletBlue}
                        className={classes.walletButton}
                      />
                    )}
                  </Badge>
                </Tooltip>
              ) : decode.role === "CLIENTCOORDINATOR" &&
                decode.role === "RECRUITER" ? (
                <Tooltip
                  title="Credit is one candidate added to a job"
                  placement="bottom"
                >
                  <Badge
                    overlap="circular"
                    max={999999999}
                    badgeContent={
                      WalletValue === 0 ? "0 Credits" : WalletValue + " Credits"
                    }
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    className={classes.wallet}
                    color={WalletValue === 0 ? "primary" : "secondary"}
                  >
                    {WalletValue === 0 ? (
                      <Avatar
                        alt="Profile"
                        src={walletRed}
                        className={classes.walletButton}
                      />
                    ) : (
                      <Avatar
                        alt="Profile"
                        src={walletBlue}
                        className={classes.walletButton}
                      />
                    )}
                  </Badge>
                </Tooltip>
              ) : (
                ""
              )} */}

              <ClickAwayListener onClickAway={(e) => setProfileMenu(false)}>
                <div>
                  <IconButton
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.headerMenuButton}
                    aria-controls="profile-menu"
                    onClick={(e) => setProfileMenu(e.currentTarget)}
                  >
                    <Avatar
                      alt="Profile"
                      src={image}
                      className={classes.profileButton}
                    />
                  </IconButton>

                  {profileMenu ? (
                    <div className={classes.dropdown}>
                      {decode.role !== "SUPERADMIN" ? (
                        <ListItem className={classes.profileHeader}>
                          <ListItemAvatar>
                            <Avatar
                              alt={
                                profile.recruiter?.firstName +
                                " " +
                                profile.recruiter?.lastName
                              }
                              sizes="medium"
                              src={image}
                              className={classes.chipAvatar}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <>
                                <Typography>
                                  {profile.recruiter?.firstName +
                                    " " +
                                    profile.recruiter?.lastName}
                                </Typography>
                                <Typography>
                                  {profile.roleName === "CLIENTCOORDINATOR" ? "Hiring Manager" : profile.roleName === "SUBVENDOR" ? "Vendor" : profile.roleName}
                                  {profile.recruiter?.companyName && " - " + profile.recruiter?.companyName}
                                </Typography>
                                <Typography> {profile.email} </Typography>
                              </>
                            }
                          />
                          {/* <ListItemSecondaryAction className={classes.closeBtn} onClick={() => signOut(userDispatch, props.history)}>
                  
                 <VscSignOut  className={classes.IconButton} />   
 
                 </ListItemSecondaryAction> */}
                        </ListItem>
                      ) : (
                        <ListItem className={classes.profileHeader}>
                          <ListItemAvatar>
                            <Avatar
                              alt={
                                profile.recruiter?.firstName +
                                " " +
                                profile.recruiter?.lastName
                              }
                              sizes="medium"
                              src={image}
                              className={classes.chipAvatar}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <>

                                <Typography> SUPERADMIN </Typography>
                                <Typography>

                                  {localStorage.getItem("email")}
                                </Typography>
                              </>
                            }
                          />
                          {/* <ListItemSecondaryAction  onClick={() => signOut(userDispatch, props.history)}>
                
                 

                <VscSignOut className={classes.IconButton}    />   

                </ListItemSecondaryAction> */}
                        </ListItem>
                      )}

                      {decode.role === "SUPERADMIN" ? (
                        <ListItem
                          className={classes.profileMenuIcon}
                          onClick={(e) => {
                            history.push("/app/ticket");
                          }}
                        >
                          <ContactSupportIcon />
                          Support
                        </ListItem>
                      ) : (
                        ""
                      )}
                      {decode.role === "ADMIN" ? (
                        <div>
                          <ListItem
                            className={classes.profileMenuIcon}
                            onClick={(e) => {
                              setView("Settings");
                              setState({ ...state, right: true });
                            }}
                          >
                            <SettingsIcon /> Settings
                          </ListItem>
                          <ListItem
                            className={classes.profileMenuIcon}
                            onClick={(e) => {
                              history.push("/app/ticket");
                            }}
                          >
                            <ContactSupportIcon />
                            Support
                          </ListItem>

                          <ListItem
                            className={classes.profileMenuIcon}
                            onClick={(e) => {
                              setView("Profile");
                              setState({ ...state, right: true });
                            }}
                          >
                            <PermContactCalendarIcon /> Update Profile
                          </ListItem>

                          {/*   <ListItem   className={classes.profileMenuIcon} 
                  onClick={(e) => {    handleBackupOpen();
                    setBackupView({  
                      ...backupView,
                      view:"",
                      link:""
                     });  
                  }}
                >
                  <CloudDownloadIcon /> Backup & Store
                </ListItem>


               <ListItem   className={classes.profileMenuIcon}   onClick={(e) => {  handleUploadOpen(); setFile([]); }}   >
                  <CloudUploadIcon /> Restore Backup
                </ListItem> */}

                          <ListItem
                            className={classes.profileMenuIcon}
                            onClick={(e) => {
                              handleExistingOpen();
                              setFile([]);
                            }}
                          >
                            <PublishIcon /> Upload Existing Candidates
                          </ListItem>
                        </div>
                      ) : (
                        ""
                      )}

                      <ListItem
                        className={classes.profileMenuIcon}
                        onClick={(e) => {
                          setView("Change");
                          setState({ ...state, right: true });
                        }}
                      >
                        <VpnKeyIcon /> Change Password
                      </ListItem>

                      <ListItem
                        className={classes.profileMenuIcon}
                        onClick={() => signOut(userDispatch, props.history)}
                      >
                        <ExitToAppIcon /> Logout
                      </ListItem>
                    </div>
                  ) : null}
                </div>
              </ClickAwayListener>
            </div>
          </div>
        </Toolbar>

        <SwipeableDrawer
          anchor="right"
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
          classes={{
            paper:
              view === "Client" || view === "Candidate"
                ? classes.clientDrawer
                : classes.drawer,
          }}
        >
          {view === "Settings" || view === "Profile" || view === "Change"
            ? list("right")
            : view === "User"
              ? User("right")
              : view === "Client"
                ? Client("right")
                : view === "Candidate"
                  ? Candidate("right")
                  : view === "Requirement"
                    ? Requirements("right")
                    : view === "Assign"
                      ? Assign("right")
                      : ""}
        </SwipeableDrawer>
      </AppBar>

      {decode.role !== "SUPERADMIN" ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.smQuickButton}>
              <Popper
                id={qaMobileId}
                open={quickAccessMobileOpen}
                anchorEl={anchorEl2}
                onClose={() => {
                  setQuickAccessMobileOpen(false);
                }}
                anchorPosition={{ top: 18, left: 400 }}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                className={classes.quickAccessMobilePopover}
              >
                <div className={classes.quickAccessMobile}>
                  {decode.role === "ADMIN" ? (
                    <>
                      <div className={classes.quickAccessContainer}>
                        <IconButton
                          onClick={(e) => {
                            setView("Client");
                            clientReset();
                            setState({ ...state, right: true });
                          }}
                        >
                          <img src={addClients} alt="img" />
                          <p>Add Projects</p>
                        </IconButton>
                      </div>
                      <div className={classes.quickAccessContainer}>
                        <IconButton
                          onClick={(e) => {
                            setView("User");
                            userReset();
                            setState({ ...state, right: true });
                          }}
                        >
                          <img src={addUsers} alt="img" />
                          <p>Add Users</p>
                        </IconButton>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {decode.role === "ADMIN" ||
                    decode.role === "CLIENTCOORDINATOR" ? (
                    <div className={classes.quickAccessContainer}>
                      <IconButton
                        onClick={(e) => {
                          setView("Requirement");
                          requirementsReset();
                          setState({ ...state, right: true });
                        }}
                      >
                        <img src={addRequirements} alt="img" />
                        <p>Add Requirements</p>
                      </IconButton>
                    </div>
                  ) : (
                    ""
                  )}

                  {decode.role === "ADMIN" ? (
                    <div className={classes.quickAccessContainer}>
                      <IconButton
                        onClick={(e) => {
                          setView("Assign");
                          setAssignData([]);
                          assignReset();
                          setState({ ...state, right: true });
                        }}
                      >
                        <img src={assignRequirements} alt="img" />
                        <p>Assign Requirements</p>
                      </IconButton>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className={classes.quickAccessContainer}>
                    <IconButton
                      onClick={(e) => {
                        setView("Candidate");
                        candidateReset();
                        setState({ ...state, right: true });
                      }}
                    >
                      <img src={addCandidates} alt="img" />
                      <p>Add Candidates</p>
                    </IconButton>
                  </div>
                  {decode.role === "ADMIN" ? (
                    <div className={classes.quickAccessContainer}>
                      <IconButton
                        onClick={(e) => {
                          setInvitationOpen(true);
                        }}
                      >
                        <img src={MSMEregistration} alt="img" />
                        <p>MSME Registration</p>
                      </IconButton>
                    </div>
                  ) : (
                    ""
                  )}

                  {decode.role === "ADMIN" ? (
                    <div className={classes.quickAccessContainer}>
                      <IconButton
                        onClick={(e) => {
                          setIsShareCV(true);
                        }}
                      >
                        <img src={shareCVImg} alt="img" />
                        <p>Share & CV Shortlist</p>
                      </IconButton>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Popper>
              <SearchBar
                WalletValue={WalletValue}
                search={props.history.location.search}
              />
            </div>
          </Grid>
        </Grid>
      ) : (
        ""
      )}

      {decode.role !== "SUPERADMIN" ? (
        <Box className={classes.lgButton}>
          <Fab
            aria-label="add"
            size="medium"
            component="div"
            variant="circular"
            aria-describedby={poperId}
            onClick={handlePoperClick}
            color="primary"
            sx={{
              borderRadius: 0,
              borderTopLeftRadius: "50%",
              borderBottomLeftRadius: "50%",
              borderTopRightRadius: "50%",
              borderBottomRightRadius: "4px",
              top: "88%",
              position: "fixed",
              right: 10,
              zIndex: 99999,
            }}
          >
            <InfoIcon />
          </Fab>
        </Box>
      ) : (
        ""
      )}

      <Popover
        aria-describedby={poperId}
        open={popperOpen}
        onClose={() => {
          setPopperOpen(false);
        }}
        anchorEl={anchorEl}
        sx={{ top: "80%" }}
        anchorPosition={{ top: 225, right: 10, left: 0 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box>
          <Card sx={{ maxWidth: 250 }}>
            <CardHeader>
              <Box className={classes.chipMessageBox}>
                <Chip
                  variant="outlined"
                  className={classes.chipMessage}
                  label={
                    <>
                      <Typography>
                        <span className={classes.colorWhite}>
                          {decode.role === "SUPERADMIN"
                            ? "SUPERADMIN"
                            : profile.recruiter?.firstName +
                            " " +
                            profile.recruiter?.lastName}
                        </span>
                      </Typography>
                    </>
                  }
                  avatar={
                    <Avatar
                      alt={
                        profile.recruiter?.firstName +
                        " " +
                        profile.recruiter?.lastName
                      }
                      sizes="medium"
                      src={image}
                      className={classes.chipMessageAvatar}
                    />
                  }
                ></Chip>
              </Box>
            </CardHeader>
            <CardContent>
              <Typography variant="body2" className={classes.chipMessageText}>
                REFO is available in mobile browser use after candidate upload
                is super easy experience!
              </Typography>
              <Typography variant="body2" className={classes.chipMessageText}>
                Do every other task using your mobile browser.
              </Typography>
              <div className={classes.flexCenter}>
                <Button
                  endIcon={<WhatsAppIcon />}
                  variant="contained"
                  size="small"
                  className={classes.whatsappSend}
                  onClick={(e) => {
                    window.open(
                      "https://api.whatsapp.com/send?phone=+91" +
                      localStorage.getItem("mobile") +
                      "&text=REFO is available in mobile browser so after candidate upload is super easy experience! \n Do every other task using your mobile browser. - https://refo.app/",
                    );
                  }}
                >
                  Send to
                </Button>
              </div>
            </CardContent>
          </Card>
        </Box>
      </Popover>

      <Dialog
        onClose={handleBackupClose}
        aria-labelledby="dialog-title"
        open={backupOpen}
        width="md"
        maxWidth="md"
        PaperProps={{
          style: {
            maxWidth: "520px",
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >

              Backup and Store
            </Typography>
            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={handleBackupClose}
              />
            </div>
          </div>
        </DialogTitle>

        <DialogContent className={classes.chatListBackGround}>
          <div className={classes.sendBackUp}>
            <div className={classes.sendBackUpContainer}>
              <Button
                startIcon={
                  <>
                    <SwapVertIcon />
                    <CloudQueueIcon />
                  </>
                }
                variant="contained"
                size="small"
                className={classes.storeLocal}
                onClick={(e) => {
                  handleconfirmOpen();
                  setView("BackUpOnly");
                }}
              >
                Backup the data and store in local system
              </Button>

              <Button
                variant="contained"
                startIcon={
                  <>
                    <SwapVertIcon />
                    <CloudOffIcon />
                  </>
                }
                className={classes.removeCloud}
                size="small"
                onClick={(e) => {
                  handleconfirmOpen();
                  setView("BackUpDelete");
                }}
              >
                Backup the data and remove in REFO Cloud
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={handleconfirmClose}
        aria-labelledby="dialog-title"
        open={confirmOpen}
        width="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >
              Confirmation
            </Typography>
            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={handleconfirmClose}
              />
            </div>
          </div>
        </DialogTitle>

        <DialogContent>
          <Typography variant="subtitle2" className={classes.center}>
            {view === "BackUpOnly"
              ? "Are you sure want to backup the data and store in local system?"
              : view === "BackUpDelete"
                ? "Are you sure want to backup the data and remove in REFO cloud?"
                : "The data has been loaded. Please click on the download button."}
          </Typography>

          <div className={classes.sendWhatsapp}>
            <>
              {view === "BackUpOnly" ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e) => {
                      handleBackupOnly("Download");
                    }}
                  >

                    Yes
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleconfirmClose}
                  >

                    No
                  </Button>
                </>
              ) : view === "BackUpDelete" ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e) => {
                      handleBackupOnly("Delete");
                    }}
                  >

                    Yes
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleconfirmClose}
                  >

                    No
                  </Button>
                </>
              ) : (
                ""
              )}

              {backupView.view === "Download" ? (
                <>
                  <Grid className={classes.flexCenter}>
                    <a
                      className={classes.a + " " + classes.buttonBtn}
                      href={`${process.env.REACT_APP_URL}` + backupView.link}
                      onClick={(e) => {
                        handleNotificationCall(
                          "success",
                          "Data is downloaded Successfully",
                        );
                      }}
                      download
                    >
                      <CloudDownloadIcon /> Download
                    </a>
                  </Grid>

                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={handleconfirmClose}
                  >

                    Close
                  </Button>
                </>
              ) : (
                ""
              )}

              {backupView.view === "Delete" ? (
                <>
                  <Grid className={classes.flexCenter}>
                    <a
                      className={classes.a + " " + classes.buttonBtn}
                      href={`${process.env.REACT_APP_URL}` + backupView.link}
                      download
                      onClick={(e) => {
                        handleDeleteOpen();
                      }}
                    >

                      <CloudDownloadIcon /> Download
                    </a>
                  </Grid>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={handleconfirmClose}
                  >

                    Close
                  </Button>
                </>
              ) : (
                ""
              )}
            </>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={handleDeleteClose}
        aria-labelledby="dialog-title"
        open={deleteOpen}
        width="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >
              Confirmation
            </Typography>
            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={handleDeleteClose}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" className={classes.center}>
            Are you sure want to delete the data permanently from REFO cloud.
            Please note that once deleted, the data cannot be restored?
          </Typography>

          <Typography
            variant="body1"
            className={classes.center + " " + classes.colorRed}
          >

            In order to permanently delete the data, please type 'DELETE' in
            capital letter. Then click on "CONFIRM" to proceed.
          </Typography>

          <Grid className={classes.center + " " + classes.ptb025}>
            <TextField
              required
              name="delete"
              placeholder="DELETE"
              InputLabelProps={{ shrink: true }}
              defaultValue={deleteValue}
              onChange={(e) => {
                setDeleteValue(e.target.value);
              }}
              inputRef={deleteRef}
            />
          </Grid>
          <Grid className={classes.sendWhatsapp}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                handleBackupDelete();
              }}
            >
              Confirm
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleDeleteClose}
            >
              Close
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={handleUploadClose}
        aria-labelledby="dialog-title"
        open={uploadOpen}
        width="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >
              Confirmation
            </Typography>
            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={handleUploadClose}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" className={classes.center}>

            Restore the data that was downloaded earlier
          </Typography>

          <div className={classes.root + " " + classes.center}>
            <input
              accept=".zip,.rar,.7zip"
              className={classes.input}
              id="icon-button-zip"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <label htmlFor="icon-button-zip">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                aria-label="upload Backup"
                component="span"
              >
                Upload Backup
              </Button>
            </label>
          </div>
          <div className={classes.center + " " + classes.button}>
            <Typography variant="inherit" className={classes.lineBreak}>

              {file?.name}
            </Typography>

            {file?.name ? (
              <Tooltip title="Delete" placement="bottom">
                <DeleteIcon
                  color="secondary"
                  className={classes.closeBtn}
                  onClick={(e) => {
                    setFile([]);
                  }}
                />
              </Tooltip>
            ) : (
              ""
            )}
          </div>

          <Grid className={classes.sendWhatsapp}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                handleUploadConfirm();
              }}
            >
              Submit
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleUploadClose}
            >
              Close
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={handleUploadConfirmClose}
        aria-labelledby="dialog-title"
        open={uploadConfirmOpen}
        width="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >
              Confirmation
            </Typography>
            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={handleUploadConfirmClose}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" className={classes.center}>

            Are you sure?
          </Typography>

          <Grid className={classes.sendWhatsapp}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                handleUpload();
              }}
            >
              Yes
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleUploadConfirmClose}
            >
              No
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={handleExistingClose}
        aria-labelledby="dialog-title"
        open={existingOpen}
        width="md"
        maxWidth="md"
        PaperProps={{ style: { width: "100%" } }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >
              Upload existing candidates
            </Typography>
            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={handleExistingClose}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid className={classes.center}>
            <a href={sample_candidates} className={classes.aLink} download>

              Sample excel format to upload your data (Only then Vendor /
              Freelancer can check duplicate)
            </a>
          </Grid>

          <Grid className={classes.filterGap + " " + classes.center}>
            <input
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              className={classes.input}
              id="icon-button-csv"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <label htmlFor="icon-button-csv">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                aria-label="upload Backup"
                component="span"
              >
                Upload Excel
              </Button>
            </label>
          </Grid>
          <Grid className={classes.center + " " + classes.button}>
            <Typography variant="inherit" className={classes.lineBreak}>

              {file?.name}
            </Typography>
          </Grid>

          <Grid className={classes.sendWhatsapp}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                handleExistingConfirm();
              }}
            >
              Submit
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleExistingClose}
            >
              Close
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={handleExistingConfirmClose}
        aria-labelledby="dialog-title"
        open={existingConfirmOpen}
        width="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >
              Confirmation
            </Typography>
            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={handleExistingConfirmClose}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" className={classes.center}>

            Are you sure?
          </Typography>

          <Grid className={classes.sendWhatsapp}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                handleExistingUpload();
              }}
            >
              Yes
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleExistingConfirmClose}
            >
              No
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog
        aria-labelledby="dialog-title"
        width="md"
        open={invitationOpen}
        onClose={handleInvitationClose}
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >
              Invite MSME
            </Typography>

            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                onClick={handleInvitationClose}
                size="14px"
              />
            </div>
          </div>
        </DialogTitle>

        <DialogContent className={classes.chatListBackGround}>
          <form onSubmit={inviteSubmit(inviteMSME)}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <InputLabel shrink htmlFor="email">
                Enter Email
              </InputLabel>
              <FormControl className={classes.margin}>
                <TextField
                  classes={{ root: classes.customTextField }}
                  InputProps={{ disableUnderline: true }}
                  size="small"
                  placeholder="Enter Email ID"
                  id="email"
                  {...invite("email")}
                  name="email"
                  error={inviteErrors.email ? true : false}
                />

                <Typography variant="inherit" color="error">
                  {inviteErrors.email?.message}
                </Typography>
              </FormControl>
            </Grid>
          </Grid>

            <div className={classes.sendWhatsapp}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                disabled={inviteIsSubmitting}
              >
                Invite
              </Button>

              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<FileCopyIcon />}
                onClick={(e) => {
                  handleCopy();
                }}
              >
                Copy URL
              </Button>

              <Button
                variant="contained"
                size="small"
                onClick={handleInvitationClose}
              >
                Close
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        aria-labelledby="dialog-title"
        width="md"
        open={isShareCV}
        onClose={handleShareCVClose}
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >
              Share & CV Shortlist
            </Typography>

            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                onClick={handleShareCVClose}
                size="14px"
              />
            </div>
          </div>
        </DialogTitle>

        <DialogContent className={classes.chatListBackGround}>
          <form onSubmit={shareCVSubmit(shareCVShortList)}>
            <div className={classes.shareCVContainer}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12} >
                  <FormControl className={classes.margin}>
                    <InputLabel shrink htmlFor="requirementId">

                      Requirement Name
                    </InputLabel>
                    <Autocomplete
                      // className={classes.AutocompleteFullWidth}
                      options={requirementName}
                      name="requirementId"
                      disableClearable
                      error={shareCVErrors.requirementId ? true : false}
                      {...shareCV("requirementId")}
                      getOptionLabel={(option) =>
                        option.requirementName + " (" + option.uniqueId + ")"
                      }
                      onChange={(event, value) => {
                        setRequirementId(value);
                        getLink(value.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="requirementId"
                          variant="filled"
                        />
                      )}
                    />
                    <Typography variant="inherit" color="error">
                      {shareCVErrors.requirementId?.message}
                    </Typography>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <InputLabel shrink htmlFor="email">
                    Enter Email
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      classes={{ root: classes.customTextField }}
                      InputProps={{ disableUnderline: true }}
                      size="small"
                      placeholder="Enter Email ID"
                      id="email"
                      {...shareCV("email")}
                      name="email"
                      error={shareCVErrors.email ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {shareCVErrors.email?.message}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel shrink htmlFor="mobile">
                    Mobile
                  </InputLabel>
                  <FormControl className={classes.margin}>
                    <TextField
                      InputProps={{ disableUnderline: true }}
                      classes={{ root: classes.customTextField }}
                      size="small"
                      placeholder="Enter Mobile"
                      id="mobile"
                      name="mobile"
                      {...shareCV("mobile")}
                      error={shareCVErrors.mobile ? true : false}
                    />

                    <Typography variant="inherit" color="error">
                      {shareCVErrors.mobile?.message}
                    </Typography>
                  </FormControl>
                </Grid>
              </Grid>

            </div>
            <div className={classes.sendWhatsapp}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                disabled={shareCVIsSubmitting}
              >
                Share
              </Button>

              {cvLink !== "" ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<FileCopyIcon />}
                  onClick={(e) => {
                    handleCvLinkCopy(cvLink);
                  }}
                >
                  Copy URL
                </Button>
              ) : (
                ""
              )}

              <Button
                variant="contained"
                size="small"
                onClick={handleShareCVClose}
              >
                Close
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
