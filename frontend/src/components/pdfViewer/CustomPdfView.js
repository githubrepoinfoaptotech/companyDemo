import React, { useState } from "react";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "../../css/view-resume.css"
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

const CustomPdfView = ({resumeUrl}) => {
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

    const loadPageText = async (pageNumber) => {
        const pdf = await pdfjs.getDocument(resumeUrl).promise;
        const page = await pdf.getPage(pageNumber);
        const textContent = await page.getTextContent();
        return textContent.items;
    };
    return (
        <>
            <Document file={resumeUrl} onLoadSuccess={onDocumentLoadSuccess} width="100%">
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
        </>
    )
}

export default CustomPdfView