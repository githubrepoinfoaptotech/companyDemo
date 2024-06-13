import { React } from "react";
import {
  Grid,
  Button,
  Typography,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import useStyles from "../../themes/style.js";
import CloseIcon from "@material-ui/icons/Close";

const ResumeDialog = (props) => {

  const classes = useStyles();
  return (
    <>

      <Dialog
        aria-labelledby="dialog-title"
        onClose={props.handleResumeClose}
        open={props.resumeOpen}
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
              <Typography variant="subtitle2" className={classes.inputRoot}>  Updated Resume </Typography>
              <div className={classes.drawerClose}>
                <CloseIcon className={classes.closeBtn} onClick={props.handleResumeClose} />
              </div>
            </div>

            <div className={classes.iframediv}>
              <iframe className="iframe" src={"https://docs.google.com/a/umd.edu/viewer?url=" + props.resume[0]?.url + "&embedded=true"} title="File" width="100%" height="500" > </iframe>
              <div className={classes.iframeLogo} >
              </div>
            </div>

            <div className={classes.sendWhatsapp + " " + classes.inputRoot}>
              <Button variant="contained" size="small" color="secondary" onClick={props.handleResumeClose}>
                Close
              </Button>
            </div>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResumeDialog;
