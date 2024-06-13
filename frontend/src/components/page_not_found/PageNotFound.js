import React from 'react'
import {
    Grid,
    Typography,
} from "@material-ui/core";
import pageNotFoundImg from "../../images/page_not_found.png"
import { useHistory } from 'react-router-dom';
const PageNotFound = () => {
    const history = useHistory()
    const handleRedirect = () => {
        history.push("/v1#/login")
    };
    return (<>
        <Grid container justifyContent='center' alignItems='center' style={{ position: "absolute", top: 0, bottom: 0, height: '100vh' }} spacing={2}>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '30px' }}>
                <img src={pageNotFoundImg} className='page_not_found_image' width="100%" alt='404_notFoud' />
                <div>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: "20px" }}>
                        <Typography variant="h2" style={{ textAlign: 'center' }} > Look like this page doesn't exist! </Typography>
                        <Typography variant="h6" style={{ color: '#8c8b8b' }} >Go back to home and continue exploring </Typography>
                        <button className="go_back_btn" role="button" onClick={handleRedirect}>Back to Home</button>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    </>
    )
}

export default PageNotFound