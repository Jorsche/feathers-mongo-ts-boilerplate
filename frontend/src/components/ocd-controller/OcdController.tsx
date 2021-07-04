//import "./OcdController.css"
import {Button} from "semantic-ui-react";
import OcdViewer from "../ocd-viewer/OcdViewer";
import React, {useEffect, useState} from "react";
import  { WidthProvider,Responsive } from "react-grid-layout";
import "./react-grid.css"
import "./example-styles.css"
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const OcdController = ({   aState,
                           setAState,
                           retrievalOfItems,
                           setSaveClick,
                           saveClick
                        }) => {
    const [lockState,setLockState]= useState(false);
    useEffect( ()=>{
        console.log("render");
        retrievalOfItems();
    },[saveClick]);

    const createElement = (el, index) => {
        return (
            <div key={el.viewerState.viewerLayout.i} data-grid={el.viewerState.viewerLayout}>
                        <OcdViewer
                            viewer={el}
                            viewerName={el.viewerState.viewerLayout.i}
                            index={index}
                            setLockState={setLockState}
                            lockState={lockState}
                            setSaveClick={setSaveClick}
                            saveClick={saveClick}
                            retrievalOfItems={retrievalOfItems}
                        >
                        </OcdViewer>
            </div>
        );
    }
    const onBreakpointChange = (breakpoint, cols) => {
        //todo gotproblem
        console.log("in break point");
        console.log("breakpoint",breakpoint);
        console.log("cols",cols);
        const onBreakpointChangeStateController = aState.map((val)=> {
            return  {...val,
                    breakpoint:breakpoint,
                    cols:cols
            }
        });
        setAState(onBreakpointChangeStateController);
    }
    const onGridLayoutChange = (layout: any) => {
        console.log("onGridLayoutChangeOCDCONTROLLER",layout);
        const onGridLayoutChangeStateController = aState.map((val)=> {
            console.log("!!!val",val);
            return  layout.map((layoutVal)=>{
                    console.log("layoutVal!!",layoutVal);
                    if(val.layout.i===layoutVal.i){
                  return (
                      {...val,
                      viewerState:{...val.viewerState,
                          viewerLayout: {
                              ...val.viewerState.viewerLayout,
                              layoutVal
                          }
                      },
                      layout:layoutVal}
                      );}
            }
            )});
        const filtered = onGridLayoutChangeStateController.map((x)=> {
           return x.filter((y)=> y!== undefined)
        });
         setAState(filtered.flat());

    }
    console.log("aStateonGridLayoutChange",aState);
    return (
        <div className="controller-container">
        <div className="controller-body">
            <div>
                <ResponsiveReactGridLayout
                    width={window.innerWidth*3}
                    isDraggable={lockState}
                    isResizable={false}
                    isBounded={true}
                    onBreakpointChange={onBreakpointChange}
                    onLayoutChange={onGridLayoutChange}
                    style={{border: "solid yellow 2px"}}
                >
                    {
                        aState.map((e, index) =>
                            createElement(e, index))
                    }
                </ResponsiveReactGridLayout>
            </div>

        </div>
        <div className="controller-footer">
            <Button>Zoom in</Button>
            <Button>Zoom out</Button>
        </div>
    </div>);
}
export default OcdController;
