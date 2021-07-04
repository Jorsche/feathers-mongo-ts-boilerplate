import React, {useEffect, useState} from "react";
import _ from "lodash";
import  { WidthProvider,Responsive } from "react-grid-layout";
import "../react-grid/example-styles.css";
import "../react-grid/styles.css";
// import "./new-react-grid.css"
// import "./new-react-grid-resizable.css"
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const BoundedLayout = ({
                           setIndViewerState,
                           indViewerState,
                           setWidgetOptionsArray,
                           widgetOptionSelection

}) => {
    console.log("indViewerStateREACTGRID",indViewerState);
    const onRemoveItem=(i: any)=> {
        console.log("i",typeof i);
       setIndViewerState({
                ...indViewerState,
                viewerState: {
                    ...indViewerState.viewerState,
                    //todo why not working
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
       // setNewLayout(layout)
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
                {/*<button onClick={onAddItem}>Add Item</button>*/}
                <ResponsiveReactGridLayout
                    isBounded={true}
                    onBreakpointChange={onBreakpointChange}
                    onLayoutChange={onGridLayoutChange}
                >
                    {
                        indViewerState?.viewerState?.viewerLayout?.widgetStates?.widgetLayout?.map((el,index)=>(createElement(el, index)))
                    }
                    {/*{ _.map(itemState.layout, el => createElement(el))}*/}
                </ResponsiveReactGridLayout>
            </div>
        );
}




export default BoundedLayout;





