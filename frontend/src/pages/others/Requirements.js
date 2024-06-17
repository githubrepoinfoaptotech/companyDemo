import React, { useEffect, useRef, useState, useReducer } from "react";
import {
  Backdrop, Box, Button, CircularProgress, Grid, List, SwipeableDrawer, TablePagination, TextField,
  Typography,
  Dialog,
  DialogContent,
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
import PageTitle from "../../components/PageTitle";
import GetAppIcon from "@material-ui/icons/GetApp";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";

// data
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Autocomplete } from "@material-ui/lab";
import useStyles from "../../themes/style.js";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { jwtDecode } from "jwt-decode";
import CustomPdfView from "../../components/pdfViewer/CustomPdfView.js";
import { getFileExtension } from "../../utils/getextension.js";

export default function Tables() {

  const classes = useStyles();
  const mobileQuery = useMediaQuery('(max-width:600px)');
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token)
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
  const [requirementsData, setRequirementsData] = useState([]);
  const [requirementsView, setRequirementsView] = useState({
    id: "",
    requirementName: "",
    clientId: "",
    skills: "",
    orgRecruiterId: "",
    orgRecruiterName: "",
    jobLocation: "",
    experience: "",
    uniqueId: "",
    clientUniqueId: "",
    clientName: "",
    gist: "",
    jd: "",
    status: "",
    createdAt: "",
  });

  const resumeUrl = requirementsView?.jd;
  const fileExtension = resumeUrl ? getFileExtension(resumeUrl) : null;

  const [page, setPage] = useState(0);
  const [currerntPage, setCurrerntPage] = useState(1);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}recruiter/myAssignedRequirements`,
        data: {
          page: 1,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {

        if (response.data.status === true) {
          setLoader(false);

          setRequirementsData(response.data.data);
          setCount(response.data.count);
        }
      });
    };
    fetchData();
  }, [reducerValue, token]);


  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [requirementId, setRequirementId] = useState(null);

  const filterRef = useRef(null);

  const handleFromDateChange = (event) => {
    setFromDate(filterRef.current.fromDate.value);
  };

  const handleToDateChange = (event) => {
    setToDate(filterRef.current.toDate.value);
  };

  const resetForm = (e) => {
    filterRef.current.reset();
    setRequirementId(null);
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
      requirementId: requirementId?.requirement?.id,
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/myAssignedRequirements`,
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
    var data = JSON.stringify({
      page: newPage + 1,
      fromDate: `${form["fromDate"].value}`,
      toDate: `${form["toDate"].value}`,
      requirementId: requirementId?.requirement?.id,
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/myAssignedRequirements`,
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


  function handleShow(values) {
    setLoader(true);


    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/getRequirement`,
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

          setRequirementsView({
            ...requirementsView,
            id: response.data.data.id,
            requirementName: response.data.data.requirementName,
            clientId: response.data.data.clientId,
            skills: response.data.data.skills,
            jobLocation: response.data.data.jobLocation,
            experience: response.data.data.experience,
            uniqueId: response.data.data.uniqueId,
            clientUniqueId: response.data.data.client.uniqueId,
            clientName: response.data.data.client.clientName,
            status: response.data.data.statusList,
            gist: response.data.data.gist,
            jd: response.data.data.requirementJd,
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

  const HeaderElements = () => (
    <>
      <Grid className={classes.HeaderElements}>
        Total : {count}
      </Grid>
    </>
  );
  const list = (anchor) =>
  (
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

                  JD :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>

                <div className={classes.space + " " + classes.alignItemsEnd}  >


                  {requirementsView?.jd !== "https://liverefo.s3.amazonaws.com/" ? <>
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
                      <a className={classes.messageContent} href={requirementsView?.jd} download>

                        <GetAppIcon className={classes.toolIcon} />
                      </a>
                    </Tooltip>
                  </> : ""}
                </div>

              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography className={classes.boldtext}>
                  Requirement Gist:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>

                <div dangerouslySetInnerHTML={{ __html: requirementsView.gist }}></div>
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

                {moment(requirementsView.createdAt).format(
                  "DD-MM-YYYY",
                )}
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

  );






  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.heading}>
        <Grid item xs={9} sm={7} md={8} lg={6}>
          <PageTitle title="Requirements" />
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
            options={requirementsData}
            getOptionLabel={(option) =>
              option.requirement?.requirementName + " (" + option.requirement?.uniqueId + ")"
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
              responsive: mobileQuery === true ? 'vertical' : 'standard',
              textLabels: {
                body: {
                  noMatch: 'Oops! Matching record could not be found',
                }
              },
            }}
            columns={[
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
                name: "Project Name",
              },

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
            ]}
            data={requirementsData && requirementsData.map((item, index) => {
              return [
                <>
                  {currerntPage !== 0 ? 10 * currerntPage - 10 + index + 1 : index + 1}
                </>,
                <>
                  <Grid container className={classes.space}>
                    <Grid item xs className={classes.toolAlign}>
                      <Tooltip
                        title="View Requirement"
                        placement="bottom"
                        aria-label="view"
                      >
                        <ViewIcon
                          className={classes.toolIcon}
                          onClick={(e) => {
                            handleShow(item.requirement.id);
                          }}
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </>,
                <>{item.requirement?.requirementName + " (" + item.requirement?.uniqueId + ")"}</>,
                <>{item.requirement?.client?.clientName + " (" + item.requirement?.client?.uniqueId + ")"} </>,
                item.requirement?.experience,

                item.requirement?.jobLocation,

                <Button variant="contained" size="small" className={item.requirement?.statusCode === 201 ? classes.green + " " + classes.noPointer : classes.red + " " + classes.noPointer}>  {item.requirement?.statusCode === 201 ? "Active" : "Inactive"} </Button>
                ,
                moment(item.createdAt).format("DD-MM-YYYY"),
              ];
            })}
          />

          <Grid container spacing={2} className={classes.pagination}>
            <TablePagination
              rowsPerPageOptions={[50]}
              component="div"
              count={count}
              rowsPerPage={50}
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
                <CloseIcon className={classes.closeBtn} onClick={handleModalClose} />
              </div>
            </div>
            <Grid item xs={12}>
              {fileExtension === "pdf" ?
                <CustomPdfView resumeUrl={requirementsView?.jd} />
                :
                <div className={classes.iframediv} style={{ marginTop: "40px" }}>
                  <iframe
                    src={
                      "https://docs.google.com/a/umd.edu/viewer?url=" +
                      requirementsView?.jd +
                      "&embedded=true"
                    }
                    title="File"
                    width="100%" height="500" sandbox="allow-scripts allow-same-origin"
                  >
                  </iframe>
                  <div className={classes.iframeLogo} >
                  </div>
                </div>
              }
            </Grid>

            <div className={classes.sendWhatsapp + " " + classes.inputRoot}>
              <Button variant="contained" size="small" color="secondary" onClick={handleModalClose}>
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

