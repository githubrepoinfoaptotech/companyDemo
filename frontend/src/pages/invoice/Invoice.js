import React, { useEffect, useRef, useState, useReducer } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  SwipeableDrawer,
  TablePagination,
  TextField,
  Avatar,
  Typography
} from "@material-ui/core";
 import ViewIcon from "@material-ui/icons/Visibility";
import axios from "axios";
import moment from "moment";
import MUIDataTable from "mui-datatables";
 import View from "../../components/Candidates/View";
import ProgressBar from "../../components/Candidates/Bar";
import PageTitle from "../../components/PageTitle/PageTitle";
import Tooltip from "@material-ui/core/Tooltip";
// import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
// import XlsxPopulate from "xlsx-populate";
// import { saveAs } from "file-saver";
import useStyles from "../../themes/style.js";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@material-ui/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import external from "../../images/external.png"
import {
  ResponsiveContainer,
  ComposedChart, 
  YAxis,
  XAxis,
  Bar, 
  Cell,
} from 'recharts';
import {jwtDecode} from "jwt-decode"; 

export default function Tables() {
  var theme = useTheme();
  const mobileQuery = useMediaQuery('(max-width:600px)'); 
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [graphLoader, setGraphLoader] = useState(false); 
  const [candidatesData, setCandidatesData] = useState([]);
  const [invoicedCandidate, setInvoicedCandidate] = useState([{}]);
   const [invoicedValue] = useState([]); 
   const [reducerValue,forceUpdate] = useReducer(x => x + 1, 0); 
  const [listCanditate, setListCanditate] = useState([]); 
  const [candidateView, setCandidateView] = useState({
    id:"",
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
    location:"",
    experience:null, 
    resume: "",
    document: "",
    photo: "",
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
  var currentYear = new Date().getFullYear();
  var startYear = 2023;
  var endYear = currentYear + 1;
  const [year, setYear] = React.useState(currentYear);
  const [yearList] = React.useState([]);

  useEffect(() => {
    while (startYear <= endYear) {
      yearList.push(startYear++);
    }
  }, [yearList, endYear, startYear]);

  useEffect(() => {
    const fetchData = async () => {
      setCurrerntPage(1);

      var url = `${process.env.REACT_APP_SERVER}admin/invoicedCandidates`;
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
      }).then(function (response) {
        if (response.data.status === true) {
          setCandidatesData(response.data.data.rows);
          setCount(response.data.data.count);
        }
      });
    };

    fetchData();
  }, [reducerValue, token]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filterRef = useRef([]);

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const resetForm = (e) => {
    filterRef.current.reset(); 
    forceUpdate();
  };

  function getFilterData() {
    setLoader(true);
    
    setCurrerntPage(1);
    setPage(0);
  
    const form = filterRef.current;
    var data = {};

    data = JSON.stringify({
      page: 1,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/invoicedCandidates`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setLoader(false);
       
          setCandidatesData(response.data.data.rows);
          setCount(response.data.data.count);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  var candidateDetail = useRef([]);
 
  useEffect(() => {
    setLoader(true);
    //setGraphLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/sendMonthTotal`,
      data: {
        year: year,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) { 
        
        for (var i = 0; i < response.data.data.length; i++) {  
          var month = response.data.data[i].month;
      
          invoicedValue.push(response.data.data[i].data); 
          candidateDetail.current = candidateDetail.current.concat({
            month:  month === "01" ? "Jan"  : month === "02"  ? "Feb"
            : month === "03"  ? "Mar" : month === "04"  ? "Apr"
            :  month === "05"  ? "May"  : month === "06" ? "Jun"  
            : month === "07" ? "Jul"   : month === "08" ? "Aug"  
            : month === "09" ? "Sep" : month === "10" ? "Oct"
            : month === "11" ? "Nov"  : month === "12" ? "Dec":"",
            value: response.data.data[i].data, 

          }); 
        }

        if (candidateDetail.current.length === 12) {
 
          setInvoicedCandidate(candidateDetail.current);
          setLoader(false);
          //setGraphLoader(false);
          }
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  function handleYearData(e) {
    setGraphLoader(true);

    setYear(e.target.value);
    candidateDetail.current=[];
    invoicedValue.length = 0;
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/sendMonthTotal`,
      data: {
        year: e.target.value,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        for (var i = 0; i < response.data.data.length; i++) {  
          var month = response.data.data[i].month;
          invoicedValue.push(response.data.data[i].data); 
          candidateDetail.current = candidateDetail.current.concat({
            month:  month === "01" ? "Jan"  : month === "02"  ? "Feb"
            : month === "03"  ? "Mar" : month === "04"  ? "Apr"
            :  month === "05"  ? "May"  : month === "06" ? "Jun"  
            : month === "07" ? "Jul"   : month === "08" ? "Aug"  
            : month === "09" ? "Sep" : month === "10" ? "Oct"
            : month === "11" ? "Nov"  : month === "12" ? "Dec":"",
            value: response.data.data[i].data, 
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
     var url = `${process.env.REACT_APP_SERVER}admin/invoicedCandidates`;
    const form = filterRef.current;
    var data = JSON.stringify({
      page: newPage + 1,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
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
        setCandidatesData(response.data.data.rows);
        setCount(response.data.data.count);
      }

      setLoader(false);
     });
  };

  function handleShow(values, name) {
    setLoader(true);
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
              cc:
                response.data.data.requirement?.recruiter?.firstName +
                " " +
                response.data.data.requirement?.recruiter?.lastName,
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
              currentLocation:
                response.data.data.candidateDetail?.currentLocation,
              preferredLocation:
                response.data.data.candidateDetail?.preferredLocation,
              nativeLocation:
                response.data.data.candidateDetail?.nativeLocation,
              experience: response.data.data.candidateDetail?.experience,
              relevantExperience:
                response.data.data.candidateDetail?.relevantExperience,
              currentCtc: response.data.data.candidateDetail?.currentCtc,
              expectedCtc: response.data.data.candidateDetail?.expectedCtc,
              dob: response.data.data.candidateDetail?.dob,
              noticePeriod: response.data.data.candidateDetail?.noticePeriod,
              reasonForJobChange:
                response.data.data.candidateDetail?.reasonForJobChange,
              reason: response.data.data.candidateDetail?.reason,
              candidateProcessed:
                response.data.data.candidateDetail?.candidateProcessed,
              differentlyAbled:
                response.data.data.candidateDetail?.differentlyAbled,
              educationalQualification:
                response.data.data.candidateDetail?.educationalQualification,
              gender: response.data.data.candidateDetail?.gender,
              alternateMobile:
                response.data.data.candidateDetail?.alternateMobile,
              resume: response.data.data.candidateDetail?.resume,
              document: response.data.data.candidateDetail?.document,
              photo: response.data.data.candidateDetail?.photo,
              candidateRecruiterDiscussionRecording:response.data.data.candidateRecruiterDiscussionRecording,
              candidateSkillExplanationRecording:response.data.data.candidateSkillExplanationRecording,
              candidateMindsetAssessmentLink:response.data.data.candidateMindsetAssessmentLink,
              candidateAndTechPannelDiscussionRecording:response.data.data.candidateAndTechPannelDiscussionRecording,
              mainId: response.data.data.mainId, 
              isCandidateCpv: response.data.data.isCandidateCpv,
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
  }
 

  function handleData(month) {
    setLoader(true);
    
    filterRef.current.reset();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/getMonthlyData`,
      data: {
        month: month,
        year: year,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      
      if (response.data.status === true) {
        setCandidatesData(response.data.data.rows);
        setCount(response.data.data.count);
        setLoader(false);
      }
    });
  }

  const [state, setState] = useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
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
  //     "Invoiced Date",
  //     "Invoice Value",
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
  //         `Invoice_${moment(new Date()).format("DD_MM_YYYY_HH_mm")}.xlsx`,
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
  //     fileDownload: "yes",
  //   });

  //   axios({
  //     method: "post",
  //     url: `${process.env.REACT_APP_SERVER}admin/invoicedCandidates`,
  //     data: data,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //   })
  //     .then(function (response) {
  //       if (response.data.status === true) {
  //         setLoader(false);
  //         saveAsExcel(response.data.data);
  //       }
  //     })

  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }


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
    responsive: mobileQuery===true? 'vertical' : 'standard',
    onFilterChange: (changedColumn, filterList) => {},
    filterType: "dropdown",
    search: false,
    rowsPerPage: 50,

    // rowsExpanded: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    renderExpandableRow: (rowData, rowMeta) => {
      const list = candidatesData[rowMeta.rowIndex];
      return (
        <React.Fragment>
          <tr>
            <td colSpan={14}>
              <ProgressBar
                title="Invoice"
                list={list} 
              />
            </td>
          </tr>
        </React.Fragment>
      );
    },
    page: page,
  };

  const list = (anchor) => (
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
        <Grid item xs={7}> <PageTitle title={decode.companyType === "COMPANY" ? "On-boarded Candidates" :"Invoiced Candidates"} />  </Grid>

        <Grid item xs={5} className={classes.drawerClose}>
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
                {item + "-" +  Number(item+1)}
              </MenuItem>
              ];
            })}
          </Select>
        </Grid>
      </Grid>

      <SwipeableDrawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
        classes={{ paper: classes.drawer }}
      >
        {list("right")}
      </SwipeableDrawer>

   
      {  graphLoader === false? 
 <>
<Grid container spacing={2} className={Math.max(...invoicedValue)===0? classes.barBlur : classes.barGraph} >
<ResponsiveContainer width="100%" minWidth={300} height={175} padding={2}>
              <ComposedChart     margin={{ top: 20, right: 30, left: 30, bottom: 10 }}   data={invoicedCandidate}    >
                    
                <YAxis style={{width:"max-content"}}
                 ticks={[0, Math.max(...invoicedValue)/2,  Math.max(...invoicedValue) ]}
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
 

 


            <Bar dataKey="value" barSize={20}    onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}   className={classes.closeBtn}  onClick={(data) => {   
              handleData(data.month === "Jan"  ? "01"  : data.month ===  "Feb" ? "02"
              : data.month === "Mar"  ? "03" : data.month === "Apr"  ? "04"
              :  data.month === "May" ?"05" : data.month ===  "Jun"  ?"06" 
              : data.month === "Jul"  ? "07"  : data.month ===  "Aug"?  "08" 
              : data.month === "Sep" ? "09" : data.month === "Oct" ? "10"
              : data.month === "Nov" ? "11"   : data.month === "Dec" ? "12":"");  
              }} >

