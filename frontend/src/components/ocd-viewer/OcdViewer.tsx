import React, {useEffect, useState} from "react";
import {Button, Icon} from 'semantic-ui-react'
import client from "../../feathers";
import "./OcdViewer.css"
import GridLayout from 'react-grid-layout';
import _ from "lodash";

const OcdViewer = ({   viewer,
                       dragElement,
                       newWidgetArr,
                       setIframeOpen,
                       setSelectedIndividualViewerState
                   })=>{
    console.log("newWidgetArr",newWidgetArr)
    console.log("dragElement",dragElement);
    const [individualViewerState, setIndividualViewerState] = useState({});
    const viewerService = client.service('viewer');
    useEffect(()=>{
        setIndividualViewerState(viewer);
    },[viewer]);
    console.log("viewerState in ocdViewer",viewer);
    //todo take directly from backend.
    const [widgetLayoutLock, setWidgetLayoutLock] = useState(true);
    const toggleWidgetLock = ()=>{
        setWidgetLayoutLock(!widgetLayoutLock);
        console.log("widgetLayoutLock",widgetLayoutLock);
    };

    // useEffect(()=>{
    //     viewerService.patch(individualViewerState._id, individualViewerState);
    // },[individualViewerState]);
    const onSave=()=>{
        viewerService.patch(individualViewerState._id, individualViewerState);
        //  .then(() => {retrievalOfItems()});
    }
    setSelectedIndividualViewerState(individualViewerState);
    const onDrop = (layout, layoutItem, _event) => {
        console.log("onDrop");
        const findDroppableElement = layout.find((ly)=>{return (ly.i === "__dropping-elem__")});
        if (findDroppableElement!==undefined){
            const modifyIinDropElement = {...findDroppableElement, i:dragElement.widgetName, w:500 ,h:50, widgetCmpt: dragElement.cmpt }
            const foundIndex = layout.findIndex(indexObj=> indexObj.i === "__dropping-elem__");
            const diffEle = !individualViewerState.widgetLayout.find((e) => {return e.i === dragElement});
            if(foundIndex!== -1 && diffEle) {
                layout[foundIndex] = modifyIinDropElement;
                setIndividualViewerState({...individualViewerState,
                    widgetLayout:layout
                })
                console.log("individualViewerStateRightAfterOnDrop",individualViewerState);
                if(modifyIinDropElement.i==="Iframe"){
                    setIframeOpen(true);
                }
            }
        }
    };
    const handleLayoutChange = (widgetLayoutState: any)=>{
        console.log("handleLayoutChange");
        // const modifiedWidgetLayoutState = widgetLayoutState.map(function(x){
        //     var result=newWidgetArr.filter(a1=> a1.widgetName==x.i);
        //     if(result.length>0) {
        //          x.widgetCmpt=result[0];
        //     }
        //     return x })

        console.log("widgetLayoutState",widgetLayoutState);
        //todo widgetLayoutState take away my widgetCmpt obj.
        setIndividualViewerState({
            ...individualViewerState,
            widgetLayout: widgetLayoutState
        })

        console.log("individualViewerState",individualViewerState);

        //viewerService.patch(individualViewerState._id, individualViewerState);

    }

    const onRemoveItem=(i: any)=> {
        setIndividualViewerState({
            ...individualViewerState,
            widgetLayout: _.reject(individualViewerState.widgetLayout, { i: i }),
        });
    }

    const onFlyRenderCmpt =(w)=>{
        const findCmptElement = newWidgetArr.find((newWidget)=>{return (newWidget.widgetName === w.i)});
        if(findCmptElement!==undefined){
            return(findCmptElement.cmpt);
        }
        else return w.i;
    }

    let layout =individualViewerState.widgetLayout!==undefined ? _.cloneDeep(individualViewerState.widgetLayout):[];
    //  layout.map((ly)=>{return ly.widgetCmpt ? delete ly.widgetCmpt : ly})
    console.log("layout",layout);
    return(
        <div style={{
            width: viewer.viewerLayout.w,
            height: viewer.viewerLayout.h,
            overflow: "auto",
            maxHeight: viewer.viewerLayout.h,
        }}>
            <h1 style={{
                color: "green",
                textAlign: "center"
            }}>({viewer.viewerLayout.w}x{viewer.viewerLayout.h}x{viewer.viewerLayout.i})</h1>
            <Button style={{zIndex:3, position: "fixed", right:0, top:0}}
                    size={"massive"}
                    onClick={onSave}
                    type="button">Save</Button>
            <GridLayout
                style={{
                    width: viewer.viewerLayout.w,
                    overflow: "auto",
                    height: viewer.viewerLayout.h
                }}
                isDraggable={widgetLayoutLock}
                isResizable={widgetLayoutLock}
                useCSSTransforms={true}
                measureBeforeMount={true}
                //transformScale={0.8}
                isDroppable={true}
                rowHeight={1}
                onDrop={onDrop}
                cols={window.innerWidth * 3}
                width={window.innerWidth * 3}
                layout={individualViewerState.widgetLayout}
                onLayoutChange={(widgetLayoutState) => handleLayoutChange(widgetLayoutState)}
                containerPadding={[0, 0]}
                verticalCompact={false}
            >
                {
                    individualViewerState.widgetLayout && individualViewerState.widgetLayout.map((w,index) => {
                        //todo take out widgetCmpt from w

                        return (
                            <div className="item"
                                 key={w.i}
                                // data-grid={w}
                                 style={{
                                     overflow: "hidden",
                                     borderStyle: "solid",
                                     borderColor: "white",
                                     backgroundColor: "rgba(55,55,55,0.3)",
                                     backdropFilter: "blur(10px) brightness(0.5)"
                                 }}>
                                {onFlyRenderCmpt(w)}
                                <Button
                                    compact={true}
                                    className="remove"
                                    style={{
                                        // backgroundColor: "transparent",
                                        position: "absolute",
                                        right:0,
                                        top: 0,
                                        cursor: "pointer"
                                    }}
                                    onClick={()=>{onRemoveItem(w.i)}}
                                >
                                    x
                                </Button>
                                <Button
                                    compact={true}
                                    className="lock"
                                    style={{
                                        position: "absolute",
                                        left:0,
                                        top: 0,
                                        cursor: "pointer"
                                    }}
                                    onClick={()=>{toggleWidgetLock()}}
                                >
                                    <Icon name='lock' />
                                </Button>
                            </div>
                        )
                    })
                }
            </GridLayout>
        </div>
    )
}


export default OcdViewer;
