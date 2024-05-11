import { React } from "react";
 import { Button,  Typography,  DialogContent, Dialog, DialogTitle} from "@material-ui/core";
 import useStyles from '../../themes/style.js';
 import CloseIcon from "@material-ui/icons/Close";


export default function Message(props) {
 

  const classes = useStyles();



  return (
    <>


<Dialog onClose={props.handleMessageClose} aria-labelledby="dialog-title" open={props.messageOpen} width='md'>
        <DialogTitle className={classes.digTitle}>
        <div className={classes.center}>
          <Typography variant="subtitle2" className={classes.digColor+" "+classes.digCenter}>  Initiate message  </Typography>
          <div className={classes.drawerClose} >
                <CloseIcon
                
                  className={classes.digClose}
                  size="14px"
                  onClick={(e) => { props.handleMessageClose() }}        
                  />
          </div>
        </div>
        </DialogTitle>

          <DialogContent className={classes.chatListBackGround}>


          <Typography  > Hi <b>{props.candidateList.name}</b>,<br /> <br />
            Can we chat now or sometime today about job opening. we are already discussing. <b>{props.candidateList.rec_name}</b>, <b>{props.candidateList.rec_mobile_no}</b>, <b>{localStorage.getItem('companyName')}</b>. Always reply by clicking back arrow button/right swipe only
          </Typography>

          <div className={classes.sendWhatsapp}>
 

<form onSubmit={(e) => {
  e.preventDefault();
  props.sendMessage(props.candidateList.id, props.candidateList.mobile, props.candidateList.message, props.candidateList.name, props.candidateList)
}}  >


  <Button type='submit' variant="contained" color="primary">Send</Button>
 
</form>

<Button variant="contained"  color="secondary" onClick={(e) => { props.handleMessageClose() }}   > Close</Button>

 
</div>
</DialogContent>



</Dialog>

      
    </>

  )
}
