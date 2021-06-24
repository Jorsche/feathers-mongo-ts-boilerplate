import {Dropdown} from "semantic-ui-react";
import React, {useState} from "react";



const Test = () => {
    const ocdViewerArr = [
        {
            viewerName: "viewer1",
            viewerLayout: {
                w: 2, h: 2, x: 0, y: 0, i: "Viewer1", moved: false, static: false,
                resizeHandles: ["s", "w", "e", "n", "sw", "nw", "se"]
            },
            widgetDropdownArray: []
        },
        {
            viewerName: "viewer2",
            viewerLayout: {
                w: 2, h: 2, x: 2, y: 0, i: "Viewer2", moved: false, static: false,
                resizeHandles: ["s", "w", "e", "n", "sw", "nw", "se"]
            },
            widgetDropdownArray: []
        }];
    const onChange = (e: any, {value}: any) => {
        setWidgetOptionsArray(widgetOptionSelection.filter((val)=>(
            val.value!==value
        )));
    };

    const [widgetOptionSelection, setWidgetOptionsArray] = useState([
        {
            key: 'Widget1',
            text: 'Widget1',
            value: 'Widget1',
        },
        {
            key: 'Widget2',
            text: 'Widget2',
            value: 'Widget2',
        },
        {
            key: 'Widget3',
            text: 'Widget3',
            value: 'Widget3',
        },
        {
            key: 'Widget4',
            text: 'Widget4',
            value: 'Widget4',
        },
        {
            key: 'Widget5',
            text: 'Widget5',
            value: 'Widget5',
        },
        {
            key: 'Widget6',
            text: 'Widget6',
            value: 'Widget6',
        },
    ]);

    console.log(widgetOptionSelection);
    const DropdownSelection = () => (
        <Dropdown
            placeholder='Add Widget'
            selection
            options={widgetOptionSelection}
            onChange={onChange}
        />
    )
    return (<div>
        {
          ocdViewerArr.map((e,index)=>
              <DropdownSelection index={index} e={e}></DropdownSelection>
          )
        }
    </div>);
};


export default Test;
