import React from "react"
import "./widget.css"
import { Icon, Button } from 'semantic-ui-react'

// @ts-ignore
const Widget = ({name,setDropdown,dropdownArr,friendOptionsArray,setFriendOptionsArray}) => {
    return (
        <div className={"widget-container"}>
        <div className={"widget-header"}>
            {name}
            <Button
            compact
            size={"mini"}
            icon
            onClick={()=>{
                setDropdown(dropdownArr.filter((item: any)=>{
                return(item!==name);
                }));
                setFriendOptionsArray([...friendOptionsArray, {key:name,text:name,value:name}])
            }}
            >
            <Icon name='close'/>
            </Button>
        </div>
        <div className={"widget-body"}>
            dsadsadasdasdasdasdasdasdsadasda
        </div>
        </div>
    );
}

Widget.propTypes = {
}

export default Widget;
