import React from 'react';
import { Button, Typography, Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import useStyles from '../../themes/style.js';
import CloseIcon from "@material-ui/icons/Close";

 const Drop = (props) => {
 

    const classes = useStyles();

  return (
    <>
  
      <Dialog onClose={props.handleDropClose} aria-labelledby="dialog-title" open={props.dropOpen} width='md'
          PaperProps={{
            style: {
              width: '100%',
            },
          }}>
          <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography variant="subtitle2" className={classes.digColor+" "+classes.digCenter }> Confirmation </Typography>
            <div className={classes.drawerClose} >
                <CloseIcon
                  className={classes.digClose}
                  size="14px"
                  onClick={props.handleDropClose}        
                  />
            </div>
          </div>
          </DialogTitle>
          <DialogContent className={classes.chatListBackGround}>

          <Typography variant="subtitle2"> Are you sure you want to drop this candidate? </Typography>
         
            <div className={classes.sendWhatsapp}>
              

              
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e) => {

                      props.dropConfirmation(props.candidateList.id)

                    }}>  Yes   </Button>

<Button variant="contained" size="small" color="secondary" onClick={props.handleDropClose} >No</Button>

                 
               
            </div>
          </DialogContent>

        </Dialog>

     
    </>
  );
}

export default Drop;

