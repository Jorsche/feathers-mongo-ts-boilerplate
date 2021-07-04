import React, {useEffect, useState} from "react";
import {Button, Dropdown, Icon} from 'semantic-ui-react'
import BoundedLayout from "../react-grid/react-grid";
import client from "../../feathers";
//import "./OcdViewer.css"
const OcdViewer = ({   viewer,
                       viewerName,
                       setViewerState,
                       viewerState,
                       setLockState,
                       lockState,
                       index,
                       setSaveClick,
                       saveClick,
                       retrievalOfItems
})=>{
    const [indViewerState,setIndViewerState]=useState(viewer);

    useEffect(()=>{
        console.log("renderOCDVIEWERUSEREFFECT");
        setIndViewerState(viewer)
    },[viewer]);

    const viewerService = client.service('viewer');
    const [widgetOptionSelection, setWidgetOptionsArray] = useState([
        {
            key: 'Widget1',
            text: 'Widget1',
            value: 'Widget1',
        },
        {
            key: 'Widget2',
            text: 'Widget2',
            value: 'Widget2',
        },
        {
            key: 'Widget3',
            text: 'Widget3',
            value: 'Widget3',
        },
        {
            key: 'Widget4',
            text: 'Widget4',
            value: 'Widget4',
        },
        {
            key: 'Widget5',
            text: 'Widget5',
            value: 'Widget5',
        },
        {
            key: 'Widget6',
            text: 'Widget6',
            value: 'Widget6',
        },
    ]);
    //todo !!!!!indViewerStaete and viewerStaet are different WHY>????
    //todo !!! append the formula of xyzh into app
    console.log("viewer",viewer);
    console.log("indViewerState",indViewerState);
    // console.log("indViewerStateOCDVIEWER",indViewerState);
    const onSave= ()=> {
        console.log("indViewerState!!!",indViewerState);
        indViewerState && viewerService.patch(viewer._id, indViewerState)
            .then(() => {retrievalOfItems()});
    }
    const onChange = (e: any, {value}: any) => {
        const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se"];
        setWidgetOptionsArray(widgetOptionSelection.filter((val)=>(
            val.value!==value
        )));
       setIndViewerState(
            {...indViewerState,
                viewerState:{
                ...indViewerState.viewerState,
                    widgetDropdownArray:[...indViewerState.viewerState.widgetDropdownArray,value],
                    viewerLayout:{
                        ...indViewerState.viewerState.viewerLayout,
                        widgetStates:{
                            ...indViewerState.viewerState.viewerLayout.widgetStates,
                            widgetLayout: [...indViewerState.viewerState.viewerLayout.widgetStates.widgetLayout,
                                {
                                    i: value,
                                    x: (indViewerState.viewerState.viewerLayout.widgetStates.widgetItems.length * 2) % (indViewerState.viewerState.viewerLayout.widgetStates.widgetItems.cols || 12),
                                    y: Infinity, // puts it at the bottom
                                    w: 2,
                                    h: 2,
                                    resizeHandles: availableHandles
                                }],
                            widgetItems: indViewerState.viewerState.viewerLayout.widgetStates.widgetItems.concat({
                                i: value,
                                x: (indViewerState.viewerState.viewerLayout.widgetStates.widgetItems.length * 2) % (indViewerState.viewerState.viewerLayout.widgetStates.widgetItems.cols || 12),
                                y: Infinity, // puts it at the bottom
                                w: 2,
                                h: 2,
                                resizeHandles: availableHandles
                            })
                        }
                    }
                }
        });


    };

    const DropdownSelection = () => (
        <Dropdown
            className="dropdownSelection"
            placeholder='Add Widget'
            selection
            options={widgetOptionSelection}
            onChange={onChange}
        />
    )
    return(
        indViewerState ? (<div className="ocd-viewer"
                               style={{ overflow:"hidden", borderStyle: "solid", borderColor:"white", backgroundColor:"rgba(55,55,55,0.3)", backdropFilter: "blur(10px) brightness(0.5)"}}>
            <div className="ocd-viewer-header">{viewerName}header{index}
                <Button
                    icon
                    onClick={() => {
                        setLockState(!lockState)
                    }}
                >
                    <Icon name={lockState ? 'unlock' : 'lock'} size='small'/>
                </Button>
            </div>
            <div className="ocd-viewer-main">
                <BoundedLayout
                    //retrievalOfItems={retrievalOfItems}
                    setIndViewerState={setIndViewerState}
                    indViewerState={indViewerState}
                    widgetOptionSelection={widgetOptionSelection}
                    setWidgetOptionsArray={setWidgetOptionsArray}
                    saveClick={saveClick}
                    setViewerState={setViewerState}
                    viewerState={viewerState}
                    index={index}
                >
                </BoundedLayout>
            </div>
            <div className="ocd-viewer-footer">
                <DropdownSelection></DropdownSelection>
                <Button
                    className="add-widget-button"
                    //disabled={JSON.stringify(itemState) === JSON.stringify(resState)}
                    onClick={
                        () => {
                            onSave()
                            setSaveClick(!saveClick)
                        }}
                >Save & Publish</Button>
            </div>
        </div>) : ""
    )
}
export default OcdViewer;
