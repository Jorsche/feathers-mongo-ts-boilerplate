import React, {useEffect, useState} from "react";
import _ from "lodash";
import  { WidthProvider,Responsive } from "react-grid-layout";
import "../react-grid/example-styles.css";
import "../react-grid/styles.css";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const BoundedLayout = ({   index,
                           viewerState,
                           setViewerState,
                           retrievalOfItems,
                           itemState,
                           setItemState,
                           saveClick,
                           setWidgetOptionsArray,
                           widgetOptionSelection,
                           setWidgetItems,
                           removeWidgetItems,
                           widgetLayouts,
                           widgetItems,
                           setWidgetLayout,
                           setWidgetLayoutOnGridChange,
                           setWidgetItemsOnBreakPtChange

}) => {
    useEffect( ()=>{
     //   retrievalOfItems();
    },[saveClick]);
    const onRemoveItem=(i: any)=> {
        console.log("i",i);
        setViewerState(
            {...viewerState,
                [index]: {...viewerState[index],
              //      widgetDropdownArray:  _.reject(viewerState[index].widgetDropdownArray, { i: i }),
                    viewerLayout:{
                        ...viewerState[index].viewerLayout,
                        widgetStates:{
                            // {widgetLayout:[], widgetItems:[]
                            ...viewerState[index].viewerLayout.widgetStates,
                       widgetLayout: _.reject(viewerState[index].viewerLayout.widgetStates.widgetLayout, { i: i }),
                       widgetItems:  _.reject(viewerState[index].viewerLayout.widgetStates.widgetItems, { i: i }),
                        }
                    }
                }
            }
        );

        setItemState(
            {
                ...itemState,
                layout: _.reject(itemState.layout, { i: i }),
                items: _.reject(itemState.items, { i: i }) });

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
        setViewerState(
            {...viewerState,
                [index]: {...viewerState[index],
                    //      widgetDropdownArray:  _.reject(viewerState[index].widgetDropdownArray, { i: i }),
                    viewerLayout:{
                        ...viewerState[index].viewerLayout,
                        widgetStates:{
                            // {widgetLayout:[], widgetItems:[]
                            ...viewerState[index].viewerLayout.widgetStates,
                            breakpoint: breakpoint,
                            cols: cols
                        }
                    }
                }
            }
        );
        //todo
        setItemState({
            ...itemState,
            breakpoint: breakpoint,
            cols: cols
        });
    }
    const onGridLayoutChange=(layout: any)=> {
        console.log("layout",layout);
        setViewerState(
            {...viewerState,
                [index]: {...viewerState[index],
                    //      widgetDropdownArray:  _.reject(viewerState[index].widgetDropdownArray, { i: i }),
                    viewerLayout:{
                        ...viewerState[index].viewerLayout,
                        widgetStates:{
                            // {widgetLayout:[], widgetItems:[]
                            ...viewerState[index].viewerLayout.widgetStates,
                            widgetLayout: layout,
                            widgetItems: layout
                        }
                    }
                }
            }
        );

       //todo
        setItemState(
            {
            ...itemState,
            layout: layout
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
                        viewerState[index].viewerLayout.widgetStates.widgetLayout.map((el,index)=>(createElement(el, index)))
                    }
                    {/*{ _.map(itemState.layout, el => createElement(el))}*/}
                </ResponsiveReactGridLayout>
            </div>
        );
}




export default BoundedLayout;





