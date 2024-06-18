import React, { useState, useEffect, useRef, useReducer } from "react";
import MUIDataTable from "mui-datatables";
import {
  Grid,
  Button,
  SwipeableDrawer,
  TextField,
  TablePagination,
  Select,
  MenuItem,
  CircularProgress,
  Avatar,
  Typography,

} from "@material-ui/core";
import ViewIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
// import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import moment from "moment";
import { Autocomplete } from "@material-ui/lab";
import useStyles from "../../themes/style.js";
import PageTitle from "../PageTitle/PageTitle.js";
import { useTheme } from "@material-ui/styles";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@material-ui/icons/Close";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import View from "../Candidates/View";
import { Backdrop, Box, List } from "@material-ui/core";
import axios from "axios";
// import XlsxPopulate from "xlsx-populate";
// import { saveAs } from "file-saver";
import external from "../../images/external.png"
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

import {
  ResponsiveContainer,
  ComposedChart,
  YAxis,
  XAxis,
  Bar,
  Cell,
} from 'recharts';

export default function Layout(props) {

  const classes = useStyles();
  var theme = useTheme();
  var currentYear = new Date().getFullYear();
  var startYear = 2023;
  var endYear = currentYear + 1;
  const mobileQuery = useMediaQuery('(max-width:600px)');
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleFromDateChange = (event) => {
    setFromDate(filterRef.current.fromDate.value);
  };

  const handleToDateChange = (event) => {
    setToDate(filterRef.current.toDate.value);
  };


  const CustomTooltip = ({ position, content, onMouseEnter, onMouseLeave }) => {
    const { x, y } = position || {};

    return (
      <div
        className={classes.customTooltip}
        style={{ left: x + 5, top: y + 5 }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {content}
      </div>

    );
  };

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const [loader, setLoader] = useState(false);
  const [graphLoader, setGraphLoader] = useState(false);

  const [candidatesData, setCandidatesData] = useState([]);
  const [invoicedValue] = useState([]);
  const [invoicedTotalAmt] = useState([]);
  const [invoicedCandidate, setInvoicedCandidate] = useState([]);

  const [listCanditate, setListCanditate] = useState([]);
  const [currerntPage, setCurrerntPage] = useState(1);

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const [candidateView, setCandidateView] = useState({
    id: "",
    chatId: "",
    email: "",
    cc: "",
    firstName: "",
    lastName: "",
    mobile: "",
    skills: "",
    clientName: "",
    requirementName: "",
    statusCode: "",
    source: "",
    createdAt: "",
    requiremenUniqueId: "",
    candidateUniqueId: "",
    invoicedDate: "",
    joinedDate: "",
    invoiceValue: "",
    gender: "",
    document: "",
    photo: "",
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
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      setCurrerntPage(1);

      var url = props.candidateReportUrl;
      axios({
        method: "post",
        url: url,
        data: {
          page: "1",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          setCandidatesData(response?.data?.data);
          setCount(response.data.count);
        }
        setLoader(false);
      });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducerValue, token]);

  const filterRef = useRef(null);

  const [year, setYear] = React.useState(new Date().getFullYear());

  const [userName, setUserName] = useState([]);

  const [recruiterId, setRecruiterId] = useState(null);

  useEffect(() => {
    axios({
      method: "post",
      url: props.userListUrl,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setUserName(response.data.data);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  function getFilterData() {
    const form = filterRef.current;

    if (form["fromDate"].value > form["toDate"].value) {
      toast.error('Check your selected dates', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

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
      url: props.candidateReportUrl,
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

  const resetForm = (e) => {
    filterRef.current.reset();
    setRecruiterId(null);
    forceUpdate();
  };

  var candidateDetail = useRef([]);

  useEffect(() => {
    setLoader(true);
    // setGraphLoader(true);
    axios({
      method: "post",
      url: props.getReportCountUrl,
      data: {
        year: year,
        statusCode: props.statusCode,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        for (var i = 0; i < response.data.data?.length; i++) {
          var month = response.data.data[i].month;
          invoicedValue.push(response.data.data[i].count);
          invoicedTotalAmt.push(response.data.data[i].totalInvoiceValue)
          candidateDetail.current = candidateDetail.current.concat({
            month:
              month === "01"
                ? "Jan"
                : month === "02"
                  ? "Feb"
                  : month === "03"
                    ? "Mar"
                    : month === "04"
                      ? "Apr"
                      : month === "05"
                        ? "May"
                        : month === "06"
                          ? "Jun"
                          : month === "07"
                            ? "Jul"
                            : month === "08"
                              ? "Aug"
                              : month === "09"
                                ? "Sep"
                                : month === "10"
                                  ? "Oct"
                                  : month === "11"
                                    ? "Nov"
                                    : month === "12"
                                      ? "Dec"
                                      : "",
            value: response.data.data[i].count,
          });
        }
        if (candidateDetail.current.length === 12) {
          setInvoicedCandidate(candidateDetail.current);
          setLoader(false);
          // setGraphLoader(false);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  function handleYearData(e) {
    setGraphLoader(true);
    setYear(e.target.value);
    candidateDetail.current = [];
    invoicedValue.length = 0;
    invoicedTotalAmt.length = 0;
    axios({
      method: "post",
      url: props.getReportCountUrl,
      data: {
        year: e.target.value,
        statusCode: props.statusCode,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {

        for (var i = 0; i < response.data.data?.length; i++) {
          var month = response.data.data[i].month;
          invoicedValue.push(response.data.data[i].count);
          invoicedTotalAmt.push(response.data.data[i].totalInvoiceValue)
          candidateDetail.current = candidateDetail.current.concat({
            month:
              month === "01"
                ? "Jan"
                : month === "02"
                  ? "Feb"
                  : month === "03"
                    ? "Mar"
                    : month === "04"
                      ? "Apr"
                      : month === "05"
                        ? "May"
                        : month === "06"
                          ? "Jun"
                          : month === "07"
                            ? "Jul"
                            : month === "08"
                              ? "Aug"
                              : month === "09"
                                ? "Sep"
                                : month === "10"
                                  ? "Oct"
                                  : month === "11"
                                    ? "Nov"
                                    : month === "12"
                                      ? "Dec"
                                      : "",
            value: response.data.data[i].count,
          });
        }
        if (candidateDetail.current.length === 12) {
          setInvoicedCandidate(candidateDetail.current);
          setGraphLoader(false);
        }
      }
    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setCurrerntPage(newPage + 1);
    setLoader(true);
    var url = props.candidateReportUrl;
    const form = filterRef.current;

    var data = JSON.stringify({
      page: newPage + 1,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
      recruiterId: recruiterId?.id,
    });

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
        setCandidatesData(response.data.data);
        setCount(response.data.count);
      }

      setLoader(false);
    });
  };

  function handleShow(values) {
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
            invoicedDate: response.data.data.invoicedDate,
            joinedDate: response.data.data.joinedDate,
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
  }

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
  //         `${props.title}_${moment(new Date()).format("DD_MM_YYYY_HH_mm")}.xlsx`,
  //       );
  //     });
  //   });
  // }

  // function downloadExel() {
  //   setLoader(true);
  //   const form = filterRef.current;

  //   var data = JSON.stringify({
  //     page: 1,
  //     fromDate: `${form["fromDate"].value}`,
  //     toDate: `${form["toDate"].value}`,
  //     recruiterId: recruiterId?.id,
  //     fileDownload: "yes",
  //   });
  //   axios({
  //     method: "post",
  //     url: props.candidateReportUrl,
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

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [rowsPerPage] = useState(50);

  const Content = ({ name, value }) => {
    return (
      <div>
        <a href="/">{name}</a>
        <span>{value}</span>
      </div>
    );
  };

  const [tooltip, setTooltip] = useState({});
  let tooltipTimeout;
  const showTooltip = (item, i, e) => {
    clearTimeout(tooltipTimeout);
    setTooltip({
      show: true,
      position: { x: e.clientX, y: e.clientY },
      content: <Content name={item.name} value={item.value} />
    });
  };

  const hideTooltip = (e) => {
    tooltipTimeout = setTimeout(() => setTooltip({ show: false, ...e }), 200);
  };

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
  const [yearList] = React.useState([]);

  useEffect(() => {
    while (startYear <= endYear) {
      yearList.push(startYear++);
    }
  }, [yearList, endYear, startYear]);


  var table_column = [
    {
      name: "S.No",
    },
    {
      name: "Action",
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
      name: "Posted Date",
    },
  ];

  var table_data = {};

  if (props.statusCode === 302) {

    table_data = candidatesData.map((item, index) => {
      return [
        <>
          {currerntPage !== 0
            ? 10 * currerntPage - 10 + index + 1
            : index + 1}
        </>,

        <>
          <Grid container className={classes.space}>
            <Grid item xs className={classes.toolAlign}>
              <Tooltip
                title="View Candidate"
                placement="bottom"
                aria-label="view"
              >
                <ViewIcon
                  className={classes.toolIcon}
                  onClick={(e) => {
                    handleShow(item.id);
                  }}
                />
              </Tooltip>


            </Grid>
          </Grid>
        </>,
        <div className={classes.externalIconContainer}>
          {item.candidateDetail?.isExternal === "YES" ?
            <Tooltip title="SUBVENDOR" placement="bottom" aria-label="title">
              <Avatar alt="Profile" src={external} className={classes.externalIcon} />
            </Tooltip> : ""}
          <div>
            {item.candidateDetail?.firstName + " " + item.candidateDetail?.lastName} <br /> {" (" + item.uniqueId + ")"}
          </div>

        </div>,
        item.mainId === decode.mainId ?
          <>  {item.candidateDetail?.email + " /"} <br />{"91 " + item.candidateDetail?.mobile.slice(2)}  </>
          : item.hideContactDetails !== true ?
            <>  {item.candidateDetail?.email + " /"} <br />{"91 " + item.candidateDetail?.mobile.slice(2)}  </>
            : "",
        <> {item.requirement?.requirementName} <br /> {"(" + item.requirement?.uniqueId + ")"}</>,
        item.requirement?.recruiter?.firstName + " " + item.requirement?.recruiter?.lastName,
        item.requirement?.client?.handler?.firstName + " " + item.requirement?.client?.handler?.lastName,



        moment(item.createdAt).format("DD-MM-YYYY"),
      ];
    })

  } else {
    table_data = candidatesData.map((item, index) => {
      return [
        <>
          {currerntPage !== 0
            ? 10 * currerntPage - 10 + index + 1
            : index + 1}
        </>,
        <Grid container className={classes.space}>
          <Tooltip title="View Candidate" placement="bottom" aria-label="view">
            <ViewIcon
              className={classes.toolIcon}
              onClick={(e) => {
                handleShow(item.candidate.id);
              }}
            />
          </Tooltip>
        </Grid>,
        <Grid container row spacing={2} >
          <div className={classes.externalIconContainer}>
            {item.candidate.candidateDetail?.isExternal === "YES" ?
              <Tooltip title="SUBVENDOR" placement="bottom" aria-label="title">
                <Avatar alt="Profile" src={external} className={classes.externalIcon} />
              </Tooltip> : ""}
            <div>
              {item.candidate.candidateDetail?.firstName + " " + item.candidate.candidateDetail?.lastName} <br />{" (" + item.candidate.uniqueId + ")"}
            </div>
          </div>
        </Grid>,

        item.mainId === decode.mainId ?
          <>  {item.candidate.candidateDetail?.email + " /"} <br />{item.candidate.candidateDetail?.mobile}  </>
          : item.hideContactDetails !== true ?
            <>  {item.candidate.candidateDetail?.email + " /"} <br />{item.candidate.candidateDetail?.mobile}  </>
            : "",

        <>
          {item.candidate.requirement?.requirementName} <br />   {" (" + item.candidate.requirement?.uniqueId + ")"}</>,
        item.candidate.recruiter?.firstName + " " + item.candidate.recruiter?.lastName,
        item.candidate.requirement?.recruiter?.firstName + " " + item.candidate.requirement?.recruiter?.lastName,


        moment(item.createdAt).format("DD-MM-YYYY"),
      ];
    });
  }

  const list = (anchor) => (
    <Box sx={{ width: "100%" }} role="presentation">
      <List>
        <View
          candidateView={candidateView}
          listCanditate={listCanditate}
          toggleDrawer={toggleDrawer}
          setCandidateView={setCandidateView}
        />
      </List>
    </Box>

  )

  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.heading}>
        <Grid item xs={6}   >

          <PageTitle title={props.title} />
        </Grid>

        <Grid item xs={6} className={classes.drawerClose}>
          <Select
            labelId="year"
            id="year"
            variant="outlined"
            defaultValue={year}
            onChange={(e) => {
              handleYearData(e);
            }}
            className={classes.filterFullWidth}
          >
            {yearList.map((item, index) => {

              return [
                <MenuItem key={index} value={item}>
                  {item + "-" + Number(item + 1)}
                </MenuItem>
              ];
            })}
          </Select>

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


      {graphLoader === false ?
        <>
          <Grid container spacing={2} className={Math.max(...invoicedValue) === 0 ? classes.barBlur : classes.barGraph}  >

            <ResponsiveContainer width="100%" minWidth={300} height={175} padding={2}>

              <ComposedChart margin={{ top: 20, right: 30, left: 0, bottom: 10 }} data={invoicedCandidate}   >

                <YAxis

                  ticks={[0, Math.max(...invoicedValue) / 2, Math.max(...invoicedValue)]}
                  tick={{ fill: theme.palette.primary.dark + "80", fontSize: 14 }}
                  stroke={theme.palette.primary.light + "80"}
                  tickLine={true}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: theme.palette.primary.dark + "80", fontSize: 14 }}
                  stroke={theme.palette.primary.light + "80"}
                  tickLine={true}
                />

                <Bar dataKey="value" barSize={20} className={classes.closeBtn} onMouseEnter={showTooltip} onMouseLeave={hideTooltip} >

                  {invoicedCandidate.map((entry, index) => {
                    return [
                      <>
                        <Cell fill={entry.month === "Jan" ? "#413ea0" : entry.month === "Feb" ? "#f44336"
                          : entry.month === "Mar" ? "#e91e63" : entry.month === "Apr" ? "#9c27b0"
                            : entry.month === "May" ? "#009688" : entry.month === "Jun" ? "#4caf50"
                              : entry.month === "Jul" ? "#cddc39" : entry.month === "Aug" ? "#ffeb3b"
                                : entry.month === "Sep" ? "#ff9800" : entry.month === "Oct" ? "#ff5722"
                                  : entry.month === "Nov" ? "#ff784e" : entry.month === "Dec" ? "#6573c3" : ""} />
                      </>

                    ]
                  })}

                </Bar>

              </ComposedChart>
            </ResponsiveContainer>

            {tooltip.show && (
              <CustomTooltip
                onMouseEnter={() => {
                  clearTimeout(tooltipTimeout);
                }}
                onMouseLeave={() => {
                  setTooltip({ show: false });
                  clearTimeout(tooltipTimeout);
                }}
                {...tooltip}
              />
            )}

            <Grid item xs={12} style={{ marginLeft: '20px' }}>
              <Typography style={{ color: '#303f9f' }} variant="body1"> Total count of {year + "-" + Number(year + 1) + ":  " + (invoicedValue.reduce((a, v) => a = a + v, 0))}  </Typography>
              {props.statusCode === 312 &&
                <Typography style={{ color: '#368413' }} variant="body1"> Total Invoice Amount of {year + "-" + Number(year + 1) + ":  " + (invoicedTotalAmt.reduce((a, v) => a = a + v, 0))}  </Typography>
              }
            </Grid>
          </Grid>
        </>
        :
        <ResponsiveContainer width="100%" minWidth={300} height={175} padding={2}  >
          <Grid
            container
            spacing={2}
            className={classes.flexCenter}
          >
            <CircularProgress />
          </Grid>
        </ResponsiveContainer>

      }

      <form
        ref={filterRef}
        onSubmit={(e) => {
          e.preventDefault();
          getFilterData();
        }}
      >
        <Grid container spacing={2} className={classes.filterGap}>
          <Autocomplete
            options={userName}
            className={classes.filterFullWidth}
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
            name="fromDate"
            label="From"
            InputLabelProps={{ shrink: true }}
            size="small"
            type="date"
            defaultValue={fromDate}
            onChange={(e) => handleFromDateChange(e)}
            className={classes.filterWidth}
          />

          <TextField
            name="toDate"
            label="To"
            InputLabelProps={{ shrink: true }}
            size="small"
            className={classes.filterWidth}
            type="date"
            defaultValue={toDate}
            onChange={handleToDateChange}
          />

          <div className={classes.buttons}>
            <Button
              variant="contained"
              size="small"
              type="submit"
              color="primary"
            >
              Search
            </Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={resetForm}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </form>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MUIDataTable
            options={{
              pagination: false,
              sort: false,
              selectableRows: "none",
              search: false,
              filter: false,
              print: false,
              download: false,
              responsive: mobileQuery === true ? 'vertical' : 'standard',
              customToolbar: () => <HeaderElements />,
              textLabels: {
                body: {
                  noMatch: 'Oops! Matching record could not be found',
                }
              }
            }}
            columns={table_column}
            data={table_data}
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

      <ToastContainer
        closeButton={
          <CloseButton className={classes.notificationCloseButton} />
        }
        closeOnClick={false}
        hideProgressBar={true}
      />
      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );

}



function CloseButton({ closeToast, className }) {
  return <CloseIcon className={className} onClick={closeToast} />;
}