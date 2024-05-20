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
import { useLocation } from 'react-router-dom'
const positions = [toast.POSITION.TOP_RIGHT];

export default function ApproveMail() {
  const classes = useStyles();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const approval_token = queryParams.get("approval_id");
  const mobile = queryParams.get("mobile");

  const token = localStorage.getItem("token");
  const [loader, setLoader] = useState(false);
  const mobileQuery = useMediaQuery('(max-width:600px)'); 
  const [sourceData, setSourceData] = useState([]);

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}CC/checkApprovalValidity`,
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
        }
      });
    };
    fetchData();
  }, [reducerValue, token]);


  return (
    <Box className={classes.ApproveMailContainer}>
      <Grid container  direction="row" spacing={2} className={classes.heading}>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{display:'flex',}}>

          <PageTitle title="Approval Mail" />
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
              fixedHeader: false,
              responsive: mobileQuery===true? 'vertical' : 'standard',
            }}
            columns={[
              {
                name: "S.No",
              },

              {
                name: "Project Name",
              },

              {
                name: "Project Division",
              },
              {
                name: "Hiring Manager",
              },
              {
                name: "Hr Business Unit Code",
              },
              {
                name: "Project Region",
              },
              {
                name: "Project Location",
              },
              {
                name: "Reason for Hiring",
              },
            ]}
            data={sourceData.map((item, index) => {
              return [
                (index + 1),
                item.name,
                item.name,
                item.name,
                item.name,
                item.name,
                item.name,
                moment(item.createdAt).format("DD-MM-YYYY"),
              ];
            })}
          />

        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}


