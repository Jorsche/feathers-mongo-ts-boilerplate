import React, {useState} from "react";
import {Button, Dropdown} from 'semantic-ui-react'
import BoundedLayout from "../react-grid/react-grid";
import _ from 'lodash';
import client from '../../feathers';

const OcdViewer = ({
                       viewer,
                       viewerName,
                       setViewerState,
                       viewerState,

                       setWidgetLayout,
                       setWidgetItems,
                       setWidgetResizeHandles,
                       widgetLayouts,
                       widgetItems,
                       widgetCol,
                       index,
                       createViewer,
                       viewers
})=>{
    console.log("viewerState",viewerState);
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
    const [saveClick, setSaveClick] = useState(false);
    const [resState, setResState] = useState({});
    const [itemState, setItemState] = useState({
        viewerName:"",
        layout:[],
        items:[],
        widgetOption:[],
        newCounter: 0
    });
    // const retrievalOfItems =async ()=>{
    //     try {
    //        const response =await widgetService.find();
    //        //response is array of object_id  --> correct--> each viewer shld have its own object
    //         console.log("res",response);
    //         if(response.data.length>0) {
    //             const fetchData = response.data;
    //             console.log("fetchData,",fetchData);
    //             setResState(fetchData);
    //             setItemState(fetchData);
    //           //todo
    //             const results = widgetOptionSelection.filter(({ value: id1 }) => !fetchData.map((val)=>(
    //                 val.layout.some(({ i: id2 }) => id2 === id1))));
    //             setWidgetOptionsArray(results);
    //         }
    //     }
    //     catch(e){
    //         console.log("error",e);
    //     }
    //
    // }
    // const saveOrEdit = async (itemState,resState)=>{
    //     try {
    //         console.log("!_.isEmpty(resState)",!_.isEmpty(resState));
    //         if(_.isEmpty(resState)){
    //             widgetService.create(itemState).then(()=>{
    //                 retrievalOfItems();
    //             })
    //         }
    //         else{
    //             widgetService.patch(itemState._id,itemState).then(()=>{
    //                 retrievalOfItems();
    //             })
    //         }
    //     } catch (error) {
    //         console.log("err", error);
    //     }
    // }
    // console.log("itemState",itemState);

    const onChange = (e: any, {value}: any) => {
        const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se"];
        setWidgetOptionsArray(widgetOptionSelection.filter((val)=>(
            val.value!==value
        )));
        setViewerState(
            {...viewerState,
                [index]: {...viewerState[index],
                    widgetDropdownArray:[...viewerState[index].widgetDropdownArray,value],
                     viewerLayout:{
                    ...viewerState[index].viewerLayout,
                    widgetStates:{
                        // {widgetLayout:[], widgetItems:[]
                        ...viewerState[index].viewerLayout.widgetStates,
                        widgetLayout: [...viewerState[index].viewerLayout.widgetStates.widgetLayout,
                            {
                                i: value,
                                x: (viewerState[index].viewerLayout.widgetStates.widgetItems.length * 2) % (viewerState[index].viewerLayout.widgetStates.widgetItems.cols || 12),
                                y: Infinity, // puts it at the bottom
                                w: 2,
                                h: 2,
                                resizeHandles: availableHandles
                            }],
                        widgetItems: viewerState[index].viewerLayout.widgetStates.widgetItems.concat({
                            i: value,
                            x: (viewerState[index].viewerLayout.widgetStates.widgetItems.length * 2) % (viewerState[index].viewerLayout.widgetStates.widgetItems.cols || 12),
                            y: Infinity, // puts it at the bottom
                            w: 2,
                            h: 2,
                            resizeHandles: availableHandles
                        })
                    }
                     }
            }
            }
            );

        // const viewerProperties ={
        //     i: value,
        //     a: "ho",
        //     viewerName: viewerName
        // }
        //
        // const checkIfSelectedIndexInStore =()=>{
        //     const selectedViewerIndex= viewers.findIndex((i)=>{
        //         console.log("i.viewerName",i.viewerName);
        //         console.log("viewerName",viewerName);
        //         return i.viewerName === viewerName;
        //     });
        //     console.log("selectedViewerIndex",selectedViewerIndex);
        //     // if cannot find index--> then u create
        //     if(selectedViewerIndex===-1){
        //         console.log("viewerProperties",viewerProperties);
        //         createViewer(viewerProperties);
        //     }
        //     // if found index--> then u update
        //
        // }
        // checkIfSelectedIndexInStore();
        // const layout =[{
        //     i: value,
        //     x: (widgetItems.length * 2) % (widgetCol || 12),
        //     y: Infinity, // puts it at the bottom
        //     w: 2,
        //     h: 2,
        //     resizeHandles: availableHandles
        // }]
        // const elementsIndex = itemState.findIndex(element => element.viewerName == name );
        // console.log("elementsIndex",elementsIndex);

        setItemState(
            {
                ...itemState,
                viewerName: viewerName,
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
            }
            );
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
    <div className="ocd-viewer-header">{viewerName}header{index}</div>
    <div className="ocd-viewer-main">
        <BoundedLayout
            //retrievalOfItems={retrievalOfItems}
            itemState={itemState}
            widgetOptionSelection={widgetOptionSelection}
            setWidgetOptionsArray={setWidgetOptionsArray}
            setItemState={setItemState}
            saveClick={saveClick}
            setViewerState={setViewerState}
            viewerState={viewerState}
            index={index}
        >
        </BoundedLayout>
    </div>
    <div className="ocd-viewer-footer">
        footer
   <DropdownSelection></DropdownSelection>
        <Button
            className="add-widget-button"
            disabled={JSON.stringify(itemState) === JSON.stringify(resState)}
        //     onClick={
        //         ()=>{saveOrEdit(itemState,resState)
        //     setSaveClick(!saveClick)
        // }}
        >Save & Publish</Button>
    </div>
</div>
)
}
export default OcdViewer;
