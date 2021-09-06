import "./notepadWidget.css"
import React, {useEffect, useState} from "react";
import {Button, Form, TextArea } from 'semantic-ui-react'
import client from "../../../feathers";


const NotepadWidget = ({selectedIndividualViewerState})=>{
    console.log("selectedIndividualViewerState",selectedIndividualViewerState);
    const viewerService = client.service('viewer');
    console.log("selectedIndividualViewerState.notepadText",selectedIndividualViewerState.notepadText);
    const [textAreaValue,setTextAreaValue]= useState("")
    const individualViewerStateWithNotepadText = {...selectedIndividualViewerState,notepadText:textAreaValue}
    const onSave=()=>{
        viewerService.patch(selectedIndividualViewerState._id, individualViewerStateWithNotepadText);
    }
    useEffect(() => { setTextAreaValue(selectedIndividualViewerState.notepadText)}, [selectedIndividualViewerState.notepadText] )
    console.log("textAreaValue",textAreaValue);


    return(
        <div className={"notepad-div"}>
            <h2 className={"note-h2"}>Notepad</h2>
            <Form className={"form"}>
            <TextArea
                className={"notepad"}
                placeholder='Tell us more'
                value={textAreaValue}
                onChange={(e)=>setTextAreaValue(e.target.value)}
            />
        </Form>
            <Button
                className={"save-button"}
               onClick={()=>{onSave()}}
            >
                Save
            </Button>
        </div>
    );
}

export default NotepadWidget;
