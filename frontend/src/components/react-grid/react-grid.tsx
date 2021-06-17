import React, {useEffect, useState} from "react";
import _ from "lodash";
import  { WidthProvider,Responsive } from "react-grid-layout";
import "../react-grid/example-styles.css";
import "../react-grid/styles.css";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const BoundedLayout = ({
                           retrievalOfItems,
                           itemState,
                           setItemState,
                           saveClick,
                           setWidgetOptionsArray,
                           widgetOptionSelection
}) => {
    useEffect( ()=>{
        retrievalOfItems();
    },[saveClick]);

    const onRemoveItem=(i: any)=> {
        setItemState(
            {
                ...itemState,
                layout: _.reject(itemState.layout, { i: i }),
                items: _.reject(itemState.items, { i: i }) });
        setWidgetOptionsArray([...widgetOptionSelection, {key:i,text:i,value:i}])
    }

    const createElement=(el: { i: any; })=> {
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
        console.log("breakptChange");
        setItemState({
            ...itemState,
            breakpoint: breakpoint,
            cols: cols
        });
    }

    const onGridLayoutChange=(layout: any)=> {
        console.log("onGridLayoutChange");
        setItemState(
            {
            ...itemState,
            layout: layout
        });
    }

        return (
            <div>
                {/*<button onClick={onAddItem}>Add Item</button>*/}
                {itemState!==null &&
                <ResponsiveReactGridLayout
                    isBounded={true}
                    onBreakpointChange={onBreakpointChange}
                    onLayoutChange={onGridLayoutChange}
                >
                    { _.map(itemState.layout, el => createElement(el))}
                </ResponsiveReactGridLayout>}
            </div>
        );
}





export default BoundedLayout;





