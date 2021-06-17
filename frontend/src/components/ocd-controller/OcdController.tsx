import React from "react"
import "./OcdController.css"
import {Button} from "semantic-ui-react";
import OcdViewer from "../ocd-viewer/OcdViewer";
const OcdController = () => {
    const ocdViewerArr = [{viewerName:"viewer1"},{viewerName:"viewer2"}];
    return (<div className="controller-container">
       <div className="controller-body">
           {
           ocdViewerArr.map((viewer)=>(
               <OcdViewer name={viewer.viewerName}>
               </OcdViewer>))
           }
       </div>
        <div className="controller-footer">
            <Button>Zoom in</Button>
            <Button>Zoom out</Button>
        </div>
    </div>);
}

OcdController.propTypes = {
}

export default OcdController;
