import React, {useState} from "react";
import {Button, Dropdown} from 'semantic-ui-react'
import "./OcdViewer.css"
import BoundedLayout from "../react-grid/react-grid";
import _ from 'lodash';
import client from '../../feathers';

const OcdViewer = ({name})=>{
    const widgetService = client.service('widgets');
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
    const [itemState, setItemState] = useState({
        layout:[],
        items:[],
        newCounter: 0
    });
    const [saveClick, setSaveClick] = useState(false);
    const [resState, setResState] = useState({});
    const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se"];

    // widgetService.aggregate([{
    //     $lookup: {
    //         from: 'User',
    //         localField: 'User_ID',
    //         foreignField: 'ID',
    //         as: 'Customer'
    //     }}]);
    //


    const retrievalOfItems =async ()=>{
        try {
           const response =await widgetService.find();
            if(response.data.length>0) {
                const fetchData = response.data[0];
                setResState(fetchData);
                setItemState(fetchData);
                const results = widgetOptionSelection.filter(({ value: id1 }) => !fetchData.layout.some(({ i: id2 }) => id2 === id1));
                setWidgetOptionsArray(results);
            }
        }
        catch(e){
            console.log("error",e);
        }

    }
    console.log("resState",resState);

    const saveOrEdit = async (itemState,resState)=>{
        try {
            console.log("!_.isEmpty(resState)",!_.isEmpty(resState));
            if(_.isEmpty(resState)){
                widgetService.create(itemState).then(()=>{
                    retrievalOfItems();
                })
            }
            else{
                widgetService.patch(itemState._id,itemState).then(()=>{
                    retrievalOfItems();
                })
            }
        } catch (error) {
            console.log("err", error);
        }

        // const postOrPut= _.isEmpty(resState)?axios.post:axios.patch;
        // try {
        //     postOrPut(`http://localhost:3030/widgets/${!_.isEmpty(resState) ? itemState._id: ""}`, itemState).then(()=>{
        //         retrievalOfItems();
        //     })
        // } catch (error) {
        //         console.log("err", error);
        //     }

    }
    const onChange = (e: any, {value}: any) => {
        setWidgetOptionsArray(widgetOptionSelection.filter((val)=>(
            val.value!==value
        )));
        setItemState({
            ...itemState,
                layout: itemState.layout.concat({
                    i: value,
                    x: (itemState.items.length * 2) % (itemState.cols || 12),
                    y: Infinity, // puts it at the bottom
                    w: 2,
                    h: 2,
                    resizeHandles: availableHandles
                }),
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
    const DropdownSelection = () => (
        <Dropdown
            placeholder='Add Widget'
            selection
            options={widgetOptionSelection}
            onChange={onChange}
        />
    )
    return(
    <div className="ocd-viewer">
    <div className="ocd-viewer-header">{name}header</div>
    <div className="ocd-viewer-main">
        <BoundedLayout
            retrievalOfItems={retrievalOfItems}
            itemState={itemState}
            widgetOptionSelection={widgetOptionSelection}
            setWidgetOptionsArray={setWidgetOptionsArray}
            setItemState={setItemState}
            saveClick={saveClick}
        >
        </BoundedLayout>
    </div>
    <div className="ocd-viewer-footer">
        footer
   <DropdownSelection></DropdownSelection>
        <Button
            className="add-widget-button"
            disabled={JSON.stringify(itemState) === JSON.stringify(resState)}
            onClick={
                ()=>{saveOrEdit(itemState,resState)
            setSaveClick(!saveClick)
        }}>Save & Publish</Button>
    </div>
</div>
)
}
export default OcdViewer;
