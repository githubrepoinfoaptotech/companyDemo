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

const highlightWords = (text, wordsToHighlight) => {
  const regex = new RegExp(`(${wordsToHighlight.join('|')})`, 'gi');
  return text.split(regex).map((part, index) =>
    wordsToHighlight.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
      <mark key={index}>{part}</mark>
    ) : (
      part
    )
  );
};

const TextLayerWithHighlights = ({ textItems, wordsToHighlight }) => {
  return (
    <div className="textLayer">
      {textItems.map((item, index) => (
        <span key={index} style={{ ...item.transform }}>
          {highlightWords(item.str, wordsToHighlight)}
        </span>
      ))}
    </div>
  );
};

const ReactPdfDialog = (props) => {
  const classes = useStyles();

  const [numPages, setNumPages] = useState();
  const [textItems, setTextItems] = useState([]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    loadAllText(numPages);
  }

  const loadAllText = async (numPages) => {
    const loadingTasks = [];
    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      loadingTasks.push(loadPageText(pageNumber));
    }
    const allTextItems = await Promise.all(loadingTasks);
    setTextItems(allTextItems.flat());
  };

  const isFileType = props.resume[0]?.url.split('.').pop()
  const loadPageText = async (pageNumber) => {
    const pdf = await pdfjs.getDocument(props.resume[0]?.url).promise;
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    return textContent.items;
  };

  return (
    <>
      <Dialog
        aria-labelledby="dialog-title"
        onClose={props.handleResumeClose}
        open={props.resumeOpen}
        fullWidth={true}
        maxWidth="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogContent>
          <Grid container direction="row" spacing={2}>
            <div className={classes.heading + " " + classes.inputRoot} style={{ position: "absolute", zIndex: 1, background: '#fff', top: 0, padding: "6px 30px" }}>
              <Typography variant="subtitle2" className={classes.inputRoot}>  Updated Resume </Typography>
              <div className={classes.drawerClose}>
                <CloseIcon className={classes.closeBtn} onClick={props.handleResumeClose} />
              </div>
            </div>
            <Grid item xs={12}>
              {isFileType === "pdf" ?
                <Document file={props.resume[0]?.url} onLoadSuccess={onDocumentLoadSuccess} width="100%">
                  {Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_${index + 1}`} className="page">
                      <Page
                        pageNumber={index + 1}
                        renderTextLayer={false}
                        customTextRenderer={() => (
                          <TextLayerWithHighlights textItems={textItems} wordsToHighlight={['HRMS', 'JAVA', 'Indeed']} />
                        )}
                      />
                    </div>
                  ))}
                </Document>
                :
                <div className={classes.iframediv} style={{ marginTop: "40px" }}>
                  <iframe className="iframe" src={"https://docs.google.com/gview?url=" + props.resume[0]?.url + "&embedded=true"} title="File" width="100%" height="500" sandbox="allow-scripts allow-same-origin"> </iframe>
                  <div className={classes.iframeLogo} >
                  </div>
                </div>
              }
            </Grid>

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

export default ReactPdfDialog;
