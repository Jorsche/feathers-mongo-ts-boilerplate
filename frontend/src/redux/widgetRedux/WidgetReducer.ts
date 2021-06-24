/* eslint-disable @typescript-eslint/naming-convention */
import * as types from './WidgetActionTypes';
import _ from "lodash";

export interface IWidgetAction {
    type: string,
    id: string,
    widgetLayouts: Array<any>,
    widgetItems: Array<any>,
    resizeHandles: Array<any>,
    widgetName: String,
    value: object,
    breakpoint: String,
    col: Number
}

const initialState = {
    id:"",
    widgetLayouts:[],
    widgetItems:[],
    resizeHandles:[],
    widgetName:"",
    col: 0,
    breakpoint:""
};

// eslint-disable-next-line complexity
const WidgetReducer = (state = initialState, action: IWidgetAction) => {
    console.log("action.widgetItems",action.widgetItems);
    console.log("action.widgetLayout",action.widgetLayouts);
    console.log("state.widgetLayouts",state.widgetLayouts);
    switch (action.type) {
        case types.WIDGET_VIEWER_LAYOUTS:
            return { ...state, widgetLayouts: [...state.widgetLayouts,...action.widgetLayouts] };

        case types.WIDGET_VIEWER_ITEMS_ON_BREAKPOINT:
            return { ...state, widgetItems: [...state.widgetLayouts,...action.widgetLayouts] };

        case types.WIDGET_VIEWER_LAYOUTS_ON_GRID:
            return { ...state, widgetLayouts: action.widgetLayouts };

        case types.WIDGET_VIEWER_ITEMS:
            return { ...state, widgetItems: [...state.widgetItems,...action.widgetItems] };;

        case types.WIDGET_VIEWER_RESIZE_HANDLES:
            return { ...state, resizeHandles: action.resizeHandles };

        case types.WIDGET_VIEWER_NAME:
            return { ...state, widgetName: action.widgetName };

       case types.WIDGET_VIEWER_NAME:
            return { ...state, widgetName: action.widgetName };

       case types.REMOVE_WIDGET:
            return   {
                ...state,
                widgetLayouts: _.reject(state.widgetLayouts, { i: action.widgetName }),
                widgetItems: _.reject(state.widgetItems, { i: action.widgetName }) };
        default:
            return state;
    }
};

export default WidgetReducer;
