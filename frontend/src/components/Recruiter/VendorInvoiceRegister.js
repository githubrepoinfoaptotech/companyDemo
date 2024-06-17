import { React, useRef } from "react";
import {
    Grid,
    Button,
    Typography,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    Divider,
} from "@material-ui/core";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import useStyles from "../../themes/style.js";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
import FinalInterview from '../../images/icon/FinalInterview.png';
import DocumentCollected from '../../images/icon/DocumentCollected.png';
import ScheduleInterview from '../../images/icon/ScheduleInterview.png';

const VendorInvoiceRegister = (props) => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    const messageRef = useRef();
    const classes = useStyles();
    const maxDate = moment().format("YYYY-MM-DD");

    return (
        <>
            <Dialog
                onClose={props.handleStatusClose}
                aria-labelledby="dialog-title"
                open={props.stausOpen}
                width="md"
                PaperProps={{
                    style: {
                        width: "100%",
                    },
                }}
            >
                <DialogTitle className={classes.digTitle}>
                    <div className={classes.center}>
                        <div className={classes.drawerClose}>
                            {props.view !== "undefined" && props.view !== "Offer Declined" ?
                                <ArrowBackIcon
                                    className={classes.digClose}
                                    onClick={(e) => {
                                        props.setView("undefined");
                                    }}
                                />

                                : ""}
                        </div>
                        <Typography variant="subtitle2" className={classes.digColor + " " + classes.digCenter}  >
                            {"Invoice details"}
                        </Typography>
                        <div className={classes.drawerClose} >
                            <CloseIcon
                                className={classes.digClose}
                                size="14px"
                                onClick={props.handleStatusClose}
                            />
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent className={classes.chatListBackGround}>
                    <>
                        <Grid container direction="row" spacing={2} className={classes.p1020p}>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction="row"
                                    spacing={1}
                                    className={classes.center}
                                >
                                    <Grid item xs={6}>
                                        <Typography> Invoice Amount </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            size="small"
                                            classes={{ root: classes.customTextField }}
                                            type="number"
                                            placeholder="Enter Invoice Amount"
                                            {...props.invoiceCandidates("invoice")}
                                            error={props.invoiceErrors.invoice ? true : false}
                                        />

                                        <Typography variant="inherit" color="error">
                                            {props.invoiceErrors.invoice?.message}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    direction="row"
                                    spacing={1}
                                    className={classes.center}
                                >
                                    <Grid item xs={6}>
                                        <Typography>Invoice Date</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            size="small"
                                            classes={{ root: classes.customTextField }}
                                            type="date"
                                            inputProps={{ max: maxDate }}
                                            defaultValue={moment().format("YYYY-MM-DD")}
                                            className={classes.textField}
                                            inputRef={props.invoiceRef}
                                            InputLabelProps={{
                                                reqired: true,
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                    <>
                        <div className={classes.sendWhatsapp}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={props.invoiceSubmit(props.InvoicedStatus)}
                            >
                                Save
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                color='secondary'
                                onClick={props.handleStatusClose}
                            >
                                Close
                            </Button>
                        </div>
                    </>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default VendorInvoiceRegister;
