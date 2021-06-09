import React, {useEffect, useState} from "react";
import _ from "lodash";
import  { WidthProvider,Responsive } from "react-grid-layout";
import "../react-grid/example-styles.css";
import "../react-grid/styles.css";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const BoundedLayout = ({itemState,setItemState,setFriendOptionsArray,friendOptionsArray}) => {
    //console.log("itemStateBoundedLayout",itemState);
    const [state,setState]= useState({});
    console.log("state boundedLayout",state);

    const onRemoveItem=(i: any)=> {
       // console.log("removeItem",state.items + "i",i);
        setItemState({items: _.reject(state.items, { i: i }) });
        setState({ items: _.reject(state.items, { i: i }) });
        setFriendOptionsArray([...friendOptionsArray, {key:i,text:i,value:i}])
    }
//should always update boundedLayout state with the new itemState
    //this happens because when u remove, u set the state
    //BUT when it re-renders with useEffect it sets the itemState to this state.

    //to resolve,
    useEffect(()=>{
    setState(itemState);
},[itemState]);

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

    // const onAddItem=()=> {
    //     /*eslint no-console: 0*/
    //     console.log("adding", "n" + state.newCounter);
    //     const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se"];
    //     setState({
    //         items: state.items.concat({
    //             i: "n" +state.newCounter,
    //             x: (state.items.length * 2) % (state.cols || 12),
    //             y: Infinity, // puts it at the bottom
    //             w: 2,
    //             h: 2,
    //             resizeHandles: availableHandles
    //         }),
    //         // Increment the counter to ensure key is always unique.
    //         newCounter: state.newCounter + 1
    //     });
    // }
    // We're using the cols coming back from this to calculate where to add new items.

    const onBreakpointChange=(breakpoint, cols)=> {
        setState({
            ...state,
            breakpoint: breakpoint,
            cols: cols
        });
    }

    const onGridLayoutChange=(layout: any)=> {
    //    onLayoutChange(layout);
        setState({...state, layout: layout });
    }

        return (
            <div>
                {/*<button onClick={onAddItem}>Add Item</button>*/}
                {state!==null &&
                <ResponsiveReactGridLayout
                    isBounded={true}
                    onBreakpointChange={onBreakpointChange}
                    onLayoutChange={onGridLayoutChange}
                >
                    { _.map(state.items, el => createElement(el))}
                </ResponsiveReactGridLayout>}
            </div>
        );
}





export default BoundedLayout;





