import React, { useState } from "react";
import {
    Grid,
    Button,
    Typography,
    Dialog,
    DialogContent,
    Box,
} from "@material-ui/core";
import useStyles from "../../themes/style.js";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "../../css/view-resume.css"
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

const VendorCandidatesApproval = ({ vcApproval, handleVcApprovalClose, vcData, handleNotificationCall, setLoader,updateData }) => {

    const token = localStorage.getItem("token");

    function handleSendMailToVendor() {
        return new Promise((resolve) => {
            setLoader(true);

            axios({
                method: "post",
                url: `${process.env.REACT_APP_SERVER}recruiter/sendRequestToVendor`,
                data: {
                    id: vcData.id,
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }).then(function (response) {
                resolve();
                if (response.data.status === true) {
                    handleNotificationCall("success", response.data.message);
                    updateData()
                    handleVcApprovalClose()
                } else {
                    handleNotificationCall("error", response.data.message);
                }
                setLoader(false);
            });
        });
    }

    const classes = useStyles();
    return (
        <>
            <Dialog
                aria-labelledby="dialog-title"
                onClose={handleVcApprovalClose}
                open={vcApproval}
                fullWidth={true}
                maxWidth="xs"
                PaperProps={{
                    style: {
                        width: "100%",
                    },
                }}
            >
                <DialogContent>
                    <Grid container direction="row" spacing={2}>
                        <div className={classes.heading + " " + classes.inputRoot} >
                            <Typography variant="subtitle2" style={{ textAlign: 'start' }} className={classes.inputRoot}>  Message </Typography>
                            <div className={classes.drawerClose}>
                                <CloseIcon className={classes.closeBtn} onClick={handleVcApprovalClose} />
                            </div>
                        </div>
                        <Grid item xs={12}>
                            <Box>
                                <Typography variant="body1" style={{ textAlign: 'start' }} className={classes.inputRoot}> Send Mail to unhide candidate information </Typography>
                            </Box>
                        </Grid>
                        <div className={classes.inputRoot} style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'8px',padding:"8px"}}>
                            <Button variant="contained" size="small" color="primary" onClick={handleSendMailToVendor}>
                                Send
                            </Button>
                            <Button variant="contained" size="small" color="secondary" onClick={handleVcApprovalClose}>
                                Close
                            </Button>
                        </div>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default VendorCandidatesApproval