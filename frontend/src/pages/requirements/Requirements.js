import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  List,
  SwipeableDrawer,
  Switch,
  TablePagination,
  TextField,
  Typography,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  Chip,
  Avatar,
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
import "../../css/view-resume.css"
import { toast } from "react-toastify";
import PageTitle from "../../components/PageTitle";
// data
import { yupResolver } from "@hookform/resolvers/yup";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";

import * as Yup from "yup";
import Notification from "../../components/Notification";
import { Autocomplete } from "@material-ui/lab";
import useStyles from "../../themes/style.js";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DescriptionIcon from "@material-ui/icons/Description";
//import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import DeleteIcon from "@material-ui/icons/Delete";
import AddRequirements from "../../components/Candidates/AddRequirements";
// import { saveAs } from "file-saver";
// import XlsxPopulate from "xlsx-populate";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "react-toastify/dist/ReactToastify.css";
import "jodit/build/jodit.min.css";
import { getFileExtension } from "../../utils/getextension.js";
import CustomPdfView from "../../components/pdfViewer/CustomPdfView.js";

const positions = [toast.POSITION.TOP_RIGHT];

export default function Tables() {
  const classes = useStyles();
  const history = useHistory();
  const mobileQuery = useMediaQuery("(max-width:600px)");
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const [count, setCount] = useState(0);
  const [file, setFile] = useState([]);
  const [loader, setLoader] = useState(false);
  const [Id, setId] = useState();
  const [requirementsData, setRequirementsData] = useState([]);
  const [requirementsEdit, setRequirementsEdit] = useState({
    id: "",
    requirementName: "",
    skills: "",
    clientId: "",
    clientName: "",
    levelHrDataId: "",
    levelofHiringName: "",
    jobLocation: "",
    experience: "",
    gist: "",
    jd: "",
    modeOfWork: "",
    specialHiring: "",
    hideFromInternal: "",
  });

  const resumeUrl = requirementsEdit?.jd;
  const fileExtension = resumeUrl ? getFileExtension(resumeUrl) : null;

  const [requirementsView, setRequirementsView] = useState({
    id: "",
    requirementName: "",
    clientId: "",
    skills: "",
    levelHrDataId: "",
    levelofHiringName: "",
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

  const [page, setPage] = useState(0);
  const [currerntPage, setCurrerntPage] = useState(1);

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const [dataList, setDataList] = useState("ADD");
  const [clientList, setClientList] = useState([]);

  const [clientEditList, setClientEditList] = useState([]);

  const [reqOrgRecId, setReqOrgRecId] = useState([]);
  const [assignedRecruiters, setAssignedRecruiters] = useState([]);
  const [recUser, setRecUser] = useState([]);
  const [levelHrData, setLevelHrData] = useState([]);
  const [reqLevelHrDataId, setReqLevelHrDataId] = useState("");
  const [clientId, setClientId] = useState("");

  var [errorToastId, setErrorToastId] = useState(null);

  const ContentRef = React.useRef(null);
  var [hideFromInternal, setHideFromInternal] = useState(false);
  const [modeofWork, setModeofWork] = React.useState("");
  const [specialHiring, setSpecialHiring] = React.useState("");

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

  const validationSchema = Yup.object().shape({
    requirementName: Yup.string().required("Requirement Name is required"),
    jobLocation: Yup.string().required("Job Location is required"),
    clientId: Yup.string().required(decode.companyType === "COMPANY" ? "Project Name is required" : "Client Name is required"),
    assignRecruitersList: Yup.array().of(Yup.string())
      .required("You can't leave this blank.")
      .nullable(true).transform(v => v === null ? [] : v),
    levelHrDataId: Yup.string().required("Level of Hire Name is required"),
    skills: Yup.string().required("Skill is required"),
    gist: Yup.string().required("Type your gist from requirement"),
    hideFromInternal: Yup.string(),
    work: Yup.string().required("Mode of work is required"),
    hiring: Yup.string(),
    experience: Yup.string().required("Experience is required"),
  });


  const {
    register: editRequirements,
    formState: { errors: editErrors, isSubmitting: editIsSubmitting },
    handleSubmit: editSubmit,
    reset: editreset,
    setValue: setEditValue, 
    trigger: editTrigger,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema)
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    var decode = jwtDecode(token);

    const fetchData = async () => {
      setLoader(true);

      var url = "";

      if (decode.role === "ADMIN") {
        url = `${process.env.REACT_APP_SERVER}admin/allRequirements`;
      } else {
        url = `${process.env.REACT_APP_SERVER}CC/myRequirements`;
      }

      axios({
        method: "post",
        url: url,
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

            setRequirementsData(response.data.data);
            setCount(response.data.count);
          }
        })
        .catch(function (error) {
          handleNotificationCall("error", error.message);
          setLoader(false);
        });
    };

    const getRequirementName = async () => {
      var url = "";
      if (decode.role === "ADMIN") {
        url = `${process.env.REACT_APP_SERVER}admin/getAllRequirementList`;
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

    if (decode.role === "ADMIN") {
      const getClientName = async () => {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_SERVER}admin/getAllCCList`,
          data: {},
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
          .then(function (response) {
            if (response.data.status === true) {
              setLoader(false);
              setClientsName(response.data.data);
            }
          })

          .catch(function (error) {
            console.log(error);
          });
      };
      getClientName();
    }
    fetchData();
    getRequirementName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducerValue, token]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [requirementName, setRequirementName] = useState([]);
  const [clientsName, setClientsName] = useState([]);
  const [requirementId, setRequirementId] = useState(null);
  const [recruiterId, setRecruiterId] = useState(null);

  const transformRecruiterData = (recruiters) => {
    return recruiters.map(recruiter => {
      const [firstName, lastName] = recruiter.name.split(' ');
      return {
        id: recruiter.id,
        recruiter: {
          firstName: firstName || '',
          lastName: lastName || '',
        },
        recruiterId: recruiter.recruiterId,
      };
    });
  };

  const handleAddRecruiter = async (recruiterId) => {
    try {
      setLoader(true);
      const response = await axios.post(`${process.env.REACT_APP_SERVER}admin/assignRequirements`, {
        recruiterId: recruiterId, requirementId: Id,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        }
      });
      setLoader(false);
      if (response.data.status === true) {
        const newRecruiter = response.data.addedData;

        const addNewData = recUser.filter(item => item.recruiterId === newRecruiter.recruiterId)
        const transformedRecruiters = transformRecruiterData(addNewData);
        setAssignedRecruiters(prevRecruiters => [...prevRecruiters, ...transformedRecruiters]);
      } else {
        handleNotificationCall("error", response.data.message);
      }
    } catch (error) {
      setLoader(false);
      console.error('Error adding recruiter:', error);
    }
  };

  const handleRemoveRecruiter = async (recruiterId) => {
    try {
      setLoader(true);
      const response = await axios.post(`${process.env.REACT_APP_SERVER}CC/removeAssignedRequirements`, {
        id: recruiterId, requirementId: Id,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        }
      });
      setLoader(false);
      if (response.data.status === true) {
        setAssignedRecruiters(prevRecruiters => prevRecruiters.filter(item => item.id !== recruiterId));
      } else {
        handleNotificationCall("error", response.data.message);
      }
    } catch (error) {
      setLoader(false);
      console.error('Error removing recruiter:', error);
    }
  };

  // const handleChangeAssignedRecruiters = (event, value) => {
  //   const newSelectedIds = value.map((option) =>  option.recruiterId);
  //   const oldSelectedIds = selectedRecruiters.map((recruiter) => recruiter.recruiterId);

  //   const addedIds = newSelectedIds.filter((id) => !oldSelectedIds.includes(id));

  //   addedIds.forEach(handleAddRecruiter);

  //   setSelectedRecruiters(value);
  //   setEditValue('assignRecruitersList', newSelectedIds);
  // };

  const filterRef = useRef(null);

  function handleUploadChange(e) {
    setFile(e.target.files[0]);
  }

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
    var data = {};
    var url = "";
    if (decode.role === "ADMIN") {
      data = JSON.stringify({
        page: 1,
        fromDate: `${form["fromDate"].value}`,
        toDate: `${form["toDate"].value}`,
        recruiterId: recruiterId?.id,
        requirementId: requirementId?.id,
      });

      url = `${process.env.REACT_APP_SERVER}admin/allRequirements`;
    } else {
      data = JSON.stringify({
        page: 1,
        fromDate: `${form["fromDate"].value}`,
        toDate: `${form["toDate"].value}`,
        requirementId: requirementId?.id,
      });
      url = `${process.env.REACT_APP_SERVER}CC/myRequirements`;
    }

    axios({
      method: "post",
      url: url,
      data: data,
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
    var data = {};
    var url = "";
    if (decode.role === "ADMIN") {
      data = JSON.stringify({
        page: newPage + 1,
        fromDate: `${form["fromDate"].value}`,
        toDate: `${form["toDate"].value}`,
        recruiterId: recruiterId?.id,
        requirementId: requirementId?.id,
      });

      url = `${process.env.REACT_APP_SERVER}admin/allRequirements`;
    } else {
      data = JSON.stringify({
        page: newPage + 1,
        fromDate: `${form["fromDate"].value}`,
        toDate: `${form["toDate"].value}`,
        requirementId: requirementId?.id,
      });
      url = `${process.env.REACT_APP_SERVER}CC/myRequirements`;
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
        setRequirementsData(response.data.data);
        setCount(response.data.count);
        setLoader(false);
      }

      setLoader(false);
    });
  };

  function handleAdd(values) {
    return new Promise((resolve, reject) => {
      try {
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
            assignRecruitersList: reqOrgRecId,
            levelOfHiringId: reqLevelHrDataId,
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
        })
          .then(function (response) {
            if (response.data.status === true) {
              if (file?.name) {
                uploadJD(file, response.data.requirementId);
              }
              setPage(0)
              setCurrerntPage(1);
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
            handleNotificationCall("error", error.message);
            setLoader(false);
            reject(error);
          });
      } catch (error) {
        handleNotificationCall("error", error.message);
        setLoader(false);
        reject(error);
      }
    });
  }

  function handleEdit(values) {
    return new Promise((resolve) => {
      setLoader(true);
      var url = "";
      if (decode.role === "ADMIN") {
        url = `${process.env.REACT_APP_SERVER}admin/editRequirement`;
      } else {
        url = `${process.env.REACT_APP_SERVER}CC/editRequirement`;
      }
      axios({
        method: "post",
        url: url,
        data: {
          id: Id,
          requirementName: values.requirementName,
          skills: values.skills,
          clientId: clientId,
          orgRecruiterId: reqOrgRecId,
          levelHrDataId: reqLevelHrDataId,
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
      })
        .then(function (response) {
          if (response.data.status === true) {
            handleNotificationCall("success", response.data.message);
            if (file?.name) {
              uploadJD(file, Id);
            }
            setPage(0)
            setCurrerntPage(1);
            forceUpdate();

            setState({ ...state, right: false });
          } else {
            handleNotificationCall("success", response.data.message);
          }
          resolve();
          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
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
          handleChange(response.data.data.clientId);
          setId(response.data.data.id);
          setAssignedRecruiters(response.data.data.assignedRequirements)
          setReqOrgRecId(response.data.data.orgRecruiterId);
          setReqLevelHrDataId(response.data.data.levelOfHiringId)
          editreset({
            id: response.data.data.id,
            requirementName: response.data.data.requirementName,
            skills: response.data.data.skills,
            clientId: response.data.data.clientId,
            clientName: response.data.data.client.clientName,
            orgRecruiterId: response.data.data.orgRecruiterId,
            levelHrDataId: response.data.data.levelOfHiringId,
            levelofHiringName: response.data.data.levelOfHiring.name,
            jobLocation: response.data.data.jobLocation,
            experience: response.data.data.experience,
            gist: response.data.data.gist,
            jd: response.data.data.requirementJd,
            hideFromInternal: response.data.data.hideFromInternal,
            work: response.data.data.modeOfWork,
            hiring: response.data.data.specialHiring,
          });

          setRequirementsEdit({
            ...requirementsEdit,
            id: response.data.data.id,
            requirementName: response.data.data.requirementName,
            skills: response.data.data.skills,
            clientId: response.data.data.clientId,
            clientName: response.data.data.client.clientName,
            levelofHiringName: response.data.data.levelOfHiring.name,
            levelHrDataId: response.data.data.levelOfHiringId,
            jobLocation: response.data.data.jobLocation,
            experience: response.data.data.experience,
            gist: response.data.data.gist,
            jd: response.data.data.requirementJd,
            hideFromInternal: response.data.data.hideFromInternal,
            modeOfWork: response.data.data.modeOfWork,
            specialHiring: response.data.data.specialHiring,
          });

          setRequirementsView({
            ...requirementsView,
            id: response.data.data.id,
            requirementName: response.data.data.requirementName,
            clientId: response.data.data.clientId,
            skills: response.data.data.skills,
            levelofHiringName: response.data.data.levelOfHiring.name,
            levelHrDataId: response.data.data.levelOfHiring.id,
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

  useEffect(() => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}CC/getClientList`,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setClientList(response.data.data);
      }
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}CC/getEditClientList`,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setClientEditList(response.data.data);
      }
    });
  }, [token]);

  useEffect(() => {
    // Set the initial value for the gist field
    setEditValue('gist', requirementsEdit?.gist || '');
  }, [requirementsEdit, setEditValue]);

  function handleChange(value) {
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
        setLevelHrData(response.data?.lvlHrData)
      }
    });
  }

  function handleEditChange(value) {
    setClientId(value);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}CC/getEditOrganisationReciruterList`,
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
        setLevelHrData(response.data?.lvlHrData)
        if (response.data.data[0]?.id) {
          setRequirementsEdit({
            ...requirementsEdit,
            clientId: value.id,
            clientName: value.clientName,
            levelHrDataId: response.data.data[0]?.id,
          });
        } else {
          setRequirementsEdit({
            ...requirementsEdit,
            clientId: value.id,
            clientName: value.clientName,
          });
        }
      }
    });
  }

  const HeaderElements = () => (
    <>
      <Grid className={classes.HeaderElements}>Total : {count}</Grid>
    </>
  );

  function handleStatus(id, value) {
    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}cc/changeRequirementStatus`,
      data: {
        requirementId: id,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setLoader(false);
        const switchState = requirementsData.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              statusList: {
                ...item.statusList,
                statusName: value === true ? "ACTIVE" : "INACTIVE",
              },
            };
          }
          return item;
        });
        setRequirementsData(switchState);
        handleNotificationCall("success", response.data.message);
      }
    });
  }

  const list = (anchor) =>
    dataList === "EDIT" ? (
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
                  <Grid item xs={10} md={6}>
                    <Typography variant="subtitle1">
                      Edit Requirements
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

              <form onSubmit={editSubmit(handleEdit)}>
                <CardContent>
                  <Grid container direction="row" spacing={2} style={{height: "79vh",overflow: "scroll"}}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <FormControl className={classes.margin}>
                        <InputLabel shrink htmlFor="clientId">
                          {decode.companyType === "COMPANY" ? "Select Project Name" : "Select Client Name"}
                        </InputLabel>

                        <Autocomplete
                          options={clientEditList}
                          disableClearable
                          error={editErrors.clientId ? true : false}
                          getOptionLabel={(option) =>
                            option.clientName + " (" + option.uniqueId + ")"
                          }
                          getOptionSelected={(option) =>
                            option.clientName === requirementsEdit.clientName
                          }
                          defaultValue={{
                            id: requirementsEdit.clientId,
                            clientName: requirementsEdit.clientName,
                            uniqueId: clientEditList
                              .filter((item) =>
                                item.id.includes(requirementsEdit.clientId),
                              )
                              .map((recruiter) => recruiter.uniqueId)[0],
                          }}
                          {...editRequirements("clientId")}
                          onChange={(event, value) => {
                            handleEditChange(value.id);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} variant="filled" />
                          )}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.clientId?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <FormControl className={classes.margin}>
                        <InputLabel shrink htmlFor="levelHrDataId">
                          Select Level Name
                        </InputLabel>

                        <Autocomplete
                          options={levelHrData}
                          disableClearable
                          error={editErrors.levelHrDataId ? true : false}
                          defaultValue={{
                            id: requirementsEdit.levelHrDataId,
                            name: requirementsEdit.levelofHiringName,
                          }}
                          {...editRequirements("levelHrDataId")}
                          getOptionLabel={(option) => option.name}
                          getOptionSelected={(option) =>
                            option.name === requirementsEdit.levelofHiringName
                          }
                          onChange={(event, value) => {
                            setReqLevelHrDataId(value.id);
                            setRequirementsEdit({
                              ...requirementsEdit,
                              levelHrDataId: value.id,
                              levelofHiringName: value.name,
                            });
                          }}
                          renderInput={(params) => (
                            <TextField {...params} variant="filled" />
                          )}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.levelHrDataId?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {assignedRecruiters.map((item, index) => {
                          return (
                            <div key={index}>
                              <Chip
                                avatar={<Avatar> {item.recruiter?.firstName.split("")[0]}</Avatar>}
                                label={item.recruiter?.firstName + " " + item.recruiter?.lastName}
                                className={classes.EditRecUserChip}
                                clickable
                                color="primary"
                                onDelete={() => handleRemoveRecruiter(item.id)}
                                variant="outlined"
                              />
                            </div>
                          )
                        })}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <FormControl className={classes.margin}>
                        <InputLabel shrink htmlFor="assignRecruitersList">
                          Select Recruiter
                        </InputLabel>
                        <Autocomplete
                          options={recUser}
                          disableClearable
                          error={editErrors.assignRecruitersList ? true : false}
                          {...editRequirements("assignRecruitersList")}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, value) => {
                            handleAddRecruiter(value.recruiterId)
                          }}
                          renderInput={(params) => (
                            <TextField {...params} variant="filled" />
                          )}
                        />
                      </FormControl>
                      {/* <Autocomplete
                        multiple
                        options={EditRecOption}
                        disableClearable
                        filterSelectedOptions
                        getOptionLabel={editRecOptionLabel}
                        onChange={(event, value)=> {
                          console.log(value)
                          // handleAddRecruiter(value.recruiterId)
                          }
                          }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            {...editRequirements("assignRecruitersList")}
                            variant="outlined"
                            name="assignRecruitersList"
                            label="Org Recruiter"
                            className={classes.MultiSelectRec}
                            error={editErrors.assignRecruitersList ? true : false}
                          />
                        )}
                      /> */}

                      <Typography variant="inherit" color="error">
                        {editErrors.assignRecruitersList?.message}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="requirementName">
                        Requirement Name
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          placeholder="Enter Requirement Name"
                          id="requirementName"
                          defaultValue={requirementsEdit.requirementName}
                          {...editRequirements("requirementName")}
                          error={editErrors.requirementName ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.requirementName?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="jobLocation">
                        Job Location
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          placeholder="Enter Job Location"
                          id="jobLocation"
                          defaultValue={requirementsEdit.jobLocation}
                          {...editRequirements("jobLocation")}
                          error={editErrors.jobLocation ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.jobLocation?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="skills">
                        Skill
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          placeholder="Enter Skill"
                          id="skills"
                          defaultValue={requirementsEdit.skills}
                          {...editRequirements("skills")}
                          error={editErrors.skills ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.skills?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="experience">
                        Experience
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          placeholder="Enter Experience"
                          id="experience"
                          defaultValue={requirementsEdit.experience}
                          {...editRequirements("experience")}
                          error={editErrors.experience ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.experience?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <FormControl className={classes.margin}>
                        <InputLabel shrink htmlFor="work">
                          Mode of work
                        </InputLabel>
                        <Select
                          name="work"
                          defaultValue={requirementsEdit.modeOfWork}
                          {...editRequirements("work")}
                          error={editErrors.roleName ? true : false}
                          classes={{
                            root: classes.customSelectField,
                            icon: classes.customSelectIcon,
                          }}
                          disableUnderline
                          onChange={(e) => {
                            setRequirementsEdit({
                              ...requirementsEdit,
                              modeOfWork: e.target.value,
                            });
                          }}
                        >
                          <MenuItem value="Work from Office">
                            Work from Office
                          </MenuItem>
                          <MenuItem value="Work from Home">
                            Work from Home
                          </MenuItem>
                          <MenuItem value="Hybrid"> Hybrid </MenuItem>
                          <MenuItem value="Onsite"> Onsite </MenuItem>
                        </Select>

                        <Typography variant="inherit" color="error">
                          {editErrors.work?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="hiring">
                        Special hiring
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <Select
                          label="Role"
                          name="roleName"
                          defaultValue={requirementsEdit.specialHiring}
                          {...editRequirements("hiring")}
                          error={editErrors.roleName ? true : false}
                          classes={{
                            root: classes.customSelectField,
                            icon: classes.customSelectIcon,
                          }}
                          disableUnderline
                          onChange={(e) => {
                            setRequirementsEdit({
                              ...requirementsEdit,
                              specialHiring: e.target.value,
                            });
                          }}
                        >
                          <MenuItem value="Diversity">Diversity</MenuItem>
                          <MenuItem value="Returnership">Returnership</MenuItem>
                          <MenuItem value="Vetrans"> Vetrans </MenuItem>
                          <MenuItem value="PWD (Person With Disability)">
                            PWD (Person With Disability)
                          </MenuItem>
                          <MenuItem value="LGBTQ"> LGBTQ </MenuItem>
                        </Select>
                        <Typography variant="inherit" color="error">
                          {editErrors.hiring?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InputLabel shrink htmlFor="hideFromInternal">
                        Hide to Internal
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <Switch
                          color="primary"
                          id="hideFromInternal"
                          name="hideFromInternal"
                          checked={requirementsEdit.hideFromInternal}
                          {...editRequirements("hideFromInternal", {
                            onChange: (e) => {
                              setRequirementsEdit({
                                ...requirementsEdit,
                                hideFromInternal: e.target.checked,
                              });
                            },
                          })}
                          error={editErrors.hideFromInternal ? true : false}
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                        <Typography variant="inherit" color="error">
                          {editErrors.hideFromInternal?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} lg={3}>
                      <InputLabel shrink htmlFor="jd">
                        Upload JD
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <div
                          className={
                            classes.space + " " + classes.alignItemsEnd
                          }
                        >
                          <div className={classes.marginTop}>
                            <input
                              accept=".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              className={classes.input}
                              id="icon-button-jd"
                              type="file"
                              style={{ display: "none" }}
                              onChange={handleUploadChange}
                            />
                            <label htmlFor="icon-button-jd">
                              <Button
                                variant="contained"
                                className={classes.button}
                                color="primary"
                                startIcon={<DescriptionIcon />}
                                aria-label="upload JD"
                                component="span"
                              >
                                Upload JD
                              </Button>
                            </label>
                          </div>

                          {requirementsEdit?.jd !==
                            "https://liverefo.s3.amazonaws.com/" &&
                            requirementsEdit?.jd !== "" ? (
                            <>
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
                                <a
                                  className={classes.messageContent}
                                  href={requirementsEdit?.jd}
                                  download
                                >
                                  <GetAppIcon className={classes.toolIcon} />
                                </a>
                              </Tooltip>

                              {file?.name ? (
                                <Tooltip
                                  title="Delete JD"
                                  placement="bottom"
                                  aria-label="delete"
                                >
                                  <DeleteIcon
                                    className={classes.toolIconDelete}
                                    onClick={(e) => {
                                      setFile([]);
                                    }}
                                  />
                                </Tooltip>
                              ) : (
                                ""
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <Grid
                        container
                        direction="row"
                        className={classes.left + " " + classes.button}
                      >
                        <Typography
                          variant="inherit"
                          className={classes.lineBreak}
                        >
                          {file?.name}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel shrink htmlFor="gist">
                        Requirement Gist
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        {/* <TextField
                          multiline
                          size="small"
                          rows={5}
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          placeholder="Enter Requirement Gist"
                          id="gist"
                          defaultValue={requirementsEdit.gist}
                          {...editRequirements("gist")}
                          error={editErrors.gist ? true : false}
                        /> */}

                        <JoditEditor
                          value={requirementsEdit?.gist}
                          tabIndex={1} // tabIndex of textarea
                          ref={ContentRef}
                          onBlur={() => {
                            const newContent = ContentRef.current.value;
                            setEditValue("gist", newContent);
                            editTrigger("gist");
                          }}
                          onChange={newContent => {
                            setEditValue("gist", newContent);
                          }}
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.gist?.message}
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
                      disabled={editIsSubmitting}
                      type="submit"
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
          </List>
        </Box>
      </>
    ) : dataList === "ADD" ? (
      <>
        <AddRequirements
          handleAdd={handleAdd}
          clientList={clientList}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          toggleDrawer={toggleDrawer}
          register={register}
          errors={errors}
          trigger={trigger}
          setValue={setValue}
          isSubmitting={isSubmitting}
          recUser={recUser}
          levelHrData={levelHrData}
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
          setClientList={setClientList}
          setReqOrgRecId={setReqOrgRecId}
          setReqLevelHrDataId={setReqLevelHrDataId}
        />
      </>
    ) : (
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
                  {decode.companyType !== "COMPANY" && (
                    <>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography className={classes.boldtext}>
                          Organization Recruiter Name:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        {/* {requirementsView.orgRecruiterName} */}
                      </Grid>
                    </>
                  )}



                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography className={classes.boldtext}>
                      Level of Hiring Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {requirementsView.levelofHiringName}
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
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {requirementsView.jobLocation}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography className={classes.boldtext}>
                      Mode of work:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {requirementsView.modeOfWork}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography className={classes.boldtext}>
                      Special hiring:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {requirementsView.specialHiring}
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
                    <Typography className={classes.boldtext}>JD :</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <div
                      className={classes.space + " " + classes.alignItemsEnd}
                    >
                      {requirementsView?.jd !==
                        "https://liverefo.s3.amazonaws.com/" ? (
                        <>
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
                            <a
                              className={classes.messageContent}
                              href={requirementsEdit?.jd}
                              download
                            >
                              <GetAppIcon className={classes.toolIcon} />
                            </a>
                          </Tooltip>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography className={classes.boldtext}>
                      Requirement Gist:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: requirementsView.gist,
                      }}
                    ></div>
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
                        if (decode.role === "ADMIN") {
                          sessionStorage.setItem(
                            "recruitmentId",
                            requirementsView.id,
                          );

                          history.push("/app/admin_candidates");
                        } else if (decode.role === "CLIENTCOORDINATOR") {
                          sessionStorage.setItem(
                            "recruitmentId",
                            requirementsView.id,
                          );

                          history.push("/app/cc_candidates");
                        }
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
                    {moment(requirementsView.createdAt).format("DD-MM-YYYY")}
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

  if (decode.role === "ADMIN") {
    var table_column = [
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
        name: decode.companyType === "COMPANY" ? "Hiring Manager" : "Client Coordinator",
      },
      {
        name: decode.companyType === "COMPANY" ? "Project Name" : "Client Name",
      },
      ...(decode.companyType === "COMPANY"
        ? []
        : [
          {
            name: "Organization Recruiter Name",
          },
        ]),
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
        name: "Status",
      },
      {
        name: "Posted Date",
      },
    ];

    var table_data = requirementsData.map((item, index) => {

      return [
        <>
          {currerntPage !== 0 ? 10 * currerntPage - 10 + index + 1 : index + 1}
        </>,
        <>
          <Grid container className={classes.space}>
            <Grid item xs className={classes.toolAlign}>
              <Tooltip
                title="Edit Requirement"
                placement="bottom"
                aria-label="edit"
              >
                <EditIcon
                  className={classes.toolIcon}
                  onClick={(e) => {
                    handleShow(item.id, "EDIT");
                    setFile([]);
                  }}
                />
              </Tooltip>
              <Tooltip
                title="View Requirement"
                placement="bottom"
                aria-label="view"
              >
                <ViewIcon
                  className={classes.toolIcon}
                  onClick={(e) => {
                    handleShow(item.id, "VIEW");
                    setFile([]);
                  }}
                />
              </Tooltip>
              <Tooltip
                title={decode.companyType === "COMPANY" ? "Project Preview" : "Client Preview"}
                placement="bottom"
                aria-label="view"
              >
                <DescriptionIcon
                  className={classes.toolIcon}
                  onClick={(e) => {
                    history.push(
                      `requirements_Candidate?requirementId=${item.id}`,
                    );
                  }}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </>,
        <>
          {item.requirementName} {"(" + item.uniqueId + ")"}
        </>,
        <>{item.client.handler?.firstName + " (" + item.client.handler?.lastName + ")"}</>,
        <>{item.client.clientName + " (" + item.client.uniqueId + ")"} </>,
        ...(decode.companyType === "COMPANY"
          ? []
          : [
            item.orgRecruiter.name
          ]),
        item.experience,
        item.skills,
        item.jobLocation,
        item.statusList ? (
          <Switch
            checked={item.statusList.statusName === "ACTIVE" ? true : false}
            onChange={(e) => {
              handleStatus(item.id, e.target.checked);
            }}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        ) : (
          ""
        ),
        moment(item.createdAt).format("DD-MM-YYYY"),
      ];
    });
  } else {
    table_column = [
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
        name: decode.companyType === "COMPANY" ? "Project Name" : "Client Name",
      },
      ...(decode.companyType === "COMPANY"
        ? []
        : [
          {
            name: "Organization Recruiter Name",
          },
        ]),
      {
        name: "Experience",
      },

      {
        name: "Location ",
      },
      {
        name: "Status",
      },
      {
        name: "Posted Date",
      },
    ];

    table_data = requirementsData.map((item, index) => {


      return [
        <>
          {currerntPage !== 0 ? 10 * currerntPage - 10 + index + 1 : index + 1}
        </>,
        <>
          <Grid container className={classes.space}>
            <Grid item xs className={classes.toolAlign}>
              <Tooltip
                title="Edit Requirement"
                placement="bottom"
                aria-label="edit"
              >
                <EditIcon
                  className={classes.toolIcon}
                  onClick={(e) => {
                    handleShow(item.id, "EDIT");
                    setFile([]);
                  }}
                />
              </Tooltip>
              <Tooltip
                title="View Requirement"
                placement="bottom"
                aria-label="view"
              >
                <ViewIcon
                  className={classes.toolIcon}
                  onClick={(e) => {
                    handleShow(item.id, "VIEW");
                    setFile([]);
                  }}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </>,
        <>{item.requirementName + " (" + item.uniqueId + ")"}</>,
        <>{item.client.clientName + " (" + item.client.uniqueId + ")"} </>,
        ...(decode.companyType === "COMPANY"
          ? []
          : [
            item.orgRecruiter.name
          ]),
        item.experience,

        item.jobLocation,
        item.statusList ? (
          <Switch
            checked={item.statusList.statusName === "ACTIVE" ? true : false}
            onChange={(e) => {
              handleStatus(item.id, e.target.checked);
            }}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        ) : (
          ""
        ),
        moment(item.createdAt).format("DD-MM-YYYY"),
      ];
    });
  }

  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.heading}>
        <Grid item xs={9} sm={7} md={8} lg={6}>
          <PageTitle title="Requirements" />
        </Grid>

        <Grid item xs={3} sm={5} md={4} lg={6} className={classes.drawerClose}>
          <div className={classes.lgButton}>
            <Button
              variant="contained"
              className={classes.addUser}
              startIcon={<AddCircleIcon />}
              color="primary"
              size="small"
              onClick={(e) => {
                reset();
                setDataList("ADD");
                setFile([]);
                setLevelHrData([])
                setRecUser([])
                setState({ ...state, right: true });
              }}
            >
              Add New Requirement
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
                setDataList("ADD");
                reset();
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
            classes={{ paper: classes.drawer }}
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
          {decode.role === "ADMIN" ? (
            <Autocomplete
              options={clientsName}
              className={classes.filterFullWidth}
              getOptionLabel={(option) =>
                decode.user_id === option.user.id
                  ? option.firstName + " " + option.lastName + " (You)"
                  : option.employeeId === ""
                    ? option.firstName + " " + option.lastName + " "
                    : option.firstName +
                    " " +
                    option.lastName +
                    " (" +
                    option.employeeId +
                    ")"
              }
              // size="small"
              value={recruiterId}
              onChange={(event, value) => setRecruiterId(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="recruiterId"
                  label={decode.companyType === "COMPANY" ? "Hiring Manager" : "Client Coordinator"}
                  InputLabelProps={{ shrink: true }}
                  type="text"
                  size="small"
                />
              )}
            />
          ) : (
            ""
          )}

          <Autocomplete
            className={classes.filterFullWidth}
            options={requirementName}
            getOptionLabel={(option) =>
              option.requirementName + " (" + option.uniqueId + ")"
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
              responsive: mobileQuery === true ? "vertical" : "standard",
              textLabels: {
                body: {
                  noMatch: "Oops! Matching record could not be found",
                },
              },
            }}
            columns={table_column}
            data={table_data}
          />

          <Grid container spacing={2} className={classes.pagination}>
            <TablePagination
              rowsPerPageOptions={[10]}
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
            <div className={classes.heading + " " + classes.inputRoot} style={{ position: "absolute", zIndex: 1, background: '#fff', top: 0, padding: "6px 30px" }}>
              <Typography variant="subtitle2" className={classes.inputRoot}>
                Job Description
              </Typography>
              <div className={classes.drawerClose}>
                <CloseIcon
                  className={classes.closeBtn}
                  onClick={handleModalClose}
                />
              </div>
            </div>
            <Grid item xs={12}>
              {fileExtension === "pdf" ?
                <CustomPdfView resumeUrl={requirementsEdit?.jd} />
                :
                <div className={classes.iframediv} style={{ marginTop: "40px" }}>
                  <iframe
                    src={
                      "https://docs.google.com/a/umd.edu/viewer?url=" +
                      requirementsEdit?.jd +
                      "&embedded=true"
                    }
                    title="File"
                    width="100%" height="500" sandbox="allow-scripts allow-same-origin"
                  ></iframe>
                  <div className={classes.iframeLogo}></div>
                </div>
              }
            </Grid>

            <div className={classes.sendWhatsapp + " " + classes.inputRoot}>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={handleModalClose}
              >
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
