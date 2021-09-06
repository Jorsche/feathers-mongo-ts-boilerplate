import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './pdfWidget.css'
import { Icon } from "semantic-ui-react";

const PdfWidget = () => {
    const [file, setFile] = useState('');
    const [documentLoadSuccess, setDocumentLoadSuccess] = useState(false);
    const options = {
        cMapUrl: 'cmaps/',
        cMapPacked: true,
      };
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    function onDocumentLoadSuccess({ numPages }) {
        setDocumentLoadSuccess(true)
        setNumPages(numPages);
        setPageNumber(1);
    }
    function changePage(offset) {
      setPageNumber(prevPageNumber => prevPageNumber + offset);
    }
    function previousPage() {
      changePage(-1);
    }
    function nextPage() {
      changePage(1);
    }
    function onFileChange(event) {
        setFile(event.target.files[0]);
      }
      // function onDocumentLoadSuccess({ numPages: nextNumPages }) {
      //   setNumPages(nextNumPages);
      // }

    return ( <div className="pdf-widget"
        style={{
            minHeight: "100%",
            minWidth: "100%",
            display: "flex",
        }}
         >
          <div className="pdf-widget__container"
               // style={{
               //     minHeight: "100%",
               //     minWidth: "100%",
               //     display: "flex"}}
          >
            <div className="pdf-widget__container__load">
              <label htmlFor="file">Load from file:</label>
              {' '}
              <input
                onChange={onFileChange}
                type="file"
              />
            </div>
            <div className="pdf-widget__container__document">
            <>
          <Document
              className={"document"}
            file={file}
            options={{ workerSrc: "/pdf.worker.js" }}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
                {documentLoadSuccess &&
                < div className="page-controls">
                    <p>
                    Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                    </p>
                    <button
                    className="prev-button"
                    type="button" disabled={pageNumber <= 1} onClick={previousPage}>
                    <Icon
                    name="angle left"
                    ></Icon>
                    </button>
                    <button
                    className="next-button"
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                    >
                    <Icon
                    name="angle right"
                    ></Icon>
                    </button>
                    </div>}
        </>
            </div>
          </div>
        </div>
      );
}
export default PdfWidget;


