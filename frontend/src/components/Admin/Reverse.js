import React from "react";
import { Button, Typography, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../../themes/style.js";

const Reverse = (props) => {
   

  const classes = useStyles();

  return (
    <>
      <Dialog
        onClose={props.handleReverseClose}
        aria-labelledby="dialog-title"
        open={props.reverseOpen}
        width="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
        <div className={classes.center}>
          <Typography variant="subtitle2" className={classes.digColor+" "+classes.digCenter}> 
            Confirmation 
          </Typography>

          <div className={classes.drawerClose} >
            <CloseIcon
            className={classes.digClose}
            size="14px"
            onClick={props.handleReverseClose}
             />
          </div>
        </div>

        </DialogTitle>

        <DialogContent className={classes.chatListBackGround}>
        <Typography variant="subtitle2"> Are you certain that you want to revert the candidate to their previous status? </Typography>
          <div className={classes.sendWhatsapp}>
           

            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                props.reverseConfirmation(props.candidateList.id);
              }}
            >
              
              Yes
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={props.handleReverseClose}
            >
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Reverse;
