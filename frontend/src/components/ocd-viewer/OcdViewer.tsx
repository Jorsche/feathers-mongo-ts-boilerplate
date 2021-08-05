import React, {useEffect, useState} from "react";
import {Button} from 'semantic-ui-react'
import client from "../../feathers";
import "./OcdViewer.css"
import GridLayout from 'react-grid-layout';
import _ from "lodash";

const OcdViewer = ({   viewer,
                       dragElement,
                       newWidgetArr
})=>{
    console.log("dragElement",dragElement);
    const [individualViewerState, setIndividualViewerState] = useState({});
    const viewerService = client.service('viewer');
    useEffect(()=>{
        setIndividualViewerState(viewer);
    },[viewer]);
    const onSave=()=>{
        viewerService.patch(individualViewerState._id, individualViewerState);
          //  .then(() => {retrievalOfItems()});
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
                                    y: Infinity,
                                    w: 2,// this is for the default sizing of the widgets
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

    const onDrop = (layout, layoutItem, _event) => {
        const findDroppableElement = layout.find((ly)=>{return (ly.i === "__dropping-elem__")});
        if (findDroppableElement!==undefined){
            const modifyIinDropElement = {...findDroppableElement, i:dragElement, w:500 ,h:50, widgetCmpt: dragElement.cmpt }
            console.log("modifyIinDropElement",modifyIinDropElement);
            const foundIndex = layout.findIndex(indexObj=> indexObj.i === "__dropping-elem__");
            const diffEle = !individualViewerState.widgetLayout.find((e) => {return e.i === dragElement});
            if(foundIndex!== -1 && diffEle) {
                layout[foundIndex] = modifyIinDropElement;
                setIndividualViewerState({...individualViewerState,
                widgetLayout:layout
                })
            }
        }
    };
    const handleLayoutChange = (widgetLayoutState: any)=>{
        //todo widgetLayoutState take away my widgetCmpt obj.
            setIndividualViewerState({
                ...individualViewerState,
                widgetLayout: widgetLayoutState
            })

    }

    const onRemoveItem=(i: any)=> {
        setIndividualViewerState({
            ...individualViewerState,
            widgetLayout: _.reject(individualViewerState.widgetLayout, { i: i }),
        });
    }
    console.log("individualViewerState",individualViewerState);

    const onFlyRenderCmpt =(w)=>{
        const findCmptElement = newWidgetArr.find((newWidget)=>{return (newWidget.widgetName === w.i)});
        if(findCmptElement!==undefined){
            return(findCmptElement.cmpt);
        }
        else return w.i;
    }
    return(
        <div style={{
            width: viewer.viewerLayout.w,
            height: viewer.viewerLayout.h,
               // height: viewer.viewerLayout.h,
               overflow: "auto",
            maxHeight: viewer.viewerLayout.h

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
                   //useCSSTransforms={true}
                   //transformScale={0.75}
                   measureBeforeMount={true}
                   isDroppable={true}
                   rowHeight={1}
                   onDrop={onDrop}
                   cols={window.innerWidth * 3}
                   width={window.innerWidth * 3}
                   layout={individualViewerState.widgetLayout}
                   // layout={individualViewerState.widgetLayout}
                   // width={individualViewerState.viewerLayout.w}
                   // cols={individualViewerState.viewerLayout.w}

                   onLayoutChange={(widgetLayoutState) => handleLayoutChange(widgetLayoutState)}
                   containerPadding={[0, 0]}
                   verticalCompact={false}
               >
                   {
                       individualViewerState.widgetLayout && individualViewerState.widgetLayout.map((w,index) => {
                           console.log("wwwwww",w);
                           return (
                               <div className="item"
                                    key={w.i}
                                    data-grid={w}
                                    style={{
                                        overflow: "hidden",
                                        borderStyle: "solid",
                                        borderColor: "white",
                                        backgroundColor: "rgba(55,55,55,0.3)",
                                        backdropFilter: "blur(10px) brightness(0.5)"
                                    }}>
                                   {onFlyRenderCmpt(w)}
                                   <Button
                                       className="remove"
                                       style={{
                                           position: "absolute",
                                           right: "60px",
                                           top: 0,
                                           cursor: "pointer"
                                       }}
                                       onClick={()=>{onRemoveItem(w.i)}}
                                   >
          x
        </Button>
                               </div>
                           )
                       })
                   }
               </GridLayout>
           </div>
           )
}
        // indViewerState ? (
        //     // <div>
        //      <div className="ocd-viewer"
        //           style={{width: viewerWidth,
        //               height:viewerHeight,
        //               overflow:"hidden", borderStyle: "solid",
        //               borderColor:"white",
        //               backgroundColor:"rgba(55,55,55,0.3)",
        //               backdropFilter: "blur(10px) brightness(0.3)"
        //           }}
        //      >
        //     <div className="ocd-viewer-header">{viewerName}header{index}
        //         <Button
        //             icon
        //             onClick={() => {
        //                 setLockState(!lockState)
        //             }}
        //         >
        //             <Icon name={lockState ? 'unlock' : 'lock'} size='small'/>
        //         </Button>
        //     </div>
        //     <div className="ocd-viewer-main">
        //         <BoundedLayout
        //             //retrievalOfItems={retrievalOfItems}
        //             setIndViewerState={setIndViewerState}
        //             indViewerState={indViewerState}
        //             widgetOptionSelection={widgetOptionSelection}
        //             setWidgetOptionsArray={setWidgetOptionsArray}
        //             saveClick={saveClick}
        //             setViewerState={setViewerState}
        //             viewerState={viewerState}
        //             index={index}
        //             viewerWidth={viewerWidth}
        //             viewerHeight={viewerHeight}
        //
        //         >
        //         </BoundedLayout>
        //     </div>
        //     <div className="ocd-viewer-footer">
        //         <DropdownSelection></DropdownSelection>
        //         <Button
        //             className="add-widget-button"
        //             //disabled={JSON.stringify(itemState) === JSON.stringify(resState)}
        //             onClick={
        //                 () => {
        //                     onSave()
        //                     setSaveClick(!saveClick)
        //                 }}
        //         >Save & Publish</Button>
        //     </div>
        // </div>) : ""

export default OcdViewer;
