import React, {useState} from "react";
import "../react-grid/example-styles.css";
import "../react-grid/styles.css";
import BoundedLayout from "./react-grid";
typeof window !== "undefined" && (window.React = React); // for devtools


const TestHook = ({dropDownOption}) => {
// Basic layout that mirrors the internals of its child layout by listening to `onLayoutChange`.
    // It does not pass any other props to the Layout.
    const [state,setState]= useState({layout: []});
    console.log("testHook state",state);
    const onLayoutChange = (layout: any) => {
            setState({layout: layout});
       };
    const stringifyLayout=()=> {
            return state.layout.map(function (l) {
                const name = l.i === "__dropping-elem__" ? "drop" : l.i;
                return (
                    <div className="layoutItem" key={l.i}>
                        <b>{name}</b>
                        {`: [${l.x}, ${l.y}, ${l.w}, ${l.h}]`}
                    </div>
                );
            });
        }

            return (
                <React.StrictMode>
                    <div>
                        <div className="layoutJSON">
                            Displayed as <code>[x, y, w, h]</code>:
                            <div className="columns">{stringifyLayout()}</div>
                        </div>
                        <BoundedLayout onLayoutChange={onLayoutChange} dropDownOption={dropDownOption}/>
                    </div>
                </React.StrictMode>
            );

}
export default TestHook;
    // function run() {
    //     const contentDiv = document.getElementById("content");
    //     const gridProps = window.gridProps || {};
    //     ReactDOM.render(
    //         React.createElement(ListeningLayout, gridProps),
    //         contentDiv
    //     );
    // }
    // if (!document.getElementById("content")) {
    //     document.addEventListener("DOMContentLoaded", run);
    // } else {
    //     run();
    // }
    //
    // return ListeningLayout;

