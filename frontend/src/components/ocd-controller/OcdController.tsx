import OcdViewer from "../ocd-viewer/OcdViewer";
import React from "react";
import GridLayout from 'react-grid-layout';
import '../../App.css';


const OcdController = ({
                           retrievalOfItems,
                           setSaveClick,
                           saveClick,
                           isLock,
                           dragElement,
                           viewersState,
                           setViewersState,
                           newWidgetArr
                        }) => {

    const onGridLayoutChange = (layout: any) => {
        const onGridLayoutChangeStateController = viewersState.map((val)=> {
            return  layout.map((layoutVal)=>{
                    if(val.viewerLayout.i===layoutVal.i){
                  return (
                      {...val,
                          viewerLayout: {...layoutVal}
                      }
                      );}
            }
            )});
        const filtered = onGridLayoutChangeStateController.map((x)=> {
           return x.filter((y)=> y!== undefined)
        });
        setViewersState(filtered.flat());
    }

    const gridLayout = viewersState.map((v)=> v.viewerLayout)
    console.log("gridLayout",gridLayout);
    return (
        <GridLayout
            isDraggable={!isLock}
            isResizable={!isLock}
            layout={gridLayout}
            cols={window.innerWidth*3}
            width={window.innerWidth*3}
            rowHeight={1}
            containerPadding={[0,0]}
            onLayoutChange={(layout)=> onGridLayoutChange(layout)}
           useCSSTransforms={true}
            verticalCompact={false}
            style={{border: "solid yellow 2px"}}
        >
            {viewersState && viewersState.map((viewer)=>{
                return <div className="item"
                            key={viewer.viewerLayout.i}
                            style={{overflow:"hidden",
                                borderStyle: "solid",
                                borderColor:"white",
                                backgroundColor:"rgba(55,55,55,0.3)",
                                backdropFilter: "blur(10px) brightness(0.5)",
                                maxHeight: `${viewer.viewerLayout.h}px`
                            }}>

                        <OcdViewer
                            title={viewer.viewerLayout.i}
                            viewerName={viewer.viewerLayout.i}
                            viewer={viewer}
                            setSaveClick={setSaveClick}
                            saveClick={saveClick}
                            retrievalOfItems={retrievalOfItems}
                            dragElement={dragElement}
                            newWidgetArr={newWidgetArr}
                        >
                        </OcdViewer>
                    </div>
            })}
        </GridLayout>
    );
}
export default OcdController;
