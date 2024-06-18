import React, { useState } from "react";
import {
    Grid,
    Button,
    Typography,
    Dialog,
    DialogContent,
} from "@material-ui/core";
import useStyles from "../../themes/style.js";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "../../css/view-resume.css"
import CloseIcon from "@material-ui/icons/Close";
import { Document, Page, pdfjs } from "react-pdf";
import CustomPdfView from "../pdfViewer/CustomPdfView.js";
import { getFileExtension } from "../../utils/getextension.js";


const ViewFiles = ({ handleFileClose, fileOpen, docFile, fileType }) => {
    const classes = useStyles();
    console.log(process.env.REACT_APP_AWS_BUCKET_URL, docFile, '----')

    const fileExtension = docFile ? getFileExtension(docFile) : null;
    //   const isFileType = docFile[0]?.url.split('.').pop()

    return (
        <>
            <Dialog
                aria-labelledby="dialog-title"
                onClose={handleFileClose}
                open={fileOpen}
                fullWidth={true}
                maxWidth="md"
                PaperProps={{
                    style: {
                        width: "100%",
                    },
                }}
            >
                <DialogContent>
                    {fileType === "photo" ?
                        <Grid container direction="row" spacing={2}>
                            <div className={classes.heading + " " + classes.inputRoot} style={{ position: "absolute", zIndex: 1, background: '#fff', top: 0, padding: "6px 30px" }}>
                                <Typography variant="subtitle2" className={classes.inputRoot}>  Photograph </Typography>
                                <div className={classes.drawerClose}>
                                    <CloseIcon className={classes.closeBtn} onClick={handleFileClose} />
                                </div>
                            </div>
                            <Grid item xs={12}>
                                <div className={classes.iframediv}>
                                    {process.env.REACT_APP_AWS_BUCKET_URL === docFile ?
                                        <div style={{ color: 'red', marginTop: '50px' }}>
                                            <p>No Photo found here...</p>
                                        </div>
                                        :
                                        <img style={{ width: "100%", height: "70vh", objectFit: "contain" }} src={docFile} width="100%" alt="photo-profile-url" />
                                    }
                                </div>
                            </Grid>
                        </Grid>
                        :
                        fileType === "document" ?
                            <Grid container direction="row" spacing={2}>
                                <div className={classes.heading + " " + classes.inputRoot} style={{ position: "absolute", zIndex: 1, background: '#fff', top: 0, padding: "6px 30px" }}>
                                    <Typography variant="subtitle2" className={classes.inputRoot}>  Document </Typography>
                                    <div className={classes.drawerClose}>
                                        <CloseIcon className={classes.closeBtn} onClick={handleFileClose} />
                                    </div>
                                </div>
                                <Grid item xs={12}>
                                    {process.env.REACT_APP_AWS_BUCKET_URL === docFile ?
                                        <div style={{ color: 'red', marginTop: '50px' }}>
                                            <p>No File found here...</p>
                                        </div>
                                        :
                                        fileExtension === "pdf" ?
                                            <CustomPdfView resumeUrl={docFile} />
                                            :
                                            <div className={classes.iframediv} style={{ marginTop: "40px" }}>
                                                <iframe className="iframe" src={"https://docs.google.com/gview?url=" + docFile + "&embedded=true"} title="File" width="100%" height="500" sandbox="allow-scripts allow-same-origin"> </iframe>
                                                <div className={classes.iframeLogo} >
                                                </div>
                                            </div>
                                    }
                                </Grid>

                                <div className={classes.sendWhatsapp + " " + classes.inputRoot}>
                                    <Button variant="contained" size="small" color="secondary" onClick={handleFileClose}>
                                        Close
                                    </Button>
                                </div>
                            </Grid>
                            :
                            <>

                            </>
                    }

                </DialogContent>
            </Dialog>
        </>
    );
};

export default ViewFiles;
