import { React, useEffect, useState } from "react";
import {
    Grid,
    Button,
    Typography,
    Dialog,
    DialogContent,

} from "@material-ui/core";
import useStyles from "../../themes/style.js";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import copy from 'copy-to-clipboard';

const CPVFormView = (props) => {

    const classes = useStyles();
    const [cpvForm, setCpvForm] = useState([]);
    const [candidateView, setCandidateView] = useState({
    })
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    useEffect(() => {
        if (props.cpvOpen) {
            fetchCPVData();
            getCandidateDate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.cpvOpen]);


    function handleCopy(candidateLink) {
        try {
            copy(candidateLink)
            props.handleNotificationCall("success", "Copied")
        } catch (error) {
            console.log(error)
            props.handleNotificationCall("error", "error")
        }
    }

    function fetchCPVData() {
        props.setLoader(true)
        axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER}recruiter/viewCpv`,
            data: {
                candidateId: props.cpvData.id,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        })
            .then(function (response) {
                if (response.data.status === true) {
                    setCpvForm(response.data.data);
                } else {
                    props.handleNotificationCall("error", response.data.message)
                }
                props.setLoader(false)
            })
            .catch(function (error) {
                props.setLoader(false)
                console.log(error);
            });
    }

    function getCandidateDate() {
        props.setLoader(true)
        let url = ""
        if (decode.role === "ADMIN") {
            url = `${process.env.REACT_APP_SERVER}admin/viewCandidate`
        } else {
            url = `${process.env.REACT_APP_SERVER}recruiter/candidate`
        }
        axios({
            method: "post",
            url: url,
            data: {
                id: props.cpvData?.id,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        })
            .then(function (response) {
                if (response.data.status === true) {
                    setCandidateView(response.data.data);
                } else {
                    props.handleNotificationCall("error", response.data.message)
                }
                props.setLoader(false)
            }).catch(function (error) {
                props.setLoader(false);
                console.log(error);
            });
    }

    return (
        <>
            <Dialog
                aria-labelledby="dialog-title"
                onClose={props.handleCPVClose}
                open={props.cpvOpen}
                width="lg"
                maxWidth="md"
                PaperProps={{
                    style: {
                        width: "100%",
                    },
                }}
            >
                <DialogContent className={classes.center} style={{}}>
                    {cpvForm !== null ?
                        <Grid container direction="row" spacing={2}>
                            <div style={{ padding: "15px 25px" }}>
                                <div className={classes.center}>
                                    <Typography
                                        variant="subtitle2"
                                        className={
                                            classes.inputRoot + " " + classes.probingTitle
                                        }
                                    >
                                        Candidate Probing & Validation Form
                                    </Typography>

                                    {cpvForm?.candidateConformation === true ?
                                        <Button
                                            variant="contained"
                                            size="small"
                                            style={{ position: 'absolute', right: 10, top: 10, zIndex: 1, background: '#06D001', color: '#fff' }}
                                        >
                                            {`${candidateView.candidateDetail?.firstName} ${candidateView.candidateDetail?.lastName} has Confirmed`}
                                        </Button>
                                        :
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            style={{ position: 'absolute', right: 10, top: 10, zIndex: 1 }}
                                            onClick={() => {
                                                handleCopy(`${process.env.REACT_APP_SITE}v1/#/candidateConfirmationCPV?candidateId=${candidateView?.id}`)
                                            }}
                                        >
                                            {`Copy link to get ${candidateView.candidateDetail?.firstName} ${candidateView.candidateDetail?.lastName} Confirmation`}
                                        </Button>
                                    }

                                </div>
                                <Grid
                                    container
                                    direction="row"
                                    spacing={2}
                                    style={{ height: "70vh", position: 'relative' }}
                                >
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="subtitle1"
                                            style={{ fontSize: "1.2rem", textAlign: "center" }}
                                        >
                                            {`${candidateView.candidateDetail?.firstName} ${candidateView.candidateDetail?.lastName} Responses`}
                                        </Typography>

                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>Intersted for Job Opening</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        {cpvForm?.companyName}
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.companyName !== null ? "Yes" : ""}
                                        </span>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>
                                            Confirmation on seeing Company Website
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        {cpvForm?.webSiteUrl}
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.webSiteUrl !== null ? "Yes" : ""}
                                        </span>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>Interested for Job Role title</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        {cpvForm?.jobTitle}
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.jobTitle !== null ? "Yes" : ""}
                                        </span>
                                    </Grid>

                                    {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>
                                            Interested for Job Role Responsibilities
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        {cpvForm?.jobResponsibilities}
                                    </Grid> 

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.jobResponsibilities !== null ? "Yes" : ""}
                                        </span>
                                    </Grid>*/}

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>
                                            Confirmation that you are residing in Location
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        {cpvForm?.currentLocation}
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.currentLocation !== null ? "Yes" : ""}
                                        </span>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>
                                            Interested for Job Role location and willing to
                                            relocate if not in same location
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        {cpvForm?.jobLocation}
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.jobLocation !== null ? "Yes" : ""}
                                        </span>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>
                                            Confirmation on your employment with current Company
                                            or inbetween jobs if not working now
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        {cpvForm?.currentCompanyName}
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.currentCompanyName !== null ? "Yes" : ""}
                                        </span>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>
                                            Confirmation that you are in Project and not in Bench
                                            in current Role
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        {cpvForm?.inProjectOrBench}
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.inProjectOrBench !== null ? "Yes" : ""}
                                        </span>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>
                                            Confirmation to work on Shifts as per the Job Role
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        {cpvForm?.shiftTimings}
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.shiftTimings !== null ? "Yes" : ""}
                                        </span>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>
                                            Confirmation to Join within days and last working day
                                            if in notice period
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        {cpvForm?.noticePeriod}
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.noticePeriod !== null ? "Yes" : ""}
                                        </span>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>
                                            Confirmation on Direct Payroll or on Contract with 3rd
                                            Party Vendor
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        {cpvForm?.payrollOrContract}
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.payrollOrContract !== null ? "Yes" : ""}
                                        </span>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>
                                            Confirmation on your Current CTC and Take Home Salary
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Typography>
                                                Current CTC : {cpvForm?.currentCtcAndTakeHome?.split(", ")[0]}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Typography>
                                                Current Take Home: {cpvForm?.currentCtcAndTakeHome?.split(", ")[1]}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.currentCtcAndTakeHome !== null ? "Yes" : ""}
                                        </span>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>
                                            Confirmation on your Expected CTC and Take Home Salary
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Typography>
                                                Expected CTC :  {cpvForm?.expectedCtcAndTakeHome?.split(", ")[0]}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Typography>
                                                Expected Take Home: {cpvForm?.expectedCtcAndTakeHome?.split(", ")[1]}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.expectedCtcAndTakeHome !== null
                                                ? "Yes"
                                                : ""}
                                        </span>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>
                                            Confirmation on Work from Home, Work from Office,
                                            Hybrid
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        {cpvForm?.modeOfWork}
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.modeOfWork !== null ? "Yes" : ""}
                                        </span>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>
                                            Confirmation on your Existing Offer details
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        {cpvForm?.existingOfferDetails}
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.existingOfferDetails !== null ? "Yes" : ""}
                                        </span>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>
                                            Confirmation on reason for Job Change
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        {cpvForm?.jobChangeReason}
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.jobChangeReason !== null ? "Yes" : ""}
                                        </span>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Typography>
                                            Confirm that on selection for Offer that you have all
                                            relevant documents in-order to submit for Offer
                                            release and onboarding
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        {cpvForm?.documentsAvailabilty}
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <span className={classes.greenColor}>
                                            {cpvForm?.documentsAvailabilty !== null ? "Yes" : ""}
                                        </span>
                                    </Grid>
                                    <div style={{
                                        position: "sticky",
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        margin: "15px auto",
                                    }}>
                                        <Button variant="contained" size="small" color="secondary" onClick={props.handleCPVClose}>
                                            Close
                                        </Button>
                                    </div>
                                </Grid>
                            </div>
                        </Grid>
                        :
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12}>
                                <Typography style={{ textAlign: 'center' }} variant="subtitle1"> Candidate Yet to fill the CPV form</Typography>
                            </Grid>
                            <div className={classes.sendWhatsapp + " " + classes.inputRoot} style={{ paddingBottom: "15px" }}>
                                <Button variant="contained" size="small" color="secondary" onClick={props.handleCPVClose}>
                                    Close
                                </Button>
                            </div>
                        </Grid>
                    }

                </DialogContent>
            </Dialog>
        </>
    );
};

export default CPVFormView;
