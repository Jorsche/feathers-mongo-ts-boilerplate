/* eslint-disable @typescript-eslint/naming-convention */
import * as types from './ControllerActionTypes';

export interface IControllerAction {
    type: string,
    id: string,
    viewerLayouts: Array<any>,
    viewerItems: Array<any>,
    resizeHandles: Array<any>,
    viewerName: String,
    viewerProperties: Object

}

const initialState = {
    viewers:[{
    id:"",
    viewerLayouts:[],
    viewerItems:[],
    resizeHandles:[],
    viewerName:""
    }]
};


// eslint-disable-next-line complexity
const ControllerReducer = (state = initialState, action: IControllerAction) => {
    console.log("action.viewerProperties",action.viewerProperties);
    switch (action.type) {
        // case types.CONTROLLER_VIEWER_LAYOUTS:
        //     return { ...state, viewerLayouts: action.viewerLayouts };
        case types.CONTROLLER_VIEWER_ITEMS:
            return { ...state, viewerItems: action.viewerItems };

        case types.CONTROLLER_VIEWER_RESIZE_HANDLES:
            return { ...state, resizeHandles: action.resizeHandles };

        case types.CREATE_VIEWER:
            return {viewers:[...state.viewers, action.viewerProperties ]};
        default:
            return state;
    }
};

export default ControllerReducer;
