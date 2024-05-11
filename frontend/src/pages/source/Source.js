import React, { useState, useEffect, useReducer } from "react";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import {
  Grid,
  Button,
  List,
  Box,
  TextField,
  SwipeableDrawer,
  FormControl,
  InputLabel,
  Typography,
  TablePagination,
  Switch,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import {  toast } from "react-toastify";
import ViewIcon from "@material-ui/icons/Visibility";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Notification from "../../components/Notification";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import useStyles from "../../themes/style.js";
import useMediaQuery from '@material-ui/core/useMediaQuery';
const positions = [toast.POSITION.TOP_RIGHT];

export default function Tables() {
  const classes = useStyles();

  const token = localStorage.getItem("token");

  const [count, setCount] = useState(0);

  const [loader, setLoader] = useState(false);
  const mobileQuery = useMediaQuery('(max-width:600px)'); 
  const [sourceData, setSourceData] = useState([]);
  const [sourceEdit, setSourceEdit] = useState({
    id: "",
    name: "",
    isActive: "",
  });
  const [sourceView, setSourceView] = useState({
    id: "",
    name: "",
    createdAt: "",
    isActive: "",
  });

  const [page, setPage] = useState(0);
  const [currerntPage, setCurrerntPage] = useState(1);

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const [dataList, setDataList] = useState("ADD");

  const HeaderElements = () => <>Total : {count}</>;

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
      autoClose: notificationType === "error" ? false:5000
    });

    if (notificationType === "error") setErrorToastId(toastId);
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Source Name is required")
      .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: "Source Name be Alphanumeric",
      }),
  });

  const {
    register: editSource,
    formState: { errors: editErrors, isSubmitting: editIsSubmitting },
    handleSubmit: editSubmit,
    reset: editreset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
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
    const fetchData = async () => {
      setLoader(true);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}source/viewAllSources`,
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

          setSourceData(response.data.data);
          setCount(response.data.count);
        }
      });
    };
    fetchData();
  }, [reducerValue, token]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setCurrerntPage(newPage + 1);
    setLoader(true);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}source/viewAllSources`,
      data: {
        page: newPage + 1,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setSourceData(response.data.data);
        setCount(response.data.count);
        setLoader(false);
      }

      setLoader(false);
    });
  };

  function handleAdd(values) {
    return new Promise((resolve) => {
      setLoader(true);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}source/addSource`,
        data: {
          id: values.id,
          name: values.name,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          resolve();
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

  function handleEdit(values) {
    return new Promise((resolve) => {
      setLoader(true);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}source/editSource`,
        data: {
          id: sourceEdit.id,
          name: values.name,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {
            resolve();
            handleNotificationCall("success", response.data.message);

            forceUpdate();

            setState({ ...state, right: false });
          } else {
            handleNotificationCall("success", response.data.message);
          }

          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
        });
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
      url: `${process.env.REACT_APP_SERVER}source/viewSource`,
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
          setSourceEdit({
            ...sourceEdit,
            id: response.data.data.id,
            name: response.data.data.name,
          });

          setSourceView({
            ...sourceView,
            id: response.data.data.id,
            name: response.data.data.name,
            isActive: response.data.data.status,
            createdAt: response.data.data.createdAt,
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
  }

  const [state, setState] = useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  function handleStatus(id, value) {
    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}source/changeSourceState`,
      data: {
        id: id,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setLoader(false);
        const switchState = sourceData.map(item => {

          if (item.id === id) { 
            return { ...item, status: value};
            
          }
          return item;
        }); 

 
        setSourceData(switchState);
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
                  <Typography variant="subtitle1"> Edit Source</Typography>

                  <Grid className={classes.drawerClose}>
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
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                      <InputLabel shrink htmlFor="name">
                        
                        Source Name
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          placeholder="Enter Source Name"
                          id="name"
                          defaultValue={sourceEdit.name}
                          {...editSource("name")}
                          error={editErrors.name ? true : false }
                         
                        />

                        <Typography variant="inherit" color="error">
                          {editErrors.name?.message}
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
                    className={classes.sourceDrawerFooter}
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
                  <Typography variant="subtitle1"> Add New Source</Typography>

                  <Grid className={classes.drawerClose}>
                    <CloseIcon
                      className={classes.closeBtn}
                      size="14px"
                      onClick={toggleDrawer(anchor, false)}
                    />
                  </Grid>
                </Grid>
              </CardHeader>
              <form onSubmit={handleSubmit(handleAdd)}>
                <CardContent>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                      
                      <InputLabel shrink htmlFor="name">
                        Source Name
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          placeholder="Enter Source Name"
                          id="name"
                          name="name"
                          {...register("name")}
                          error={errors.name ? true : false }
                        />

                        <Typography variant="inherit" color="error">
                          {errors.name?.message}
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
                    className={classes.sourceDrawerFooter}
                  >
                  
                    <Button
                      variant="contained"
                      color="primary" 
                      size="small"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Save
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
                  className={classes.drawerHeader}
                >
                  <Typography variant="subtitle1"> View Source - {sourceView?.name} </Typography>

                  <Grid className={classes.drawerClose}>
                    <CloseIcon
                      className={classes.closeBtn}
                      size="14px"
                      onClick={toggleDrawer(anchor, false)}
                    />
                  </Grid>
                </Grid>
              </CardHeader>

              <CardContent>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    <Typography className={classes.boldtext}>
                      
                      Source Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    {sourceView?.name}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    
                    <Typography className={classes.boldtext}>
                      
                      Status:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {sourceView.isActive === true ? (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          className={classes.green+" "+ classes.noPointer}
                        >
                          ACTIVE
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          className={classes.red+" "+ classes.noPointer}
                        >
                          INACTIVE
                        </Button>
                      </>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography className={classes.boldtext}>
                      Posted Date:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {moment(sourceView.createdAt).format("DD-MM-YYYY")}
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  className={classes.sourceDrawerFooter}
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

  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.heading}>
        <Grid item xs={9} sm={7} md={8} lg={6}>
          
          <PageTitle title="Source of Profile" />
        </Grid>
        <Grid item xs={3} sm={5} md={4} lg={6} className={classes.drawerClose}>
          <div className={classes.lgButton}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              startIcon={<AddCircleIcon />}
              className={classes.addUser}
              onClick={(e) => {
                setDataList("ADD");
                reset();
                setState({ ...state, right: true });
              }}
            >
              
              Add New Source
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
            classes={{ paper: classes.sourceDrawer }}
          >
            {list("right")}
          </SwipeableDrawer>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MUIDataTable
            title=""
            options={{
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
              download: false,
              print: false,
              customToolbar: () => <HeaderElements />,
              responsive: mobileQuery===true? 'vertical' : 'standard',
            }}
            columns={[
              {
                name: "S.No",
              },

              {
                name: "Source Name",
              },

              {
                name: "Status",
              },
              {
                name: "Actions",
              },
              {
                name: "Posted Date",
              },
            ]}
            data={sourceData.map((item, index) => {
              return [
                <>
                  {currerntPage !== 0
                    ? 10 * currerntPage - 10 + index + 1
                    : index + 1}
                </>,
                item.name,

                <Switch
                  checked={item.status}
                  onChange={(e) => {
                    handleStatus(item.id, e.target.checked);
                  }}
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />,
                <>
                  <Grid container className={classes.space}>
                    <Grid item xs className={classes.toolAlign}>
                      <Tooltip
                        title="Edit Source"
                        placement="bottom"
                        aria-label="edit"
                      >
                        <EditIcon
                          className={classes.toolIcon}
                          onClick={(e) => {
                            handleShow(item.id, "EDIT");
                          }}
                        />
                      </Tooltip>

                      <Tooltip
                        title="View Source"
                        placement="bottom"
                        aria-label="view"
                      >
                        <ViewIcon
                          className={classes.toolIcon}
                          onClick={(e) => {
                            handleShow(item.id, "VIEW");
                          }}
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </>,
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

      

      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}


