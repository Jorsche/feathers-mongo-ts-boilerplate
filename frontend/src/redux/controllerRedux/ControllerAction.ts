import * as ControllerActionTypes from '../controllerRedux/ControllerActionTypes';

// export const setViewerLayout = (iViewerLayout: Array<any>) => ({
//     type: ControllerActionTypes.CONTROLLER_VIEWER_LAYOUTS,
//     viewerLayouts: iViewerLayout,
// });

export const setViewerItems = (iViewerItems: Array<any>) => ({
    type: ControllerActionTypes.CONTROLLER_VIEWER_ITEMS,
    viewerItems: iViewerItems,
});

export const setViewerResizeHandles = (iResizeHandles: Array<any>) => ({
    type: ControllerActionTypes.CONTROLLER_VIEWER_RESIZE_HANDLES,
    resizeHandles: iResizeHandles,
});

export const setViewerName = (iViewerName: string) => ({
    type: ControllerActionTypes.CONTROLLER_VIEWER_NAME,
    viewerName: iViewerName,
});

export const setWidget = (iWidget: Object) => ({
    type: ControllerActionTypes.CONTROLLER_VIEWER_NAME,
    viewerName: iViewerName,
});

export const createViewer = (iViewer: Object) => {
    console.log("iViewewqeqwewqewr",iViewer);
    return ({
        type: ControllerActionTypes.CREATE_VIEWER,
        viewerProperties: iViewer
    });
};
