import React, {useState} from "react";
import {Button, Dropdown} from 'semantic-ui-react'
import "./OcdViewer.css"
import BoundedLayout from "../react-grid/react-grid";

const OcdViewer = ()=>{
    const [friendOptionsArray, setFriendOptionsArray] = useState([
        {
            key: 'Jenny Hess',
            text: 'Jenny Hess',
            value: 'Jenny Hess',
        },
        {
            key: 'Elliot Fu',
            text: 'Elliot Fu',
            value: 'Elliot Fu',
        },
        {
            key: 'Stevie Feliciano',
            text: 'Stevie Feliciano',
            value: 'Stevie Feliciano',
        },
        {
            key: 'Christian',
            text: 'Christian',
            value: 'Christian',
        },
        {
            key: 'Matt',
            text: 'Matt',
            value: 'Matt',
        },
        {
            key: 'Justen Kitsune',
            text: 'Justen Kitsune',
            value: 'Justen Kitsune',
        },
    ]);
    const [dropdownValueArray, setDropdownValueArray] = useState([]);
    const [dropdownValue, setDropdownValue] = useState("");
    const [itemState, setItemState] = useState({
        items:[],
        newCounter: 0
    });
    const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se"];
    {/*button appears only when it detects shifting of position OR new widgets are added  */}
    //new widgets added can use to cmp
    // const saveButtonDisplay =
    const onChange = (e: any, {value}: any) => {
        setDropdownValueArray(dropdownValueArray.concat(value));
        setFriendOptionsArray(friendOptionsArray.filter((val)=>(
            val.value!==value
        )));
        setDropdownValue(value);
            // /*eslint no-console: 0*/
        setItemState({
                items: itemState.items.concat({
                    i: value,
                    x: (itemState.items.length * 2) % (itemState.cols || 12),
                    y: Infinity, // puts it at the bottom
                    w: 2,
                    h: 2,
                    resizeHandles: availableHandles
                }),
                // Increment the counter to ensure key is always unique.
                newCounter: itemState.newCounter + 1
            });
    };
    console.log("itemState",itemState);
    const DropdownExampleSelection = () => (
        <Dropdown
            placeholder='Add Widget'
            selection
            options={friendOptionsArray}
            onChange={onChange}
        />
    )
    console.log("dropdownValue",dropdownValue);
    return(
    <div className="ocd-viewer">
    <div className="ocd-viewer-header">header</div>
    <div className="ocd-viewer-main">
        <BoundedLayout itemState={itemState} friendOptionsArray={friendOptionsArray} setFriendOptionsArray={setFriendOptionsArray}setItemState={setItemState}></BoundedLayout>
       {/*<TestHook dropDownOption={dropdownValue}></TestHook>*/}

        {/*{dropdownValueArray.map((val)=> {*/}
        {/*  return <Widget*/}
        {/*      name={val}*/}
        {/*      setFriendOptionsArray={setFriendOptionsArray}*/}
        {/*      friendOptionsArray={friendOptionsArray}*/}
        {/*      setDropdown= {setDropdownValueArray}*/}
        {/*      dropdownArr={dropdownValueArray}*/}
        {/*  />*/}
        {/*})*/}
        {/*}*/}
    </div>
    <div className="ocd-viewer-footer">
        footer
   <DropdownExampleSelection></DropdownExampleSelection>
        {/*button appears only when it detects shifting of position OR new widgets are added  */}
        <Button>Save & Published</Button>
    </div>
</div>
)
}
export default OcdViewer;
