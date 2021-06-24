import * as WidgetActionTypes from '../widgetRedux/WidgetActionTypes';

export const setWidgetLayout = (iWidgetLayout: Array<any>) => {
    return (
        {
            type: WidgetActionTypes.WIDGET_VIEWER_LAYOUTS,
            widgetLayouts: iWidgetLayout
        });
};

export const setWidgetItems = (iWidgetItems: Object) => ({
    type: WidgetActionTypes.WIDGET_VIEWER_ITEMS,
    widgetItems:iWidgetItems
});

export const setWidgetItemsOnBreakPtChange= (iWidgetItems: Object) => ({
    type: WidgetActionTypes.WIDGET_VIEWER_ITEMS,
    widgetItems:iWidgetItems
});

export const setWidgetLayoutOnGridChange= (iWidgetLayoutsArr: Array) => {
    return ({
        type: WidgetActionTypes.WIDGET_VIEWER_LAYOUTS_ON_GRID,
        widgetLayouts: iWidgetLayoutsArr
    });
};

export const setWidgetResizeHandles = (iResizeHandles: Array<any>) => ({
    type: WidgetActionTypes.WIDGET_VIEWER_RESIZE_HANDLES,
    resizeHandles: iResizeHandles,
});

export const setWidgetName = (iWidgetName: string) => ({
    type: WidgetActionTypes.WIDGET_VIEWER_NAME,
    viewerName: iWidgetName,
});
export const removeWidgetItem = (iWidgetName: string) => ({
    type: WidgetActionTypes.REMOVE_WIDGET,
    widgetName: iWidgetName
});