{invoicedCandidate.map((entry, index) => {  
  return[
    <>
 
     <Cell fill={ entry.month === "Jan"  ? "#413ea0" : entry.month  ===  "Feb"  ? "#f44336"
          :  entry.month  === "Mar" ? "#e91e63" : entry.month  === "Apr"   ? "#9c27b0"
          :  entry.month  === "May" ? "#009688" : entry.month  ===  "Jun"  ? "#4caf50" 
          : entry.month  ===  "Jul"  ? "#cddc39"  : entry.month  === "Aug" ?  "#ffeb3b" 
          : entry.month  === "Sep" ? "#ff9800" : entry.month  === "Oct" ? "#ff5722"
          : entry.month  === "Nov" ? "#ff784e"   : entry.month  === "Dec" ? "#6573c3":""  } /> 

     
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
 
 <Grid item xs>  
 <Typography  variant="subtitle1"> Total invoice value of {year + "-" +  Number(year+1) + ": "+ (invoicedValue.reduce((a,v) =>  a = a + v , 0 ))}  </Typography>
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
<CircularProgress  />
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
        <Grid
          container
          spacing={2}
          className={classes.filterGap}
        >
          <TextField
            required
            name="fromDate"
           label="From"
            InputLabelProps={{ shrink: true }}
            size="small"
            className={classes.filterWidth}
            type="date"
            defaultValue={fromDate}
            onChange={(e) => {
              handleFromDateChange(e);
            }}
          />

          <TextField
            required
            name="toDate"
           label="To"
            InputLabelProps={{ shrink: true }}
            size="small"
            className={classes.filterWidth}
            type="date"
            defaultValue={toDate}
            onChange={(e) => {
              handleToDateChange(e);
            }}
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
              onClick={(e) =>{ resetForm()}}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </form>
      <Grid  container  spacing={2}>
        <Grid item xs={12}>
          <MUIDataTable
            title=""
            options={table_options}
            columns={[
              {
                name: "S.No",
              },
              {
                name: "Action",
              },
              {
                name: "Invoice Status",
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
                name: "Invoice Date",
              },
              {
                name: "Invoice Value",
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
                    : index + 1}{" "}
                </>,

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
                </Grid>,
                <Button
                  variant="contained"
                  size="small"
                  className={classes.green}
                >
                  {" "}
                  Invoiced{" "}
                </Button>,
                <Grid container row spacing={2} className={classes.externalIconContainer}>  
                  {item.candidateDetail?.isExternal === "YES"?
                    <Tooltip title="SUBVENDOR"  placement="bottom" aria-label="title"> 
                          <Avatar  alt="Profile"   src={external}   className={classes.externalIcon}  /> 
                    </Tooltip>   : "" }  
                  <div>
                    {item.candidateDetail?.firstName + " " +  item.candidateDetail?.lastName } <br /> {" (" +  item.uniqueId +   ")"} 
                  </div>
                </Grid>,
                item.mainId === decode.mainId ? 
                <>  { item.candidateDetail?.email + " /"} <br/>{"91 " + item.candidateDetail?.mobile.slice(2)}  </> 
                : item.hideContactDetails !== true?
                <>  { item.candidateDetail?.email + " /"} <br/>{"91 " + item.candidateDetail?.mobile.slice(2)}  </>  
                :"",

                item.requirement?.requirementName +  " (" + item.requirement?.uniqueId +  ")",
                item.recruiter?.firstName + " " + item.recruiter?.lastName,
                item.requirement?.recruiter?.firstName +  " " +  item.requirement?.recruiter?.lastName,
                
                moment(item.invoicedDate).format("DD-MM-YYYY"),
                item.invoiceValue,
                
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

      

      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

 
 