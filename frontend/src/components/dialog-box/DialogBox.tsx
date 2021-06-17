import React from "react"
import { Icon, Button } from 'semantic-ui-react'
import "./DialogBox.css"

const DialogBox = () => {
    return (
        <div className="dialog-box-container">
            <div className="dialog-title"> Client requesting to join...</div>
            <div className="dialog-footer">
                <Button>Yes</Button>
                <Button
                onClick={()=>{}}
                >No</Button>
            </div>

        </div>
    );
}

DialogBox.propTypes = {
}

export default DialogBox;
