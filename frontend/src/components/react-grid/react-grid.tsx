import React, {useEffect, useState} from "react";
import _ from "lodash";
import '../../../../frontend/node_modules/react-grid-layout/css/styles.css';
import '../../../../frontend/node_modules/react-resizable/css/styles.css';
import GridLayout, { WidthProvider,Responsive } from "react-grid-layout";
import "../react-grid/example-styles.css";
import "../react-grid/styles.css";
// import "./new-react-grid.css"
// import "./new-react-grid-resizable.css"
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const BoundedLayout = ({
                           setIndViewerState,
                           indViewerState,
                           setWidgetOptionsArray,
                           widgetOptionSelection,
                           viewerWidth,
                           viewerHeight

}) => {

    // useEffect(()=>{
    //     console.log("reactgridRender");
    // },[indViewerState]);

    console.log("indViewerStateREACTGRID",indViewerState);
    const onRemoveItem=(i: any)=> {
       setIndViewerState({
                ...indViewerState,
                viewerState: {
                    ...indViewerState.viewerState,
                    widgetDropdownArray: indViewerState.viewerState.widgetDropdownArray.filter((val)=>(val!==i)),
                    viewerLayout: {
                        ...indViewerState.viewerState.viewerLayout,
                        widgetStates: {
                            ...indViewerState.viewerState.viewerLayout.widgetStates,
                            widgetLayout: _.reject(indViewerState.viewerState.viewerLayout.widgetStates.widgetLayout, { i: i }),
                            widgetItems:  _.reject(indViewerState.viewerState.viewerLayout.widgetStates.widgetItems, { i: i }),
                        }
                    }
                }
            });
        setWidgetOptionsArray([...widgetOptionSelection, {key:i,text:i,value:i}])
    }
    const createElement=(el,index)=> {
        const removeStyle = {
            position: "absolute",
            right: "2px",
            top: 0,
            cursor: "pointer"
        };
        return (
            <div key={el.i} data-grid={el}>
                <span className="text">{el.i}</span>
                <span
                    className="remove"
                    style={removeStyle}
                    onClick={onRemoveItem.bind(this, el.i)}
                >
          x
        </span>
            </div>
        );
    }
    const onBreakpointChange=(breakpoint, cols)=> {
    setIndViewerState({...indViewerState,
                viewerState:{
                    ...indViewerState.viewerState,
                    viewerLayout:{
                        ...indViewerState.viewerState.viewerLayout,
                        widgetStates:{
                            ...indViewerState.viewerState.viewerLayout.widgetStates,
                            breakpoint:breakpoint,
                            cols:cols
                        }
                    }
                }
            });
    }
    const onGridLayoutChange=(layout: any)=> {
      setIndViewerState({...indViewerState,
            viewerState:{
                ...indViewerState.viewerState,
                viewerLayout:{
                    ...indViewerState.viewerState.viewerLayout,
                    widgetStates:{
                        ...indViewerState.viewerState.viewerLayout.widgetStates,
                        widgetLayout: layout,
                        widgetItems: layout
                    }
                }
            }
        });
    }

        return (
             <div>
                 <GridLayout
                    // isBounded={true}
                     onBreakpointChange={onBreakpointChange}
                    onLayoutChange={onGridLayoutChange}
                    // layout={theLayout}
                    width={viewerWidth}
                    cols={viewerWidth}
                     //rowHeight={1}
                     // width={window.innerWidth}
                   containerPadding={[0,0]}
                >
                    {
                        indViewerState?.viewerState?.viewerLayout?.widgetStates?.widgetLayout?.map((el,index)=>(createElement(el, index)))
                    }
                 </GridLayout>
            </div>
        );
}




export default BoundedLayout;





