import "./OcdController.css"
import {Button} from "semantic-ui-react";
import OcdViewer from "../ocd-viewer/OcdViewer";
import React, {useEffect, useState} from "react";
import  { WidthProvider,Responsive } from "react-grid-layout";
import "../react-grid/example-styles.css";
import "../react-grid/styles.css";
import _ from "lodash";
import client from "../../feathers";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const OcdController = () => {
    const ocdViewerArr = [
        {
            viewerName: "Viewer1",
            viewerLayout: {
                w: 2, h: 2, x: 0, y: 0, i: "Viewer1", moved: false, static: false,
                resizeHandles: ["s", "w", "e", "n", "sw", "nw", "se"],
                widgetStates:{
                    widgetLayout:[],
                    widgetItems:[]
                }
            },
            widgetDropdownArray: []
        },
        {
            viewerName: "Viewer2",
            viewerLayout: {
                w: 2, h: 2, x: 2, y: 0, i: "Viewer2", moved: false, static: false,
                resizeHandles: ["s", "w", "e", "n", "sw", "nw", "se"],
                widgetStates:{
                    widgetLayout:[],
                    widgetItems:[]
                }
            },
            widgetDropdownArray: []
        }];
    const [viewerState, setViewerState] = useState(ocdViewerArr);
    const viewerService = client.service('viewer');
    console.log("viewerState", viewerState);
    const [resState, setResState] = useState({});
    useEffect(()=>{
        console.log("render");
        retrievalOfItems();
    },[viewerState])
    const retrievalOfItems =async ()=>{
        try {
            const response =await viewerService.find();
            //response is array of object_id  --> correct--> each viewer shld have its own object
            console.log("res",response);
            if(response.data.length>0) {
                const fetchData = response.data;
                console.log("fetchData,",fetchData);
               // setResState(fetchData);
                setViewerState(fetchData);
                //todo
                // const results = widgetOptionSelection.filter(({ value: id1 }) => !fetchData.map((val)=>(
                //     val.layout.some(({ i: id2 }) => id2 === id1))));
                // setWidgetOptionsArray(results);
            }
        }
        catch(e){
            console.log("error",e);
        }

    }

    const saveOrEdit = async (viewerState,resState)=>{
        try {
            console.log("!_.isEmpty(resState)",!_.isEmpty(resState));
            if(_.isEmpty(resState)){
                viewerService.create(viewerState).then(()=>{
                    retrievalOfItems();
                })
            }
            else{
                viewerService.patch(viewerState._id,viewerState).then(()=>{
                    retrievalOfItems();
                })
            }
        } catch (error) {
            console.log("err", error);
        }
    }


    const createElement = (el, index) => {
        return (
            <div key={el.viewerLayout.i} data-grid={el.viewerLayout}>
                    <span className="text">
                        <OcdViewer
                            viewer={el}
                            viewerName={el.viewerLayout.i}
                            setViewerState={setViewerState}
                            viewerState={viewerState}
                            index={index}
                        >
                        </OcdViewer>
                    </span>
            </div>
        );
    }
    const onBreakpointChange = (breakpoint, cols) => {
        setViewerState({
            ...viewerState,
            breakpoint: breakpoint,
            cols: cols
        });
    }
    const onGridLayoutChange = (layout: any) => {
        setViewerState({...viewerState, layout: layout});
    }

    return (
        <div className="controller-container">
        <div className="controller-body">
            <div>
                <ResponsiveReactGridLayout
                    isBounded={true}
                    onBreakpointChange={onBreakpointChange}
                    onLayoutChange={onGridLayoutChange}
                >
                    {
                        ocdViewerArr.map((e, index) =>
                            createElement(e, index))
                    }
                </ResponsiveReactGridLayout>
            </div>

        </div>
        <div className="controller-footer">
            <Button
            onClick={()=>{saveOrEdit(viewerState,resState)}}
            >Zoom in</Button>
            <Button>Zoom out</Button>
        </div>
    </div>);
}

export default OcdController;
