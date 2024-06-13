import { React } from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import useStyles from "../../themes/style.js";
import CloseIcon from "@material-ui/icons/Close";
import TabView from "./TabView.js";
import {jwtDecode} from "jwt-decode";

const MatchJDDialog = (props) => {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const handleChange = (event, value) => {
    if (value) {
      props.cvMatchingPercentage(props.candidMatchId, value.id);
    }
  };

  console.log(props.resumePercentage);
  return (
    <>
      <Dialog
        aria-labelledby="dialog-title"
        onClose={props.handleJDClose}
        open={props.jDOpen}
        width="lg"
        maxWidth="lg"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogContent className={classes.center}>
          <Grid container direction="row" spacing={2}>
            <div className={classes.heading + " " + classes.inputRoot}>
              <Typography variant="subtitle2" className={classes.inputRoot}>
                Match JD
              </Typography>
              <div className={classes.drawerClose}>
                <CloseIcon
                  className={classes.closeBtn}
                  onClick={props.handleJDClose}
                />
              </div>
            </div>
            <Grid item xs={12} className={classes.resumeUploadParent}>
              {decode.role === "ADMIN" ||
                decode.role === "CLIENTCOORDINATOR" ? (
                  <Autocomplete
                    options={props.requirementName}
                    style={{ width: "320px" }}
                    getOptionLabel={(option) =>
                      option.requirementName + " (" + option.uniqueId + ")"
                    }
                    // size="small"
                    // value={requirementId}
                    onChange={handleChange}
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
                ):
                <></>}
            </Grid>
            <Grid item xs={12}>
              <TabView
                jdData={props?.resumePercentage}
                removePercentage={props.removePercentage}
              />
            </Grid>

            <div className={classes.sendWhatsapp + " " + classes.inputRoot} style={{margin:'10px'}}>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={props.handleJDClose}
              >
                Close
              </Button>
            </div>
          </Grid>

          <Backdrop className={classes.backdrop} open={props.matchLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MatchJDDialog;
